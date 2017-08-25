package com.jp.tic.base.tester;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.channels.FileChannel;

import javax.imageio.ImageIO;
import javax.imageio.stream.FileImageInputStream;

/**
 * ImageUmpGeneralize.java Create on 2016-10-9 下午02:38:15 Copyright (c)
 * 2016-10-9 by jinpeng
 * @author lsg
 * @version 1.0
 */
public class ImageUmpGeneralize {
	
	public static void main(String[] args) {
		int[] results = loadimageinfo();
		System.out.println("宽：像素-----" + results[0] + "高：像素" +  results[1]);
		/*try {
			byte[] jsonRes_buff = new byte[50*1024];
			String srt2 = new String(jsonRes_buff,"UTF-8");
			String srt3 = new String(jsonRes_buff);
			//String jsonRes_buff = "";
			int bufflen = 50*1024;
			int[] results = loadimageinfo();
			String strJsonParam = "{" +
				"\"Mode\" : 0," +
				"\"Version\" : 1010," +
				"\"Detect\" : {\"MinCarWidth\" : 250,\"Threshold\" : 5.0}," +
				"\"Plate\" : {\"IsRec\" : true}," +
				"\"Brand\" : {\"IsRec\" : true}," +
				"\"Type\" : {\"IsRec\" : true}," +
				"\"Color\" : {\"IsRec\" : true}," +
				"\"Marker\" : {\"IsRec\" : true}" +
				"}";
			OutputStream os;
			System.out.println("===================one");
			os = new FileOutputStream("C:/Users/lsg/Desktop/picture/3.JPG");
			DataOutputStream dos = new DataOutputStream(os);
			File f = new File("C:/Users/lsg/Desktop/picture/3.jpg");
		    InputStream instream = new FileInputStream(f);
			DataInputStream dis = new DataInputStream(instream);  
			byte[] dis = imageToBytes("C:/Users/lsg/Desktop/picture/3.jpg");
			String srt1 = new String(dis,"UTF-8");
			System.out.println("===================two");
			JNATestDll.seemoRecognition.seemo_vehicle_recognition(srt1, results[1], results[0],strJsonParam, srt3, bufflen);
			//String str = JNATestDll.seemoRecognition.seemo_version();
			System.out.println("===================three ");
		} catch (Exception e) {	
			e.printStackTrace();
		}  */
	}
	
	public static int[] loadimageinfo() {
		File file = new File("C:/Users/lsg/Desktop/picture/3.jpg");
		FileChannel fc = null;
		if (file.exists() && file.isFile()) {
			try {
				FileInputStream fs = new FileInputStream(file);
				fc = fs.getChannel();
				System.out.println(fc.size() + "-----fc.size()");
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println(file.length() + "-----file.length  B");
		System.out.println(file.length() * 1024 + "-----file.length  kb");
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
	
	public static byte[] imageToBytes(String path) {
		byte[] data = null;
		FileImageInputStream input = null;
		try {
			input = new FileImageInputStream(new File(path));
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int numBytesRead = 0;
			while ((numBytesRead = input.read(buf)) != -1) {
				output.write(buf, 0, numBytesRead);
			}
			data = output.toByteArray();
			output.close();
			input.close();
		} catch (FileNotFoundException ex1) {
			ex1.printStackTrace();
		} catch (IOException ex1) {
			ex1.printStackTrace();
		}
		return data;
	}
}
