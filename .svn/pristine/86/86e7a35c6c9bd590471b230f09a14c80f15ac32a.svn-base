package com.jp.tic.business.datacenter.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.PivotField;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.params.FacetParams;
import org.apache.solr.common.params.GroupParams;
import org.apache.solr.common.util.NamedList;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.business.datacenter.dao.DataStatisticsDao;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class DataStatisticsDaoImpl extends BaseDao implements DataStatisticsDao {

	/**
	 * 卡口车流量统计,按卡口统计详细信息
	 * @param searchParam
	 * @return 查询结果
	 * @throws Exception
	 */
	public List<Map<String, String>> mountDataStatisticsInfo(Map<String, String> searchParam) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		String orgType = searchParam.get("orgType");
		sqlBuffer.append("select startT as statistical_time,");
		if (StringUtil.equals(searchParam.get("queryFlag"), "mounts")) {
			sqlBuffer.append("kkmc,");
		}
        sqlBuffer.append("car_0_couns," +
           "car_1_couns," +
	       "car_2_couns," +
	       "car_3_couns," +
	       "car_4_couns," +
	       "car_5_couns," +
	       "car_6_couns," +
	       "car_7_couns," +
	       "car_8_couns," +
	       "car_9_couns," +
	       "car_10_couns," +
	       "car_11_couns," +
	       "car_12_couns," +
	       "car_13_couns," +
	       "car_14_couns," +
	       "car_15_couns," +
	       "car_16_couns," +
	       "car_17_couns," +
	       "car_18_couns," +
	       "car_19_couns," +
	       "car_20_couns," +
	       "car_21_couns," +
	       "car_0_couns + car_1_couns + car_2_couns + car_3_couns + car_4_couns + car_5_couns + car_6_couns + car_7_couns + " +
	       "car_8_couns + car_9_couns + car_10_couns + car_11_couns + car_12_couns + car_13_couns + " +
	       "car_14_couns + car_15_couns + car_16_couns + car_17_couns + car_18_couns + car_19_couns + car_20_couns + car_21_couns as all_counts,");
        if (StringUtil.equals(searchParam.get("queryFlag"), "mounts")) {
        	sqlBuffer.append("dwmc,qymc ");
        } else {
        	if (StringUtil.equals(orgType, "0")) {
        		sqlBuffer.append("dwmc ");
			} else if ( StringUtil.equals(orgType, "1")) {
				sqlBuffer.append("dwmc,qymc ");
			}
		}
        sqlBuffer.append("from (select to_char(j.STATISTICS_TIME, '" + searchParam.get("startDateType") + "') startT,");
        if (StringUtil.equals(searchParam.get("queryFlag"), "mounts")) {
        	sqlBuffer.append("mt.kkmc kkmc,");
        }
        if (StringUtil.equals(searchParam.get("queryFlag"), "mounts")) {
        	 sqlBuffer.append("dept.dwmc,area.qymc,");
        } else {
        	if (StringUtil.equals(orgType, "0")) {
        		sqlBuffer.append("area.qymc as dwmc,");
			} else if ( StringUtil.equals(orgType, "1")) {
				sqlBuffer.append("dept.dwmc,area.qymc,");
			}
		}
        sqlBuffer.append("sum(j.car_0) car_0_couns," +
        		   "sum(j.car_1) car_1_couns," +
	               "sum(j.car_2) car_2_couns," +
	               "sum(j.car_3) car_3_couns," +
	               "sum(j.car_4) car_4_couns," +
	               "sum(j.car_5) car_5_couns," +
	               "sum(j.car_6) car_6_couns," +
	               "sum(j.car_7) car_7_couns," +
	               "sum(j.car_8) car_8_couns," +
	               "sum(j.car_9) car_9_couns," +
	               "sum(j.car_10) car_10_couns," +
	               "sum(j.car_11) car_11_couns," +
	               "sum(j.car_12) car_12_couns," +
	               "sum(j.car_13) car_13_couns," +
	               "sum(j.car_14) car_14_couns," +
	               "sum(j.car_15) car_15_couns," +
	               "sum(j.car_16) car_16_couns," +
	               "sum(j.car_17) car_17_couns," +
	               "sum(j.car_18) car_18_couns," +
	               "sum(j.car_19) car_19_couns," +
	               "sum(j.car_20) car_20_couns," +
	               "sum(j.car_21) car_21_couns ");
        if (StringUtil.checkStr(searchParam.get("carFlag"))) {
        	if (StringUtil.equals(searchParam.get("carFlag"), "1")) {
        		sqlBuffer.append("from J_DATA_STATISTICS_PROVINCE j,");
        	}
        	if (StringUtil.equals(searchParam.get("carFlag"), "2")) {
	       		sqlBuffer.append("from J_DATA_STATISTICS_LOCAL j,");
	       	}
        } else {
        	sqlBuffer.append("from J_DATA_STATISTICS j,");
		}
        sqlBuffer.append("mount_tab mt," +
	               "mgmtdept_tab dept," +
	               "area_tab area " +
	         "where mt.kkbh = j.kkbh " +
	           "and mt.dwbh = dept.dwbh " +
	           "and dept.dwxzqh = area.qydm ");
		if (StringUtil.checkStr(searchParam.get("sss3"))) {
			sqlBuffer.append(searchParam.get("sss3"));
		}
		sqlBuffer.append(" and j.STATISTICS_TIME between");
		sqlBuffer.append(" to_date('" + searchParam.get("startdate") + "', 'yyyy-MM-dd hh24:mi:ss') and");
		sqlBuffer.append(" to_date('" + searchParam.get("enddate") + "', 'yyyy-MM-dd hh24:mi:ss') ");
		sqlBuffer.append("group by to_char(j.STATISTICS_TIME, '" + searchParam.get("startDateType") + "'),");
		if (StringUtil.equals(searchParam.get("queryFlag"), "mounts")) {
			sqlBuffer.append("mt.kkmc," +
                  "dept.dwmc," +
                  "area.qymc) t");
		} else {
			if (StringUtil.equals(orgType, "0")) {
				sqlBuffer.append("area.qymc) t");
			} else if ( StringUtil.equals(orgType, "1")) {
				sqlBuffer.append("dept.dwmc," +
	                  "area.qymc) t");
			}
		}
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		//测试代码
		//this.querySolrFacetData();
		return results;
	}
	
	/**
	 * 定时查询solr分组数据
	 * @param carFnum 车辆查询条件
	 */
	public List<Map<String, String>> querySolrFacetData(String carFnum) {
        SolrQuery query = new SolrQuery();
        List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
        try {
        	Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
    		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
    		HttpSolrClient solrServer = null;
    		CloudSolrClient solrCloud = null;
    		if (StringUtil.equals(solrFlag, "single")) {
    			solrServer = SolrUtils.initSolr();
    		} else {
    			solrCloud = SolrUtils.initSolrCloud();
			}
        	StringBuffer buffer = new StringBuffer();
        	String currentDateTime = DateUtil.getCurrentDateStr();
        	Calendar cal = Calendar.getInstance();
        	String currentTime = DateUtil.parseToString(cal.getTime(), "yyyy-MM-dd HH:mm:ss");
        	int hour = cal.get(Calendar.HOUR_OF_DAY);
    		String startTime = "";
    		String endTime = "";
    		int twoHourAgo = hour - 1;
    		startTime = currentDateTime + " " + twoHourAgo + ":00:00";
    		endTime = currentDateTime + " " + twoHourAgo + ":59:59";
    		//测试代码
    		//startTime = "2015-10-01 00:00:00";
    		//endTime = "2015-10-01 23:59:59";
    		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    		Date startDate = DateUtil.parseToDate(startTime, "yyyy-MM-dd HH:mm:ss");
    		Date endDate = DateUtil.parseToDate(endTime, "yyyy-MM-dd HH:mm:ss");
    		String startTimeStr = format.format(startDate);
            String endTimeStr = format.format(endDate);
            if (StringUtil.checkStr(carFnum)) {
            	 buffer.append(carFnum + " AND ");
            }
            buffer.append("jgsj:[" + startTimeStr + " TO " + endTimeStr + "]");
        	if (StringUtil.checkObj(buffer)) {
                query.setQuery(buffer.toString());
            }
        	query.setFacet(true);
            //query.addFacetField("clzl"); //根据车牌字段分组
            query.setParam(FacetParams.FACET_PIVOT, "kkbh,clzl");
            query.setFacetMinCount(1);
            query.setFacetMissing(false);
            query.setFacetLimit(20);
            query.set(FacetParams.FACET_OFFSET,0);//统计数据时候判断是否超过N的记录是否有数据
            //设置起始位置与返回结果数
            query.setStart(0);
            query.setRows(0);
            QueryResponse rsp = null;
            try {
            	if (StringUtil.equals(solrFlag, "single")) {
            		rsp = solrServer.query(query);
        		} else {
        			rsp = solrCloud.query(query);
    			}
            } catch (Exception e) {
            	e.printStackTrace();
            }
            NamedList<List<PivotField>> namedList = rsp.getFacetPivot();
            List<PivotField> fieldList = null;
            String proValue = "";
            int count = 0;
            if (namedList != null) {
            	Map<String, String> dataMap = null;
            	List<PivotField> pivotList = null;
            	for (int i = 0; i < namedList.size(); i++) {
            		pivotList = namedList.getVal(i);
            		if(pivotList != null){
                        for(PivotField pivot:pivotList){
                        	dataMap = new HashMap<String, String>();
                        	dataMap.put("kkbh", StringUtil.toString(pivot.getValue()));
                        	dataMap.put("STATISTICS_TIME", currentTime);
                            fieldList = pivot.getPivot();
                            if(fieldList != null){
                                for(PivotField field:fieldList){
                                    proValue = StringUtil.toString(field.getValue());
                                    count = field.getCount();
                                    dataMap.put(proValue, count + "");
                                }
                            }
                            datas.add(dataMap);
                        }
            		}
            	}
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}
	
	/**
	 * 保存查询数据
	 * @param datas 查询结果
	 * @return
	 */
	public int saveQueryResult(List<Map<String, String>> datas) {
		int saveCounts = 0;
		StringBuffer sqlBuffer = null;
		List<String> sqlList = new ArrayList<String>();
		for (Map<String, String> dataMap : datas) {
			sqlBuffer = new StringBuffer();
			sqlBuffer.append("insert into J_DATA_STATISTICS(id, kkbh, statistics_time, car_0, car_1, car_2, car_3, " +
					"car_4, car_5, car_6, car_7, car_8, car_9, car_10, car_11, " +
					"car_12, car_13, car_14, car_15, car_16, car_17, car_18, car_19) values (");
			//sqlBuffer.append("insert into J_DATA_STATISTICS(id, kkbh, statistics_time, light_bus, motorbike, saloon_car, minibus, mini_truck) values (");
			sqlBuffer.append("SEQ_J_DATA_STATISTICS.NEXTVAL");
			if (StringUtil.checkStr(dataMap.get("kkbh"))) {
				sqlBuffer.append(",'" + dataMap.get("kkbh") + "'");
			} else {
				sqlBuffer.append(",''");
			}
			sqlBuffer.append(",to_date('" +  DateUtil.parseToString(dataMap.get("STATISTICS_TIME"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')");
			for (int j = 0; j < 20; j++) {
				if (StringUtil.checkStr(dataMap.get("" + j))) {
					sqlBuffer.append("," + dataMap.get("" + j));
				} else {
					sqlBuffer.append(",0");
				}
			}
			/*if (StringUtil.checkStr(dataMap.get("11"))) {
				sqlBuffer.append("," + dataMap.get("11"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("15"))) {
				sqlBuffer.append("," + dataMap.get("15"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("01"))) {
				sqlBuffer.append("," + dataMap.get("01"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("04"))) {
				sqlBuffer.append("," + dataMap.get("04"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("08"))) {
				sqlBuffer.append("," + dataMap.get("08"));
			} else {
				sqlBuffer.append(",0");
			}*/
			/*for (int i = 10; i < 20; i++) {
				if (StringUtil.checkStr(dataMap.get(i + ""))) {
					sqlBuffer.append("," + dataMap.get(i + ""));
				} else {
					sqlBuffer.append(",0");
				}
			}
			for (int j = 1; j < 10; j++) {
				if (StringUtil.checkStr(dataMap.get("0" + j))) {
					sqlBuffer.append("," + dataMap.get("0" + j));
				} else {
					sqlBuffer.append(",0");
				}
			}*/
			sqlBuffer.append(")");
			sqlList.add(sqlBuffer.toString());
		}
		String[] sqlArray = sqlList.toArray(new String[]{});
		saveCounts = this.updateBatchSql(sqlArray);
		return saveCounts;
	}
	
	/**
	 * 保存外地车查询数据
	 * @param datas 查询结果
	 * @return
	 */
	public int saveQueryProResult(List<Map<String, String>> datas) {
		int saveCounts = 0;
		StringBuffer sqlBuffer = null;
		List<String> sqlList = new ArrayList<String>();
		for (Map<String, String> dataMap : datas) {
			sqlBuffer = new StringBuffer();
			sqlBuffer.append("insert into J_DATA_STATISTICS_PROVINCE(id, kkbh, statistics_time, car_0, car_1, car_2, car_3, " +
					"car_4, car_5, car_6, car_7, car_8, car_9, car_10, car_11, " +
					"car_12, car_13, car_14, car_15, car_16, car_17, car_18, car_19) values (");
			//sqlBuffer.append("insert into J_DATA_STATISTICS_PROVINCE(id, kkbh, statistics_time, light_bus, motorbike, saloon_car, minibus, mini_truck) values (");
			sqlBuffer.append("SEQ_J_DATA_STATISTICS_PRO.NEXTVAL");
			if (StringUtil.checkStr(dataMap.get("kkbh"))) {
				sqlBuffer.append(",'" + dataMap.get("kkbh") + "'");
			} else {
				sqlBuffer.append(",''");
			}
			sqlBuffer.append(",to_date('" +  DateUtil.parseToString(dataMap.get("STATISTICS_TIME"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')");
			for (int j = 0; j < 20; j++) {
				if (StringUtil.checkStr(dataMap.get("" + j))) {
					sqlBuffer.append("," + dataMap.get("" + j));
				} else {
					sqlBuffer.append(",0");
				}
			}
			/*if (StringUtil.checkStr(dataMap.get("11"))) {
				sqlBuffer.append("," + dataMap.get("11"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("15"))) {
				sqlBuffer.append("," + dataMap.get("15"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("01"))) {
				sqlBuffer.append("," + dataMap.get("01"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("04"))) {
				sqlBuffer.append("," + dataMap.get("04"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("08"))) {
				sqlBuffer.append("," + dataMap.get("08"));
			} else {
				sqlBuffer.append(",0");
			}*/
			/*for (int i = 10; i < 20; i++) {
				if (StringUtil.checkStr(dataMap.get(i + ""))) {
					sqlBuffer.append("," + dataMap.get(i + ""));
				} else {
					sqlBuffer.append(",0");
				}
			}
			for (int j = 1; j < 10; j++) {
				if (StringUtil.checkStr(dataMap.get("0" + j))) {
					sqlBuffer.append("," + dataMap.get("0" + j));
				} else {
					sqlBuffer.append(",0");
				}
			}*/
			sqlBuffer.append(")");
			sqlList.add(sqlBuffer.toString());
		}
		String[] sqlArray = sqlList.toArray(new String[]{});
		saveCounts = this.updateBatchSql(sqlArray);
		return saveCounts;
	}
	
	/**
	 * 保存内地车查询数据
	 * @param datas 查询结果
	 * @return
	 */
	public int saveQueryLocalResult(List<Map<String, String>> datas) {
		int saveCounts = 0;
		StringBuffer sqlBuffer = null;
		List<String> sqlList = new ArrayList<String>();
		for (Map<String, String> dataMap : datas) {
			sqlBuffer = new StringBuffer();
			sqlBuffer.append("insert into J_DATA_STATISTICS_LOCAL(id, kkbh, statistics_time, car_0, car_1, car_2, car_3, " +
					"car_4, car_5, car_6, car_7, car_8, car_9, car_10, car_11, " +
					"car_12, car_13, car_14, car_15, car_16, car_17, car_18, car_19) values (");
			//sqlBuffer.append("insert into J_DATA_STATISTICS_LOCAL(id, kkbh, statistics_time, light_bus, motorbike, saloon_car, minibus, mini_truck) values (");
			sqlBuffer.append("SEQ_J_DATA_STATISTICS_LOCAL.NEXTVAL");
			if (StringUtil.checkStr(dataMap.get("kkbh"))) {
				sqlBuffer.append(",'" + dataMap.get("kkbh") + "'");
			} else {
				sqlBuffer.append(",''");
			}
			sqlBuffer.append(",to_date('" +  DateUtil.parseToString(dataMap.get("STATISTICS_TIME"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd hh24:mi:ss')");
			for (int j = 0; j < 20; j++) {
				if (StringUtil.checkStr(dataMap.get("" + j))) {
					sqlBuffer.append("," + dataMap.get("" + j));
				} else {
					sqlBuffer.append(",0");
				}
			}
			/*if (StringUtil.checkStr(dataMap.get("11"))) {
				sqlBuffer.append("," + dataMap.get("11"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("15"))) {
				sqlBuffer.append("," + dataMap.get("15"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("01"))) {
				sqlBuffer.append("," + dataMap.get("01"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("04"))) {
				sqlBuffer.append("," + dataMap.get("04"));
			} else {
				sqlBuffer.append(",0");
			}
			if (StringUtil.checkStr(dataMap.get("08"))) {
				sqlBuffer.append("," + dataMap.get("08"));
			} else {
				sqlBuffer.append(",0");
			}*/
			/*for (int i = 10; i < 20; i++) {
				if (StringUtil.checkStr(dataMap.get(i + ""))) {
					sqlBuffer.append("," + dataMap.get(i + ""));
				} else {
					sqlBuffer.append(",0");
				}
			}
			for (int j = 1; j < 10; j++) {
				if (StringUtil.checkStr(dataMap.get("0" + j))) {
					sqlBuffer.append("," + dataMap.get("0" + j));
				} else {
					sqlBuffer.append(",0");
				}
			}*/
			sqlBuffer.append(")");
			sqlList.add(sqlBuffer.toString());
		}
		String[] sqlArray = sqlList.toArray(new String[]{});
		saveCounts = this.updateBatchSql(sqlArray);
		return saveCounts;
	}
	
	/**
	 * 车流量统计曲线图
	 * @param searchParam
	 * @return
	 */
	public List<Map<String, String>> statisticsCarDatas(Map<String, String> searchParam) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		String orgType = searchParam.get("orgType");
		sqlBuffer.append("select startT as statistical_time,");
        sqlBuffer.append("car_0_couns," +
           "car_1_couns," +
	       "car_2_couns," +
	       "car_3_couns," +
	       "car_4_couns," +
	       "car_5_couns," +
	       "car_6_couns," +
	       "car_7_couns," +
	       "car_8_couns," +
	       "car_9_couns," +
	       "car_10_couns," +
	       "car_11_couns," +
	       "car_12_couns," +
	       "car_13_couns," +
	       "car_14_couns," +
	       "car_15_couns," +
	       "car_16_couns," +
	       "car_17_couns," +
	       "car_18_couns," +
	       "car_19_couns," +
	       "car_20_couns," +
	       "car_21_couns," +
	       "car_0_couns + car_1_couns + car_2_couns + car_3_couns + car_4_couns + car_5_couns + car_6_couns + car_7_couns + " +
	       "car_8_couns + car_9_couns + car_10_couns + car_11_couns + car_12_couns + car_13_couns + " +
	       "car_14_couns + car_15_couns + car_16_couns + car_17_couns + car_18_couns + car_19_couns + car_20_couns + car_21_couns as all_counts,");
    	if (StringUtil.equals(orgType, "0")) {
    		sqlBuffer.append("dwmc ");
		} else if ( StringUtil.equals(orgType, "1")) {
			sqlBuffer.append("dwmc,qymc ");
		}
        sqlBuffer.append("from (select to_char(j.STATISTICS_TIME, '" + searchParam.get("startDateType") + "') startT,");
    	if (StringUtil.equals(orgType, "0")) {
    		sqlBuffer.append("area.qymc as dwmc,");
		} else if ( StringUtil.equals(orgType, "1")) {
			sqlBuffer.append("dept.dwmc,area.qymc,");
		}
    	sqlBuffer.append("sum(j.car_0) car_0_couns," +
     		   "sum(j.car_1) car_1_couns," +
	               "sum(j.car_2) car_2_couns," +
	               "sum(j.car_3) car_3_couns," +
	               "sum(j.car_4) car_4_couns," +
	               "sum(j.car_5) car_5_couns," +
	               "sum(j.car_6) car_6_couns," +
	               "sum(j.car_7) car_7_couns," +
	               "sum(j.car_8) car_8_couns," +
	               "sum(j.car_9) car_9_couns," +
	               "sum(j.car_10) car_10_couns," +
	               "sum(j.car_11) car_11_couns," +
	               "sum(j.car_12) car_12_couns," +
	               "sum(j.car_13) car_13_couns," +
	               "sum(j.car_14) car_14_couns," +
	               "sum(j.car_15) car_15_couns," +
	               "sum(j.car_16) car_16_couns," +
	               "sum(j.car_17) car_17_couns," +
	               "sum(j.car_18) car_18_couns," +
	               "sum(j.car_19) car_19_couns," +
	               "sum(j.car_20) car_20_couns," +
	               "sum(j.car_21) car_21_couns ");
        if (StringUtil.checkStr(searchParam.get("carFlag"))) {
        	if (StringUtil.equals(searchParam.get("carFlag"), "1")) {
        		sqlBuffer.append("from J_DATA_STATISTICS_PROVINCE j,");
        	}
        	if (StringUtil.equals(searchParam.get("carFlag"), "2")) {
	       		sqlBuffer.append("from J_DATA_STATISTICS_LOCAL j,");
	       	}
        } else {
        	sqlBuffer.append("from J_DATA_STATISTICS j,");
		}
        sqlBuffer.append("mount_tab mt," +
	               "mgmtdept_tab dept," +
	               "area_tab area " +
	         "where mt.kkbh = j.kkbh " +
	           "and mt.dwbh = dept.dwbh " +
	           "and dept.dwxzqh = area.qydm ");
		if (StringUtil.checkStr(searchParam.get("sss3"))) {
			sqlBuffer.append(searchParam.get("sss3"));
		}
		sqlBuffer.append(" and j.STATISTICS_TIME between");
		sqlBuffer.append(" to_date('" + searchParam.get("startdate") + "', 'yyyy-MM-dd hh24:mi:ss') and");
		sqlBuffer.append(" to_date('" + searchParam.get("enddate") + "', 'yyyy-MM-dd hh24:mi:ss') ");
		sqlBuffer.append("group by to_char(j.STATISTICS_TIME, '" + searchParam.get("startDateType") + "'),");
		if (StringUtil.equals(orgType, "0")) {
			sqlBuffer.append("area.qymc) t order by t.startT asc");
		} else if ( StringUtil.equals(orgType, "1")) {
			sqlBuffer.append("dept.dwmc," +
                  "area.qymc) t order by t.startT asc");
		}
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 加载所有的solr数据总量
	 * @return
	 */
	public int loadALLDataMounts() {
		SolrQuery query = new SolrQuery();
        long amounts = 0l;
        try {
        	Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
    		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
    		HttpSolrClient solrServer = null;
    		CloudSolrClient solrCloud = null;
    		if (StringUtil.equals(solrFlag, "single")) {
    			solrServer = SolrUtils.initSolr();
    		} else {
    			solrCloud = SolrUtils.initSolrCloud();
			}
        	StringBuffer buffer = new StringBuffer();
        	buffer.append("*:*");
        	if (StringUtil.checkObj(buffer)) {
                query.setQuery(buffer.toString());
            }
            //设置起始位置与返回结果数
            query.setStart(0);
            query.setRows(0);
            QueryResponse rsp = null;
            try {
            	if (StringUtil.equals(solrFlag, "single")) {
            		rsp = solrServer.query(query);
        		} else {
        			rsp = solrCloud.query(query);
    			}
            } catch (Exception e) {
            	e.printStackTrace();
            }
            amounts = rsp.getResults().getNumFound();
            //返回查询结果
		} catch (Exception e) {
			e.printStackTrace();
			amounts = 0l;
		}
		return (int)amounts;
	}
}
