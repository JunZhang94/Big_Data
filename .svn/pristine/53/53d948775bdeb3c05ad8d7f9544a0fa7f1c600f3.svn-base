package com.jp.tic.common.pool;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Channel {
	protected static final Logger log = LoggerFactory.getLogger(Channel.class);
	
	private String channelName;
	private Status channelStatus;
	private IDataProcesser processer;
	private Filter filter;
	
	public Channel(String name){
		this.channelName=name;
	}
	
	public String getChannelName(){
		return channelName;
	}
	public Status getChannelStatus(){
		return channelStatus;
	}
	
	public void setProcesser(IDataProcesser processer){
		this.processer=processer;
	}
	
	public void setFilter(Filter filter){
		this.filter=filter;
	}
	
	protected void pushData(Object data){
		channelStatus.setRecievedCount(channelStatus.getRecievedCount()+1);
		
		try{
			if(filter!=null&&filter.validate(data)==false){
				return;
			}
			
			if(processer!=null){
				processer.process(data);
				
				channelStatus.setDealedCount(channelStatus.getDealedCount()+1);
				channelStatus.setTransferedCount(channelStatus.getTransferedCount()+1);
			}
		}
		catch(Exception ex){
			log.error("",ex);
		}
	}
	
	public static interface IDataProcesser{
		public void process(Object data);
	}
	
	public static interface Filter{
		public boolean validate(Object data);
	}
}
