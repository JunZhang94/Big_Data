package com.jp.tic.common.cache;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.common.queue.AutoQueue;
import com.jp.tic.common.queue.AutoQueue.QueuePollMessageListener;
import com.jp.tic.common.util.FileUtils;

public class EntityFileCache {
	protected static final int DEQUEUE_STATUS_NORMAL=0;
	protected static final int DEQUEUE_STATUS_ERROR=1;
	
	protected static final Logger log = LoggerFactory.getLogger(EntityFileCache.class);
	
	protected AutoQueue cacheQueue;
	
	protected AutoQueue redoQueue;
	
	protected String cachePath;
	
	protected QueuePollMessageListener redoer;
	
	protected ScanFileThread scanThread;
	
	protected int scanInterval=5;
	
	protected int retryInterval=180;
	
	protected int maxCount=0;
	
	protected int timeoutDay=0;
	
	protected Hashtable<String,Integer> counts=new Hashtable<String, Integer>();
	
	protected int dequeueStatus=0;
	protected Calendar statusUpdateDate=Calendar.getInstance();
	
	protected int scanFlag=1;
	
	protected String name;
	
	protected int redoQueueMaxCount=1000;
	
	public EntityFileCache(String name,String cachePath,QueuePollMessageListener redoer){
		this.name=name;
		
		cacheQueue=new AutoQueue("Save "+name+" Queue",2);
		redoQueue=new AutoQueue("Redo "+name+" Queue",10);
		
		this.cachePath=cachePath;
		this.redoer=redoer;
	}
	
	public void start(){
		try{
			File file=new File(cachePath);
			if(file.exists()==false){
				file.mkdirs();
			}
			
			cacheQueue.setMessageListener(new QueuePollMessageListener() {
				
				public void processMessage(Object message) {
					try {
						String path=cachePath +"/"+ UUID.randomUUID();
						ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(path));
						oos.writeObject(message);
						log.info(name+" cache entity "+message);
					} catch (Exception e) {
						log.error("",e);
					} 
				}

				@Override
				public void processMessage(List<Object> message) throws Exception {
					for(Object data:message){
						processMessage(data);
					}
				}
			});
			
			redoQueue.setMessageListener(new QueuePollMessageListener() {
				
				public void processMessage(Object message) {
					String path=null;
					File file=null;
					try {
						path=(String) message;
						
						file=new File(path);
						if(file.exists()){
							ObjectInputStream ois = new ObjectInputStream(new FileInputStream(path));
							Object data = ois.readObject();
							ois.close();
							
							ArrayList<Object> list=new ArrayList<Object>();
							list.add(data);
							redoer.processMessage(list);
							
							file.delete();
							counts.remove(path);
						}
					} catch (Exception e) {
						if(path!=null){
							counts.put(path, counts.get(path)==null?1:counts.get(path)+1);
							
							log.debug(name+" retry count "+counts.get(path)+" for "+path);
							
							if(maxCount>0&&counts.get(path)>maxCount){
								log.info(name+" retry count larger than "+maxCount+" for "+path);
								try{
									file.delete();
									counts.remove(path);
								}
								catch(Exception ex){
									log.error(name+" delete cache file error ",ex);
								}
							}
						}
						
						int sum=0;
						for(Integer count:counts.values()){
							sum=sum+count;
						}
						if(sum>100){
							dequeueStatus=DEQUEUE_STATUS_ERROR;
							statusUpdateDate=Calendar.getInstance();
						}
						
						log.error("",e);
					} 
				}

				@Override
				public void processMessage(List<Object> message) throws Exception {
					for(Object data:message){
						processMessage(data);
					}
				}
			});
			
			scanFlag=1;
			
			scanThread=new ScanFileThread();
			scanThread.start();
			
			redoQueue.startQueue();
			cacheQueue.startQueue();
		}
		catch(Exception ex){
			log.error("",ex);
		}
	}
	
	public void stop(){
		scanFlag=0;
		cacheQueue.stopQueue();
		redoQueue.stopQueue();
	}
	
	public void cache(Object data){
		cacheQueue.addMessage(data);
	}
	
	private class ScanFileThread extends Thread{
		private Iterator<String> iterator;
		
		public ScanFileThread(){
			iterator=FileUtils.getDirectoryFileIteratorWithMode(cachePath,2);
		}
		
		private synchronized File getNextFile(){
			while(iterator!=null&&iterator.hasNext()){
				return new File(iterator.next());
			}
			return null;
		}
		
		private int currentCount;
		
		public void run() {
			while(scanFlag==1){
				try{
					currentCount = redoQueue.size();
						
					File file=getNextFile();
					while(file!=null){
						if(file.isDirectory()){
							file=getNextFile();
							continue;
						}
						
						try {
							boolean redo=true;
							
							Calendar now = Calendar.getInstance();
							
							if(timeoutDay>0){
								try {
									if(now.getTimeInMillis()-file.lastModified()>1000 * 60 * 60 * 24 * timeoutDay){
										file.delete();
										counts.remove(file.getAbsolutePath());
										redo=false;										
									}
								} catch (Exception ex) {
									log.error(name+" delete cache file error ",ex);
								}
							}
							
							if(now.getTimeInMillis()-statusUpdateDate.getTimeInMillis()>1000 * retryInterval){
								dequeueStatus=DEQUEUE_STATUS_NORMAL;
							}
							
							if(dequeueStatus==DEQUEUE_STATUS_ERROR){
								//do not add file path
								//wait for some(5) seconds
								break;
							}
							
							if(redo){
								currentCount++;
								if(currentCount<redoQueueMaxCount){
									redoQueue.addMessage(file.getAbsolutePath());
								}
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
						
						file=getNextFile();
					}
					
					Thread.sleep(1000 * scanInterval);
					log.debug(name+" scan thread waiting");
					
					iterator=FileUtils.getDirectoryFileIteratorWithMode(cachePath,2);
				}
				catch(Exception ex){
					log.error("",ex);
				}
			}
		}
	}
}
