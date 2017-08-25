package com.jp.tic.common.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.jp.tic.common.enums.UploadState;
import com.jp.tic.common.util.UploadFileUtils;
import com.jp.tic.framework.controller.AbstractController;

/**
 * <b>function:</b> 文件上传、下载控制器、图片预览
 * @author hoojo
 * @createDate 2012-10-22 下午01:14:34
 * @file ResourceController.java
 * @package com.jp.tic.common.controller
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Controller
public class ResourceController extends AbstractController {

	@Value("#{systemConfig['upload.path']}")
	private String uploadPath;
	
	@RequestMapping("/upload")
	public void upload(@RequestParam("file") MultipartFile file, HttpServletResponse response, HttpServletRequest request) throws IOException {
		String message = "";
		String path = request.getSession().getServletContext().getRealPath(uploadPath);
		path = UploadFileUtils.getDoPath(path);
		try {
			String fileName = UploadFileUtils.getRandomName(file.getOriginalFilename());
			UploadState state = UploadFileUtils.upload4Stream(fileName, path, file.getInputStream());
			
			StringBuilder builder = new StringBuilder();
			builder.append("{success: ")
				.append(state.getFlag())
				.append(", message: '")
				.append(state.getState())
				.append("', fileName:'")
				.append(fileName)
				.append("', id:'")
				.append(fileName)
				.append("', path:'")
				.append(path + fileName)
			.append("'}");
			message = builder.toString();
		} catch (Exception e) {
			error("文件上传出现错误： {}", e);
			message = "{success: 1, message: '" + e.getMessage() + "', path: 'default.jpg'}";
		} 
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(message);
	}
	
	/**
	 * <b>function:</b> 图片预览
	 * @author hoojo
	 * @createDate 2012-12-4 下午04:05:41
	 * @param fileName 文件路径
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/image/view")
	public void imageViews(String fileName, HttpServletResponse response, HttpServletRequest request) throws Exception {
		String path = request.getSession().getServletContext().getRealPath(uploadPath);
		path = UploadFileUtils.getDoPath(path);
		File resFile = new File(path + fileName);
		if (resFile != null) {
			response.reset();
			response.setContentType("image/jpeg");
			// 设置页面不缓存
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);
			try {
				BufferedImage image = ImageIO.read(resFile);  
				ImageIO.write(image, "JPEG", response.getOutputStream());
			} catch (Exception e) {
				error(e);
			}
		}
	}
	
	/**
	 * <b>function:</b> 资源下载
	 * @author hoojo
	 * @createDate 2012-12-12 下午03:23:24
	 * @param fileName 文件名称路径
	 * @param response
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping("/download")
	public void download(String fileName, HttpServletResponse response, HttpServletRequest request) throws Exception {
		response.setContentType("text/x-msdownload");
		response.addHeader("Content-Disposition", "attachment; filename=" + fileName);
		String path = request.getSession().getServletContext().getRealPath(uploadPath);
		path = UploadFileUtils.getDoPath(path);
		File resFile = new File(path + fileName);
		
		OutputStream os = response.getOutputStream();
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(resFile);
			byte[] buff = new byte[1024];
			int len = 0;
			while ((len = fis.read(buff)) > 0) {
				os.write(buff, 0, len);
			}
		} catch (Exception e) {
			error(e);
			os.write(e.getLocalizedMessage().getBytes("utf-8"));
		} finally {
			if (fis != null) {
				fis.close();
			}
			os.flush();
			os.close();
		}
	}
	
	/**
	 * <b>function:</b> 资源下载预览
	 * @author hoojo
	 * @createDate 2012-12-12 下午03:23:36
	 * @param fileName 文件名称路径
	 * @param response
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping("/download/view")
	public void downloadView(String fileName, HttpServletResponse response, HttpServletRequest request) throws Exception {
		String path = request.getSession().getServletContext().getRealPath(uploadPath);
		path = UploadFileUtils.getDoPath(path);
		File resFile = new File(path + fileName);

		OutputStream os = response.getOutputStream();
		
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(resFile);
			byte[] buff = new byte[1024];
			int len = 0;
			while ((len = fis.read(buff)) > 0) {
				os.write(buff, 0, len);
			}
		} catch (Exception e) {
			error(e);
			os.write(e.getLocalizedMessage().getBytes("utf-8"));
		} finally {
			if (fis != null) {
				fis.close();
			}
			os.flush();
			os.close();
		}
	}
}
