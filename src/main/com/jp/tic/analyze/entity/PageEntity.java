package com.jp.tic.analyze.entity;

import java.util.ArrayList;
import java.util.List;

import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.system.entity.AbstractEntity;
import com.jp.tic.system.entity.CarTake;

public class PageEntity extends AbstractEntity {
	private static String CURRENT_KEY_NOT_INITED="-";
	private static String CURRENT_KEY_OUT_OF_INDEX="*";
	
	private List<CarTake> result;//结果集
	
	private List<String> pageStartKeys=new ArrayList<String>();
	
	private int pageSize=10;//每页的记录数
	
	private int pageNo=1;//第X页
	
	private int maxQueryLoadPageSize;//一次查询,最大预加载页数
	
	private String currentStartKey=CURRENT_KEY_NOT_INITED;
	
	private String currentEndKey=CURRENT_KEY_NOT_INITED;
	
	private boolean cacheAllData;//是否在内存中保存所有数据,内存分页设置为ture,否则为false
	
	private int totalCount;
	
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public List<CarTake> getResult() {
		return result;
	}
	public void setResult(List<CarTake> result) {
		this.result = result;
	}
	public List<String> getPageStartKeys() {
		return pageStartKeys;
	}
	public void setPageStartKeys(List<String> pageStartKeys) {
		this.pageStartKeys = pageStartKeys;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getMaxQueryLoadPageSize() {
		return maxQueryLoadPageSize;
	}
	public void setMaxQueryLoadPageSize(int maxQueryLoadPageSize) {
		this.maxQueryLoadPageSize = maxQueryLoadPageSize;
	}
	public String getCurrentStartKey() {
		return currentStartKey;
	}
	public void setCurrentStartKey(String currentStartKey) {
		this.currentStartKey = currentStartKey;
	}
	public String getCurrentEndKey() {
		return currentEndKey;
	}
	public void setCurrentEndKey(String currentEndKey) {
		this.currentEndKey = currentEndKey;
	}
	public boolean isCacheAllData() {
		return cacheAllData;
	}
	public void setCacheAllData(boolean cacheAllData) {
		this.cacheAllData = cacheAllData;
	}
	
	
	
	
	
	
	public boolean isMaxLoading(){
		return maxQueryLoadPageSize>1 && pageNo>=pageStartKeys.size()-1;
	}
	
	public boolean hasStartKey(){
		if(currentStartKey.equals(CURRENT_KEY_NOT_INITED)||currentStartKey.equals(CURRENT_KEY_OUT_OF_INDEX)){
			return false;
		}
		return true;
	}
	
	public boolean hasEndKey(){
		if(currentEndKey.equals(CURRENT_KEY_NOT_INITED)||currentEndKey.equals(CURRENT_KEY_OUT_OF_INDEX)){
			return false;
		}
		return true;
	}
	
	public byte[] getStartKey(){
		if(this.hasStartKey()==false){
			return null;
		}
		try{
			return BytesUtils.parseValueString(currentStartKey);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return null;
	}
	
	public byte[] getEndKey(){
		if(this.hasEndKey()==false){
			return null;
		}
		try{
			return BytesUtils.parseValueString(currentEndKey);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 添加分页查询的结果集
	 * 功能1:按是否内存分页整合结果集
	 * 		1)内存分页:将结果集加到列表
	 * 		2)非内存分页:结果集覆盖当前列表
	 * 功能2:更新pageStartKeys
	 * 		1)更新currentStartKey
	 * 		2)更新currentEndKey
	 * 		3)更新后续页的startKey(对于maxQueryLoadSize>pageSize时有效)
	 * @param 查询结果集
	 */
	public void addQueryResult(List<CarTake> takes){
		if(cacheAllData){
			if(result==null){
				result=takes;
			}
			else{
				result.addAll(takes);
			}
		}
		else{
			result=takes;
		}
		
		if(takes!=null&&takes.size()>0){
			if(currentStartKey.equals(CURRENT_KEY_NOT_INITED)||currentEndKey.equals(CURRENT_KEY_OUT_OF_INDEX)){
				String key=BytesUtils.toValueString(takes.get(0).getId().getBytes());
				currentStartKey=key;
			}
		}
		
		if(takes!=null&&takes.size()>pageSize){
			if(currentEndKey.equals(CURRENT_KEY_NOT_INITED)||currentEndKey.equals(CURRENT_KEY_OUT_OF_INDEX)){
				String key=BytesUtils.toValueString(takes.get(pageSize).getId().getBytes());
				currentEndKey=key;
			}
		}
		
		int pageStartKeyIndex=pageNo;
		for(int rowIndex=0;rowIndex<takes.size();rowIndex=rowIndex+pageSize){
			if(pageStartKeyIndex>pageStartKeys.size()){
				String key=BytesUtils.toValueString(takes.get(rowIndex).getId().getBytes());
				pageStartKeys.add(key);
			}

			pageStartKeyIndex++;
		}
	}
	
	/**
	 * 添加分页查询的结果集
	 * 功能1:按是否内存分页整合结果集
	 * 		1)内存分页:将结果集加到列表
	 * 		2)非内存分页:结果集覆盖当前列表
	 * 功能2:更新pageStartKeys
	 * 		1)更新currentStartKey
	 * 		2)更新currentEndKey
	 * 		3)更新后续页的startKey(对于maxQueryLoadSize>pageSize时有效)
	 * @param 查询结果集
	 * @param 查询结果索引表的Key集
	 */
	public void addQueryResult(List<CarTake> takes, List<byte[]> indexKeys){
		if(cacheAllData){
			if(result==null){
				result=takes;
			}
			else{
				result.addAll(takes);
			}
		}
		else{
			result=takes;
		}
		
		if(indexKeys!=null&&indexKeys.size()>0){
			if(currentStartKey.equals(CURRENT_KEY_NOT_INITED)||currentEndKey.equals(CURRENT_KEY_OUT_OF_INDEX)){
				String key=BytesUtils.toValueString(indexKeys.get(0));
				currentStartKey=key;
			}
		}
		
		if(indexKeys!=null&&indexKeys.size()>pageSize){
			if(currentEndKey.equals(CURRENT_KEY_NOT_INITED)||currentEndKey.equals(CURRENT_KEY_OUT_OF_INDEX)){
				String key=BytesUtils.toValueString(indexKeys.get(pageSize));
				currentEndKey=key;
			}
		}
		
		int pageStartKeyIndex=pageNo;
		for(int rowIndex=0;rowIndex<indexKeys.size();rowIndex=rowIndex+pageSize){
			if(pageStartKeyIndex>pageStartKeys.size()){
				String key=BytesUtils.toValueString(indexKeys.get(rowIndex));
				pageStartKeys.add(key);
			}

			pageStartKeyIndex++;
		}
	}
	
	public void goNext(){
		pageNo=pageNo+1;
		
		this.refleshStartCurrentKey();
	}
	
	public void goLast(){
		pageNo=pageNo-1;
		if(pageNo<=0){
			pageNo=1;
		}
		
		this.refleshStartCurrentKey();
	}
	
	private void refleshStartCurrentKey(){
		if(pageStartKeys!=null&&pageStartKeys.size()>0){
			if(pageNo-1 < pageStartKeys.size()){
				currentStartKey=pageStartKeys.get(pageNo-1);
			}
			else{
				currentStartKey=CURRENT_KEY_OUT_OF_INDEX;
			}
			
			if(pageNo < pageStartKeys.size()){
				currentEndKey=pageStartKeys.get(pageNo);
			}
			else{
				currentEndKey=CURRENT_KEY_OUT_OF_INDEX;
			}
		}
		else{
			//pate entity is not inited
			currentStartKey=CURRENT_KEY_NOT_INITED;
			currentEndKey=CURRENT_KEY_NOT_INITED;
		}
	}
	
	public boolean hasInnerNextPage(){
		if(cacheAllData==false){
			return false;
		}
		
		if(pageStartKeys!=null && pageNo+1<pageStartKeys.size()){
			return true;
		}
		return false;
	}
	
	public boolean hasInnerLastPage(){
		if(cacheAllData==false){
			return false;
		}
		
		if(pageNo<=1 || result==null || result.size()==0){
			return false;
		}
		return true;
	}
	
	public List<CarTake> getPageData(){
		if(cacheAllData&&result!=null){
			List<CarTake> temp=new ArrayList<CarTake>();
			int start=(pageNo-1)*pageSize;
			for(int i=0;i<pageSize && start+i<result.size();i++){
				temp.add(result.get(start+i));
			}
			return temp;
		}
		else{
			return result;
		}
	}
}
