package com.jp.tic.common.pool;

import java.util.Stack;

public class StackPool extends AbstractPool{
	
	protected int maxSize=0;
	protected Stack<Object> elements=new Stack<Object>();
	
	public StackPool(){
		this.maxSize=0;
	}

	public StackPool(int maxSize){
		this.maxSize=maxSize;
	}
	
	public StackPool(String name){
		super(name);
	}
	
	public StackPool(String name,int maxSize){
		super(name);
		this.maxSize=maxSize;
	}
	
	@Override
	protected void fireData() {
		while (elements.isEmpty() == false) {
			try {
				Object data = elements.pop();

				if (data != null) {
					for (Channel channel : channels.values()) {
						channel.pushData(data);
					}
				}
			} catch (Exception ex) {
				log.error("", ex);
			}
		}
	}

	@Override
	protected void recieveData(Object data) {
		if(maxSize>0){
			while(elements.size()>=maxSize){
				elements.remove(elements.firstElement());
			}
		}
		
		elements.add(data);
	}

}
