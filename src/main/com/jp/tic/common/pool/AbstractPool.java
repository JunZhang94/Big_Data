package com.jp.tic.common.pool;

import java.util.Hashtable;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractPool implements IPool{
	protected static final Logger log = LoggerFactory.getLogger(AbstractPool.class);
	
	protected String poolName;
	protected Status poolStatus;
	
	protected ITrigger trigger;
	protected boolean triggerEnabled=false;
	protected ISource source;
	
	protected Hashtable<String,Channel> channels=new Hashtable<String, Channel>();
	
	protected TriggerThread triggerThread;
	public AbstractPool(){
		this(""+UUID.randomUUID());
	}
	
	public AbstractPool(String name){
		this.poolName=name;
	}

	@Override
	public boolean closeChannel(String channelName) {
		channels.remove(channelName);
		return true;
	}

	@Override
	public boolean disableTrigger() {
		try{
			if(triggerThread!=null){
				triggerThread.interrupt();
			}
			
			triggerEnabled=false;
			return true;
		}
		catch(Exception ex){
			log.error("",ex);
		}
		return false;
	}

	@Override
	public boolean enableTrigger() {
		try{
			if(trigger!=null){
				triggerThread=new TriggerThread();
				triggerThread.start();
			}
			triggerEnabled=true;
			return true;
		}
		catch(Exception ex){
			log.error("",ex);
		}
		return false;
	}

	@Override
	public Channel openChannel(String channelName) {
		Channel channel=new Channel(channelName);
		channels.put(channelName, channel);
		
		return channel;
	}

	@Override
	public void setTrigger(ITrigger trigger) {
		this.trigger=trigger;
	}
	
	@Override
	public String getPoolName() {
		return this.poolName;
	}

	@Override
	public Status getPoolStatus() {
		return this.poolStatus;
	}

	@Override
	public void setSource(ISource source) {
		this.source=source;
		
		this.source.setDataReciever(new IDataRevicer() {
			@Override
			public void onData(Object data) {
				recieveData(data);
			}
		});
	}
	
	protected abstract void recieveData(Object data);
	
	protected abstract void fireData();
	
	protected class TriggerThread extends Thread{

		@Override
		public void run() {
			if(trigger!=null){
				while(triggerEnabled){
					try{
						if(trigger.isReady(poolStatus)){
							fireData();
						}
						
						Thread.sleep(trigger.getInterval());
					}
					catch(Exception ex){
						log.error("",ex);
					}
				}
			}
		}
		
	}
}
