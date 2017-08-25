package com.jp.tic.base.tester;

import com.sun.jna.Library;
import com.sun.jna.Native;
import com.sun.jna.NativeLong;

/** 
 * JNATestDll.java Create on 2016-10-9 上午11:18:41      
 * Copyright (c) 2016-10-9 by jinpeng         
 * @author lsg     
 * @version 1.0 
 */
public interface JNATestDll extends Library {
	//JNATestDll seemoRecognition  = (JNATestDll)Native.loadLibrary("seemoRecognition",JNATestDll.class);  
	JNATestDll seemoRecognition  = (JNATestDll)Native.loadLibrary("seemoRecognition",JNATestDll.class); 
	//char jsonRes_buff[50*1024] = {'\0'};
	public NativeLong seemo_vehicle_recognition(String mat_img, int height, int width,String strJsonParam,String jsonResBuff, int bufflen);		
	public String seemo_version();
	/*public int add(int a,int b);  
    public int factorial(int n);  */
}
