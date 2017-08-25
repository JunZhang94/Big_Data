package com.jp.tic.business.cartake.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class ServerThread extends Thread {

	private static int number = 0; // 保存本进程的客户计数

	Socket socket = null; // 保存与本线程相关的Socket对象

	public ServerThread(Socket socket, int clientnum) {

		this.socket = socket;
		number = clientnum;
		System.out.println("当前在线的用户数: " + number);
	}

	public void run() {
		try {

			// 由Socket对象得到输入流,并构造相应的BufferedReader对象
			BufferedReader in = new BufferedReader(new InputStreamReader(socket
					.getInputStream()));

			// 由Socket对象得到输出流,并构造PrintWriter对象
			PrintWriter out = new PrintWriter(socket.getOutputStream());

			// 由系统标准输入设备构造BufferedReader对象
			BufferedReader sysin = new BufferedReader(new InputStreamReader(
					System.in));

			// 在标准输出上打印从客户端读入的字符串
			System.out.println("[Client " + number + "]: " + in.readLine());

			String line; // 保存一行内容

			// 从标准输入读入一字符串
			line = sysin.readLine();

			while (!line.equals("bye")) { // 如果该字符串为 "bye",则停止循环

				// 向客户端输出该字符串
				out.println(line);

				// 刷新输出流,使Client马上收到该字符串
				out.flush();

				// 在系统标准输出上打印读入的字符串
				System.out.println("[Server]: " + line);

				// 从Client读入一字符串,并打印到标准输出上
				System.out.println("[Client " + number + "]: " + in.readLine());

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

}
