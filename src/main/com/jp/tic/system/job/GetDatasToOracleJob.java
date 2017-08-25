package com.jp.tic.system.job;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SpringApplicationContextUtils;
import com.jp.tic.framework.jdbc.JdbcDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.lang.DateUtil;

public class GetDatasToOracleJob {
	
	private  static JdbcDao nsJdbcDao ;
	@Autowired
	private CarTypeSearchService carTypeSearchService;
	
	private String styleStr = "yyyy-MM-dd HH:mm:ss";
	
	private Date minTime=null;
	
	boolean runingFlag=false;
	
	public void initConfig(){
		
		
	}

	public void handleDatasToOracle() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		int H=cal.get(Calendar.HOUR_OF_DAY);
		//只在以下时间段抽取数据
		if((H>=0 && H<8)||(H>11 && H<14)||(H>19 && H<=24)){
			while(!runingFlag){
				runingFlag=true;	
				Map<String, String> param = new HashMap<String, String>();
				String eTime=this.getEndTime();
				if(eTime ==null || eTime.length()==0){
					System.out.println("*******data_config has no time set****");
					runingFlag=false;
					break;
				}
				//System.out.print("eTime=========="+eTime);
			//	Calendar cal = Calendar.getInstance();
				cal.setTime(DateUtil.parseToDate(eTime, styleStr));
				Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
				int intervalTime = MapGetUtils.getIntValue(config, "getHbase.data.interval");
			//	cal.add(Calendar.HOUR_OF_DAY, -1);
				cal.add(Calendar.MINUTE, -intervalTime);
				String sTime =DateUtil.parseToString(cal.getTime(), styleStr);
				param.put("startTime", sTime);
				param.put("endTime", eTime);
				param.put("page.start", "0");
				param.put("page.limit", "2000");
				System.out.print("eTime/sTime=========="+eTime+"/"+sTime);
				String jsonParam = JSON.toJSONString(param);//查询条件
				//String jsonStr =carTypeSearchWS.carSearchInfo(jsonParam);
				Map<String, Object> resultMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
				List<CarTake> results = (List<CarTake>) resultMap.get("rows");
				if(results ==null){
					runingFlag=false;
					break;
				}
				System.out.println("results.size()=========="+results.size());
				List<CarTake> tmpList=null;
				for(int i=0;i<results.size();i++){
					if(tmpList==null){
						tmpList=new ArrayList<CarTake>();
					}
					tmpList.add(results.get(i));
					if(tmpList.size()==200||i==results.size()-1){
						this.insertDatas(tmpList);
						updateMinTime(this.minTime);
						tmpList=null;
					}
				}
				runingFlag=false;
			}
		}
	}
	
	public void insertDatas(List<CarTake> carList) {
		String sql = "insert into car_tab_temp( xxbh,hphm,kkbh,kkmc,sbbh,jgsj,cdbh,clsd,hpys,txsl,tx1)";
		//System.out.println("insert into sql............ "+sql);
		StringBuffer sqlBuf=new StringBuffer();
		for(int i=0;i<carList.size();i++){
			CarTake cartake=carList.get(i);
			if(cartake !=null){
				if(sqlBuf.length()>0){
					sqlBuf.append("union all \n");
				}
				String jgsjStr=DateUtil.parseToString(cartake.getJgsj(), styleStr);
				sqlBuf.append("select '"+this.getRandomXxbh(cartake)+"','"+cartake.getHphm()+"'");
				sqlBuf.append(",'"+cartake.getKkbh()+"','"+cartake.getKkmc()+"'");
				sqlBuf.append(",'"+cartake.getSbbh()+"'");
				sqlBuf.append(",to_date('"+jgsjStr+"','yyyy-mm-dd hh24:mi:ss')");
				sqlBuf.append(",'"+cartake.getCdbh()+"','30','"+cartake.getHpys()+"'");
				sqlBuf.append(",'1','"+cartake.getTx1()+"'");//"',to_date('"+"",'"+cartake.getCdbh()+"','30','1','"+cartake.getTx1()+"'");
				sqlBuf.append(" from dual \n");
			}
			if(i==carList.size()-1){
				minTime=cartake.getJgsj();
			}
		}
		sql=sql+sqlBuf.toString();
//		Object[] args = {
//				cartake.getXxbh(),
//				cartake.getHphm(),
//				cartake.getKkbh(),
//				cartake.getSbbh(),
//				cartake.getJgsj(),
//				cartake.getCdbh(),
//				cartake.getTxsl(),
//				cartake.getTx1()
//		};
		this.exeTable(sql);
	}
	public void exeTable(String sql){
	//	System.out.println("exe sql======="+sql);
		nsJdbcDao = (JdbcDao)SpringApplicationContextUtils.getContext().getBean("nsJdbcDao");
		nsJdbcDao.getJdbcTemplate().execute(sql);
	}
	public String getEndTime(){
		String result="";
		String sql="select * from data_config ";
		nsJdbcDao = (JdbcDao)SpringApplicationContextUtils.getContext().getBean("nsJdbcDao");
		List<Map<String,Object>> tmpList=nsJdbcDao.getJdbcTemplate().queryForList(sql);
		if(tmpList.size()>0){
			result=(String) tmpList.get(0).get("STIME");
		}
		return result;
	}
	
	public void updateMinTime(Date minDate){
		String minStr =DateUtil.parseToString(minDate, styleStr);
		String sql="update data_config set stime='"+minStr+"' where rownum<2";
		this.exeTable(sql);
	}
	
	public String getRandomXxbh(CarTake cartake){
		String randomXxbh="";
//		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
//		int rand = new Random().nextInt(1000);
//		randomXxbh = cartake.getSbbh()+cartake.getHphm()+format.format(cartake.getJgsj());
//		System.out.println("=============Xxbh===="+randomXxbh);
		String randomName = UUID.randomUUID().toString();
		return randomName;
	}
}
