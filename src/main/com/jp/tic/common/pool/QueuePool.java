package com.jp.tic.common.pool;

import java.util.concurrent.ConcurrentLinkedQueue;

public class QueuePool extends AbstractPool{
	protected int maxSize=0;
	protected ConcurrentLinkedQueue<Object> elements=new ConcurrentLinkedQueue<Object>();
	
	public QueuePool(){
		this.maxSize=0;
	}
	
	public QueuePool(int maxSize){
		this.maxSize=maxSize;
	}
	
	public QueuePool(String name){
		super(name);
	}
	
	public QueuePool(String name,int maxSize){
		super(name);
		this.maxSize=maxSize;
	}
	
	@Override
	protected void recieveData(Object data){
		if(maxSize>0){
			while(elements.size()>=maxSize){
				elements.poll();
			}
		}
		
		elements.add(data);
	}

	@Override
	protected void fireData() {
		while(elements.isEmpty()==false){
		//while(elements.size()>0){//more slow
			try{
				Object data=elements.poll();
				
				if(data!=null){
					for(Channel channel:channels.values()){
						channel.pushData(data);
					}
				}
			}
			catch(Exception ex){
				log.error("",ex);
			}
		}
	}


	
}
