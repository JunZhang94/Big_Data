package com.jp.tic.system.main.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/testData")
public class TestController {

	// 读取的方法
	public byte[] readStream(InputStream inStream) throws Exception {
		ByteArrayOutputStream outstream = new ByteArrayOutputStream();
		byte[] buffer = new byte[2048]; // 用数据装
		int len = -1;
		while ((len = inStream.read(buffer)) != -1) {
			outstream.write(buffer, 0, len);
		}
		outstream.close();
		inStream.close();
		// 关闭流一定要记得。
		return outstream.toByteArray();
	}
	
	@RequestMapping("/downLoadImage")
	@ResponseBody
	public Object downLoadImageInfo() throws Exception {
		// 要下载的图片的地址，
		String urlPath = "http://localhost:8080/a1/4.jpg";
		URL url = new URL(urlPath);// 获取到路径
		// http协议连接对象
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");// 这里是不能乱写的，详看API方法
		conn.setConnectTimeout(6 * 1000);
		// 别超过10秒。
		System.out.println(conn.getResponseCode());
		if (conn.getResponseCode() == 200) {
			InputStream inputStream = conn.getInputStream();
			byte[] data = readStream(inputStream);
			File file = new File("smart.jpg");// 给图片起名子
			FileOutputStream outStream = new FileOutputStream("D:/lsgpicture/1111.jpg");// 写出对象
			outStream.write(data);// 写入
			outStream.close(); // 关闭流
		}
		return "success";
	}
	
	public static void downloadFile(URL theURL, String filePath)
			throws IOException {
		File dirFile = new File(filePath);
		if (!dirFile.exists()) {// 文件路径不存在时，自动创建目录
			dirFile.mkdir();
		}
		// 从服务器上获取图片并保存
		URLConnection connection = theURL.openConnection();
		InputStream in = connection.getInputStream();
		FileOutputStream os = new FileOutputStream(filePath + "\\123.png");
		byte[] buffer = new byte[4 * 1024];
		int read;
		while ((read = in.read(buffer)) > 0) {
			os.write(buffer, 0, read);
		}
		os.close();
		in.close();
	}

	@RequestMapping("/downLoadUrlImage")
	@ResponseBody
	public Object downLoadUrlImageInfo() throws Exception {
		// 要下载的图片的地址，
		String urlPath = "http://localhost:8080/a1/4.jpg";
        String filePath = "D:\\lsgpicture";   
        URL url = new URL(urlPath);   
          try {   
              downloadFile(url,filePath);   
           } catch (IOException e) {   
            e.printStackTrace();   
         }   
		return "success";
	}
}
