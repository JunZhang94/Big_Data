package com.jp.tic.analyze.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ctc.wstx.util.DataUtil;
import com.jp.tic.analyze.dao.CarTakeDao;
import com.jp.tic.analyze.dao.MountOnlineDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.sun.org.apache.commons.collections.Buffer;

@SuppressWarnings("unchecked")
@Repository
public class MountOnlineDaoImpl extends BaseDao implements MountOnlineDao {
	@Autowired
	CarTakeDao carTakeDao;
	/**
	 * 卡口在线统计
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineStatisticsInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select a.KKBH,c.KKMC,a.start_time,a.end_time,a.recieve_count,a.reciever_ip," +
				"a.non_hphm_count,a.hphm_count,case when a.recieve_count = 0 or  ceil((sysdate - b.NEW_NED_TIEM) * 24 * 60) > (select t.value from j_Sys_Config t where  t.code='FaultState') then '0' else '1'" +
				"end as ON_LINE_FLAG from DIS_GATE_COUNT_STATUS a,MOUNT_TAB c," +
				" (select KKBH,max(START_TIME) NEW_TIME, max(END_TIME) as NEW_NED_TIEM from DIS_GATE_COUNT_STATUS group by KKBH)" +
				" b where a.KKBH=b.KKBH and a.KKBH = c.KKBH and a.START_TIME=b.NEW_TIME");
		StringBuffer mountStr = new StringBuffer();
		sqlBuffer.append(" and (");
		for (int i = 0; i < mounts.size(); i++) {
			if (StringUtil.checkObj(mountStr)) {
				mountStr.append(" or ");
			}
			mountStr.append("a.KKBH = '" + mounts.get(i).get("KKBH") + "'");
		}
		sqlBuffer.append(mountStr);
		sqlBuffer.append(")");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		//遍历所有的卡点，看是否存在卡点不在表DIS_GATE_COUNT_STATUS中，表示离线
		List<Map<String, String>> outLines = new ArrayList<Map<String,String>>();
		List<Map<String, String>> filterResults = this.removeDuplicateWithOrder(results);
		outLines.addAll(filterResults);
		if (filterResults != null && filterResults.size() > 0) {
			//循环所有接收数据，查看是否存在接收为0的数据，如果存在，表示目前次卡口已经离线
			/*for (Map<String, String> dataMap : results) {
				if (StringUtil.equals(dataMap.get("RECIEVE_COUNT"), "0")) {
					dataMap.put("ON_LINE_FLAG", "离线");
					outLines.add(dataMap);
				}
			}*/
			boolean havingFlag = false;
			for (Map<String, String> mountMap : mounts) {
				for (Map<String, String> dataMap : filterResults) {
					if (StringUtil.equals(mountMap.get("KKBH"), dataMap.get("KKBH"))) {
						havingFlag = true;
						break;
					}
				}
				if (!havingFlag) {
					mountMap.put("ON_LINE_FLAG", "0");
					mountMap.put("KKMC", mountMap.get("KKMC"));
					outLines.add(mountMap);
				}
				havingFlag = false;
			}
		}
		return outLines;
	}
	
	/**
	 * 卡口在线状态查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlienStatusInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select a.KKBH,c.KKMC,a.start_time, a.end_time, a.reciever_ip, a.status,a.jgsj,d.dwbh,d.dwmc," +
				"case when ceil((sysdate - a.JGSJ) * 24 * 60) > (select t.value from j_Sys_Config t where t.code = 'FaultState') " +
				"then '0' else '1' end as ONLINE_STATUS from DIS_GATE_TIME_STATUS a,(select KKBH, max(END_TIME) NEW_TIME " +
				"from DIS_GATE_TIME_STATUS group by KKBH) b,MOUNT_TAB c");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(",MGMTDEPT_TAB d,AREA_TAB e");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(",MGMTDEPT_TAB d");
	    }
	    sqlBuffer.append(" where a.kkbh = b.kkbh and a.END_TIME = b.NEW_TIME and a.kkbh = c.kkbh");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwxzqh = e.qydm and e.qydm = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwbh = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	sqlBuffer.append(" and c.kkbh = '440" + param.get("orgId") + "'");
	    }
	    sqlBuffer.append(" and c.VERIFY_STATUS = 1");
	    System.out.println("#######---mountOnlienStatusInfo sql===="+sqlBuffer.toString());
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		//遍历所有的卡点，看是否存在卡点不在表DIS_GATE_COUNT_STATUS中，表示离线
		List<Map<String, String>> outLines = new ArrayList<Map<String,String>>();
		List<Map<String, String>> filterResults = this.removeDuplicateWithOrder(results);
		outLines.addAll(filterResults);
		boolean havingFlag = false;
		for (Map<String, String> mountMap : mounts) {
			for (Map<String, String> dataMap : filterResults) {
				if (StringUtil.equals(mountMap.get("KKBH"), dataMap.get("KKBH"))) {
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				mountMap.put("DWMC", mountMap.get("DWMC"));
				mountMap.put("ONLINE_STATUS", "0");
				mountMap.put("KKMC", mountMap.get("KKMC"));
				outLines.add(mountMap);
			}
			havingFlag = false;
		}
		return outLines;
	}
	@Override
	public List<Map<String, String>> mountOnlienStatusInfoNew(
			Map<String, String> mounts, Map<String, String> param) throws Exception {
		// TODO Auto-generated method stub
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		List<Map<String, String>> resultem = new ArrayList<Map<String,String>>();
		List<String> kkbhs = new ArrayList<String>();
		SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		kkbhs.add(mounts.get("KKBH"));
		Calendar cal = Calendar.getInstance();
		Date nowDate = cal.getTime();
		cal.add(Calendar.HOUR, -24);
		Date startDate = cal.getTime();
		Calendar calt = Calendar.getInstance();
		calt.add(Calendar.MINUTE, -30);
		Date timeoutDate = calt.getTime();
		//List<CarTake> result = carTakeDao.getMountSnapshot(kkbhs, startDate, nowDate, 1);
		List<CarTake> result = carTakeDao.getMountSnapshot(kkbhs, startDate, nowDate, 1);
		Map<String,CarTake> resultMap = new HashMap<String, CarTake>();
		for(int i=0;i<result.size();i++){
			resultMap.put(result.get(i).getKkbh(), result.get(i));
		}
		Map<String,String> resultMap4out = new HashMap<String, String>(); 
		if(resultMap.containsKey(kkbhs.get(0))){
			if(resultMap.get(mounts.get("KKBH")).getJgsj().after(timeoutDate)){
				resultMap4out.put("KKBH", mounts.get("KKBH"));
				resultMap4out.put("DWMC", mounts.get("DWMC"));			
				try {
					resultem = this.queryBySql("select KKMC from " + param.get("tableName") + " where KKBH ='"+mounts.get("KKBH")+"'");
				} catch (Exception e) {
					e.printStackTrace(); 
				}
				resultMap4out.put("KKMC", resultem.get(0).get("KKMC"));
				resultMap4out.put("JGSJ", sdf.format(resultMap.get(mounts.get("KKBH")).getJgsj()));
				resultMap4out.put("ONLINE_STATUS", "1");
				//增加开启与停止虚拟卡口的设备信息
				resultMap4out.put("LXDH", mounts.get("LXDH"));
				resultMap4out.put("LXDZ", mounts.get("LXDZ"));
				resultMap4out.put("XNKK_STATUS", mounts.get("XNKK_STATUS"));
			}else{
				resultMap4out.put("KKBH", mounts.get("KKBH"));
				resultMap4out.put("DWMC", mounts.get("DWMC"));			
				try {
					resultem = this.queryBySql("select KKMC from " + param.get("tableName") + " where KKBH ='"+mounts.get("KKBH")+"'");
				} catch (Exception e) {
					e.printStackTrace(); 
				}
				resultMap4out.put("KKMC", resultem.get(0).get("KKMC"));
				resultMap4out.put("JGSJ", sdf.format(resultMap.get(mounts.get("KKBH")).getJgsj()));
				resultMap4out.put("ONLINE_STATUS", "0");
				//增加开启与停止虚拟卡口的设备信息
				resultMap4out.put("LXDH", mounts.get("LXDH"));
				resultMap4out.put("LXDZ", mounts.get("LXDZ"));
				resultMap4out.put("XNKK_STATUS", mounts.get("XNKK_STATUS"));
			}
		}else{
			resultMap4out.put("KKBH", mounts.get("KKBH"));
			resultMap4out.put("DWMC", mounts.get("DWMC"));
			try {
				resultem = this.queryBySql("select KKMC from " + param.get("tableName") + " where kkbh ='"+mounts.get("KKBH")+"'");
			} catch (Exception e) {
				e.printStackTrace(); 
			}
			resultMap4out.put("KKMC", resultem.get(0).get("KKMC"));
			resultMap4out.put("JGSJ", "一天内没有接收到数据");
			resultMap4out.put("ONLINE_STATUS", "0");
			//增加开启与停止虚拟卡口的设备信息
			resultMap4out.put("LXDH", mounts.get("LXDH"));
			resultMap4out.put("LXDZ", mounts.get("LXDZ"));
			resultMap4out.put("XNKK_STATUS", mounts.get("XNKK_STATUS"));
		}
		results.add(resultMap4out);
		
		return results;
	}
	
	/**
	 *  首页卡口在线状态柱状图重新设计，根据hbase数据作为判断标准
	 * @param mounts 卡口集合
	 * @return 处理结果
	 * @throws Exception 异常
	 */
	public List<Map<String, String>> firstPageMountStatus(List<Map<String, String>> mounts) throws Exception {
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		List<String> kkbhs = new ArrayList<String>();
		for (Map<String, String> kkbhMap : mounts) {
			kkbhs.add(kkbhMap.get("KKBH"));
		}
		Calendar cal = Calendar.getInstance();
		Date nowDate = cal.getTime();
		Calendar calt = Calendar.getInstance();
		calt.add(Calendar.MINUTE, -30);
		Date startDate = calt.getTime();
		List<CarTake> result = carTakeDao.dealWithRealCarData(kkbhs, startDate, nowDate);
		Map<String,String> resultMap = null;
		boolean boo = false;
		for (Map<String, String> tempMap : mounts) {
			boo = false;
			resultMap = new HashMap<String, String>(); 
			if (result != null && result.size() > 0) {
				for ( CarTake carTake : result ) {
					if (StringUtil.equals(tempMap.get("KKBH"), carTake.getKkbh())) {
						boo = true;
						break;
					}
				}
			}
			if (boo) {
				resultMap.put("DWMC", tempMap.get("DWMC"));
				resultMap.put("DWBH", tempMap.get("DWBH"));			
				resultMap.put("ONLINE_STATUS", "1");
			} else {
				resultMap.put("DWMC", tempMap.get("DWMC"));
				resultMap.put("DWBH", tempMap.get("DWBH"));
				resultMap.put("ONLINE_STATUS", "0");
			}
			results.add(resultMap);
		}
		return results;
	}
	
	/**
	 * 定时调度卡口在线状态数据，统计一个小时内的卡口在线状态，根据hbase数据作为判断标准
	 * @param mounts 卡口集合
	 * @return 处理结果
	 * @throws Exception 异常
	 */
	public List<Map<String, String>> historyMountStatus(Map<String, String> mounts, Date startDate, Date endDate) throws Exception {
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		List<String> kkbhs = new ArrayList<String>();
		kkbhs.add(mounts.get("KKBH"));
		List<CarTake> result = carTakeDao.getMountSnapshot(kkbhs, startDate, endDate, 1);
		int flag = 0;
		while (result == null) {
			flag = flag + 1;
			result = carTakeDao.getMountSnapshot(kkbhs, startDate, endDate, 1);
			if (flag == 3) { //执行了3次还是空的说明系统异常,停止执行
				flag = 0;
				break;
			}
		}
		Map<String,String> resultMap = new HashMap<String, String>(); 
		if(result != null && result.size() > 0){
			resultMap.put("DWBH", mounts.get("DWBH"));		
			resultMap.put("ONLINE_STATUS", "1");
		}
		results.add(resultMap);
		return results;
	}
	
	/**
	 * 添加卡口接收状态时时数据
	 * @param datas 查询参数
	 * @return 返回结果
	 */
	public int addMountStatusInfo(List<Map<String, String>> datas) {
		int saveFlag = 0;
		String[] sqls = this.mountStatusSqls(datas);
		if (sqls != null && sqls.length > 0) {
			saveFlag = this.updateBatchSql(sqls);
		}
		return saveFlag;
	}
	
	/**
	 * 添加卡口接收状态时时数据sql语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String[] mountStatusSqls(List<Map<String, String>> datas) { 
		StringBuffer buffer = null;
		String[] sqls = null;
		if (datas != null && datas.size() > 0) {
			sqls = new String[datas.size()];
			for (int i = 0; i < datas.size(); i++) {
				buffer = new StringBuffer();
				buffer.append("insert into DIS_GATE_TIME_STATUS_HISTORY(ID,AMOUNTS,ANALYZE_HOUR,DWBH,DWMC,QYDM,QYMC) values (SEQ_DIS_GATE_STATUS_HISTORY.NEXTVAL");
				if (StringUtil.checkObj(datas.get(i).get("AMOUNTS"))) {
					buffer.append("," + datas.get(i).get("AMOUNTS"));
				} else {
					buffer.append(",");
				}
				if (StringUtil.checkObj(datas.get(i).get("ANALYZE_HOUR"))) {
					buffer.append(",to_date('" + datas.get(i).get("ANALYZE_HOUR") + "', 'yyyy-mm-dd HH24:mi:ss')");
				} else {
					buffer.append(",''");
				}
				if (StringUtil.checkObj(datas.get(i).get("DWBH"))) {
					buffer.append(",'" + datas.get(i).get("DWBH") + "'");
				} else {
					buffer.append(",''");
				}
				if (StringUtil.checkObj(datas.get(i).get("DWMC"))) {
					buffer.append(",'" + datas.get(i).get("DWMC") + "'");
				} else {
					buffer.append(",''");
				}
				if (StringUtil.checkObj(datas.get(i).get("QYDM"))) {
					buffer.append(",'" + datas.get(i).get("QYDM") + "'");
				} else {
					buffer.append(",''");
				}
				if (StringUtil.checkObj(datas.get(i).get("QYMC"))) {
					buffer.append(",'" + datas.get(i).get("QYMC") + "'");
				} else {
					buffer.append(",''");
				}
				buffer.append(")"); 
				sqls[i] = buffer.toString();
			}
		}
		return sqls;
	}
	
	/**
	 * 查询卡口在线历史最新数据
	 * @return 查询结果
	 */
	public List<Map<String, String>> findNewistData() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select to_char(max(t.analyze_hour),'yyyy-mm-dd hh24:mi:ss') as analyze_hour from DIS_GATE_TIME_STATUS_HISTORY t");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	@Override
	public List<Map<String, String>> mountOnlienStatusInfoNewByfx(
			List<Map<String, String>> mounts, Map<String, String> param) throws Exception {
		// TODO Auto-generated method stub
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		List<Map<String, String>> resultem = new ArrayList<Map<String,String>>();
		List<String> fxbhs = new ArrayList<String>();
		List<String> kkbhs = new ArrayList<String>();
		SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for(int i = 0;i<mounts.size();i++){
			fxbhs.add(mounts.get(i).get("FXBH"));
			kkbhs.add(mounts.get(i).get("KKBH"));
		}	
			
		Calendar cal = Calendar.getInstance();
		Date nowDate = cal.getTime();
		cal.add(Calendar.HOUR, -24);
		Date startDate = cal.getTime();
		Calendar calt = Calendar.getInstance();
		calt.add(Calendar.MINUTE, -30);
		Date timeoutDate = calt.getTime();
		//List<CarTake> result = carTakeDao.getMountSnapshot(kkbhs, startDate, nowDate, 1);
		//List<CarTake> result = carTakeDao.getMountSnapshot(kkbhs, startDate, nowDate, 1);
		
		List<CarTake> result = carTakeDao.getMountSnapshotByfx(kkbhs.get(0),fxbhs, startDate, nowDate, 1);
		Map<String,CarTake> resultMap = new HashMap<String, CarTake>();
		for(int i=0;i<result.size();i++){
			resultMap.put(result.get(i).getFxbh(), result.get(i));
		}
			
			for(int i=0;i<fxbhs.size();i++){
			Map<String,String> resultMap4out = new HashMap<String, String>();
			if(resultMap.containsKey(fxbhs.get(i))){
				if(resultMap.get(mounts.get(i).get("FXBH")).getJgsj().after(timeoutDate)){
					resultMap4out.put("KKBH", mounts.get(i).get("FXBH"));
					resultMap4out.put("DWMC", mounts.get(i).get("DWMC"));			
					try {
						resultem = this.queryBySql("select direction_name as FXMC from C_DIRECTION_TAB where direction_number ='"+fxbhs.get(i)+"'");
					} catch (Exception e) {
						e.printStackTrace(); 
					}
					resultMap4out.put("KKMC", resultem.get(0).get("FXMC"));
					resultMap4out.put("JGSJ", sdf.format(resultMap.get(fxbhs.get(i)).getJgsj()));
					resultMap4out.put("ONLINE_STATUS", "1");
				}else{
					resultMap4out.put("FXBH", mounts.get(i).get("FXBH"));
					resultMap4out.put("DWMC", mounts.get(i).get("DWMC"));			
					try {
						resultem = this.queryBySql("select direction_name as FXMC from C_DIRECTION_TAB where direction_number ='"+fxbhs.get(i)+"'");
					} catch (Exception e) {
						e.printStackTrace(); 
					}
					resultMap4out.put("KKMC", resultem.get(0).get("FXMC"));
					resultMap4out.put("JGSJ", sdf.format(resultMap.get(fxbhs.get(i)).getJgsj()));
					resultMap4out.put("ONLINE_STATUS", "0");
				}
			}else{
				resultMap4out.put("KKBH", mounts.get(i).get("FXBH"));
				resultMap4out.put("DWMC", mounts.get(i).get("DWMC"));
				try {
					resultem = this.queryBySql("select direction_name as FXMC from C_DIRECTION_TAB where direction_number ='"+fxbhs.get(i)+"'");
				} catch (Exception e) {
					e.printStackTrace(); 
				}
				resultMap4out.put("KKMC", resultem.get(0).get("FXMC"));
				resultMap4out.put("JGSJ", "一天内没有接收到数据");
				resultMap4out.put("ONLINE_STATUS", "0");
			}
			results.add(resultMap4out);
		}
			
		
		return results;
	}
	
	/**
	 * 卡口在线状态图表查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineChartInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		List<Map<String, String>> results = null;
		String sqlStr = this.initQuerySql(param);
		try {
			results = this.queryBySql(sqlStr);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		//遍历所有的卡点，看是否存在卡点不在表DIS_GATE_COUNT_STATUS中，表示离线
		List<Map<String, String>> outLines = new ArrayList<Map<String,String>>();
		//List<Map<String, String>> filterResults = this.removeDuplicateWithOrder(results);
		outLines.addAll(results);
		boolean havingFlag = false;
		/*for (Map<String, String> mountMap : mounts) {
			for (Map<String, String> dataMap : filterResults) {
				if (StringUtil.equals(mountMap.get("KKBH"), dataMap.get("KKBH"))) {
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				mountMap.put("ONLINE_STATUS", "0");
				mountMap.put("KKMC", mountMap.get("KKMC"));
				outLines.add(mountMap);
			}
			havingFlag = false;
		}*/
		return outLines;
	}
	
	/**
	 * 卡口离线状态统计
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOutOnlineChartInfo(Map<String, String> param) {
		List<Map<String, String>> results = null;
		String sqlStr = this.initQuerySql(param);
		try {
			results = this.queryBySql(sqlStr);
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		List<Map<String, String>> mountsResult = this.countAllMountsByDwbh();
		if (results != null && results.size() > 0) {
			for (Map<String, String> dataMap : results) {
				for (Map<String, String> mountMap : mountsResult) {
					if (StringUtil.equals(dataMap.get("PERIOD").trim(), mountMap.get("DWMC").trim())) {
						dataMap.put("COUNT", StringUtil.toString(StringUtil.toInt(mountMap.get("AMOUNTS")) - StringUtil.toInt(dataMap.get("COUNT"))));
						break;
					}
				}
			}
		}
		return results;
	}
	
	/**
	 * 组装查询sql
	 * @param param 查询参数
	 * @return 组装结果
	 */
	public String initQuerySql(Map<String, String> param) {
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select dwmc as PERIOD, count(1) as COUNT from (");
		sqlBuffer.append("select f.dwmc,KKBH,KKMC from (");
		sqlBuffer.append("select a.KKBH,c.KKMC,d.dwmc," +
				"case when ceil((a.start_time - a.JGSJ) * 24 * 60) > (select t.value from j_Sys_Config t where t.code = 'FaultState') " +
				"then '0' else '1' end as ONLINE_STATUS from DIS_GATE_TIME_STATUS a,MOUNT_TAB c");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(",MGMTDEPT_TAB d,AREA_TAB e");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(",MGMTDEPT_TAB d");
	    }
	    sqlBuffer.append(" where a.kkbh = c.kkbh");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwxzqh = e.qydm and e.qydm = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwbh = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	sqlBuffer.append(" and c.kkbh = '440" + param.get("orgId") + "'");
	    }
	    if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
	    	sqlBuffer.append(" and a.start_time between " +
	    			"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')");
	    }
	    sqlBuffer.append(") f where ONLINE_STATUS = '1' group by dwmc,KKBH,KKMC");
	    sqlBuffer.append(") group by dwmc");
	    return sqlBuffer.toString();
	}
	
	/**
	 * 跟单位编号统计所在卡口的数量
	 * @return 查询结果
	 */
	public List<Map<String, String>> countAllMountsByDwbh() {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(1) as amounts,dwbh,dwmc from (select a.kkbh,b.dwbh,b.dwmc from MOUNT_TAB a,MGMTDEPT_TAB b where a.dwbh = b.dwbh) group by dwbh,dwmc");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 统计所有卡口的数量
	 * @return 查询结果
	 */
	public List<Map<String, String>> countAllMounts() {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(1) as amounts, qymc as DWMC from (select c.qymc from MOUNT_TAB a, " +
				"MGMTDEPT_TAB b,area_tab c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm) group by qymc");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 数据去重
	 * @param results 目标结果集
	 * @return 处理后结果集
	 */
	public List<Map<String, String>> removeDuplicateWithOrder(List<Map<String, String>> results) {     
		if (results != null && results.size() > 0) {
			for (int i = 0 ; i < results.size() - 1 ; i ++ ) {
				for (int  j = results.size() -  1 ; j > i; j -- ) {
					if (StringUtil.equals(results.get(i).get("KKBH"), results.get(j).get("KKBH"))) {
						results.remove(j);
					}
				}
			}
		}
		return results;
	}
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineTrendChartInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		String sql = this.initTrendChartSql(param);
	    List<Map<String, String>> results = null;
		try {
			results = this.queryBySql(sql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		List<Map<String, String>> guagnzhouDatas = this.dealResultForGuagnzhou(results);
		results.addAll(guagnzhouDatas);
	    return results;
	}
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineTrendChartOnlyLineInfo(Map<String, String> param) {
		String sql = this.initTrendChartOnlyLineSql(param);
	    List<Map<String, String>> results = null;
		try {
			results = this.queryBySql(sql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
	    return results;
	}
	
	/**
	 * 组装趋势图sql语句
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String initTrendChartSql(Map<String, String> param) {
		StringBuffer sqlBuffer = new StringBuffer();
		/*if (StringUtil.equals(param.get("orgType"), "0")) { //选的是广州市
			sqlBuffer.append("select period, sum(count) as count from (");
		}*/
		sqlBuffer.append("select dwmc, count(1) as COUNT, datatime as PERIOD from (");
		sqlBuffer.append("select f.dwmc,KKBH,KKMC,datatime from (");
		sqlBuffer.append("select a.KKBH,c.KKMC,d.dwmc,to_char(start_time, 'yyyy-mm-dd') as datatime," +
				"case when ceil((a.start_time - a.JGSJ) * 24 * 60) > (select t.value from j_Sys_Config t where t.code = 'FaultState') " +
				"then '0' else '1' end as ONLINE_STATUS from DIS_GATE_TIME_STATUS a,MOUNT_TAB c");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(",MGMTDEPT_TAB d,AREA_TAB e");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(",MGMTDEPT_TAB d");
	    }
	    sqlBuffer.append(" where a.kkbh = c.kkbh");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwxzqh = e.qydm and e.qydm = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwbh = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	sqlBuffer.append(" and c.kkbh = '440" + param.get("orgId") + "'");
	    }
	    if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
	    	sqlBuffer.append(" and a.start_time between " +
	    			"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')");
	    }
	    sqlBuffer.append(") f where ONLINE_STATUS = '1' group by dwmc,KKBH,KKMC,datatime");
	    sqlBuffer.append(") group by dwmc, datatime");
	    //if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(" order by datatime");
	    /*}
	    if (StringUtil.equals(param.get("orgType"), "0")) {
	    	sqlBuffer.append(") group by period order by period");
	    }*/
	    return sqlBuffer.toString();
	}
	
	/**
	 * 组装趋势图sql语句
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String initTrendChartOnlyLineSql(Map<String, String> param) {
		StringBuffer sqlBuffer = new StringBuffer();
		if (StringUtil.equals(param.get("orgType"), "0")) { //选的是广州市
			sqlBuffer.append("select qymc as dwmc, count(1) as COUNT, datatime as PERIOD from (");
		} 
		if (StringUtil.equals(param.get("orgType"), "1")) { //选的是分局
			sqlBuffer.append("select dwmc, count(1) as COUNT, datatime as PERIOD from (");
		} 
		sqlBuffer.append("select ");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" f.qymc,");
		}
		sqlBuffer.append("f.dwmc,KKBH,KKMC,datatime from (");
		sqlBuffer.append("select ");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" e.qymc,");
		}
		sqlBuffer.append("a.KKBH,c.KKMC,d.dwmc,");
		if (StringUtil.equals(param.get("timeType"), "1")) { //查询24小时的数据
			sqlBuffer.append("to_char(start_time, 'yyyy-mm-dd hh24') || ':00 - ' || to_char(start_time, 'hh24') || ':59' as datatime");
		}
		if (StringUtil.equals(param.get("timeType"), "2")) { //查询7的数据
			sqlBuffer.append("to_char(start_time, 'MM-dd') as datatime");
		}
		if (StringUtil.equals(param.get("timeType"), "3")) { //查询一个月的数据
			sqlBuffer.append("to_char(start_time, 'MM-dd') as datatime");
		}
		if (StringUtil.equals(param.get("timeType"), "4")) { //查询一年的数据
			sqlBuffer.append("to_char(start_time, 'MM') as datatime");
		}
		sqlBuffer.append(",case when ceil((a.start_time - a.JGSJ) * 24 * 60) > (select t.value from j_Sys_Config t where t.code = 'FaultState') " +
				"then '0' else '1' end as ONLINE_STATUS from DIS_GATE_TIME_STATUS a,MOUNT_TAB c");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(",MGMTDEPT_TAB d,AREA_TAB e");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(",MGMTDEPT_TAB d");
	    }
	    sqlBuffer.append(" where a.kkbh = c.kkbh");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwxzqh = e.qydm and e.qydm = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwbh = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	sqlBuffer.append(" and c.kkbh = '440" + param.get("orgId") + "'");
	    }
	    if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
	    	sqlBuffer.append(" and a.start_time between " +
	    			"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"c.VERIFY_STATUS = 1");
	    }
	    sqlBuffer.append(") f where ONLINE_STATUS = '" + param.get("culumnOline") + "' group by");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" qymc,");
		}
	    sqlBuffer.append(" dwmc,KKBH,KKMC,datatime");
	    sqlBuffer.append(") group by");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" qymc, datatime");
		} else {
			sqlBuffer.append(" dwmc, datatime");
		}
    	sqlBuffer.append(" order by datatime");
	    return sqlBuffer.toString();
	}
	
	/**
	 * 卡口离线状态统计,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOutOnlineTrendChartInfo(Map<String, String> param) {
		List<Map<String, String>> results = null;
		String sqlStr = this.initTrendChartSql(param);
		try {
			results = this.queryBySql(sqlStr);
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		List<Map<String, String>> mountsResult = null;
		List<Map<String, String>> guagnzhouResults = null;
		List<Map<String, String>> lineDatas = results;
		if (StringUtil.equals(param.get("orgType"), "0")) {
			guagnzhouResults = this.dealResultForGuagnzhou(results);
			results.addAll(guagnzhouResults);
			mountsResult = this.countAllMounts();
			if (results != null && results.size() > 0) {
				for (Map<String, String> dataMap : results) {
					for (Map<String, String> mountMap : mountsResult) {
						if (StringUtil.equals(dataMap.get("DWMC").trim(), mountMap.get("DWMC").trim())) {
							dataMap.put("COUNT", StringUtil.toString(StringUtil.toInt(mountMap.get("AMOUNTS")) - StringUtil.toInt(dataMap.get("COUNT"))));
							break;
						}
					}
				}
			}
		}
		mountsResult = this.countAllMountsByDwbh();
		if (results != null && results.size() > 0) {
			for (Map<String, String> dataMap : results) {
				for (Map<String, String> mountMap : mountsResult) {
					if (StringUtil.equals(dataMap.get("DWMC").trim(), mountMap.get("DWMC").trim())) {
						dataMap.put("COUNT", StringUtil.toString(StringUtil.toInt(mountMap.get("AMOUNTS")) - StringUtil.toInt(dataMap.get("COUNT"))));
						break;
					}
				}
			}
		}
		return results;
	}
	
	/**
	 * 结果集中新增广州市总数据
	 * @param results 目标结果集，数据特点，按时间排序的
	 * @return 返回结果
	 */
	public List<Map<String, String>> dealResultForGuagnzhou(List<Map<String, String>> results) {
		Map<String, String> dataMap = null;
		List<Map<String, String>> evryDatas = new ArrayList<Map<String,String>>();
		if (results != null && results.size() > 0) {
			for (int i = 0; i < results.size(); i++) {
				if (i == 0) {
					dataMap = new HashMap<String, String>();
					dataMap.put("DWMC", "广州市");
					dataMap.put("COUNT", results.get(i).get("COUNT"));
					dataMap.put("PERIOD", results.get(i).get("PERIOD"));
				} else {
					if (StringUtil.equals(dataMap.get("PERIOD"), results.get(i).get("PERIOD"))) {
						dataMap.put("COUNT", StringUtil.toInt(dataMap.get("COUNT")) + StringUtil.toInt(results.get(i).get("COUNT")) + "");
					} else {
						evryDatas.add(dataMap);
						dataMap = new HashMap<String, String>();;
						dataMap.put("DWMC", "广州市");
						dataMap.put("COUNT", results.get(i).get("COUNT"));
						dataMap.put("PERIOD", results.get(i).get("PERIOD"));
					}
				}
				if (i == results.size() - 1) {
					evryDatas.add(dataMap);
				}
			}
		}
		return evryDatas;
	}
	
	/**
	 * 卡口在线状态查询,只查询首页柱状图
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountStatusOnlyCulumnInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select dwmc as PERIOD, count(1) as COUNT from (select f.dwmc, KKBH, KKMC from (" +
			"select a.KKBH, c.KKMC, d.dwbh, d.dwmc, " +
			"case when ceil((sysdate - a.JGSJ) * 24 * 60) > (select t.value from j_Sys_Config t " +
			"where t.code = 'FaultState') then '0' else '1' end as ONLINE_STATUS from DIS_GATE_TIME_STATUS a, " +
			"(select KKBH, max(JGSJ) NEW_TIME from DIS_GATE_TIME_STATUS group by KKBH) b, MOUNT_TAB c, MGMTDEPT_TAB d, AREA_TAB e " +
			"where a.kkbh = b.kkbh and a.JGSJ = b.NEW_TIME and a.kkbh = c.kkbh and c.dwbh = d.dwbh " +
			"and d.dwxzqh = e.qydm and e.qydm = '440100' and c.VERIFY_STATUS = 1) f where ONLINE_STATUS = '1' group by dwmc, KKBH, KKMC) group by dwmc");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}

	@Override
	public void updatesql(List<String> sqlList) {
		// TODO Auto-generated method stub
		for(int i=0;i<sqlList.size();i++){
			this.updateBySql(sqlList.get(i));
		}
		/*String[] sqlArray=new String[sqlList.size()];
		for(int i=0;i<sqlList.size();i++){
			sqlArray[i]=sqlList.get(i);
		}
		this.updateBatchSql(sqlArray);*/
	}
}
