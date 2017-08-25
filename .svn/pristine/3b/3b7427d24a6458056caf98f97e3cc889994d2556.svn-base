package com.jp.tic.analyze.entity;

import java.util.List;

import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.system.entity.AbstractEntity;
import com.jp.tic.system.entity.CarTake;

public class SliceEntity extends AbstractEntity {
	private List<CarTake> result;//结果集
	
	private int count;
	
	private String endKey;

	public List<CarTake> getResult() {
		return result;
	}

	public void setResult(List<CarTake> result) {
		this.result = result;
	}

	public String getEndKey() {
		return endKey;
	}

	public void setEndKey(String endKey) {
		this.endKey = endKey;
	}
	
	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public void addResult(List<CarTake> result,byte[] endKey){
		this.result=result;
		this.endKey=BytesUtils.toValueString(endKey);
	}
	
	public byte[] getEndKeyBytes(){
		try{
			if(endKey==null){
				return null;
			}
			
			return BytesUtils.parseValueString(endKey);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return null;
	}
}
