package com.jp.tic.common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class DataUtils {
	@Autowired
	private DictionaryService dictionaryService;
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public final SimpleDateFormat solrFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	
	public boolean checkHphmValid(String hphm){
		boolean flag=true;
		 
    		if (!StringUtil.checkStr(hphm) ||
    				StringUtil.equals(hphm, "-") ||
    				StringUtil.equals(hphm, "无牌") ||
    				StringUtil.equals(hphm, "车牌") ||
    				StringUtil.equals(hphm, "无车牌") ||
    				StringUtil.equals(hphm, "null")) {
    			flag=false;
    		}
    	
		
		return flag;
		
	}	
	/**
	 * 根据字典表的value值查询名称信息
	 * @param groupName 字典表的组名
	 * @param value 字典表的value值
	 * @return
	 */
	public String getDicNameByValue(String groupName,String value){
		String dicName="";
		List<EnumItem> resultlist = dictionaryService.getEnumListByCode(groupName);
		
		if (!StringUtil.checkStr(value)) {
    		return dicName;
    	}
    	if (resultlist != null && resultlist.size() > 0) {
			for (EnumItem en : resultlist) {
				if (StringUtil.equals(en.getItemValue(), value)) {
					dicName = en.getItemName();
				}
			}
    	}
		return dicName;
		
	}
	
	/**
	 * 拼凑车辆品牌、类型、年款的solr查询语句
	 * @param brand
	 * @param type
	 * @param caryear
	 * @return
	 */
	public String getCarBrandSql(String brand,String type,String caryear){
		StringBuffer paramsStr=new StringBuffer();
		List<String> carBrands = new ArrayList<String>();
		List<String> carTypes = new ArrayList<String>();
		List<String> carYears = new ArrayList<String>();
		String carBrandStr=brand;
		paramsStr.append(this.getSolrOrQuery("brand", carBrandStr));
		if(caryear !=null && caryear !=""){
			String[] brandTypeYears =caryear.split(",");
			for (int i = 0; i < brandTypeYears.length; i++) {
				carBrands.add(brandTypeYears[i].split("_")[0]);
				carTypes.add(brandTypeYears[i].split("_")[1]);
				carYears.add(brandTypeYears[i].split("_")[2]);
			}
		}else if(type !=null && type !=""){
			String[] brandTypes = type.split(",");
			for (int i = 0; i < brandTypes.length; i++) {
				carBrands.add(brandTypes[i].split("_")[0]);
				carTypes.add(brandTypes[i].split("_")[1]);
			}
		}
		if(carTypes.size()>0){
			String carTypeStr = this.dealReplyData(carTypes);
			String typeQuery=this.getSolrOrQuery("type", carTypeStr);
			paramsStr.append(" AND "+typeQuery);
		}
		if(carYears.size()>0){
			String carYearStr = this.dealReplyData(carYears);
			String carYearQuery=this.getSolrOrQuery("caryear", carYearStr);
			paramsStr.append(" AND "+carYearQuery);
		}
		return paramsStr.toString();
	}
	
	/**
	 * 数据去重
	 * @param datas
	 * @return
	 */
	public String dealReplyData(List<String> datas) {
		List<String> tempList= new ArrayList<String>();  
	    for(String str : datas){  
	        if(!tempList.contains(str)){  
	            tempList.add(str);  
	        }  
	    }  
	    String carBrandStr = "";
	    for (String brandStr : tempList) {
	    	if (StringUtil.checkStr(carBrandStr)) {
	    		carBrandStr += ",";
	    	}
	    	carBrandStr += brandStr;
	    }
	    return carBrandStr;
	}
	/**
	 * 根据给定的fileId拼凑solr的OR查询语句
	 * @param filedId
	 * @param value 多值情况用,隔开
	 * @return
	 */
	public String getSolrOrQuery(String filedId,String value){
		StringBuffer query=new StringBuffer();
		String[] values=value.split(",");
		for(int i=0;i<values.length;i++){
			if(query.length()>0){
				query.append(" OR "+filedId+":"+values[i]);
			}else{
				query.append("("+filedId+":"+values[i]);
			}
		}
		if(query.length()>0){
			query.append(")");
		}
		return query.toString();
	}
	
	public String getCarHiddenSolrQuery(String startdate,String enddate){
		StringBuffer query=new StringBuffer();
		int beforeDataLen  = Integer.parseInt(dictionaryService.getStoreValueByName("CarHidden","回溯天数"));
		int afterDataLen  = Integer.parseInt(dictionaryService.getStoreValueByName("CarHidden","延后天数"));
		try {
			//形成案发前查询的开始时间
			Calendar calendar=Calendar.getInstance();   
				calendar.setTime(formatter.parse(startdate));
			calendar.add(5, -beforeDataLen);
			Date backStartDate=calendar.getTime();
			//形成案发后查询的结束时间
			calendar.setTime(formatter.parse(enddate)); 
			calendar.add(5, afterDataLen);
			Date afterEndDate=calendar.getTime();
			
			query.append("(["+solrFormat.format(backStartDate)+" TO "+solrFormat.format(formatter.parse(startdate))+"]"); 
			query.append("OR ["+solrFormat.format(formatter.parse(enddate))+" TO "+solrFormat.format(afterEndDate)+"])"); 
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return query.toString();
	}

}
