package com.jp.tic.analyze.dao.impl;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.SimilarityCarAnalyzeDao;
import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.framework.hbase.JPHbaseTemplate;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class SimilarityCarAnalyzeDaoImpl implements SimilarityCarAnalyzeDao {
	
	private static Logger logger=LoggerFactory.getLogger(SimilarityCarAnalyzeDaoImpl.class);
	
	@Autowired
	protected JPHbaseTemplate template;
	
	/**
	 * 测试solr与hbase整合查询
	 * @param param
	 */
	public Map<String, Object> dealWithSimilarityCarData(Map<String, String> param) {
		List<String> colList = new ArrayList<String>();
		List<String> valList = new ArrayList<String>();
        Object[] carNameObj = null, carValuesObj = null;
		if (StringUtil.checkStr(param.get("carNum"))) {
			String[] carNums = param.get("carNum").split(",");
			carNameObj = new Object[carNums.length];
			carValuesObj = new Object[carNums.length];
			for (int j = 0; j < carNums.length; j++) {
				List<String> carNames = new ArrayList<String>();
		        List<String> varValues = new ArrayList<String>();
				//以粤A12345为例
				//相差一位车牌情况,包含替换A的情况，总共6种
				for (int i = 0; i < carNums[j].length() - 1; i++) {
					carNames.add("hphm");
					StringBuffer carBuffer = new StringBuffer(carNums[j]);
					carBuffer.replace(i + 1, i + 2, "?");
					varValues.add(carBuffer.toString());
				}
				//此情况不包含替换A的情况，不然有15种情况，这样只有10种情况了
				for (int i = 0; i < carNums[j].length() - 2; i++) {
					StringBuffer carBuffer = new StringBuffer(carNums[j]);
					String carNumTemp = carBuffer.replace(i + 2, i + 3, "?").toString(); //粤A?2345
					for (int m = i + 3; m < carNums[j].length(); m++) {
						carBuffer = new StringBuffer(carNumTemp);
						carBuffer.replace(m, m + 1, "?");
						carNames.add("hphm");
						varValues.add(carBuffer.toString());
					}
				}
		        carNameObj[j] = carNames;
		        carValuesObj[j] = varValues;
			}
		}
		if (StringUtil.checkStr(param.get("mounts"))) {
			colList.add("kkbh");
			valList.add(param.get("mounts"));
		}
		//车辆品牌不为空,类型,年款为空的情况
		if (StringUtil.checkStr(param.get("carBrand")) && !StringUtil.checkStr(param.get("carType")) && !StringUtil.checkStr(param.get("carYear"))) {
			colList.add("brand");
			valList.add(param.get("carBrand"));
		} 
		//车辆品牌,类型不为空,年款为空的情况
		List<String> brandList = null;//剩下多余的勾选品牌
		List<String> typeList = null; //品牌_类型
		List<String> yearList = null; //品牌_类型_年款
		if (StringUtil.checkStr(param.get("carType")) && StringUtil.checkStr(param.get("carType"))  && !StringUtil.checkStr(param.get("carYear"))) {
			String[] praCarBrands = param.get("carBrand").split(",");
			brandList = new ArrayList<String>();
			for (int i = 0; i < praCarBrands.length; i++) {
				brandList.add(praCarBrands[i]);
			}
			String[] brandTypes = param.get("carType").split(",");
			typeList = new ArrayList<String>();
			List<String> carBrands = new ArrayList<String>();
			for (int i = 0; i < brandTypes.length; i++) {
				typeList.add(brandTypes[i]);
				carBrands.add(brandTypes[i].split("_")[0]);
			}
			if (carBrands != null) {
				brandList.removeAll(carBrands);
			}
		} 
		//车辆品牌,类型,年款不为空的情况
		if (StringUtil.checkStr(param.get("carType")) && StringUtil.checkStr(param.get("carType"))  && StringUtil.checkStr(param.get("carYear"))) {
			String[] praCarBrands = param.get("carBrand").split(",");
			brandList = new ArrayList<String>();
			for (int i = 0; i < praCarBrands.length; i++) {
				brandList.add(praCarBrands[i]);
			}
			String[] brandTypes = param.get("carType").split(",");
			typeList = new ArrayList<String>();
			List<String> carBrands = new ArrayList<String>();
			for (int i = 0; i < brandTypes.length; i++) {
				typeList.add(brandTypes[i]);
				carBrands.add(brandTypes[i].split("_")[0]);
			}
			String[] brandTypeYears = param.get("carYear").split(",");
			List<String> carTypes = new ArrayList<String>();
			yearList = new ArrayList<String>();
			for (int i = 0; i < brandTypeYears.length; i++) {
				yearList.add(brandTypeYears[i]);
				carTypes.add(brandTypeYears[i].split("_")[0] + "_" + brandTypeYears[i].split("_")[1]);
			}
			if (carTypes != null) {
				typeList.removeAll(carTypes);
			}
			if (carBrands != null) {
				brandList.removeAll(carBrands);
			}
		}
		if (StringUtil.checkStr(param.get("carColor"))) {
			colList.add("csys");
			valList.add(param.get("carColor"));
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
        int pageStart = StringUtil.toInt(param.get("page.start"));
        int limit = StringUtil.toInt(param.get("page.limit"));
        int start = StringUtil.toInt(pageStart);
        Map<String, Object> itemMap = this.searhSolrData(field, key, limit, start, carNameObj, carValuesObj, param,brandList,typeList,yearList);
        List<CarTakeSolr> carTakes = (List<CarTakeSolr>) itemMap.get("rows");
        List<String> rowkeyList = new ArrayList<String>();
        if (carTakes != null && carTakes.size() > 0) {
        	for (CarTakeSolr carTake : carTakes) {
        		rowkeyList.add(carTake.getRowkey());
        	}
        }
        List<CarTake> result = null;
        if (rowkeyList.size() > 0) {
        	List<byte[]> rowKeys=new ArrayList<byte[]>();
        	byte[] rowkey = null;
        	for (String str : rowkeyList) {
        		rowkey = Bytes.toBytes(str);
        		rowKeys.add(rowkey);
        	}
        	try {
				result = this.getTakesWithKeys(rowKeys);
			} catch (Exception e) {
				e.printStackTrace();
			}
        	
        }
        itemMap.put("rows", result);
        return itemMap;
	}
	
	/**
	 * 查询solr中的数据
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> searhSolrData(String[] field, String[] key, int limit, int start, 
			Object[] carNameObj, Object[] carValuesObj, Map<String, String> param,
			List<String> brandList,List<String> typeList,List<String> yearList) {
		//检测输入是否合法
        if (null == field || null == key || field.length != key.length) {
            return null;
        }
        SolrQuery query = new SolrQuery();
        Map<String, Object> resultMap = new HashMap<String, Object>();
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
        	if (carNameObj != null && carValuesObj != null) {
        		List<String> carNames = null;
		        List<String> varValues = null;
		        StringBuffer carBuffer = new StringBuffer();
        		for (int m = 0; m < carNameObj.length; m++) {
        			carNames = (ArrayList<String>) carNameObj[m];
    		        varValues = (ArrayList<String>) carValuesObj[m];
        			buffer.append("(");
    		        if (carNames != null && carNames.size() > 0) {
    		        	if (StringUtil.checkStr(carBuffer.toString())) {
    		        		carBuffer.append(" OR ");
        				}
                        for (int i = 0; i < varValues.size() - 1; i++) {
                            carBuffer.append(carNames.get(i) + ":" + varValues.get(i));
                            carBuffer.append(" OR ");
                        }
                        if (StringUtil.isNotBlank(carNames.get(varValues.size() - 1))) {
                            carBuffer.append(carNames.get(varValues.size() - 1) + ":" + varValues.get(varValues.size() - 1));
                        }
    	            }
        		}
	        	buffer.append(carBuffer);
	        	buffer.append(")");
	        	buffer.append(" AND -hphm:[" + param.get("carNum") + " TO " + param.get("carNum") + "]");
        	}
        	StringBuffer brandBuffer = new StringBuffer();
        	if (brandList != null && typeList != null) {
        		if (StringUtil.checkStr(buffer.toString())) {
					buffer.append(" AND ");
				}
        		brandBuffer.append("(");
    			for (int i = 0; i < brandList.size(); i++) {
					brandBuffer.append("brand:" + brandList.get(i) + " OR ");
    			}
    			String[] brandTypes = null;
    			for (int j = 0; j < typeList.size(); j++) {
    				brandTypes = typeList.get(j).split("_");
    				if (j == typeList.size() - 1) {
    					brandBuffer.append("(brand:" + brandTypes[0] + " AND type:" + brandTypes[1] + ")");
					} else {
						brandBuffer.append("(brand:" + brandTypes[0] + " AND type:" + brandTypes[1] + ") OR ");
					}
        		}
    			if (yearList != null) {
    				if (brandList.size() > 0 || typeList.size() > 0) {
    					brandBuffer.append(" OR ");
    				}
    				String[] typeYear = null;
    				for (int m = 0; m < yearList.size(); m++) {
    					typeYear = yearList.get(m).split("_");
    					if (m == yearList.size() - 1) {
        					brandBuffer.append("(brand:" + typeYear[0] + " AND type:" + typeYear[1] + " AND caryear:" + typeYear[2] + ")");
    					} else {
    						brandBuffer.append("(brand:" + typeYear[0] + " AND type:" + typeYear[1] + " AND caryear:" + typeYear[2] + ") OR ");
    					}
    				}
    			}
        		brandBuffer.append(")");
        	}
        	if (StringUtil.checkObj(brandBuffer)) {
        		buffer.append(brandBuffer);
        	}
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
        				}//hpys=0,1,2
					}
        		}
        	}
        	if (StringUtil.checkObj(buffer)) {
                query.setQuery(buffer.toString());
            }
            //设置起始位置与返回结果数
            query.setStart(start);
            query.setRows(limit);
            //设置排序
            String groupFlag = param.get("groupFlag");
            if (StringUtil.equals(groupFlag, "carNum")) {
            	query.addSort("hphm", SolrQuery.ORDER.desc);
            	query.addSort("jgsj", SolrQuery.ORDER.desc);
            } else if (StringUtil.equals(groupFlag, "carType")) {
            	query.addSort("clzl", SolrQuery.ORDER.desc);
            	query.addSort("jgsj", SolrQuery.ORDER.desc);
            } else if (StringUtil.equals(groupFlag, "mounts")) {
            	/*query.setParam(GroupParams.GROUP, "true");
            	query.setParam(GroupParams.GROUP_FIELD, "kkbh");
            	query.setParam(GroupParams.GROUP_LIMIT, 20 + "");
            	query.setParam(GroupParams.GROUP_SORT, "jgsj desc");
            	query.setParam(GroupParams.GROUP_MAIN, "true");*/
	           	query.addSort("kkbh", SolrQuery.ORDER.desc);
	           	query.addSort("jgsj", SolrQuery.ORDER.desc);
            } else {
            	query.addSort("jgsj", SolrQuery.ORDER.desc);
			}
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
            long amounts = rsp.getResults().getNumFound();
            //SolrDocumentList docs = rsp.getResults();
            List<CarTakeSolr> beans = rsp.getBeans(CarTakeSolr.class);
            resultMap.put("total", amounts);
            resultMap.put("rows", beans);
            //返回查询结果
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMap;
	}
	
	public List<CarTake> getTakesWithKeys(List<byte[]> rowkeys) throws Exception {
		//query detail table
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
