package com.jp.tic.common.net.tcp;

import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.Date;

import org.apache.commons.io.IOUtils;

public class TCPShorClient {
	private String ip;
	private int port;
	
	public TCPShorClient(String ip,int port){
		this.ip=ip;
		this.port=port;
	}
	
	public boolean send(byte[] data){
		return send(null, null, data, null);
	}
	
	public boolean send(byte[] data, byte[] dataResponse){
		return send(null, null, data, dataResponse);
	}
	
	public boolean send(byte[] authorize, byte[] data, byte[] dataResponse){
		return send(null, data, dataResponse);
	}
	
	public boolean send(byte[] authorize, byte[] authResponse, byte[] data, byte[] dataResponse){
		try{
			Socket socket = new Socket();
			InetSocketAddress socketaddress = new InetSocketAddress(ip,port);
			socket.connect(socketaddress,5000);
			socket.setTcpNoDelay(true);
			socket.setTrafficClass(0x04|0x10);
			
			boolean passed=true;
			if(authorize!=null&&authorize.length>0){
				socket.getOutputStream().write(authorize);
				socket.getOutputStream().flush();
				
				if(authResponse!=null&&authResponse.length>0){
					byte[] response=IOUtils.toByteArray(socket.getInputStream());
					if(new String(authResponse).endsWith(new String(response))==false){
						passed=false;
					}
				}
			}
			
			if(passed){
				socket.getOutputStream().write(data);
				socket.getOutputStream().flush();
			}
			
			boolean dataSent=true;
			if(dataResponse!=null&&dataResponse.length>0){
				byte[] response=IOUtils.toByteArray(socket.getInputStream());
				if(new String(dataResponse).endsWith(new String(response))==false){
					dataSent=false;
				}
			}
			
			socket.shutdownOutput();
			socket.close();
			return dataSent;
		}
		catch(Exception ex){
			ex.printStackTrace();
			return false;
		}
	}
	
	public static void main(String[] args) {
		Date begin=new Date();
		TCPShorClient client=new TCPShorClient("127.0.0.1", 30000);
		client.send("a".getBytes());
		client.send("b".getBytes());
		client.send("c".getBytes());
		Date end=new Date();
		System.out.println(end.getTime()-begin.getTime());
	}
}
