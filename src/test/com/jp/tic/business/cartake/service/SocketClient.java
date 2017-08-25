package com.jp.tic.business.cartake.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

/**
 * 客户端Socket
 * 
 * @author Administrator
 * 
 */
public class SocketClient {

	/**
	 * 客户端Socket构造方法
	 */
	public SocketClient() {
		try {

			// 向本机的2121端口发出客户请求
			Socket socket = new Socket("localhost", 2121);

			System.out.println("Established a connection...");

			// 由系统标准输入设备构造BufferedReader对象
			BufferedReader sysin = new BufferedReader(new InputStreamReader(
					System.in));

			// 由Socket对象得到输出流,并构造PrintWriter对象
			PrintWriter out = new PrintWriter(socket.getOutputStream());

			// 由Socket对象得到输入流,并构造相应的BufferedReader对象
			BufferedReader in = new BufferedReader(new InputStreamReader(socket
					.getInputStream()));

			String line; // 保存一行内容

			// 从系统标准输入读入一字符串
			line = sysin.readLine();

			while (!line.equals("bye")) { // 若从标准输入读入的字符串为 "bye"则停止循环

				// 将从系统标准输入读入的字符串输出到Server
				out.println(line);

				// 刷新输出流,使Server马上收到该字符串
				out.flush();

				// 在系统标准输出上打印读入的字符串
				System.out.println("[Client]: " + line);

				// 从Server读入一字符串，并打印到标准输出上
				System.out.println("[Server]: " + in.readLine());

				// 从系统标准输入读入一字符串
				line = sysin.readLine();

			}

			out.close(); // 关闭Socket输出流
			in.close(); // 关闭Socket输入流
			socket.close(); // 关闭Socket
		} catch (Exception e) {
			System.out.println("Error. " + e);
		}
	}

	/**
	 * 主方法
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		new SocketClient();
	}

}
