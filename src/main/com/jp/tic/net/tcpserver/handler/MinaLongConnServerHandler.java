/**   
 * @项目：iMVS_DataComm
 * @文件名称: MinaLongConnServerHandler.java
 * @类路径: com.jp.tic.common.tcpserver.event
 * @描述: TODO
 * @作者：suym
 * @时间：2013-9-27 上午09:25:53
 */
package com.jp.tic.net.tcpserver.handler;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.util.Hashtable;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IoSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.common.util.MathUtils;
import com.jp.tic.net.tcpserver.IShortProtocolHelper;
import com.jp.tic.net.tcpserver.TcpShortPackageMeta;

public class MinaLongConnServerHandler extends IoHandlerAdapter {
	
	private IShortProtocolHelper helper;

	public IShortProtocolHelper getHelper() {
		return helper;
	}

	public void setHelper(IShortProtocolHelper helper) {
		this.helper = helper;
	}

	protected static Logger log = LoggerFactory.getLogger(MinaLongConnServerHandler.class);;

	Hashtable<IoSession, TcpShortPackageMeta> sessionPackages = new Hashtable<IoSession, TcpShortPackageMeta>();
	

	/**
	 * 当有异常发生时触发
	 */
	@Override
	public void exceptionCaught(IoSession session, Throwable cause) {
		log.error("MinaConnServerHandler exceptionCaught {}", cause.getMessage() + cause);
		session.close(true);
	}

	/**
	 * 有新连接时触发
	 */
	@Override
	public void sessionOpened(IoSession session) throws Exception {
		try {
			InetSocketAddress remoteAddress = (InetSocketAddress) session.getRemoteAddress();
			String clientIp = remoteAddress.getAddress().getHostAddress();
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
				log.info("session closed from {}", session.getRemoteAddress());
				sessionPackages.remove(session);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("MinaConnServerHandler sessionClosed{}", e);
		}
	}

	/**
	 * 收到来自客户端的消息
	 */

	public void messageReceived(IoSession session, Object message) throws Exception {
		IoBuffer buffer = null;
		try {
			log.info("messageReceived ThreadName {}  sessionPackages size {}",  Thread.currentThread().getName(),sessionPackages.size());
			buffer = (IoBuffer) message;
			ByteBuffer bf = buffer.buf();
			byte[] tmpBuffer = new byte[bf.limit()];
			bf.get(tmpBuffer);
			if (!MathUtils.isAllZeroByArray(tmpBuffer)) {
				TcpShortPackageMeta pack = sessionPackages.get(session);
				if (null == pack) {
					pack = new TcpShortPackageMeta();
					sessionPackages.put(session, pack);
					log.info("new TcpPackage sessionId {}", session.getId());
				}

				processData(tmpBuffer, pack, session);

			} else {
				String ip = session.getRemoteAddress().toString();
				log.info("客戶端：{} 數組全為0", ip);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("MinaConnServerHandler messageReceived {}", e);
		} finally {
			if (null != buffer) {
				buffer.free();
			}
		}

	}

	public void processData(byte[] dataPiece, TcpShortPackageMeta pack, IoSession session) {
//		int clientLength = pack.getClientlength();
//		int index = pack.getIndex();
//		int dataLength = pack.getDataLength();
		byte[] tempAllByte = null;
		try {
//			if (helper.isFristPackage(dataPiece)) {
//				dataPageProtocolEty = helper.initPacketEntity(dataPiece);
//				dataLength = dataPageProtocolEty.getDataLength();
//				int tempallLength=dataLength+
//				IVMProtocolConstants.DATACOMM_TCP_HEAD_LENGTH+
//				IVMProtocolConstants.DATACOMM_TCP_PACKAGETYPE_LENGTH+
//				IVMProtocolConstants.DATACOMM_TCP_DIGITAL_SIGNATURE.length()+
//				IVMProtocolConstants.DATACOMM_TCP_END_LENGTH;
//				pack.setTempAllByte(new byte[dataLength + tempallLength]);
//				log.info("first package {}",dataLength);
//			}
//			tempAllByte= pack.getTempAllByte();
////			if(tempAllByte.length<tmpBuffer.length){
////				
////			
////			}
//			System.arraycopy(dataPiece, 0, tempAllByte, index,
//							dataPiece.length);
//			clientLength += dataPiece.length + 1;
//			index = index + dataPiece.length;
//			//log.info("clientLength   {} dataLength  {}" , clientLength, dataLength);
//			if (clientLength >= dataLength && dataLength > 0) {
//
//				MessageBase msg = new MessageBase();
//				msg.setMessageType(MessageType.MESSAGE_RECEIVED);
//				msg.setDataPageProtocolEty(dataPageProtocolEty);
//				msg.setSession(session);
//				msg.setMessageContent(tempAllByte);
//				MessageManager.fireLongConnNewMessage(msg);
//				log.info("spellPackage  remove  sessionPackage size is {}  sessionId {} clientLength   {} dataLength  {}",sessionPackages.size(),session.getId()+" >"+clientLength+" >"+dataLength);
//				index = 0;
//				clientLength = 0;
//				sessionPackages.remove(session);
//			}
//			pack.setClientlength(clientLength);
//			pack.setDataLength(dataLength);
//			pack.setIndex(index);
//			pack.setTempAllByte(tempAllByte);
		} catch (Exception e) {
//			log.error("dataPageProtocolEty  {}","   "+dataPageProtocolEty.getEventType().getFlag()+"   ");
			log.error("sessionId {}",session.getId()+dataPiece.toString());
			log.error("tempAllByte {} dataLength tmpBuffer.length  {} ",tempAllByte.length+"  "+dataPiece.length);
			log.error("MinaConnServerHandler spellPackage {}  ", e);
		}

	}
}
