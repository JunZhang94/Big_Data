package com.jp.tic.common.event;

public interface EventListner<T> {
	public String getListenerName();
	public void onMessage(T param);
}
