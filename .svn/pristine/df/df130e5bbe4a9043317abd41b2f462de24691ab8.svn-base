package com.jp.tic.business.alarm.service.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.alarm.dao.ControlAlarmDAO;
import com.jp.tic.business.alarm.service.ControlAlarmService;
import com.jp.tic.system.dao.OrganizationDao;

@Service
public class ControlAlarmInfoServiceImpl implements ControlAlarmService {
	
	@Autowired
	ControlAlarmDAO controlAlarmDAO;
	@Autowired
	OrganizationDao organizationDao;
	
	private List<Map<String,String>> deptList=null;

	/**
	 * 分页查询布控告警信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryControlAlarmInfo(Map<String, String> param) {
		return controlAlarmDAO.queryControlAlarmInfo(param);
	}
	
	public List<Map<String, String>> queryControlAlarmInfos(Map<String, String> param) {
		return controlAlarmDAO.queryControlAlarmInfos(param);
	}
	
	/**
	 * 统计布控告警信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countControlAlarmDatas(Map<String, String> param) {
		return controlAlarmDAO.countControlAlarmDatas(param);
	}
	
	/**
	 * 查询布控告警详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> alarmControlDetail(Map<String, String> param) {
		return controlAlarmDAO.alarmControlDetail(param);
	}
	
	/**
	 * 导出布控告警信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportControlAlarmById(String[] partIds) {
		return controlAlarmDAO.exportControlAlarmById(partIds);
	}
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param) {
		return controlAlarmDAO.exportQuerySql(param);
	}
	
	/**
	 * 通过用户勾选图片的ID，获取图片URL
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadImgUrlByIds(Map<String, String> param) {
		return controlAlarmDAO.loadImgUrlByIds(param);
	}
	
	/**
	 * 首页全文检索查询布控告警信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> firstPageAlarmInfo(Map<String, String> param) {
		return controlAlarmDAO.firstPageAlarmInfo(param);
	}

	@Override
	public int getTotalAlarmDatas(Map<String, String> param) {
		// TODO Auto-generated method stub
		return controlAlarmDAO.getTotalAlarmDatas(param);
	}

	@Override
	public List<Map<String,Object>> getAlarmDatasByGroup(Map<String, String> param) {
		List<Map<String,Object>> resultList=new ArrayList<Map<String,Object>>();
		 if(deptList ==null){
			 deptList=organizationDao.allOrgInfo();
		 }
		int totalCount=controlAlarmDAO.getTotalAlarmDatas(param);
		List<Map<String,String>> tmpList= controlAlarmDAO.getAlarmDatasByGroup(param);
		for(int j=0;j<deptList.size();j++){
			Map<String,Object> tmpMap=new HashMap<String,Object>();
			Map<String,String> deptMap=deptList.get(j);
			String targetDwbh=deptMap.get("DWBH");
			String targetDwmc=deptMap.get("DWMC");
			float value=0;
			for(int i=0;i<tmpList.size();i++){
				Map<String,String> tmpResult=tmpList.get(i);
				String dwbh=tmpResult.get("DWBH");
				if(dwbh.equals(targetDwbh)){
					String strCount=tmpResult.get("COUNT");
					targetDwmc=targetDwmc+"("+strCount+")";
					int intCount=Integer.parseInt(strCount);
					value=(float)intCount/(float)totalCount*100;
					break;
				}
			}
			tmpMap.put("name", targetDwmc);
			tmpMap.put("value", value);
			resultList.add(tmpMap);
		}
		return resultList;
		
	}

	@Override
	public List<Map<String, Object>> getValidControlByGroup(Map<String, String> param) {
		List<Map<String,Object>> resultList=new ArrayList<Map<String,Object>>();
		 if(deptList ==null){
			 deptList=organizationDao.allOrgInfo();
		 }
		 int totalCount=controlAlarmDAO.getTotalValidControl(param);
		List<Map<String,String>> tmpList= controlAlarmDAO.getValidControlByGroup(param);
		for(int j=0;j<deptList.size();j++){
			Map<String,Object> tmpMap=new HashMap<String,Object>();
			Map<String,String> deptMap=deptList.get(j);
			String targetDwmc=deptMap.get("DWMC");
			float value=0;
			for(int i=0;i<tmpList.size();i++){
				Map<String,String> tmpResult=tmpList.get(i);
				String bjdw=tmpResult.get("BKDW");
				if(bjdw.equals(targetDwmc)){
					String strCount=tmpResult.get("COUNT");
					targetDwmc=targetDwmc+"("+strCount+")";
					int intCount=Integer.parseInt(strCount);
					value=(float)intCount/(float)totalCount*100;
					break;
				}
			}
			tmpMap.put("name", targetDwmc);
			tmpMap.put("value", value);
			resultList.add(tmpMap);
		}
		return resultList;
	}
}
