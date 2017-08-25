package com.jp.tic.app.carSearch.util;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class ImageUtils {
	private ClientSocket cs = null;
    private String ip = "";// 设置成服务器IP
    private int port = 1111;
    private String sendMessage = "";
    
    public ImageUtils() {
	}

	public ImageUtils(String ip, int port, String sendMessage) {
		this.ip = ip;
		this.port = port;
		this.sendMessage = sendMessage;
		createConnection();
		/*try {
			if (createConnection()) {
				sendMessage();
				getMessage();
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}*/
	}

	public boolean createConnection() {
        cs = new ClientSocket(ip, port);
        try {
            cs.CreateConnection();
            System.out.print("连接服务器成功!" + "\n");
            return true;
        } catch (Exception e) {
            System.out.print("连接服务器失败!" + "\n");
            return false;
        }

   }

	public String sendMessage(String flag) {
		String jsonStr = "";
        if (cs == null)
            return "";
        try {
            jsonStr = cs.sendMessaeTwo(sendMessage, flag);
        } catch (Exception e) {
            System.out.print("发送消息失败!" + "\n");
        }
        return jsonStr;
    }

	public void getMessage() {
		if (cs == null)
			return;
		DataInputStream inputStream = null;
		try {
			inputStream = cs.getMessageStream();
		} catch (Exception e) {
			System.out.print("接收消息错误\n");
			return;
		}
		try {
			
			
			// 本地保存路径，文件名会自动从服务器端继承而来。
			String savePath = "D:\\update\\";
			int bufferSize = 8192;
			byte[] buf = new byte[bufferSize];
			int passedlen = 0;
			long len = 0;

			savePath += inputStream.readUTF();
			DataOutputStream fileOut = new DataOutputStream(
					new BufferedOutputStream(new BufferedOutputStream(
							new FileOutputStream(savePath))));
			len = inputStream.readLong();

			System.out.println("文件的长度为:" + len + "\n");
			System.out.println("开始接收文件!" + "\n");

			while (true) {
				int read = 0;
				if (inputStream != null) {
					read = inputStream.read(buf);
				}
				passedlen += read;
				if (read == -1) {
					break;
				}
				// 下面进度条本为图形界面的prograssBar做的，这里如果是打文件，可能会重复打印出一些相同的百分比
				System.out.println("文件接收了" + (passedlen * 100 / len) + "%\n");
				fileOut.write(buf, 0, read);
			}
			System.out.println("接收完成，文件存为" + savePath + "\n");

			fileOut.close();
		} catch (Exception e) {
			System.out.println("接收消息错误" + "\n");
			return;
		}
	}
	
	public String getMessageTwo() {
		createConnection();
		if (cs == null)
			return null;
		String imgJson = "";
		try {
			imgJson = cs.getMessageStreamTwo();
		} catch (Exception e) {
			System.out.print("接收消息错误\n");
			return null;
		}
		return imgJson;
	}
	
	/**
	 * 将图片进行Base64编码处理
	 * @return 图片编码结果
	 */
	public String imageToBaseEncoder(String carImg) {
		// 待处理的图片
		String imgFile = carImg;
		InputStream in = null;
		byte[] data = null;
		// 读取图片字节数组
		try {
			in = new FileInputStream(imgFile);
			data = new byte[in.available()];
			in.read(data);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 对字节数组Base64编码
		BASE64Encoder encoder = new BASE64Encoder();
		// 返回Base64编码过的字节数组字符串
		return encoder.encode(data);
	}

	/**
	 * 客户端
	 * @throws Exception
	 */
	public void sourceImageToSever() throws Exception {
		Socket server = new Socket("172.31.108.15",5678); 
		BufferedReader in = new BufferedReader(new InputStreamReader(server.getInputStream())); 
		PrintWriter out = new PrintWriter(server.getOutputStream()); 
		String imgFile = this.imageToBaseEncoder("");
		BufferedReader wt= new BufferedReader(new InputStreamReader(new FileInputStream(imgFile))); 
		while(true){ 
			String str = wt.readLine(); 
			out.println(str); 
			out.flush(); 
			if(str.equals("end")){ 
				break; 
			} 
			System.out.println(in.readLine()); 
		} 
		server.close(); 
	}
	
	/**
	 * 对Base64编码处理的图片进行解码返回图片
	 * @param imgStr Base64编码图片
	 * @return 处理结果
	 */
	public boolean GenerateImage(String imgStr) {
		// 对字节数组字符串进行Base64解码并生成图片
		if (imgStr == null) // 图像数据为空
			return false;
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			// Base64解码
			byte[] b = decoder.decodeBuffer(imgStr);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {// 调整异常数据
					b[i] += 256;
				}
			}
			// 生成jpeg图片
			String imgFilePath = "d:\\222.jpg";// 新生成的图片
			OutputStream out = new FileOutputStream(imgFilePath);
			out.write(b);
			out.flush();
			out.close();
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
