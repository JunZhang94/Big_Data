package com.jp.tic.common.event;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

public class EventRegister<T> {
	
	private List<EventTrigger<T>> triggers=new ArrayList<EventTrigger<T>>();
	private List<EventListner<T>> listeners=new ArrayList<EventListner<T>>();
	
	protected List<Thread> threads=new ArrayList<Thread>();
	
	public void addEventTrigger(EventTrigger<T> trigger){
		Thread listenerfiringThread=new ListenerfiringThread<T>(listeners,trigger);
		//listenerfiringThread.start();
		triggers.add(trigger);
		threads.add(listenerfiringThread);
	}
	
	public void addEventListener(EventListner<T> listener){
		listeners.add(listener);
	}
	
	private int runStatus=-1;
	
	public boolean start(){
		if(runStatus==1){
			return false;
		}
		
		for(Thread thread:threads){
			thread.start();
		}
		
		runStatus=1;
		return true;
	}
	
	public boolean stop(){
		if(runStatus==0){
			return false;
		}
		
		for(Thread thread:threads){
			thread.interrupt();
		}
		
		runStatus=0;
		return true;
	}
	
	private static class ListenerfiringThread<T> extends Thread{
		private List<EventListner<T>> listeners;
		private EventTrigger<T> trigger;
		
		protected ConcurrentLinkedQueue<T> cache;
		
		public ListenerfiringThread(List<EventListner<T>> listeners,EventTrigger<T> trigger){
			this.listeners=listeners;
			this.trigger=trigger;
			this.cache=trigger.getEventParamPool();
		}
		
		
		public void run(){ 
			try{
				if(cache!=null){
					while (true && isInterrupted()==false) {
						if(cache.size()>0){
							while(cache.size()>0){
								final T param=cache.poll();
								
								for(final EventListner<T> listener:listeners){
									//listener.onMessage(param);
									
									
									new Thread(new Runnable(){
										@Override
										public void run() {
											listener.onMessage(param);
										}
										
									}).start();
									
									
									System.out.println("EventRegister>>>>>"+trigger.getTriggerName()+"-"+listener.getListenerName()+":"+param.toString());
								}
							}
						}
						else{
							//when size == 0 wait for some time
							Thread.sleep(10);
						}
					}
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
	}
}
