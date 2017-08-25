package com.jp.tic.common.queue;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AutoQueue {
	protected static final Logger log = LoggerFactory.getLogger(AutoQueue.class);
	
	private ConcurrentLinkedQueue<Object> eventParams=new ConcurrentLinkedQueue<Object>();
	
	private QueuePollMessageListener messageListener;
	
	private String name;
	private int threadCount;
	private int batchSize=1;
	
	private long inCount=0;
	private long outCount=0;
	
	private Date firstInDate;
	private Date firstOutDate;
	private Date lastInDate;
	private Date lastOutDate;
	
	private int freeSleepInterval=500;
	
	public AutoQueue(String name,int threadCount){
		this.name=name;
		this.threadCount=threadCount;
	}
	
	public AutoQueue(String name,int threadCount,int batchSize){
		this.name=name;
		this.threadCount=threadCount;
		this.batchSize=batchSize;
	}
	
	public AutoQueue(String name,int threadCount,int batchSize,int freeSleepInterval){
		this.name=name;
		this.threadCount=threadCount;
		this.batchSize=batchSize;
		this.freeSleepInterval=freeSleepInterval;
	}
	
	public QueuePollMessageListener getMessageListener() {
		return messageListener;
	}

	public void setMessageListener(QueuePollMessageListener messageListener) {
		this.messageListener = messageListener;
	}

	public void addMessage(Object message){
		eventParams.add(message);
		
		inCount=inCount+1;
		lastInDate=new Date();
		if(firstInDate==null){
			firstInDate=lastInDate;
		}
		//log.trace("queue add item size="+eventParams.size()+"-"+message);
	}
	
	private ListenerfiringThread listenerThread;
	private Thread statusThread;
	
	public void startQueue(){
		listenerThread=new ListenerfiringThread();
		listenerThread.start();
		
		statusThread=new Thread(new Runnable() {
			
			@Override
			public void run() {
				while(true){
					log.info(name+" status: "+" incount="+inCount+" outCount="+outCount+" queue size="+(inCount-outCount));
					log.info(name+" first in:"+firstInDate+" first out:"+firstOutDate+" last in:"+lastInDate+" last out:"+lastOutDate);
					try {
						Thread.sleep(1000*5);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		});
		statusThread.start();
	}
	
	public void stopQueue(){
		if(listenerThread!=null){
			listenerThread.interrupt();
		}
		if(statusThread!=null){
			statusThread.interrupt();
		}
	}
	
	public int size() {
		return eventParams.size();
	}
	
	private class ListenerfiringThread extends Thread{
		
		private List<InnerThread> list=new ArrayList<InnerThread>(100);
		private List<InnerThread> temp=new ArrayList<InnerThread>(100);
		
		
		private void cleanRunnedThread(){
			temp.clear();
			for(InnerThread thread:list){
				if(thread.isInterrupted()||thread.isAlive()==false||thread.isRunning()==false){
					temp.add(thread);
				}
			}
			list.removeAll(temp);
		}
		public void run(){ 
			if(eventParams!=null){
				while (true && isInterrupted()==false) {
					try{
						this.cleanRunnedThread();
						
						//if(eventParams.size()>0){
						if(eventParams.isEmpty()==false){
							//while(eventParams.size()>0){
							while(eventParams.isEmpty()==false){
								if(list.size()>threadCount){
									Thread.sleep(freeSleepInterval);
									
									this.cleanRunnedThread();
									
									log.info(name+" busy time: thread size="+list.size()+" incount="+inCount+" outCount="+outCount+" queue size="+(inCount-outCount));
									//log.info(name+" busy time:queue size="+eventParams.size()+" thread size"+list.size());
								}
								else{
									final List<Object> items=new ArrayList<Object>();
									for(int i=0;i<batchSize;i++){
										Object message=eventParams.poll();
										if(message!=null){
											outCount=outCount+1;
											lastOutDate=new Date();
											if(firstOutDate==null){
												firstOutDate=lastOutDate;
											}
											
											items.add(message);
										}
									}
									
									log.info(name+" normal time: batch items size="+items.size());
									
									final InnerThread thread=new InnerThread(new Runnable() {
										@Override
										public void run() {
											try {
												messageListener.processMessage(items);
											} catch (Exception e) {
												log.error("",e);
											}
											list.remove(Thread.currentThread());
										}
									});
									list.add(thread);
									thread.start();
									
									log.info(name+" normal time: thread size="+list.size()+" incount="+inCount+" outCount="+outCount+" queue size="+(inCount-outCount));
									//log.info(name+" normal time:queue size="+eventParams.size()+" thread size"+list.size());
								}
							}
						}
						else{
							//when size == 0 wait for some time
							Thread.sleep(freeSleepInterval);
							
							log.debug(name+" normal time: thread size="+list.size()+" incount="+inCount+" outCount="+outCount+" queue size="+(inCount-outCount));
							if(list.size()>0){
								log.error(name+" free time warn:queue size="+eventParams.size()+" thread size"+list.size());
							}
							log.debug(name+" first in:"+firstInDate+" first out:"+firstOutDate+" last in:"+lastInDate+" last out:"+lastOutDate);
						}
					}
					catch(Exception ex){
						log.error(name,ex);
					}
				}
			}
		}
	}
	
	private class InnerThread extends Thread{
		
		public InnerThread(Runnable runnable){
			super(runnable);
		}
		
		private boolean running=true;
		
		public boolean isRunning() {
			return running;
		}

		@Override
		public void run() {
			running=true;
			super.run();
			running=false;
		}
		
	}
	public static interface QueuePollMessageListener{
		public void processMessage(List<Object> message) throws Exception;
	}
}
