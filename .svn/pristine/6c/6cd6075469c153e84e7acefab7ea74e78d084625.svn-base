package com.jp.tic.analyze.util;

import java.io.File;

import com.sun.jna.Library;
import com.sun.jna.Native;
import com.sun.jna.Platform;

/**
 * @Description 使用的JNA方式访问本地库，JNA由SUN公司开发，建立在经典的JNI的基础之上的一个框架。
 * JNA项目地址：https://jna.dev.java.net/
 * @date 2016年8月24日 下午3:50:44
 */
public interface MyLibrary extends Library {
	
	//加载本地库sim_match.dll
	final String rootPath = new File(HttpWebserviceUtil.class.getResource("/").getPath()).getParentFile().getParentFile().getAbsolutePath();
	
	MyLibrary INSTANCE = (MyLibrary)Native.loadLibrary(Platform.isWindows() ? rootPath + "\\resources\\sim_match.dll" : "similar_match", MyLibrary.class);
	
	int seemo_match_init(boolean beta_swith);
	
	int seemo_vehicle_match(byte[] bs, int feature_src_len, byte[] bs2, int feature_to_len, float[] score, float[] proi);
}
