package com.jp.tic.business.cartake.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.PivotField;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.FacetField.Count;
import org.apache.solr.common.params.FacetParams;
import org.apache.solr.common.util.NamedList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.cartake.dao.CarFrequencyDao;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.framework.hbase.JPHbaseTemplate;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class CarFrequencyDaoImpl extends BaseDao implements CarFrequencyDao {
	
	private static Logger logger=LoggerFactory.getLogger(BaseDao.class);
	
	@Autowired
	protected JPHbaseTemplate template;

	/**
	 * 过车频度查询-分析solr数据
	 * @param param 查询条件
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	public List<Map<String, String>> carFrequencyStatisticsInfo(Map<String, String> param) throws Exception {
		List<String> colList = new ArrayList<String>();
		List<String> valList = new ArrayList<String>();
		if (StringUtil.checkStr(param.get("kkbhs"))) {
			colList.add("kkbh");
			valList.add(param.get("kkbhs"));
		}
		if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
			colList.add("jgsj");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			Date startDate = DateUtil.parseToDate(param.get("startTime"), "yyyy-MM-dd HH:mm:ss");
			Date endDate = DateUtil.parseToDate(param.get("endTime"), "yyyy-MM-dd HH:mm:ss");
            String startTime = format.format(startDate);
            String endTime = format.format(endDate);
            valList.add("[" + startTime + " TO " + endTime + "]");
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
        List<Map<String, String>> datas = this.loadCarNumInfo(field, key, param);
        StringBuffer carNumStr = new StringBuffer();
        List<Map<String, String>> items = new ArrayList<Map<String,String>>();
        if (datas != null && datas.size() > 0) {
        	for (Map<String, String> dataMap : datas) {
        		if (StringUtil.checkObj(carNumStr)) {
        			carNumStr.append(",");
        		}
        		carNumStr.append(dataMap.get("carNum"));
        	}
        	param.put("carNums", carNumStr.toString());
            items = this.searFrequencyDatas(param);
        }
        return items;
	}
	
	/**
	 * 根据已经查询出来的车牌执行第二查询
	 * @param param
	 * @return
	 */
	public List<Map<String, String>> searFrequencyDatas(Map<String, String> param) {
		List<String> colList = new ArrayList<String>();
		List<String> valList = new ArrayList<String>();
		if (StringUtil.checkStr(param.get("carNums"))) {
			colList.add("hphm");
			valList.add(param.get("carNums"));
		}
		if (StringUtil.checkStr(param.get("kkbhs"))) {
			colList.add("kkbh");
			valList.add(param.get("kkbhs"));
		}
		if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
			colList.add("jgsj");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			Date startDate = DateUtil.parseToDate(param.get("startTime"), "yyyy-MM-dd HH:mm:ss");
			Date endDate = DateUtil.parseToDate(param.get("endTime"), "yyyy-MM-dd HH:mm:ss");
            String startTime = format.format(startDate);
            String endTime = format.format(endDate);
            valList.add("[" + startTime + " TO " + endTime + "]");
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
        List<Map<String, String>> items = this.searhSolrData(field, key, param);
        return items;
	}
	
	/**
	 * 查询solr中的数据,第一查询，通过分页找出对应的车牌号码
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadCarNumInfo(String[] field, String[] key, Map<String, String> param) {
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
        	String[] mounts = null;
        	StringBuffer mountBuffer = new StringBuffer();
        	for (int i = 0; i < field.length; i++) {
        		if (StringUtil.isNotBlank(field[i])) {
        			if (StringUtil.equals(field[i], "kkbh")) {
        				mounts = key[i].split(",");
        				if (StringUtil.checkStr(buffer.toString())) {
        					buffer.append(" AND ");
        				}
        				buffer.append("(");
        				for (int j = 0; j < mounts.length; j++) {
        					if (StringUtil.checkStr(mountBuffer.toString())) {
        						mountBuffer.append(" OR ");
                    		}
        					mountBuffer.append(field[i] + ":" + mounts[j]);
        				}
        				buffer.append(mountBuffer);
        				buffer.append(")");
        			} else {
        				if (StringUtil.checkStr(buffer.toString())) {
                			buffer.append(" AND ");
                		}
                		buffer.append(field[i] + ":" + key[i]);
        			}
        		}
        	}
        	if (StringUtil.checkObj(buffer)) {
                query.setQuery(buffer.toString());
            }
        	query.setFacet(true);
            query.addFacetField("hphm"); //根据车牌字段分组
        	query.setFacetLimit(StringUtil.toInt(param.get("page.limit")));
            query.set(FacetParams.FACET_OFFSET,StringUtil.toInt(param.get("page.start")));//统计数据时候判断是否超过N的记录是否有数据
            //query.setParam(FacetParams.FACET_PIVOT, "hphm,kkbh");
            query.setFacetMinCount(StringUtil.toInt(param.get("carCounts")));
            query.setFacetMissing(false);
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
	 * 查询solr中的数据，第二次查询，根据第一次查询出来的车牌号码找到对应的数据，因分页不起效果了
	 * @return 查询结果
	 */
	public List<Map<String, String>> searhSolrData(String[] field, String[] key, Map<String, String> param) {
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
        	String[] mounts = null;
        	StringBuffer mountBuffer = new StringBuffer();
        	for (int i = 0; i < field.length; i++) {
        		if (StringUtil.isNotBlank(field[i])) {
        			if (StringUtil.equals(field[i], "kkbh")) {
        				mounts = key[i].split(",");
        				if (StringUtil.checkStr(buffer.toString())) {
        					buffer.append(" AND ");
        				}
        				buffer.append("(");
        				for (int j = 0; j < mounts.length; j++) {
        					if (StringUtil.checkStr(mountBuffer.toString())) {
        						mountBuffer.append(" OR ");
                    		}
        					mountBuffer.append(field[i] + ":" + mounts[j]);
        				}
        				buffer.append(mountBuffer);
        				buffer.append(")");
        			} else {
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
        	}
        	if (StringUtil.checkObj(buffer)) {
                query.setQuery(buffer.toString());
            }
        	query.setFacet(true);
            //query.addFacetField("hphm"); //根据车牌字段分组
        	query.setFacetLimit(StringUtil.toInt(param.get("page.limit")));
            query.set(FacetParams.FACET_OFFSET, 0);//统计数据时候判断是否超过N的记录是否有数据
            query.setParam(FacetParams.FACET_PIVOT, "hphm,kkbh");
            query.setFacetMinCount(StringUtil.toInt(param.get("carCounts")));
            query.setFacetMissing(false);
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
                            fieldList = pivot.getPivot();
                            if(fieldList != null){
                                for(PivotField pivotfield:fieldList){
                                	dataMap = new HashMap<String, String>();
                                	dataMap.put("carNum", StringUtil.toString(pivot.getValue()));
                                    proValue = StringUtil.toString(pivotfield.getValue());
                                    dataMap.put("kkbh", proValue);
                                    count = pivotfield.getCount();
                                    dataMap.put("passTimes", count + "");
                                    datas.add(dataMap);
                                }
                            }
                        }
            		}
            	}
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}
}
