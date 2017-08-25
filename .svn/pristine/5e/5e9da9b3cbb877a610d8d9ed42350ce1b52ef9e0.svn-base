package com.jp.tic.business.alarm.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.alarm.dao.ControlAlarmDAO;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.util.ConstantUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.sql.SQLUtil;

@SuppressWarnings("unchecked")
@Repository
public class ControlAlarmDaoImpl extends BaseDao implements ControlAlarmDAO {

	/**
	 * 分页查询布控告警信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryControlAlarmInfo(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		//buffer.append("select bjxxbh, clxxbh, bkxxbh, kkbh, jgsk, fxbh, hphm, hpys, cwhphm, cwhpys, hpyz, clpp, clwx, csys, " +
		//		"cllx, hpzl, clsd, txsl, txmc1 as carImgUrl, txmc2 as carImg1Url, bjsk, clbj, clnr, qsbj, qsnr, byzd7, bjlx, bjdd from ALERTING_TAB where 1=1");
		
		buffer.append("select t1.bjxxbh,t1.clxxbh,t1.bkxxbh,t1.kkbh,t2.kkmc,t1.jgsk,t1.fxbh,t1.hphm,t1.hpys,t1.cwhphm,t1.cwhpys,t1.hpyz, t1.clpp,t1.clwx,t1.csys, "+
				"t1.cllx,t1.hpzl,t1.clsd,t1.txsl,t1.txmc1  as carImgUrl,t1.txmc2  as carImg1Url,t1.bjsk,t1.clbj,t1.clnr,t1.qsbj,t1.qsnr,t1.byzd7, t1.bjlx, t1.bjdd," +
				"s.hphm as bkhphm,s.clpp as bkclpp,s.category,to_char(s.bksk, 'yyyy-MM-dd HH24:mi:ss') as bksk,to_char(s.bklen, 'yyyy-MM-dd HH24:mi:ss') as bklen "+
		" from ALERTING_TAB t1 left join ");
		if (StringUtil.checkStr(param.get("mountFlag"))) {
			if (StringUtil.checkStr(param.get("passStation"))) {
				if (StringUtil.equals(param.get("mountFlag"), "general")) {
					buffer.append("mount_tab");
				} else {
					buffer.append("MOUNT_VIRTUAL_TAB");
				}
			} else {
				buffer.append("mount_tab");
			}
		} else {
			buffer.append("mount_tab");
		}
		buffer.append(" t2 on t1.kkbh = t2.kkbh left join setcontrol_tab s on t1.bkxxbh = s.bkxxbh where 1=1");
		if (StringUtil.checkStr(param.get("mountFlag"))) {
			
		}
		buffer.append(this.packageSeachSql(param));
		String pageSql = this.initPageSql(pageStart, rows, buffer.toString());
		try {
			datas = this.queryBySql(pageSql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计布控告警信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countControlAlarmDatas(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
	//	sqlBuffer.append("select count(*) as COUNTS from ALERTING_TAB where 1=1");
		sqlBuffer.append("select count(*) as COUNTS from ALERTING_TAB t1 left join ");
		if (StringUtil.checkStr(param.get("mountFlag"))) {
			if (StringUtil.checkStr(param.get("passStation"))) {
				if (StringUtil.equals(param.get("mountFlag"), "general")) {
					sqlBuffer.append("mount_tab");
				} else {
					sqlBuffer.append("MOUNT_VIRTUAL_TAB");
				}
			} else {
				sqlBuffer.append("mount_tab");
			}
		} else {
			sqlBuffer.append("mount_tab");
		}
		sqlBuffer.append(" t2 on t1.kkbh = t2.kkbh where 1=1");
		sqlBuffer.append(this.packageSeachSql(param));
		try {
			counts = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return counts;
	}
	
	/**
	 * 导出布控告警信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportControlAlarmById(String[] partIds) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from ALERTING_TAB where ");
		String idStr = "";
		for (int i = 0; i < partIds.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += "'" + partIds[i] + "'";
		}
		buffer.append("BJXXBH in (" + idStr + ")");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 组装分页查询语句
	 * @param pageStart 开始位置
	 * @param rows 每行显示多少数据量
	 * @param seachSql 数据查询语句
	 * @return 分页语句
	 */
	public String initPageSql(int pageStart, int rows, String seachSql) {
		StringBuffer pageSql = new StringBuffer(); 
		if (pageStart == 0) {
            pageSql.append("select * from (");
            pageSql.append(seachSql + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            pageSql.append(" select * from ( select row_.*, rownum rownum_ from (");
            pageSql.append(seachSql + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		return pageSql.toString();
	}
	
	/**
	 * 组装查询语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String packageSeachSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		
		//卡口编号
		String passStation = param.get("passStation");
		
		if(StringUtil.checkStr(passStation)){
			List<String> fenju_kkbhs_list = ConstantUtil.getFenju_kkbhs();
			//如果选择广州市，则查所有卡口，不过滤
			if(ConstantUtil.GZS_QYDM.equals(passStation)){
				
			}
			// data.id == 440100 || data.id==440100000000 || data.id==440100230000 || data.id==440113000000 || data.id==440114000000 || data.id==440115000000 || data.id==440116000000 || data.id==440183000000 || data.id==440184000000
			else if(fenju_kkbhs_list.contains(passStation)){
				buffer.append(" and t2.dwbh = '"+passStation+"'");
			}else{
				buffer.append(" and t2.kkbh = '"+ConstantUtil.MOUNT_CODE_PRDFIX+passStation+"'");
			}
		//	buffer.append(" and t1.kkbh = '"+kkbh+"'");
		}
		 //获取车牌信息 
        if(StringUtil.checkStr(param.get("carFNum")) || StringUtil.checkStr(param.get("carBNum"))) {
            buffer.append(" and regexp_like(HPHM, "+SQLUtil.getCarNumLikeCondition(param.get("carFNum"), param.get("carBNum"))+")");
        }
		//车牌颜色
		if (StringUtil.checkStr(param.get("carNumColor")) && !StringUtil.equals(param.get("carNumColor"), "-1")) {
			buffer.append(" and HPYS = '" + param.get("carNumColor") + "'");
		}
		//车辆类型
		if (StringUtil.checkStr(param.get("carType")) && !StringUtil.equals(param.get("carType"), "-1")) {
			buffer.append(" and CLLX = '" + param.get("carType") + "'");
		}
		//告警类型
		if (StringUtil.checkStr(param.get("alarmType")) && !StringUtil.equals(param.get("alarmType"), "-1")) {
			String alartTypeName = "";
			if (StringUtil.equals(param.get("alarmType"), "1")) {
				alartTypeName = "布控告警";
			}
			if (StringUtil.equals(param.get("alarmType"), "2")) {
				alartTypeName = "黑名单告警";
			}
			if (StringUtil.checkStr(alartTypeName)) {
				buffer.append(" and BJLX = '" + alartTypeName + "'");
			}
		}
		//处理状态
		if (StringUtil.checkStr(param.get("alarmDealStatus")) && !StringUtil.equals(param.get("alarmDealStatus"), "-1")) {
			buffer.append(" and CLBJ = '" + param.get("alarmDealStatus") + "'");
		}
		//告警时间
		if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
			if(param.get("startTime").indexOf("T")>0 && param.get("endTime").indexOf("T")>0){
			    String startTime = param.get("startTime").replaceAll("T",  " ");
			    String endTime = param.get("endTime").replaceAll("T",  " ");
				buffer.append(" and JGSK between to_date('"
	                    + startTime
	                    + "','yyyy-MM-dd HH24:mi:ss') and to_date('"
	                    + endTime
	                    + "','yyyy-MM-dd HH24:mi:ss')");
			} else{
				buffer.append(" and JGSK between to_date('"
	                    + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss")
	                    + "','yyyy-MM-dd HH24:mi:ss') and to_date('"
	                    + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss")
	                    + "','yyyy-MM-dd HH24:mi:ss')");
			}
		}
		/*
		if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
			buffer.append(" and JGSK between to_date('"
                    + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss")
                    + "','yyyy-MM-dd HH24:mi:ss') and to_date('"
                    + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss")
                    + "','yyyy-MM-dd HH24:mi:ss')");
		}*/
		buffer.append(" order by JGSK DESC");
		return buffer.toString();
	}
	
	/**
	 * 查询布控告警详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> alarmControlDetail(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select a.bjxxbh,a.HPHM,a.JGSK,a.HPYS,a.CLLX,a.FXBH,a.CLSD,a.BJDD,a.TXMC1 as carImgUrl,a.TXMC2 as carImg1Url,b.BKDW,b.BKR,b.BKSK," +
				" b.CZ,b.LXDH,b.BKJB,b.BKLB,b.AJMS,b.BZ from ALERTING_TAB a left join SETCONTROL_TAB b on a.BKXXBH = b.BKXXBH ");
		buffer.append(" where BJXXBH = '" + param.get("id") + "'");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from ALERTING_TAB where 1=1");
		buffer.append(this.packageSeachSql(param));
		return buffer.toString();
	}
	
	/**
	 * 通过用户勾选图片的ID，获取图片URL
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadImgUrlByIds(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select BJXXBH,TXMC1,HPHM from ALERTING_TAB where ");
		if (StringUtil.equals(param.get("SEARCH"), "BY_CONDITION")) {
			buffer.append(this.packageSeachSql(param));
		}
		if (StringUtil.equals(param.get("SEARCH"), "BY_ID")) {
			String[] ids = param.get("idstr").split(",");
			String idStr = "";
			for (int i = 0; i < ids.length; i++) {
				if (StringUtil.checkStr(idStr)) {
					idStr += ",";
				}
				idStr += "'" + ids[i] + "'";
			}
			buffer.append("BJXXBH in (" + idStr + ")");
		}
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}

		/**
		 * 车牌识别率
		 * @param param 查询参数
		 * @return 返回结果
		 */
		public List<Map<String, String>> queryControlAlarmInfos(Map<String, String> param) {
			int pageStart = StringUtil.toInteger(param.get("page.start"));
			String dates = param.get("dates");
	        int rows = StringUtil.toInteger(param.get("page.limit"));
			List<Map<String, String>> datas = null;
			StringBuffer buffer = new StringBuffer();
			buffer.append(
	"select startT,to_char(to_date(startT,'yyyy-mm-dd')+1,'yyyy-mm-dd'),kkmc,couns,hphm_couns,non_hphm_couns"+
	"from( select to_char(start_time,'yyyy-mm-dd') startT,mt.kkmc kkmc,sum(dgc.count) couns,sum(hphm_count) hphm_couns,sum(non_hphm_count) non_hphm_couns from dis_gate_count dgc,mount_tab mt"+
	" where mt.kkbh = dgc.kkbh and mt.kkmc ='芳村大道西251号对出路段'"+
					"group by to_char(start_time,'yyyy-mm-dd'),mt.kkmc) t	"	
				);
			if(dates.equals("0"))
			{
				buffer.append("1=1");
			}else if(dates.equals("1")){
				buffer.append("to_char(sysdate,'yyyy-mm')= to_char(start_time, 'yyyy-MM')");
			}
			buffer.append(this.packageSeachSql(param));
			String pageSql = this.initPageSql(pageStart, rows, buffer.toString());
			try {
				datas = this.queryBySql(pageSql);
			} catch (Exception e) {
				e.printStackTrace(); 
	            return null;
			}
			return datas;
		}
		
		/**
		 * 首页全文检索查询布控告警信息数据
		 * @param param 查询参数
		 * @return 返回结果
		 */
		public List<Map<String, String>> firstPageAlarmInfo(Map<String, String> param) {
			List<Map<String, String>> datas = null;
			StringBuffer buffer = new StringBuffer();
			buffer.append("select bjxxbh, clxxbh, bkxxbh, kkbh, jgsk, fxbh, hphm, hpys, cwhphm, cwhpys, hpyz, clpp, clwx, csys, " +
					"cllx, hpzl, clsd, txsl, txmc1 as carImgUrl, txmc2 as carImg1Url, bjsk, clbj, clnr, qsbj, qsnr, byzd7, bjlx, bjdd from ALERTING_TAB where 1=1");
			buffer.append(this.packageSeachSql(param));
			try {
				datas = this.queryBySql(buffer.toString());
			} catch (Exception e) {
				e.printStackTrace(); 
	            return null;
			}
			return datas;
		}

		@Override
		public int getTotalAlarmDatas(Map<String, String> param) {
			int  counts= 0;
			StringBuffer sqlBuffer = new StringBuffer();
			sqlBuffer.append("select count(1) as COUNT from alerting_tab t join  mount_tab m on t.kkbh=m.kkbh where 1=1 ");
			//告警时间
			if (StringUtil.checkStr(param.get("startTime"))) {
				
				sqlBuffer.append(" and JGSK >= to_date('"+param.get("startTime")+"','yyyy-mm-dd hh24:mi:ss')");
			}
			if (StringUtil.checkStr(param.get("endTime"))) {
				
				sqlBuffer.append(" and JGSK <= to_date('"+param.get("endTime")+"','yyyy-mm-dd hh24:mi:ss')");
			}
			try {
				List result = this.queryBySql(sqlBuffer.toString());
				if(result.size()>0){
					counts=StringUtil.toInt(((Map<String, String>) result.get(0)).get("COUNT"));
				}
			} catch (Exception e) {
				e.printStackTrace(); 
			}
			return counts;
		}

		@Override
		public List<Map<String,String>> getAlarmDatasByGroup(Map<String, String> param) {
			List<Map<String,String>> result=null;
			StringBuffer sqlBuffer = new StringBuffer();
			sqlBuffer.append("select m.dwbh as DWBH,count(1) as COUNT from alerting_tab t join  mount_tab m on t.kkbh=m.kkbh where 1=1 ");
			//告警时间
			if (StringUtil.checkStr(param.get("startTime"))) {
				
				sqlBuffer.append(" and JGSK >= to_date('"+param.get("startTime")+"','yyyy-mm-dd hh24:mi:ss')");
			}
			if (StringUtil.checkStr(param.get("endTime"))) {
				
				sqlBuffer.append(" and JGSK <= to_date('"+param.get("endTime")+"','yyyy-mm-dd hh24:mi:ss')");
			}
			sqlBuffer.append(" group by m.dwbh");
			try {
				result = this.queryBySql(sqlBuffer.toString());
			} catch (Exception e) {
				e.printStackTrace(); 
			}
			return result;
		}

		@Override
		public int getTotalValidControl(Map<String, String> param) {
			int  counts= 0;
			StringBuffer sqlBuffer = new StringBuffer();
			sqlBuffer.append("select count(1) as COUNT from SETCONTROL_TAB t where (shzt='2'or shzt='6') and bkzt=0 ");
			//告警时间
			if (StringUtil.checkStr(param.get("blken"))) {
				
				sqlBuffer.append(" and bklen > to_date('"+param.get("blken")+"','yyyy-mm-dd hh24:mi:ss')");
			}
			if (StringUtil.checkStr(param.get("bkkssj"))) {
				
				sqlBuffer.append(" and bkkssj <= to_date('"+param.get("bkkssj")+"','yyyy-mm-dd hh24:mi:ss')");
			}
			try {
				List result = this.queryBySql(sqlBuffer.toString());
				if(result.size()>0){
					counts=StringUtil.toInt(((Map<String, String>) result.get(0)).get("COUNT"));
				}
			} catch (Exception e) {
				e.printStackTrace(); 
			}
			return counts;
		}

		@Override
		public List<Map<String, String>> getValidControlByGroup(Map<String, String> param) {
			List<Map<String,String>> result=null;
			StringBuffer sqlBuffer = new StringBuffer();
			sqlBuffer.append("select t.bkdw,count(1) as COUNT from SETCONTROL_TAB t where (shzt='2'or shzt='6') and bkzt=0 ");
			//告警时间
			if (StringUtil.checkStr(param.get("blken"))) {
				
				sqlBuffer.append(" and bklen > to_date('"+param.get("blken")+"','yyyy-mm-dd hh24:mi:ss')");
			}
			if (StringUtil.checkStr(param.get("bkkssj"))) {
				
				sqlBuffer.append(" and bkkssj <= to_date('"+param.get("bkkssj")+"','yyyy-mm-dd hh24:mi:ss')");
			}
			sqlBuffer.append(" group by t.bkdw");
			try {
				result = this.queryBySql(sqlBuffer.toString());
			} catch (Exception e) {
				e.printStackTrace(); 
			}
			return result;
		}
}
