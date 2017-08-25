package com.jp.tic.common.timer;

import java.lang.reflect.Field;
import java.util.TimerTask;

public class ScheduleTask {
	public static int TYPE_DAILY=0;
	public static int TYPE_PERIOD=1;
	
	private String taskName;
	private TimerTask task;
	private int hour;
	private int minute;
	private int second;
	private boolean fobidTaskRunAfterInit;
	private long period;
	private int taskType;
	
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public TimerTask getTask() {
		try{
			Field field = TimerTask.class.getDeclaredField("state");
			field.setAccessible(true);
			field.set(task, 0);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return task;
	}
	public void setTask(TimerTask task) {
		this.task = task;
	}
	public int getHour() {
		return hour;
	}
	public void setHour(int hour) {
		this.hour = hour;
	}
	public int getMinute() {
		return minute;
	}
	public void setMinute(int minute) {
		this.minute = minute;
	}
	public int getSecond() {
		return second;
	}
	public void setSecond(int second) {
		this.second = second;
	}
	public long getPeriod() {
		return period;
	}
	public void setPeriod(long period) {
		this.period = period;
	}
	public int getTaskType() {
		return taskType;
	}
	public void setTaskType(int taskType) {
		this.taskType = taskType;
	}
	public boolean isFobidTaskRunAfterInit() {
		return fobidTaskRunAfterInit;
	}
	public void setFobidTaskRunAfterInit(boolean fobidTaskRunAfterInit) {
		this.fobidTaskRunAfterInit = fobidTaskRunAfterInit;
	}
	
	
}
