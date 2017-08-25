package com.jp.tic.common.net.tcp;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;

import com.jp.tic.common.net.tcp.ITCPProtocol.ITCPMessageProcesser;

public class BaseTCPClientProcesser implements ITCPClientProcesser {
	private String processerName="Base TCP Client Processer";
	
	private ITCPProtocol protocol;
	
	protected Map<String,Thread> threads=new Hashtable<String,Thread>();
	
	public String getClientName(Socket client) {
		return client.getRemoteSocketAddress().toString()+"-"+(client.getPort()%10);
	}

	public String getProcesserName() {
		return processerName;
	}
	
	public void setProcesserName(String processerName) {
		this.processerName=processerName;
	}
	
	@Override
	public ITCPProtocol getProtocol() {
		return protocol;
	}

	@Override
	public void setProtocol(ITCPProtocol protocol) {
		this.protocol=protocol;
	}
	
	public void process(Socket client, String clientName) {
		String name=clientName+"-"+client.getPort();
		ClientProcessThread thread=new ClientProcessThread(this,client,name);
		threads.put(name, thread);
		thread.start();
	}

	public void start() {
		for(ITCPMessageProcesser<?,?> messageProcesser:protocol.getAllMessageProcesser()){
			messageProcesser.start();
		}
	}

	public void stop() {
		for(ITCPMessageProcesser<?,?> messageProcesser:protocol.getAllMessageProcesser()){
			messageProcesser.stop();
		}
	}

	@SuppressWarnings("unchecked")
	private byte[] process(byte[] message) {
		if(this.protocol.testMessageData(message)){
			String messageType=this.protocol.getMessageType(message);
			ITCPMessageProcesser messageProcesser=this.protocol.getMessageProcesser(messageType);
			if(messageProcesser!=null){
				Object request = messageProcesser.getRequestHelper().getMessage(message);
				Object response = messageProcesser.process(request);
				if(messageProcesser.getResponseHelper()!=null){
					return messageProcesser.getResponseHelper().getBytes(response);
				}
				else{
					return null;
				}
			}
			else{
				//message error
			}
		}
		else{
			//protocol error
		}
		
		return null;
	}
	
	private static class ClientProcessThread extends Thread{
		private String id;
		private BaseTCPClientProcesser clientProcesser;
		private Socket client;
		private int BUFSIZE=1024*1024*1;
		
		public ClientProcessThread(BaseTCPClientProcesser clientProcesser, Socket client, String id){
			this.clientProcesser=clientProcesser;
			this.client=client;
			this.id=id;
		}
		
		private byte[] nextPacketBytes=new byte[0];
		
		private byte[] convert2Bytes(InputStream in,int maxLength){
			byte[] buffer=new byte[maxLength]; 
			
			int recivedLength=0;
			try{
				int tempRecivedLength=-1;
				byte[] temp=new byte[1024*20];
				while((tempRecivedLength=in.read(temp))>-1){
					  if(tempRecivedLength>0){
						  System.arraycopy(temp, 0, buffer, recivedLength, tempRecivedLength);
						  
						  recivedLength=recivedLength+tempRecivedLength;
					  }
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
			
			byte[] packet=new byte[recivedLength+nextPacketBytes.length];
			System.arraycopy(nextPacketBytes, 0, packet, 0, nextPacketBytes.length);
			System.arraycopy(buffer, 0, packet, nextPacketBytes.length, recivedLength);
			
			return packet;
		}
		
		public void run(){
	        while(client.isClosed()==false){
				try {
					InputStream in = client.getInputStream();
					
					byte[] packet=null;
					
					try{
						//packet=IOUtils.toByteArray(in);
						packet=this.convert2Bytes(in,BUFSIZE);
						System.out.println("packet recived length="+packet.length);
					}
					catch(Exception ex){
						ex.printStackTrace();
					}
					
					List<byte[]> messages=new ArrayList<byte[]>();
					nextPacketBytes=clientProcesser.getProtocol().divide2Messages(packet, messages);
					for(byte[] message:messages){
						byte[] response=clientProcesser.process(message);
						
						try{
							
							OutputStream out = client.getOutputStream();
							if(response!=null&&response.length>0) {
								out.write(response, 0, response.length);
							}
							else{
								//no response
							}
						}
						catch(Exception ex){
							ex.printStackTrace();
						}
					}
				} catch (IOException e) {
					e.printStackTrace();
				}  
				
				try{
					client.close();
				}
				catch(Exception ex){
					ex.printStackTrace();
				}
	        }
	        
	        try{
				client.close();
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
			
			clientProcesser.threads.remove(id);
		}
	}
}
