package com.jp.tic.net.tcpserver;

import org.apache.mina.core.session.IoSession;

public interface IShortProtocolHelper {
	
	public TcpShortPackageMeta initMeta(TcpShortPackageMeta meta, IoSession session, byte[] data);
	
	public String getProtocolName();
	
	public int getProtocolPort();
	
	public int triggerMessage(TcpShortPackage message);
	
	public boolean needResponse();
	
	public byte[] processMessage(TcpShortPackage message);
	
	public void addMessageListener(MessageListener listener);
	
	public int triggerEvent(IoSession session,int eventType,TcpShortPackageMeta pack);
	
	public void addEventListener(EventListener listener);
	
	public boolean isTimeOut(IoSession session, TcpShortPackageMeta meta);
	
	public static class TCPEventType{
		public static int NEW_CONNECTION=1;
		public static int CLIENT_CLOSE_CONNECTION=2;
		public static int EXCEPTION=99;
	}
	
	public static class ServerOperation{
		public static int NOTHING=0;
		public static int CLOSE_CLIENT=1;
	}
	
	public static interface MessageListener{
		public void processMessage(TcpShortPackage message);
	}
	
	public static interface EventListener{
		public void processEvent(IoSession session,int eventType,TcpShortPackageMeta pack);
	}
}
