package com.jp.tic.common.util;

import java.lang.Thread.UncaughtExceptionHandler;

public class ThreadUtils {

	public static final int MAX_PRIORITY=10; 
	public static final int MIN_PRIORITY=1;
	public static final int NORM_PRIORITY=5; 
	
	public static void restartThread(Thread thread,int retryTimes){
		if(thread==null){
			return ;
		}
		
		for(int i=0;i<retryTimes;i++){
			thread.interrupt();
			if(thread.isAlive()==false||thread.isInterrupted()==true){
				thread.start();
				break;
			}
		}
	}
	
	public static boolean tryRestartThread(Thread thread){
		if(thread==null){
			return false;
		}
		
		if(thread.isAlive()==false){
			restartThread(thread, 5);
		}
		return thread.isAlive();
	}
	
	public static UncaughtExceptionHandler LOG_UNCAUGHT_EXCEPTION_HANDLER = new UncaughtExceptionHandler() {
		public void uncaughtException(Thread a, Throwable e) {
			e.printStackTrace();
		}
	};
}
