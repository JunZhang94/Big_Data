package com.jp.tic.common.net.tcp;

import java.net.Socket;

public interface ITCPClientProcesser {
	public String getProcesserName();
	public void setProcesserName(String processerName);
	
	public void setProtocol(ITCPProtocol protocol);
	public ITCPProtocol getProtocol();
	
	public void start();
	public void process(Socket client,String clientName);
	public void stop();
	
	public interface IUDPClientProcesserEventListiner{
		public void onAddClientProtocol(ITCPClientProcesser sender,String clientName);
		public void onRemoveClientProtocol(ITCPClientProcesser sender,String clientName);

		public void onAddRequestType(ITCPClientProcesser sender,String requestType);
		public void onRemoveRequestType(ITCPClientProcesser sender,String requestType);
	}
}
