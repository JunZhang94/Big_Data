package com.jp.tic.common.event;

import java.util.concurrent.ConcurrentLinkedQueue;

public interface EventTrigger<T> {
	public String getTriggerName();
	public ConcurrentLinkedQueue<T> getEventParamPool();
}
