package com.jp.tic.analyze.util;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.support.ServletContextResource;

import sun.misc.BASE64Encoder;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.utils.lang.StringUtil;

/** 
 * HttpWebserviceUtil.java Create on 2016-10-26 上午09:40:20      
 * Copyright (c) 2016-10-26 by jinpeng         
 * @author lsg     
 * @version 1.0 
 */
public class HttpWebserviceUtil {
	
	protected static final Logger loger = LoggerFactory
	.getLogger(HttpWebserviceUtil.class);
	
	static BASE64Encoder encoder = new sun.misc.BASE64Encoder();   
	
	public static String rootPath = "";

	public static String loadCarOwnerPic(String imageStr) {
		if (!StringUtil.checkStr(rootPath)) {
			rootPath = new File(HttpWebserviceUtil.class.getResource("/").getPath()).getParentFile().getParentFile().getAbsolutePath();
		}
		String xmlBody = readJsonFile(new File(rootPath + "/resources/pictureJson.txt"));
		String condition = httpImageToBaseEncoder(imageStr);
		String xmlStr = "";
		String jsonResult = "";
		if (StringUtil.checkStr(condition)) {
			xmlStr = xmlBody.replaceAll("imagesBytes", condition);
			//loger.info("json字符串：" + xmlStr);
			byte[] xmlData = xmlStr.getBytes();   
			Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
			String urlStr = MapGetUtils.getString(config, "huafu.picture.url");
			InputStream input = null;   
			java.io.ByteArrayOutputStream out = null;   
			try{   
				//获得到位置服务的链接   
				URL url = new URL(urlStr);   
				HttpURLConnection urlCon = (HttpURLConnection) url.openConnection();   
				//urlCon.connect();
				urlCon.setDoOutput(true);   
				urlCon.setDoInput(true);   
				urlCon.setRequestMethod("POST");
				urlCon.setUseCaches(false);   
				urlCon.setConnectTimeout(5000);
				//将xml数据发送到位置服务   
				//urlCon.setRequestProperty("Content-Type", "text/plain; charset=UTF-8");   
				urlCon.setRequestProperty("Content-Type", "text/plain");  
				urlCon.setRequestProperty("Accept-Charset", "utf-8");
				urlCon.setRequestProperty("Content-length",String.valueOf(xmlData.length));   
				urlCon.connect();
				DataOutputStream printout = new DataOutputStream(urlCon.getOutputStream());   
				printout.write(xmlData);   
				printout.flush();   
				printout.close();   
				input = urlCon.getInputStream();   
				byte[] rResult;   
				out = new java.io.ByteArrayOutputStream();   
				byte[] bufferByte = new byte[1024];   
				int l = -1;   
				int downloadSize = 0;   
				while ((l = input.read(bufferByte)) > -1) {   
				   downloadSize += l;   
				   out.write(bufferByte, 0, l);   
				   out.flush();   
				}   
				rResult = out.toByteArray();   
				jsonResult = new String(rResult,"utf-8");
				//System.out.println("===========" + jsonResult);
				urlCon.disconnect();
			}   
			catch(Exception e){   
				System.out.println("调用webApi失败");
				e.printStackTrace();   
			}   
			finally {   
				try {   
				     out.close();   
				     input.close();   
				}   
				catch (Exception ex) {   
					ex.printStackTrace();
				}   
			}  
		}
		return jsonResult;
	}
	
	/**
	 * 编码
	 * @param feature
	 * @return
	 */
	public static byte[] initFeatureBytes(String jsonResult) {
		String feature = "";
		if (StringUtil.checkStr(jsonResult)) {
			//String jsonStr = HttpWebserviceUtil.readJsonFile(new File("C:/Users/lsg/Desktop/tempPic/resultJson.txt"));
	    	//System.out.println(jsonStr);
	    	JsonParser parser = new JsonParser();
			JsonElement jsonElement = parser.parse(jsonResult);
			if(jsonResult.contains("Similar")){
				JsonElement similarJsonObject = jsonElement.getAsJsonObject().get("ImageResults").getAsJsonArray().get(0).getAsJsonObject().get("Vehicles").getAsJsonArray().get(0).getAsJsonObject().get("Recognize").getAsJsonObject().get("Similar");
				if (similarJsonObject != null) {
					feature = similarJsonObject.getAsJsonObject().get("Feature").getAsString();
				}
			}
		}
		byte[] datas = null;
		if (StringUtil.checkStr(feature)) {
			datas = base64Decode(feature);
		}
		return datas;
	}
	
	/**
	 * 返回过车数据图片特征字节数组
	 * @param imageStr 图片路径
	 * @return
	 */
	public static byte[] loadPictureFeature(String imageStr) {
		String jsonStr = loadCarOwnerPic(imageStr);
		loger.info("返回xml:" + jsonStr);
		//String jsonStr = HttpWebserviceUtil.readJsonFile(new File("C:/Users/lsg/Desktop/tempPic/resultJson.txt"));
		JsonParser parser = new JsonParser();
		JsonElement jsonElement = parser.parse(jsonStr);
		JsonElement similarJsonObject = jsonElement.getAsJsonObject().get("ImageResults").getAsJsonArray().get(0).getAsJsonObject().get("Vehicles").getAsJsonArray().get(0).getAsJsonObject().get("Recognize").getAsJsonObject().get("Similar");
		String feature = "";
		if (similarJsonObject != null) {
			feature = similarJsonObject.getAsJsonObject().get("Feature").getAsString();
		}
		byte[] datas = base64Decode(feature);
		return datas;
	}
	
	/**
	 * 测试
	 * @return
	 */
	public static Map<String, String> loadPictureInfo(String jsonResult) {
		Map<String, String> dataMap = new HashMap<String, String>();
		//String jsonStr = HttpWebserviceUtil.readJsonFile(new File("C:/Users/lsg/Desktop/tempPic/resultJson.txt"));
    	//System.out.println(jsonResult);
		if(jsonResult !=null){
	    	JsonParser parser = new JsonParser();
			JsonElement jsonElement = parser.parse(jsonResult);
			JsonObject vehicles = jsonElement.getAsJsonObject().get("ImageResults").getAsJsonArray().get(0).getAsJsonObject().get("Vehicles").getAsJsonArray().get(0).getAsJsonObject();
			String carX = vehicles.get("Detect").getAsJsonObject().get("Car").getAsJsonObject().get("Rect").getAsJsonArray().get(0).getAsString() == null ? "0" : vehicles.get("Detect").getAsJsonObject().get("Car").getAsJsonObject().get("Rect").getAsJsonArray().get(0).getAsString();
			String carY = vehicles.get("Detect").getAsJsonObject().get("Car").getAsJsonObject().get("Rect").getAsJsonArray().get(1).getAsString() == null ? "0" : vehicles.get("Detect").getAsJsonObject().get("Car").getAsJsonObject().get("Rect").getAsJsonArray().get(1).getAsString();
			String carW = vehicles.get("Detect").getAsJsonObject().get("Car").getAsJsonObject().get("Rect").getAsJsonArray().get(2).getAsString() == null ? "0" : vehicles.get("Detect").getAsJsonObject().get("Car").getAsJsonObject().get("Rect").getAsJsonArray().get(2).getAsString();
			String carH = vehicles.get("Detect").getAsJsonObject().get("Car").getAsJsonObject().get("Rect").getAsJsonArray().get(3).getAsString() == null ? "0" : vehicles.get("Detect").getAsJsonObject().get("Car").getAsJsonObject().get("Rect").getAsJsonArray().get(3).getAsString();
			String rectStr = carX + "," + carY + "," + carW + "," + carH;
			JsonObject jsonObject = vehicles.get("Recognize").getAsJsonObject();
			String clpp = jsonObject.get("Brand").getAsJsonObject().get("TopList").getAsJsonArray().get(0).getAsJsonObject().get("Name").getAsString();
			String csys = jsonObject.get("Color").getAsJsonObject().get("TopList").getAsJsonArray().get(0).getAsJsonObject().get("Name").getAsString();
			String hphm = jsonObject.get("Plate").getAsJsonObject().get("Licence").getAsString();
			String hpys = jsonObject.get("Plate").getAsJsonObject().get("Color").getAsJsonObject().get("Name").getAsString();
			String cllb = jsonObject.get("Type").getAsJsonObject().get("TopList").getAsJsonArray().get(0).getAsJsonObject().get("Name").getAsString();
			dataMap.put("rectStr", rectStr);
			dataMap.put("clpp", clpp);
			dataMap.put("csys", csys);
			dataMap.put("hphm", hphm);
			dataMap.put("hpys", hpys);
			dataMap.put("cllb", cllb);
		}
		return dataMap;
	}
	
	/**
	 * 解码
	 * 
	 * @param str
	 * @return string
	 */
	public static byte[] base64Decode(String str) {
		byte[] bt = null;
		try {
			sun.misc.BASE64Decoder decoder = new sun.misc.BASE64Decoder();
			bt = decoder.decodeBuffer(str);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return bt;
	}  
	
	/**
	 * 将本地图片进行Base64编码处理
	 * @return 图片编码结果
	 */
	public static String localImageToBaseEncoder(String carImg) {
		carImg = "C:/Users/lsg/Desktop/picture/3.jpg";
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
	 * 将服务器图片进行Base64编码处理
	 * @return 图片编码结果
	 */
	public static String httpImageToBaseEncoder(String carImg) {
		System.out.println("图片URL：" + carImg);
		int httpResult = 0; // 服务器返回的状态  
		String byteStr = "";
    	URL url = null;
    	//URLConnection urlconn = null;
    	HttpURLConnection httpconn = null;
    	byte[] bytes = null;
    	BufferedInputStream bis = null;
    	ByteArrayOutputStream bos = null;
		try {
    		url = new URL(carImg); // 创建URL  
    		httpconn = (HttpURLConnection)url.openConnection(); // 试图连接并取得返回状态码  
    		httpconn.connect();  
            //httpconn = (HttpURLConnection) urlconn;  
            httpResult = httpconn.getResponseCode();  
            if (httpResult != HttpURLConnection.HTTP_OK) { // 不等于HTTP_OK则连接不成功 
            	byteStr = "";
			} else {
				 bis = new BufferedInputStream(httpconn.getInputStream());  
				 BufferedImage bm = ImageIO.read(bis);  
				 bos = new ByteArrayOutputStream();  
	             ImageIO.write(bm, "jpg", bos);  
	             bos.flush();  
	             bytes = bos.toByteArray();
	             byteStr = encoder.encodeBuffer(bytes).trim();
			}
		} catch (Exception e) {
			System.out.println("异常图片URL：" + carImg);
			byteStr = "";
		} finally {   
			if (httpconn != null) {
				httpconn.disconnect();
			}
		}
		return byteStr;
	}
	
	public static String readJsonFile(File file){
		StringBuffer content = new StringBuffer(); 
		InputStreamReader read = null;
		BufferedReader bufferedReader = null;
		try {
			if (file.isFile() && file.exists()) { // 判断文件是否存在
				read = new InputStreamReader(new FileInputStream(file), "gbk");
				bufferedReader = new BufferedReader(read);
				String lineTxt = null;
				while ((lineTxt = bufferedReader.readLine()) != null) {
					content.append(lineTxt.trim());
				}
			}
		} catch (Exception e) {
			System.out.println("读取文件内容出错");
			e.printStackTrace();
		} finally {
			if(bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(read != null) {
				try {
					read.close();
				} catch (IOException e) {
				}
			}
		}
		return content.toString();
    }
	
	/**
     * 初始化话文件对象
     * @param session 会话
     * @return 返回结果
     */
    public static File createAndGetDownloadFolder(HttpSession session){
        ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), "image/download");
        File folder =null;
        try {
            folder = contextResource.getFile();
            if (!folder.exists()) {
                folder.mkdirs();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return folder;
    }
    
    public static int[] loadimageinfo() {
		File file = new File("C:/Users/lsg/Desktop/picture/3.jpg");
		BufferedImage bi = null;
		try {
			bi = ImageIO.read(file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		int[] dataResult = new int[2];
		int width = bi.getWidth();
		int height = bi.getHeight();
		dataResult[0] = width;
		dataResult[1] = height;
		return dataResult;
	}
    
    public static void main(String[] args) throws Exception {
    	
    	JsonParser parser = new JsonParser();
    	String jsonStr = HttpWebserviceUtil.readJsonFile(new File("C:/Users/lsg/Desktop/tempPic/resultJson.txt"));
		JsonElement jsonElement = parser.parse(jsonStr);
		JsonElement similarJsonObject = jsonElement.getAsJsonObject().get("ImageResults").getAsJsonArray().get(0).getAsJsonObject().get("Vehicles").getAsJsonArray().get(0).getAsJsonObject().get("Recognize").getAsJsonObject().get("Similar");
		String feature = "";
		if (similarJsonObject != null) {
			feature = similarJsonObject.getAsJsonObject().get("Feature").getAsString();
		}
    	
    	//String jsonResult = loadCarOwnerPic("http://172.31.108.116:8080/Big_Data/image/download/20161101112935.jpg");
    	/*int[] results = loadimageinfo();
    	System.out.println("宽：像素-----" + results[0] + "高：像素" +  results[1]);
    	System.out.println("=========");*/
    }
}
