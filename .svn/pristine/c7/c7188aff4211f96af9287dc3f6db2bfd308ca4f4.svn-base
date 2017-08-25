package com.jp.tic.common.timer;

import java.util.Calendar;
import java.util.Date;
import java.util.Hashtable;
import java.util.Timer;
import java.util.TimerTask;

public class TimerManager {

	private static final long PERIOD_DAY = 24 * 60 * 60 * 1000;
	
	public static final long INTERVAL_MINTUE = 60 * 1000;
	
	public static final long INTERVAL_SECOND = 1000;
	
	private Timer timer;
	
	private Hashtable<String,ScheduleTask> tasks=new Hashtable<String, ScheduleTask>();

	public TimerManager() {
		timer = new Timer();
	}
	
	private static TimerManager timeManager=null;
	
	public static TimerManager getInstance(){
		if(timeManager==null){
			timeManager=new TimerManager();
		}
		return timeManager;
	}
	
	public boolean addTask(ScheduleTask task){
		if(task.getTaskType()==ScheduleTask.TYPE_PERIOD){
			addTask(task.getTask(), task.getPeriod());
		}
		if(task.getTaskType()==ScheduleTask.TYPE_DAILY){
			addTask(task.getTask(), task.getHour(), task.getMinute(), task.getSecond(), task.isFobidTaskRunAfterInit());
		}
		
		tasks.put(task.getTaskName(), task);
		return true;
	}
	
	private boolean addTask(TimerTask task,int hour,int minute,int second, boolean fobidTaskRunAfterInit){
		Calendar calendar = Calendar.getInstance();

		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, minute);
		calendar.set(Calendar.SECOND, second);

		Date date = calendar.getTime();
		if (fobidTaskRunAfterInit && date.before(new Date())) {
			date = this.addDay(date, 1);
		}

		timer.schedule(task, date, PERIOD_DAY);
		return true;
	}
	
	private boolean addTask(TimerTask task,long period){
		Calendar calendar = Calendar.getInstance();
		Date date = calendar.getTime();

		timer.schedule(task, date, period);
		return true;
	}

	private Date addDay(Date date, int num) {
		Calendar result = Calendar.getInstance();
		result.setTime(date);
		result.add(Calendar.DAY_OF_MONTH, num);
		return result.getTime();
	}
	
	public boolean cancelTask(ScheduleTask task){
		if(tasks.containsKey(task.getTaskName())){
			tasks.remove(task.getTaskName());
			
			timer.cancel();
			timer.purge();
			timer=new Timer();
			
			for(ScheduleTask tempTask:tasks.values()){
				try{
					if(tempTask.isFobidTaskRunAfterInit()==false){
						Calendar now=Calendar.getInstance();
						
						Calendar time=Calendar.getInstance();
						time.set(Calendar.HOUR_OF_DAY, tempTask.getHour());
						time.set(Calendar.MINUTE, tempTask.getMinute());
						time.set(Calendar.SECOND, tempTask.getSecond());
						if(time.before(now)){
							tempTask.setFobidTaskRunAfterInit(true);
						}
					}
					  
					this.addTask(tempTask);
				}
				catch(Exception e){
					e.printStackTrace();
				}
			}
			return true;
		}
		
		return false;
	}
	
	public boolean cancelAllTask(){
		timer.cancel();
		timer.purge();
		timer=new Timer();
		return true;
	}

	public static void main(String[] args) {
		TimerManager timer=new TimerManager();
		TimerTask task1=new TimerTask() {
			
			@Override
			public void run() {
				System.out.println("INTERVAL_MINTUE");
			}
		};
		
		TimerTask task2=new TimerTask() {
			
			@Override
			public void run() {
				System.out.println("INTERVAL_MINTUE");
			}
		};
		
		TimerTask task3=new TimerTask() {
			
			@Override
			public void run() {
				System.out.println("INTERVAL_MINTUE");
			}
		};
		
		ScheduleTask ptask1=new ScheduleTask();
		ptask1.setTaskName("ptask1");
		ptask1.setTask(task1);
		ptask1.setPeriod(INTERVAL_MINTUE);
		ptask1.setTaskType(ScheduleTask.TYPE_PERIOD);
		
		ScheduleTask ptask2=new ScheduleTask();
		ptask2.setTaskName("ptask2");
		ptask2.setTask(task2);
		ptask2.setPeriod(INTERVAL_MINTUE);
		ptask2.setTaskType(ScheduleTask.TYPE_PERIOD);
		
		ScheduleTask ptask3=new ScheduleTask();
		ptask3.setTaskName("ptask3");
		ptask3.setTask(task3);
		ptask3.setPeriod(INTERVAL_MINTUE);
		ptask3.setTaskType(ScheduleTask.TYPE_PERIOD);
		
		TimerTask task4=new TimerTask() {
			
			@Override
			public void run() {
				System.out.println("9:40");
			}
		};
		ScheduleTask ttask1=new ScheduleTask();
		ttask1.setTaskName("ttask1");
		ttask1.setTask(task4);
		ttask1.setHour(15);
		ttask1.setMinute(12);
		ttask1.setSecond(0);
		ttask1.setTaskType(ScheduleTask.TYPE_DAILY);
		
		timer.addTask(ptask1);
		timer.addTask(ptask2);
		timer.addTask(ptask3);
		
		timer.addTask(ttask1);
		
		try {
			Thread.sleep(1000*60*2);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		timer.cancelTask(ptask2);
	}
}
