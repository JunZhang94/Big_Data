package com.jp.tic.common.pool;

public interface IJoiner {
	public String getJoinerName();
	public Status getJoinerStatus();
	
	public boolean addPool(IPool poolA,IPool poolB);
}
