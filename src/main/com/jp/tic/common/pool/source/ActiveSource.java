package com.jp.tic.common.pool.source;

import com.jp.tic.common.pool.IPool.IDataRevicer;
import com.jp.tic.common.pool.IPool.ISource;

public class ActiveSource implements ISource {
	protected IDataRevicer reviever;
	
	@Override
	public void setDataReciever(IDataRevicer reviever) {
		this.reviever=reviever;
	}

	public void push(Object data){
		this.reviever.onData(data);
	}
}
