package com.jp.tic.common.util;

public class JVMStatusUtils {
	public static long getFreeMemory(){
		return Runtime.getRuntime().freeMemory();
	}
	
	public static long getTotalMemory(){
		return Runtime.getRuntime().totalMemory();
	}
	
	public static long getMaxMemory(){
		return Runtime.getRuntime().maxMemory();
	}
	
	public static long getUsedMemory(){
		return Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
	}
	
	public static void main(String[] args) {
		System.out.println("freeMemory="+getFreeMemory()/1024/1024);
		System.out.println("totalMemory="+getTotalMemory()/1024/1024);
		System.out.println("maxMemory="+getMaxMemory()/1024/1024);
		System.out.println("usedMemory="+getUsedMemory()/1024/1024);
	}
}
