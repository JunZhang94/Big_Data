package com.jp.tic.common.net.tcp;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;

import org.apache.commons.io.IOUtils;

public class TCPLongClient {

	private String ip;
	private int port;
	private byte[] authorize;
	private byte[] authResponse;
	
	private Socket socket;
	
	public TCPLongClient(String ip,int port){
		this.ip=ip;
		this.port=port;
	}
	
	public TCPLongClient(String ip,int port,byte[] authorize, byte[] authResponse){
		this.ip=ip;
		this.port=port;
		this.authorize=authorize;
		this.authResponse=authResponse;
	}
	
	private boolean isConnected(){
		if(socket==null){
			return false;
		}
		
		try {
			socket.sendUrgentData(0xFF);
			return true;
		} catch (IOException e) {
			return false;
		}
	}
	
	private Socket getActiveSocket(){
		if(isConnected()==false){
			socket=new Socket();
			InetSocketAddress socketaddress = new InetSocketAddress(ip,port);
			try {
				socket.connect(socketaddress,5000);
				socket.setTcpNoDelay(true);
				
				boolean passed=true;
				if(authorize!=null&&authorize.length>0){
					socket.getOutputStream().write(authorize);
					socket.getOutputStream().flush();
					socket.setTrafficClass(0x04|0x10);
					
					if(authResponse!=null&&authResponse.length>0){
						byte[] response=IOUtils.toByteArray(socket.getInputStream());
						if(new String(authResponse).endsWith(new String(response))==false){
							passed=false;
						}
					}
				}
				if(passed){
					return socket;
				}
				else{
					return getActiveSocket();
				}
			} catch (IOException e) {
				e.printStackTrace();
				return getActiveSocket();
			}
		}
		return socket;
	}
	
	public byte[] send(byte[] data){
		try{
			Socket tempSocket=getActiveSocket();
			OutputStream outputStream = tempSocket.getOutputStream();
			
			outputStream.write(data);
			outputStream.flush();
			
			if(tempSocket.getInputStream().available()>0){
				return IOUtils.toByteArray(tempSocket.getInputStream());
			}
			return null;
		}
		catch(Exception ex){
			ex.printStackTrace();
			return null;
		}
	}
	
	public static void main(String[] args) {
		TCPLongClient client=new TCPLongClient("127.0.0.1", 30000);
		client.send("a".getBytes());
		client.send("b".getBytes());
		client.send("c".getBytes());
	}
}
