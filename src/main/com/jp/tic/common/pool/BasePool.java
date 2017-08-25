package com.jp.tic.common.pool;

public class BasePool extends AbstractPool {

	public BasePool(){
	}
	
	public BasePool(String name){
		super(name);
	}
	
	@Override
	protected void recieveData(Object data) {
		for(Channel channel:channels.values()){
			channel.pushData(data);
		}
	}

	@Override
	public boolean enableTrigger() {
		//do nothing
		//disable trigger all the time
		return true;
	}

	@Override
	protected void fireData() {
		//do nothing
	}
}
