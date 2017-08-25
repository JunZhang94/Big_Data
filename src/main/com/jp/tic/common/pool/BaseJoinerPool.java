package com.jp.tic.common.pool;

public class BaseJoinerPool implements IPool, IJoiner {

	@Override
	public boolean disableTrigger() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean enableTrigger() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getPoolName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Status getPoolStatus() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean closeChannel(String channelName) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Channel openChannel(String channelName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setTrigger(ITrigger trigger) {
		// TODO Auto-generated method stub
	}

	@Override
	public boolean addPool(IPool poolA, IPool poolB) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getJoinerName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Status getJoinerStatus() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setSource(ISource source) {
		// TODO Auto-generated method stub
		
	}

}
