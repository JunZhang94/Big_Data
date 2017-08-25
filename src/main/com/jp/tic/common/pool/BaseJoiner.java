package com.jp.tic.common.pool;

import com.jp.tic.common.pool.Channel.IDataProcesser;
import com.jp.tic.common.pool.IPool.ISource;
import com.jp.tic.common.pool.source.ActiveSource;

public class BaseJoiner implements IJoiner {

	protected String joinerName;
	protected Status joinerStatus;
	
	protected IPool poolA;
	protected IPool poolB;
	
	@Override
	public boolean addPool(IPool poolA, IPool poolB) {
		this.poolA=poolA;
		this.poolB=poolB;
		
		Channel channel = poolA.openChannel(this.joinerName+"-"+poolB.getPoolName());
		channel.setProcesser(new IDataProcesser() {
			@Override
			public void process(Object data) {
				// TODO Auto-generated method stub
				
			}
		});
		ISource sourceA=new ActiveSource();
		
		poolB.setSource(sourceA);
		
		return true;
	}

	@Override
	public String getJoinerName() {
		return joinerName;
	}

	@Override
	public Status getJoinerStatus() {
		return joinerStatus;
	}

}
