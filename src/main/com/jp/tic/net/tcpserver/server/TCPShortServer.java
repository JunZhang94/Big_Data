package com.jp.tic.net.tcpserver.server;

import java.net.InetSocketAddress;
import java.util.concurrent.ExecutorService;

import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.executor.ExecutorFilter;
import org.apache.mina.filter.executor.OrderedThreadPoolExecutor;
import org.apache.mina.filter.keepalive.KeepAliveFilter;
import org.apache.mina.filter.keepalive.KeepAliveMessageFactory;
import org.apache.mina.filter.keepalive.KeepAliveRequestTimeoutHandler;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.net.tcpserver.IShortProtocolHelper;
import com.jp.tic.net.tcpserver.handler.MinaShortConnServerHandler;


public class TCPShortServer {

	protected static final Logger log = LoggerFactory.getLogger(TCPShortServer.class);;
	
	private static final int HEART_BEAT_RATE = 15;
	
	private int port;
	private IShortProtocolHelper helper;
	
	public TCPShortServer(int port,IShortProtocolHelper helper){
		this.port=port;
		this.helper=helper;
	}
	
	public int startServer() throws Exception {
		try {
			NioSocketAcceptor acceptor = new NioSocketAcceptor();
			
			//acceptor.setReuseAddress(true);
			acceptor.setHandler(new MinaShortConnServerHandler(helper));
			
//			int processCount=Runtime.getRuntime().availableProcessors();
//			ExecutorService filterExecutor = new OrderedThreadPoolExecutor(processCount);
//			acceptor.getFilterChain().addLast("threadPool", new ExecutorFilter(filterExecutor));

//			KeepAliveMessageFactory heartBeatFactory = new KeepAliveMessageFactoryImpl();
//	        KeepAliveRequestTimeoutHandler heartBeatHandler = new KeepAliveRequestTimeoutHandlerImpl();
//	        KeepAliveFilter heartBeat = new KeepAliveFilter(heartBeatFactory, IdleStatus.BOTH_IDLE, heartBeatHandler);
//	        heartBeat.setForwardEvent(true);
//	        heartBeat.setRequestInterval(HEART_BEAT_RATE);
//	        acceptor.getFilterChain().addLast("heartbeat", heartBeat);
	        
			InetSocketAddress address = new InetSocketAddress(port);
			acceptor.bind(address);

		} catch (Exception e) {
			e.printStackTrace();
			log.error("startServer error",e);
		}
		log.info("TCP服务启动，端口：{}", port);
		return 0;
	}
	
	private static class KeepAliveMessageFactoryImpl implements KeepAliveMessageFactory {
	    private static final String HEART_BEAT_REQUEST = "HEART_BEAT_REQUEST";
	    private static final String HEART_BEAT_RESPONSE = "HEART_BEAT_RESPONSE";
		
		@Override
		public Object getRequest(IoSession session) {
			return HEART_BEAT_REQUEST;
		}

		@Override
		public Object getResponse(IoSession session, Object request) {
			return request;
		}

		@Override
		public boolean isRequest(IoSession session, Object message) {
			if (message.equals(HEART_BEAT_RESPONSE)) {
				return true;
			}
			return false;
		}

		@Override
		public boolean isResponse(IoSession session, Object message) {
			if (message.equals(HEART_BEAT_REQUEST)) {
				return true;
			}
			return false;
		}

	}

	private static class KeepAliveRequestTimeoutHandlerImpl implements KeepAliveRequestTimeoutHandler {

		@Override
		public void keepAliveRequestTimedOut(KeepAliveFilter filter, IoSession session) throws Exception {
			log.debug("heart beat timeout"+session.getId());
			session.close(true);
		}

	}
}
 
