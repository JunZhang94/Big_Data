package com.jp.tic.common.net.tcp;

import java.util.Collection;
import java.util.List;


public interface ITCPProtocol {
	public String getProtocolName();
	
	public byte[] divide2Messages(byte[] data, List<byte[]>message);
	
	public boolean testMessageData(byte[] data);
	public String getMessageType(byte[] data);
	
	public ITCPMessageProcesser<?,?> getMessageProcesser(String messageType);
	public Collection<ITCPMessageProcesser<?,?>> getAllMessageProcesser();
	
	public static interface ITCPMessageProcesser <Request,Response> {
		public String getMessageType();
		public ITCPMessageHelper<Request> getRequestHelper();
		public ITCPMessageHelper<Response> getResponseHelper();
		
		public void setRequestHelper(ITCPMessageHelper<Request> requestHelper);
		public void setResponseHelper(ITCPMessageHelper<Response> responseHelper);
		
		public Response process(Request request);
		
		public void start();
		public void stop();
	}
	
	public static interface ITCPMessageHelper <T> {
		
		//request to bytes
		public byte[] getBytes(T message);
		
		//bytes to request
		public T getMessage(byte[] data);
	}
}
