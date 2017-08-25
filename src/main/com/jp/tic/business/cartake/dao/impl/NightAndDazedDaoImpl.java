package com.jp.tic.business.cartake.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.FacetField.Count;
import org.apache.solr.common.params.FacetParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.cartake.dao.NightAndDazedDao;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.framework.hbase.JPHbaseTemplate;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class NightAndDazedDaoImpl extends BaseDao implements NightAndDazedDao {
	
	private static Logger logger=LoggerFactory.getLogger(NightAndDazedDaoImpl.class);
	
	@Autowired
	protected JPHbaseTemplate template;
	
	/**
	 * 统计查询白天的数据量信息
	 * @param param 参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryDazedData(Map<String, String> param) {
		param.put("queryFlag", "dazed");
		List<String> colList = new ArrayList<String>();
		List<String> valList = new ArrayList<String>();
		if (StringUtil.checkStr(param.get("hphm"))) {
			colList.add("hphm");
			valList.add(param.get("hphm"));
		}
		if (StringUtil.checkStr(param.get("kkbhs"))) {
			colList.add("kkbh");
			valList.add(param.get("kkbhs"));
		}
		if (StringUtil.checkStr(param.get("dazedTimeStart")) && StringUtil.checkStr(param.get("dazedTimeEnd"))) {
			String[] dazedStartTimes = param.get("dazedTimeStart").split(",");
			String[] dazedEndTimes = param.get("dazedTimeEnd").split(",");
			colList.add("jgsj");
			StringBuffer timeBufer = new StringBuffer();
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			for (int i = 0; i < dazedStartTimes.length; i++) {
				Date startDate = DateUtil.parseToDate(dazedStartTimes[i], "yyyy-MM-dd HH:mm:ss");
				Date endDate = DateUtil.parseToDate(dazedEndTimes[i], "yyyy-MM-dd HH:mm:ss");
	            String startTime = format.format(startDate);
	            String endTime = format.format(endDate);
	            if (StringUtil.checkObj(timeBufer)) {
	            	 timeBufer.append(",");
	            }
	            timeBufer.append("[" + startTime + " TO " + endTime + "]");
			}
			valList.add(timeBufer.toString());
		}
		String[] field = new String[10];
        String[] key = new String[10];
        if (colList.size() == 0) {
            field[0] = "*";
            key[0] = "*";
        } else {
            for (int i = 0; i < colList.size(); i++) {
                field[i] = colList.get(i);
                key[i] = valList.get(i);
            }
        }
        List<Map<String, String>> itemMap = this.queryDataFromSolr(field, key, 0, 0, param);
        return itemMap;
	}
	
	/**
	 * 统计查询晚上的数据量信息
	 * @param param 参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryNightData(List<String> hphmList, Map<String, String> param) {
		param.put("queryFlag", "night");
		List<String> colList = new ArrayList<String>();
		List<String> valList = new ArrayList<String>();
		if (hphmList != null && hphmList.size() > 0) {
			StringBuffer hphmBuffer = new StringBuffer();
			for (int i = 0; i < hphmList.size(); i++) {
				if (StringUtil.checkObj(hphmBuffer)) {
					hphmBuffer.append(",");
				}
				hphmBuffer.append(hphmList.get(i));
			}
			colList.add("hphm");
			valList.add(hphmBuffer.toString());
		}
		if (StringUtil.checkStr(param.get("kkbhs"))) {
			colList.add("kkbh");
			valList.add(param.get("kkbhs"));
		}
		if (StringUtil.checkStr(param.get("startNightStart")) && StringUtil.checkStr(param.get("endNightEnd"))) {
			String[] nightStartTimes = param.get("startNightStart").split(",");
			String[] nightEndTimes = param.get("endNightEnd").split(",");
			colList.add("jgsj");
			StringBuffer timeBufer = new StringBuffer();
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			for (int i = 0; i < nightStartTimes.length; i++) {
				Date startDate = DateUtil.parseToDate(nightStartTimes[i], "yyyy-MM-dd HH:mm:ss");
				Date endDate = DateUtil.parseToDate(nightEndTimes[i], "yyyy-MM-dd HH:mm:ss");
	            String startTime = format.format(startDate);
	            String endTime = format.format(endDate);
	            if (StringUtil.checkObj(timeBufer)) {
	            	 timeBufer.append(",");
	            }
	            timeBufer.append("[" + startTime + " TO " + endTime + "]");
			}
			valList.add(timeBufer.toString());
		}
		String[] field = new String[10];
        String[] key = new String[10];
        if (colList.size() == 0) {
            field[0] = "*";
            key[0] = "*";
        } else {
            for (int i = 0; i < colList.size(); i++) {
                field[i] = colList.get(i);
                key[i] = valList.get(i);
            }
        }
        List<Map<String, String>> itemDatas = this.queryDataFromSolr(field, key, 0, 0, param);
        return itemDatas;
	}

	/**
	 * 统计查询solr中的过车数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryDataFromSolr(String[] field, String[] key, int limit, int start, Map<String, String> param) {
		if (null == field || null == key || field.length != key.length) {
            return null;
        }
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
        	for (int i = 0; i < field.length; i++) {
        		if (StringUtil.isNotBlank(field[i])) {
    				if (StringUtil.checkStr(buffer.toString())) {
            			buffer.append(" AND ");
            		}
    				if(key[i].indexOf(",")>0){
    					buffer.append("( ");
    					String[] str=key[i].split(",");
    					for(int j=0;j<str.length;j++){
    						if(j==str.length-1){
    							buffer.append(field[i] + ":" + str[j]+" ) ");
    						}else{
    							buffer.append(field[i] + ":" + str[j] +" OR ");
    						}
    					}
    				}else{
    					buffer.append(field[i] + ":" + key[i]);
    				}
        		}
        	}
        	if (StringUtil.checkObj(buffer)) {
                query.setQuery(buffer.toString());
            }
            //设置起始位置与返回结果数
            query.setStart(start);
            query.setRows(limit);
        	//分组统计
        	query.setFacet(true);
            query.addFacetField("hphm"); //根据车牌字段分组
            int minCounts = 1;
            if (StringUtil.equals(param.get("queryFlag"), "dazed")) {
            	minCounts = StringUtil.toInt(param.get("dazedMax"));
            } else {
            	minCounts = StringUtil.toInt(param.get("nightMax"));
            }
            //query.setFacetMinCount(StringUtil.toInt(param.get("carCounts")));
            query.setFacetMinCount(minCounts);
            query.setFacetMissing(false);
            query.setFacetLimit(StringUtil.toInt(param.get("page.limit")));
            query.set(FacetParams.FACET_OFFSET,StringUtil.toInt(param.get("page.start")));//统计数据时候判断是否超过N的记录是否有数据
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
            List<Count> countList = rsp.getFacetField("hphm").getValues(); 
            Map<String, String> dataMap = null;
            long counts = 0;
            for (Count count : countList) { 
            	if (counts == 0) {
            		counts = count.getCount();
            	}
                if(count.getCount() > 0) { 
                	dataMap = new HashMap<String, String>();
                	dataMap.put("carNum", count.getName());
                	dataMap.put("passTimes", count.getCount() + "");
                	datas.add(dataMap);
                }  
            } 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}
	
	/**
	 * 查看是否存在布控信息
	 * @param carNumList
	 * @return
	 */
	public List<Map<String, String>> queryControlDatas(List<String> carNumList) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		//审核通过的数据
		sqlBuffer.append("select distinct hphm from SETCONTROL_TAB where SHZT = '2' and hphm in (");
		for (int i = 0; i < carNumList.size(); i++) {
			if (i == carNumList.size() - 1) {
				sqlBuffer.append("'" + carNumList.get(i) + "'");
			} else {
				sqlBuffer.append("'" + carNumList.get(i) + "',");
			}
		}
		sqlBuffer.append(")");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 统计车牌号码告警次数
	 * @param carNumList
	 * @return
	 */
	public List<Map<String, String>> countsControlAlarmDatas(List<String> carNumList) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select hphm,count(1) as counts from ALERTING_TAB t where hphm in (");
		for (int i = 0; i < carNumList.size(); i++) {
			if (i == carNumList.size() - 1) {
				sqlBuffer.append("'" + carNumList.get(i) + "'");
			} else {
				sqlBuffer.append("'" + carNumList.get(i) + "',");
			}
		}
		sqlBuffer.append(") group by hphm");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	public List<CarTake> getTakesWithKeys(List<byte[]> rowkeys) throws Exception {
		List<CarTake> result = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowkeys, new RowMapper<CarTake>() {
			@Override
			public CarTake mapRow(Result rs, int i) throws Exception {
				CarTake data = ResultConvertUtils.toTake(rs);
				logger.debug(i + "#" + data);
				return data;
			}
		});
		return result;
	}
}
