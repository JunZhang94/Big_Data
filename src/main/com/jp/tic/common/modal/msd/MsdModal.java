package com.jp.tic.common.modal.msd;

import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MsdModal {
	private IMarsker makser;
	private IDeleter deleter;
	private ISelector selecter;
	
	private int selecterCount;
	
	private ConcurrentLinkedQueue<Object> maskedIds=new ConcurrentLinkedQueue<Object>();
	private ConcurrentLinkedQueue<Object> processedIds=new ConcurrentLinkedQueue<Object>();

	private MaskerThread maskerThread;
	private ExecutorService selecterThreads;
	private DeleterThread deleterThread;
	
	private int selectorCount=3;
	
	public int getSelectorCount() {
		return selectorCount;
	}

	public void setSelectorCount(int selectorCount) {
		this.selectorCount = selectorCount;
	}

	public IMarsker getMakser() {
		return makser;
	}

	public void setMakser(IMarsker makser) {
		this.makser = makser;
	}

	public IDeleter getDeleter() {
		return deleter;
	}

	public void setDeleter(IDeleter deleter) {
		this.deleter = deleter;
	}

	public ISelector getSelecter() {
		return selecter;
	}

	public void setSelecter(ISelector selecter) {
		this.selecter = selecter;
	}

	public int getSelecterCount() {
		return selecterCount;
	}

	public void setSelecterCount(int selecterCount) {
		this.selecterCount = selecterCount;
	}
	
	public boolean run(){
		this.maskerThread=new MaskerThread(makser, maskedIds);
		maskerThread.start();
		
		this.deleterThread=new DeleterThread(deleter, processedIds);
		deleterThread.start();
		
		this.selecterThreads = Executors.newSingleThreadExecutor();
		for(int i=0;i<this.selecterCount;i++){
			SelectorThread thread=new SelectorThread(selecter, maskedIds, processedIds);
			selecterThreads.execute(thread);
		}
		
		return true;
	}
	
	public boolean stop(){
		if(this.maskerThread!=null){
			this.maskerThread.interrupt();
		}
		
		if(this.deleterThread!=null){
			this.deleterThread.interrupt();
		}
		
		if(this.selecterThreads!=null){
			this.selecterThreads.shutdownNow();
		}
		
		return true;
	}
	
	private static class MaskerThread extends Thread{
		private IMarsker masker;
		
		private ConcurrentLinkedQueue<Object> maskedIds;
		
		private boolean inited=false;
		
		public MaskerThread(IMarsker masker,ConcurrentLinkedQueue<Object> maskedIds){
			this.masker=masker;
			this.maskedIds=maskedIds;
		}
		
		@Override
		public void run() {
			while(true){
				if(inited==false){
					maskedIds.addAll(masker.getInitKeys());
				}
				
				maskedIds.addAll(masker.getMaskedKeys());
			}
		}
	}
	
	private static class SelectorThread extends Thread{
		private ISelector selecter;
		
		private ConcurrentLinkedQueue<Object> maskedIds;
		private ConcurrentLinkedQueue<Object> processedIds;
		
		private boolean inited=false;
		
		public SelectorThread(ISelector selecter,ConcurrentLinkedQueue<Object> maskedIds,ConcurrentLinkedQueue<Object> processedIds){
			this.selecter=selecter;
			this.maskedIds=maskedIds;
			this.processedIds=processedIds;
		}
		
		@Override
		public void run() {
			while(true){
				if(inited==false){
					processedIds.addAll(selecter.getInitKeys());
				}
				
				if(this.maskedIds.size()>0){
					Object key=maskedIds.poll();
					
					Object proecessedKey = selecter.getProcessedKeys(key);
					if(proecessedKey!=key){
						maskedIds.add(key);
					}
				}
			}
		}
	}
	
	private static class DeleterThread extends Thread{
		private IDeleter deleter;
		
		private ConcurrentLinkedQueue<Object> processedIds;
		
		public DeleterThread(IDeleter deleter,ConcurrentLinkedQueue<Object> processedIds){
			this.deleter=deleter;
			this.processedIds=processedIds;
		}
		
		@Override
		public void run() {
			while(true){
				if(this.processedIds.size()>0){
					Object key=processedIds.poll();
					
					Object proecessedKey = deleter.getDeletedKeys(key);
					if(proecessedKey!=key){
						processedIds.add(key);
					}
				}
			}
		}
	}
}
