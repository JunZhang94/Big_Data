package com.jp.tic.common.modal.redo;

import com.jp.tic.common.modal.IRunner;

public class RetryRedoModal {

	private int retryTimes;
	
	public void redo(IRunner runner){
		for(int i=0;i<retryTimes;i++){
			try{
				if(runner.run()){
					break;
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
				break;
			}
		}
	}
}
