package com.jp.tic.common.pool.source;

import com.jp.tic.common.pool.IPool.IDataRevicer;
import com.jp.tic.common.pool.IPool.ISource;

public class PassiveSource implements ISource {
	protected IDataRevicer reviever;
	
	@Override
	public void setDataReciever(IDataRevicer reviever) {
		this.reviever=reviever;
	}

	public static interface IDataGenerator{
		
	}
}
