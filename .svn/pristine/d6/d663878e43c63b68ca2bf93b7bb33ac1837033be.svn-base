package com.jp.tic.net.tcpserver.handler;

import java.lang.reflect.Field;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.Date;
import java.util.Hashtable;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.transport.socket.SocketSessionConfig;
import org.apache.mina.transport.socket.nio.NioSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.common.util.MathUtils;
import com.jp.tic.net.tcpserver.BaseProtocolMeta;
import com.jp.tic.net.tcpserver.IShortProtocolHelper;
import com.jp.tic.net.tcpserver.TcpShortPackage;
import com.jp.tic.net.tcpserver.TcpShortPackageMeta;
import com.jp.tic.net.tcpserver.IShortProtocolHelper.ServerOperation;
import com.jp.tic.net.tcpserver.IShortProtocolHelper.TCPEventType;

public class MinaShortConnServerHandler extends IoHandlerAdapter {

	protected static final Logger log = LoggerFactory.getLogger(MinaShortConnServerHandler.class);

	private IShortProtocolHelper helper;

	public IShortProtocolHelper getHelper() {
		return helper;
	}

	public void setHelper(IShortProtocolHelper helper) {
		this.helper = helper;
	}
	
	public MinaShortConnServerHandler(IShortProtocolHelper helper){
		this.helper=helper;
	}
	
	Hashtable<IoSession, TcpShortPackageMeta> sessionPackages = new Hashtable<IoSession, TcpShortPackageMeta>();
	
	private static Field sessionChannelField=null;
	private static Field sockeCloseField=null;
	static{
		try {
			sessionChannelField = NioSession.class.getDeclaredField("channel");
			sessionChannelField.setAccessible(true);
			
			sockeCloseField=Socket.class.getDeclaredField("closed");
			sockeCloseField.setAccessible(true);
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			e.printStackTrace();
		}
	}
	
	private void closeSession(IoSession session){
		sessionPackages.remove(session);
		try {
//			SocketChannel channel = (SocketChannel)sessionChannelField.get(session);
//			if (channel.isConnected()
//					||channel.socket().isConnected()
//					||channel.socket().isClosed()==false
//					//||sockeCloseField.getBoolean(channel.socket())==false
//					) {
//				//channel.socket().shutdownInput();
//				channel.socket().shutdownOutput();//有效果。
//				channel.socket().close();
//				channel.close();
//				log.info("sessionClosed by channel");
//			}
			
			session.close(true);
			//session.getCloseFuture().awaitUninterruptibly();
		}catch(Exception e) {
			log.error("sessionClosed",e);
		}
		log.info("session closed"+session.getId());
	}
	
	/**
	 * 当有异常发生时触发
	 */
	@Override
	public void exceptionCaught(IoSession session, Throwable cause) {
		log.error("MinaConnServerHandler exceptionCaught {}", cause .getMessage() + cause);
		int operation=helper.triggerEvent(session, TCPEventType.EXCEPTION, sessionPackages.get(session));
		if(operation==ServerOperation.CLOSE_CLIENT){
			this.closeSession(session);
		}
	}

	public void sessionCreated(IoSession session) throws Exception {
		try {
//			SocketSessionConfig config = (SocketSessionConfig) session.getConfig(); 
//			config.setIdleTime(IdleStatus.BOTH_IDLE,10);  
//			config.setReadBufferSize(2048);
//			config.setReadBufferSize(2048);
//			config.setSoLinger(0); 
//			config.setKeepAlive(true);
//			config.setReuseAddress(true);
		}
		catch(Exception ex){
			log.error("", ex);
		}
	}
	
	/**
	 * 有新连接时触发
	 */
	@Override
	public void sessionOpened(IoSession session) throws Exception {
		try {
			Date now=new Date();
			
			sessionPackages.put(session, new TcpShortPackageMeta());
			
			TcpShortPackageMeta meta=sessionPackages.get(session);
			meta.setCreateTime(now);
			
			BaseProtocolMeta protocolMeta=new BaseProtocolMeta();
			meta.setProtocolMeta(protocolMeta);
			protocolMeta.setConnectTime(now);
			
			String address=session.getRemoteAddress().toString();
			String clientIp=address.split(":")[0];
			int clientPort=Integer.parseInt(address.split(":")[1]);
			protocolMeta.setClientIp(clientIp);
			protocolMeta.setClientPort(clientPort);
			
			int operation=helper.triggerEvent(session, TCPEventType.NEW_CONNECTION, sessionPackages.get(session));
			if(operation==ServerOperation.CLOSE_CLIENT){
				this.closeSession(session);
			}
		
			log.info("接收来自客户端 : {} 的连接.",clientIp);
		} catch (Exception e) {
			log.error("MinaConnServerHandler sessionOpened {}", e);
		}

	}

	/**
	 * 连接被关闭时触发
	 */
	@Override
	public void sessionClosed(IoSession session) {
		try {
			helper.triggerEvent(session, TCPEventType.CLIENT_CLOSE_CONNECTION, sessionPackages.get(session));
			this.closeSession(session);
			
			log.info("session closed from {}", session.getRemoteAddress());
		} catch (Exception e) {
			sessionPackages.remove(session);
			log.error("MinaConnServerHandler sessionClosed{}", e);
		}
	}

	/**
	 * 收到来自客户端的消息
	 */
	public void messageReceived(IoSession session, Object message) throws Exception {
		IoBuffer buffer = null;
		try {
			log.debug(">>>>>>>>>>>>>>   messageReceived ThreadName {}  sessionPackages size {}",Thread.currentThread().getName(), sessionPackages.size());

			buffer = (IoBuffer) message;
			ByteBuffer bf = buffer.buf();
			byte[] bytes = new byte[bf.limit()];
			bf.get(bytes);
			
			if (!MathUtils.isAllZeroByArray(bytes)) {
				
				TcpShortPackageMeta meta = sessionPackages.get(session);
				if (null == meta) {
					meta = new TcpShortPackageMeta();
					sessionPackages.put(session, meta);
					log.info("new TcpPackage sessionId {}", session.getId());
				}
				
				processData(bytes, meta, session);
			} else {
				String ip = session.getRemoteAddress().toString();
				log.info("客戶端：{} 數組全為0", ip);
			}
		} catch (Exception e) {
			sessionPackages.remove(session);
			log.error("MinaConnServerHandler messageReceived {}", e);
		} finally {
			if (null != buffer) {
				buffer.free();
			}
		}

	}
	
	@Override
	public void sessionIdle(IoSession session, IdleStatus status) throws Exception {
		//this.closeSession(session);
	}
	
	public void processData(byte[] bytes, TcpShortPackageMeta meta, IoSession session) {
		int clientLength = meta.getClientlength();
		int index = meta.getIndex();
		int dataLength = meta.getDataLength();
		
		byte[] packBytes=new byte[0];
		try {
			
//			String str="";
//			str=str+"========================================\n";
//			for(int i=0;i<bytes.length;i++){
//				if(i%20==0){
//					str=str+"\n";
//				}
//				str=str+String.format(" %6d",(int)(char)bytes[i]);
//			}
//			str=str+"\n========================================"+bytes.length;
//			log.debug(str);
			
			if(meta.isInited()==false){
				meta=helper.initMeta(meta, session, bytes);
				dataLength = meta.getDataLength();
			}
			
			if(meta.isInited()){
				packBytes = meta.getPackageBytes();
				System.arraycopy(bytes, 0, packBytes, index, bytes.length);
				
				clientLength += bytes.length + 1;
				index = index + bytes.length;
				
				meta.setPackageBytes(packBytes);
				meta.setClientlength(clientLength);
				meta.setIndex(index);
				meta.setSpliceCount(meta.getSpliceCount()+1);
			}
			
			log.debug("meta.getSpliceCount()="+meta.getSpliceCount());
			log.debug("sessionId {} splice count {}",session.getId(),meta.getSpliceCount()); 
			
			if (dataLength > 0 && clientLength >= dataLength) {
				TcpShortPackage pack=new TcpShortPackage();
				pack.setData(meta.getPackageBytes());
				pack.setProtocolMeta(meta.getProtocolMeta());
				
				sessionPackages.remove(session);
				log.info("spellPackage  remove  sessionPackage size is {}  sessionId {} clientLength   {} dataLength  {}",sessionPackages.size(),session.getId()+" >"+clientLength+" >"+dataLength);
				
				if(helper.needResponse()){
					byte[] response=helper.processMessage(pack);
					IoBuffer buffer=IoBuffer.allocate(response.length);
					buffer.put(response);
					buffer.flip();
					session.write(buffer);
					
					this.closeSession(session);
				}
				else{
					int operation=helper.triggerMessage(pack);
					if(operation==ServerOperation.CLOSE_CLIENT){
						this.closeSession(session);
					}
				}
				
				//System.gc();
			}
		} catch (Exception e) {
			log.error("sessionId {}",session.getId());
			log.error("tempAllByte {} dataLength tmpBuffer.length  {} ",packBytes.length+"  "+bytes.length);
			log.error("MinaConnServerHandler spellPackage {}  ", e);
		}

	}
}
