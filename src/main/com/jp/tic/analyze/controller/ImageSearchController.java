package com.jp.tic.analyze.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.jp.tic.framework.controller.AbstractController;

@Controller
@RequestMapping("/imageSearch")
public class ImageSearchController extends AbstractController {


	/**
	 * 加载全图搜车查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/imageSearchPage")
	public String imageSearchPageLoad() {
		return "/analyze/image-search-condition";
	}
	
	/**
	 * 保存款项的图片到tomcat指定图片存储位置
	 * @return 查询结果
	 * @throws Exception 
	 */
	@RequestMapping("/saveBigPicture")
	@ResponseBody
	public void saveBigPictureInfo(Model model, MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartFile file = (MultipartFile) request.getFile("pictureWin");
		InputStream inStream = file.getInputStream();
		//生成时间和格式化时间
		SimpleDateFormat time=new SimpleDateFormat("yyyyMMddHHmmss");
		String dateStr =time.format(new Date()); 
		//File imageFile= this.createAndGetDownloadFolder(request.getSession());
		ByteArrayOutputStream outStream = new ByteArrayOutputStream(); 
		//创建一个Buffer字符串 
		byte[] buffer = new byte[1024]; 
		//每次读取的字符串长度，如果为-1，代表全部读取完毕 
		int len = 0; 
		//使用一个输入流从buffer里把数据读取出来 
		while( (len=inStream.read(buffer)) != -1 ){ 
			//用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度 
			outStream.write(buffer, 0, len); 
		} 
		//关闭输入流 
		inStream.close(); 
		//把outStream里的数据写入内存 

		//得到图片的二进制数据，以二进制封装得到数据，具有通用性 
		byte[] data = outStream.toByteArray(); 
		//获取tomcat的根目录webapp目录
		String classPath = this.getClass().getClassLoader().getResource("").getPath();
		classPath = classPath.split("/WEB-INF/classes")[0];

		//new一个文件对象用来保存图片，默认保存当前工程根目录 
		File imageFile = new File(classPath + "/image/download/" + dateStr + ".jpg"); 
		File parentFile = imageFile.getParentFile();
		if (!parentFile.exists()) {
			parentFile.mkdirs();
        }
		//创建输出流 
		FileOutputStream fileOutStream = new FileOutputStream(imageFile); 
		//写入数据 
		fileOutStream .write(data); 
		response.reset();
		response.setContentType("text/html;charset=UTF-8");  
		PrintWriter out = response.getWriter();
		
		BufferedImage bi = null;
		try {
			bi = ImageIO.read(imageFile);
		} catch (IOException e) {
			e.printStackTrace();
		}
		int width = bi.getWidth();
		int height = bi.getHeight();
		System.out.println("宽：像素-----" + width + "高：像素" +  height);
		String fanwenUrl = "http://"+request.getLocalAddr()+":"+request.getLocalPort() + request.getContextPath() + "/image/download/" +dateStr+".jpg," + width + "," + height;
		out.print(fanwenUrl);
		out.flush();
		out.close();
	}
}
