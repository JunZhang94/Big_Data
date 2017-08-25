package com.jp.tic.common.pool;

public interface IPool {
	public String getPoolName();
	
	//one input
	public void setSource(ISource source);
	
	//multiple output
	public Channel openChannel(String channelName);
	public boolean closeChannel(String channelName);
	
	//trigger for all channel
	public void setTrigger(ITrigger trigger);
	public boolean enableTrigger();
	public boolean disableTrigger();
	
	public Status getPoolStatus();
	
	public static interface ITrigger {
		public boolean isReady(Status poolStatus);
		public long getInterval();
	}
	
	public static interface ISource {
		public void setDataReciever(IDataRevicer reviever);
	}
	
	public static interface IDataRevicer{
		public void onData(Object data);
	}
}
