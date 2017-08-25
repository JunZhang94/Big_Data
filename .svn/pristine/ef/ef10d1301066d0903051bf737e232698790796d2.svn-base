package com.jp.tic.common.event;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Hashtable;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

public class EventManager {
	public static Hashtable<String,EventManager> events=new Hashtable<String,EventManager>();
	
	public static EventManager getEventManager(String eventName){
		if(events.get(eventName)==null){
			return new EventManager(eventName);
		}
		return events.get(eventName);
	}
	
	public static EventManager getEventManager(String eventName,boolean enableSingletonActiveTrigger, boolean enableSingletonPassiveTrigger, boolean enabledThread4Event){
		if(events.get(eventName)==null){
			return new EventManager(eventName,enableSingletonActiveTrigger,enableSingletonPassiveTrigger,enabledThread4Event);
		}
		return events.get(eventName);
	}
	
	private String eventName;
	private boolean enableSingletonActiveTrigger;
	private boolean enableSingletonPassiveTrigger;
	private boolean enabledThread4Event;
	
	private ActiveEventTrigger innerActiveTriger;
	private PassiveEventTrigger innerPassiveEventTrigger;
	
	private List<ActiveEventTrigger> activeTriggers=new ArrayList<ActiveEventTrigger>();
	private List<PassiveEventTrigger> passiveTriggers=new ArrayList<PassiveEventTrigger>();
	private List<EventListner> listeners=new ArrayList<EventListner>();
	
	protected List<Thread> threads=new ArrayList<Thread>();
	
	private EventManager(String eventName){
		events.put(eventName, this);
		
		this.eventName=eventName;
		this.enableSingletonActiveTrigger=false;
		this.enableSingletonPassiveTrigger=false;
		this.enabledThread4Event=false;
		
		innerActiveTriger=new ActiveEventTrigger("InnerActiveEventTrigger",this);
		innerPassiveEventTrigger=new PassiveEventTrigger(eventName, "InnerPassiveEventTrigger", enableSingletonPassiveTrigger);
	}
	
	private EventManager(String eventName,boolean enableSingletonActiveTrigger, boolean enableSingletonPassiveTrigger, boolean enabledThread4Event){
		events.put(eventName, this);
		
		this.eventName=eventName;
		this.enableSingletonActiveTrigger=enableSingletonActiveTrigger;
		this.enableSingletonPassiveTrigger=enableSingletonPassiveTrigger;
		this.enabledThread4Event=enabledThread4Event;
		
		innerActiveTriger=new ActiveEventTrigger("InnerActiveEventTrigger",this);
		innerPassiveEventTrigger=new PassiveEventTrigger(eventName, "InnerPassiveEventTrigger", enableSingletonPassiveTrigger);
		
		if(enableSingletonPassiveTrigger){
			Thread listenerfiringThread=new ListenerfiringThread(this,innerPassiveEventTrigger);
			listenerfiringThread.start();
			threads.add(listenerfiringThread);
		}
	}
	
	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public void addPassiveEventTrigger(PassiveEventTrigger trigger){
		if(enableSingletonPassiveTrigger){
			//nothing
			//innerPassiveEventTrigger=trigger;
		}
		else{
			passiveTriggers.add(trigger);
			
			Thread listenerfiringThread=new ListenerfiringThread(this,trigger);
			listenerfiringThread.start();
			threads.add(listenerfiringThread);
		}
		
	}
	
	public ActiveEventTrigger registerActiveEventTrigger(String triggerName){
		ActiveEventTrigger trigger=null;
		if(enableSingletonActiveTrigger){
			trigger=this.innerActiveTriger;
		}
		else{
			trigger=new ActiveEventTrigger(triggerName,this);
			this.activeTriggers.add(trigger);
			
//			Thread listenerfiringThread=new ListenerfiringThread(this,trigger);
//			listenerfiringThread.start();
//			threads.add(listenerfiringThread);
		}
		return trigger;
	}
	
	public void addEventListener(EventListner listener){
		listeners.add(listener);
	}
	
	public boolean start(){
		return true;
	}
	
	public boolean close(){
		for(Thread thread:threads){
			thread.interrupt();
		}
		return true;
	}
	
	private static class ListenerfiringThread extends Thread{
		private EventManager manager;
		private PassiveEventTrigger trigger;
		
		protected EventArgsPool cache;
		
		public ListenerfiringThread(EventManager manager,PassiveEventTrigger trigger){
			this.manager=manager;
			this.trigger=trigger;
			this.cache=trigger.getEventParamPool();
		}
		
		public void run(){ 
			try{
				if(cache!=null){
					while (true && isInterrupted()==false) {
						if(cache.size()>0){
							while(cache.size()>0){
								final Object param=cache.poll();
								for(final EventListner listener:manager.listeners){
									if(manager.enabledThread4Event){
										new Thread(new Runnable(){
											@Override
											public void run() {
												listener.onMessage(param);
											}
											
										}).start();
									}
									else{
										listener.onMessage(param);
									}
									//System.out.println(manager.getEventName()+"-"+trigger.getTriggerName()+"-"+listener.getListenerName()+":"+param.toString());
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
	
	public static class PassiveEventTrigger {
		private String triggerName; 
		private EventArgsPool pool;

		private PassiveEventTrigger inner;
		private boolean enabledInner=false;
		
		private PassiveEventTrigger(String eventName, String triggerName, boolean enabledInner){
			this.triggerName=triggerName;
			pool=new EventArgsPool();
		}
		
		public PassiveEventTrigger(String eventName, String triggerName){
			EventManager manager = EventManager.getEventManager(eventName);
			if(manager!=null && manager.enableSingletonPassiveTrigger){
				inner = manager.innerPassiveEventTrigger;
				enabledInner=true;
			}
			else{
				this.triggerName=triggerName;
				pool=new EventArgsPool();
			}
		}
		
		public EventArgsPool getEventParamPool(){
			if(enabledInner){
				return inner.pool;
			}
			return pool;
		}
		
		public String getTriggerName(){
			return triggerName;
		}
	}
	
	public class ActiveEventTrigger{
		private String triggerName;
		private EventManager manager;
		
		private ActiveEventTrigger(String triggerName, EventManager manager){
			this.triggerName=triggerName;
			this.manager=manager;
		}
		
		public String getTriggerName(){
			return triggerName;
		}
		
	    public void triggerEvent(Object event){
	    	final Object fevent=event;
	    	for(final EventListner listener:manager.listeners){
				if(manager.enabledThread4Event){
					new Thread(new Runnable(){
						@Override
						public void run() {
							listener.onMessage(fevent);
						}
						
					}).start();
				}
				else{
					listener.onMessage(fevent);
				}
				//System.out.println(manager.getEventName()+"-"+this.getTriggerName()+"-"+listener.getListenerName()+":"+fevent);
			}
	    }
	}
	
	public static class EventArgsPool{
		private ConcurrentLinkedQueue<Object> eventParams=new ConcurrentLinkedQueue<Object>();
		
		private EventArgsPool(){
		}
		
		public void addEventArgs(Object event){
			eventParams.add(event);
		}
		public void addAllEventArgs(Collection<Object> events){
			eventParams.addAll(events);
		}
		
		private Object poll(){
			return eventParams.poll();
		}
		
		public int size(){
			return eventParams.size();
		}
	}
	
	public interface EventListner {
		public String getListenerName();
		public void onMessage(Object param);
	}
	
	public static void main(String[] args) {
		EventListner listener1 = new EventListner() {
			
			@Override
			public void onMessage(Object param) {
				System.out.println(">>>>>>>>>>>>>"+param);
			}
			
			@Override
			public String getListenerName() {
				return "funny";
			}
		};
		EventListner listener2 = new EventListner() {
			
			@Override
			public void onMessage(Object param) {
				System.out.println(">>>>>>>>>>>>>"+param);
			}
			
			@Override
			public String getListenerName() {
				return "funny";
			}
		};
		
		EventManager manager1 = new EventManager("Test1");
		
		manager1.addEventListener(listener1);
		manager1.addEventListener(listener2);
		
		ActiveEventTrigger trigger1 = manager1.registerActiveEventTrigger("Active");
		trigger1.triggerEvent("abc");
		
		PassiveEventTrigger trigger2 = new PassiveEventTrigger("Test", "Passive");
		manager1.addPassiveEventTrigger(trigger2);
		trigger2.getEventParamPool().addEventArgs("bcd");
		
		EventManager manager2 = new EventManager("Test2",true,true,true);
		
		/////////////////////////////////////////////////////////////////////////////
		
		manager2.addEventListener(listener1);
		manager2.addEventListener(listener2);
		
		trigger1 = manager2.registerActiveEventTrigger("Active");
		trigger1.triggerEvent("def");
		
		trigger2 = new PassiveEventTrigger("Test2", "Passive");
		manager2.addPassiveEventTrigger(trigger2);
		trigger2.getEventParamPool().addEventArgs("ghi");
	}
}
