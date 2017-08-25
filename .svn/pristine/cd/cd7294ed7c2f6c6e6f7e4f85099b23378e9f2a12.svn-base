package com.jp.tic.base.tester;

import com.sun.jna.Library;
import com.sun.jna.Native;

/** 
 * DllTest.java Create on 2016-10-10 下午03:05:02      
 * Copyright (c) 2016-10-10 by jinpeng         
 * @author lsg     
 * @version 1.0 
 */
public interface DllTest extends Library {
	DllTest myText  = (DllTest)Native.loadLibrary("MyText",DllTest.class); 
	public int add(int a,int b);  
	public int fnMyText();
}
