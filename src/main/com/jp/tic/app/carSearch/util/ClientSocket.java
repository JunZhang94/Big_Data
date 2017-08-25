package com.jp.tic.app.carSearch.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

public class ClientSocket {
	private String ip;

	private int port;

	private Socket socket = null;

	DataOutputStream out = null;

	DataInputStream getMessageStream = null;

	public ClientSocket(String ip, int port) {
		this.ip = ip;
		this.port = port;
	}

	/**
	 * 创建socket连接
	 * 
	 * @throws Exception
	 *             exception
	 */
	public void CreateConnection() throws Exception {
		try {
			socket = new Socket(ip, port);
		} catch (Exception e) {
			e.printStackTrace();
			if (socket != null)
				socket.close();
			throw e;
		} finally {
		}
	}

	public void sendMessage(String sendMessage) throws Exception {
		try {
			out = new DataOutputStream(socket.getOutputStream());
			if (sendMessage.equals("Windows")) {
				out.writeByte(0x1);
				out.flush();
				return;
			}
			if (sendMessage.equals("Unix")) {
				out.writeByte(0x2);
				out.flush();
				return;
			}
			if (sendMessage.equals("Linux")) {
				out.writeByte(0x3);
				out.flush();
			} else {
				String path = "/";
				out.writeUTF("POST " + path + " HTTP/1.1\r\n");
				out.writeUTF("Host: " + ip + "\r\n");
				out.writeUTF("Connection: Keep-Alive"+ "\r\n");
				out.writeUTF("Content-Type: application/json\r\n");
				out.writeUTF("Content-Length: " + sendMessage.length() + "\r\n");
				out.writeUTF("\r\n");
				out.writeUTF(sendMessage);
				out.flush();
				out.writeUTF("\r\n");
				out.flush();
			}
			if (socket != null)
				socket.close();
		} catch (Exception e) {
			e.printStackTrace();
			if (out != null)
				out.close();
			throw e;
		} finally {
		}
	}

	public DataInputStream getMessageStream() throws Exception {
		try {
			getMessageStream = new DataInputStream(new BufferedInputStream(
					socket.getInputStream()));
			return getMessageStream;
		} catch (Exception e) {
			e.printStackTrace();
			if (getMessageStream != null)
				getMessageStream.close();
			throw e;
		} finally {
		}
	}
	
	public String getMessageStreamTwo() throws Exception {
		String imgJson = "";
		try {
			InputStream input = socket.getInputStream();
			int count = input.available();
			byte[] bufferByte = new byte[2048];   
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			int l = -1;   
			int downloadSize = 0;  
			
			while ((l = input.read(bufferByte)) > -1) {   
			   downloadSize += l;   
			   out.write(bufferByte, 0, l);   
			   out.flush();   
			}  
			/*while ((l = input.read(bufferByte)) > -1) {   
			   downloadSize += l;   
			   out.write(bufferByte, 0, l);   
			   out.flush();   
			}  */ 
			byte[] rResult = out.toByteArray();
			imgJson = new String(rResult, "UTF-8");
			System.out.println(imgJson);
		} catch (Exception e) {
			e.printStackTrace();
			if (getMessageStream != null)
				getMessageStream.close();
			throw e;
		} finally {
		}
		return imgJson;
	}
	
	public String getMessageStreamThree(String flag) throws Exception {
		InputStream input = socket.getInputStream();
		BufferedReader br=new BufferedReader(new InputStreamReader(input, "utf-8"));
        //接收服务器的相应
        String reply=null;
        System.out.println(br.readLine());
        while(!((reply=br.readLine())==null)){
        	System.out.println("接收服务器的信息："+reply);
        	if (reply.indexOf(flag) > 0) {
        		break;
        	}
        }
        return reply;
	}
	
	public String getMessageStreamFour() throws Exception {
		
        return "";
	}

	public void shutDownConnection() {
		try {
			if (out != null)
				out.close();
			if (getMessageStream != null)
				getMessageStream.close();
			if (socket != null)
				socket.close();
		} catch (Exception e) {

		}
	}
	
	public String sendMessaeTwo(String sendMessage, String flag) throws Exception {
		BufferedReader in=new BufferedReader(new InputStreamReader(socket.getInputStream())); 
		PrintWriter out=new PrintWriter(socket.getOutputStream()); 
		String path = "/";
		out.print("POST " + path + " HTTP/1.1\r\n");
		out.print("Host: " + ip + "\r\n");
		out.print("Connection: Keep-Alive"+ "\r\n");
		out.print("Content-Type: application/json\r\n");
		out.print("Content-Length: " + sendMessage.length() + "\r\n\r\n");
		out.print(sendMessage);
		out.print("\r\n");
		out.flush();
		String jsonStr = getMessageStreamThree(flag);
		try {
			if (out != null)
				out.close();
			if (socket != null)
				socket.close();
		} catch (Exception e) {

		}
		return jsonStr;
	}

	
	public void sendMessaeThree(String sendMessage) throws Exception {
		String path = "/";
        String data = sendMessage;
        // String data = "name=zhigang_jia";
        socket = new Socket();
        SocketAddress dest = new InetSocketAddress(ip, port);
        socket.connect(dest);
        OutputStreamWriter streamWriter = new OutputStreamWriter(socket.getOutputStream(), "utf-8");
        BufferedWriter bufferedWriter = new BufferedWriter(streamWriter);

        bufferedWriter.write("POST " + path + " HTTP/1.1\r\n");
        bufferedWriter.write("Host: " + ip + "\r\n");
        bufferedWriter.write("Connection: Keep-Alive"+ "\r\n");
        bufferedWriter.write("Content-Type: application/json\r\n");
        bufferedWriter.write("Content-Length: " + data.length() + "\r\n");
        bufferedWriter.write("\r\n");
        bufferedWriter.write(data);
        bufferedWriter.flush();
        /*bufferedWriter.write("\r\n");
        bufferedWriter.flush();*/

        BufferedInputStream streamReader = new BufferedInputStream(socket.getInputStream());
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(streamReader, "utf-8"));
        String result = "";
        String line = null ;
        while((line = bufferedReader.readLine())!= null)
        {
            result += line  ;
            System.out.println(line);
        }
        bufferedReader.close();
        bufferedWriter.close();
        socket.close();
        System.out.println("result:" + result);
	}
}
