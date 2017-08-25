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

import com.jp.tic.analyze.dao.CarTakeDao;
import com.jp.tic.analyze.dao.FollowCarLocalDao;
import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.framework.hbase.JPHbaseTemplate;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class FollowCarLocalDaoImpl extends BaseDao implements FollowCarLocalDao {
	
	@Autowired
	protected JPHbaseTemplate template;

	private static Logger logger = LoggerFactory.getLogger(SolrUtils.class);
	
	@Autowired
	private BayonetManagerDao bayonetManagerDao;

	/**
	 * 批量保存查询出来的数据
	 * @param carTakes 数据集
	 * @return 保存结果
	 */
	public int saveCarDatas(List<CarTake> carTakes) {
		int counts = 0;
		String[] sqlArray = new String[carTakes.size()];
		StringBuffer sqlBuffer = null;
		for (int i = 0; i < carTakes.size(); i++) {
			sqlBuffer = new StringBuffer();
			sqlBuffer.append("insert into follow_temp_tab(ID,CAR_NUM,CROSS_TIME,KKBH,FXBH,IMG) values (SEQ_FOLLOW_TEMP.NEXTVAL");
			if (StringUtil.checkObj(carTakes.get(i).getHphm())) {
				sqlBuffer.append(",'" + carTakes.get(i).getHphm() + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(carTakes.get(i).getJgsj())) {
				sqlBuffer.append(",to_date('" +  carTakes.get(i).getJgsj() + "','yyyy-MM-dd HH24:mi:ss')");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(carTakes.get(i).getKkbh())) {
				sqlBuffer.append(",'" + carTakes.get(i).getKkbh() + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(carTakes.get(i).getFxbh())) {
				sqlBuffer.append(",'" + carTakes.get(i).getFxbh() + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(carTakes.get(i).getTx1())) {
				sqlBuffer.append(",'" + carTakes.get(i).getTx1() + "'");
			} else {
				sqlBuffer.append(",''");
			}
			sqlBuffer.append(")"); 
			sqlArray[i] = sqlBuffer.toString();
		}
		counts = this.updateBatchSql(sqlArray);
		return counts;
	}
	
	/**
	 * 更新任务分析状态
	 * @param taskId 任务ID
	 * @param flag 分析结果状态
	 * @param havingFlag 是否存在跟随车数据
	 * @return 更新结果
	 */
	public int updateFollowTask(String taskId, String flag, String havingFlag) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update DIS_TASK set STATUS = '结束'");
		if (StringUtil.equals(flag, "success")) {
			buffer.append(",RESULT = '分析完成'");
		} else {
			buffer.append(",RESULT = '分析失败'");
		}
		if (StringUtil.equals(havingFlag, "have")) {
			buffer.append(",HAVEING_FLAG = 1");
		} else {
			buffer.append(",HAVEING_FLAG = 0");
		}
		String nowTime = DateUtil.getCurrentDateTime();
		buffer.append(",TASK_UPDATE_TIME_END = to_date('" + nowTime + "','yyyy-mm-dd HH24:mi:ss')");
		buffer.append(" where ID = " + taskId);
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 分析数据入库
	 * @param resultDatas 分析结果数据
	 * @param param 页面参数
	 * @return 入库条数
	 */
	public int saveDbFollowData(List<Map<String, String>> resultDatas, Map<String, String> param) {
		int counts = 0;
		String[] sqlArray = new String[resultDatas.size()];
		StringBuffer sqlBuffer = null;
		for (int i = 0; i < resultDatas.size(); i++) {
			sqlBuffer = new StringBuffer();
			sqlBuffer.append("insert into J_FOLLOW_CAR(ID,CAR_NUM,IMG,VALID_TIME,FOLLOW_TIMES," +
					"MOUNTS_STR,MOUNTS_NUMBER,FOLLOW_CAR_NUM,TASK_ID,TASK_NAME) values (SEQ_J_FOLLOW_CAR.NEXTVAL");
			if (StringUtil.checkObj(resultDatas.get(i).get("carNum"))) {
				sqlBuffer.append(",'" + resultDatas.get(i).get("carNum") + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(resultDatas.get(i).get("imgStr"))) {
				sqlBuffer.append(",'" + resultDatas.get(i).get("imgStr") + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(param.get("vilidTime"))) {
				sqlBuffer.append("," + param.get("vilidTime"));
			} else {
				sqlBuffer.append(",");
			}
			if (StringUtil.checkObj(param.get("kakouTimes"))) {
				sqlBuffer.append("," + param.get("kakouTimes"));
			} else {
				sqlBuffer.append(",");
			}
			if (StringUtil.checkObj(resultDatas.get(i).get("kkmcStr"))) {
				sqlBuffer.append(",'" + resultDatas.get(i).get("kkmcStr") + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(resultDatas.get(i).get("kkbhStr"))) {
				sqlBuffer.append(",'" + resultDatas.get(i).get("kkbhStr") + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(resultDatas.get(i).get("followCarNum"))) {
				sqlBuffer.append(",'" + resultDatas.get(i).get("followCarNum") + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkObj(param.get("taskId"))) {
				sqlBuffer.append("," + param.get("taskId"));
				sqlBuffer.append(",'跟随车分析'");
			} else {
				sqlBuffer.append(",");
				sqlBuffer.append(",''");
			}
			sqlBuffer.append(")"); 
			sqlArray[i] = sqlBuffer.toString();
		}
		counts = this.updateBatchSql(sqlArray);
		return counts;
	}
	
	/**
	 * solr与hbase整合查询
	 * @param param
	 */
	@SuppressWarnings("unchecked")
	public List<CarTake> searchFollowInfo(Map<String, String> param) {
		List<String> colList = new ArrayList<String>();
		List<String> valList = new ArrayList<String>();
		if (StringUtil.checkStr(param.get("hphm"))) {
			colList.add("hphm");
			valList.add(param.get("hphm"));
		}
		if (StringUtil.checkStr(param.get("kkbh"))) {
			colList.add("kkbh");
			valList.add(param.get("kkbh"));
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
        Map<String, Object> itemMap = this.searhSolrData(field, key, param);
        List<CarTakeSolr> carTakes = (List<CarTakeSolr>) itemMap.get("rows");
        List<String> rowkeyList = new ArrayList<String>();
        if (carTakes != null && carTakes.size() > 0) {
        	for (CarTakeSolr carTake : carTakes) {
        		rowkeyList.add(carTake.getRowkey());
        	}
        }
        List<CarTake> results = null;
        if (rowkeyList.size() > 0) {
        	List<byte[]> rowKeys=new ArrayList<byte[]>();
        	byte[] rowkey = null;
        	for (String str : rowkeyList) {
        		rowkey = Bytes.toBytes(str);
        		rowKeys.add(rowkey);
        	}
        	try {
        		results = this.getTakesWithKeys(rowKeys);
			} catch (Exception e) {
				e.printStackTrace();
			}
        	
        }
        if (results != null && results.size() > 0) {
			List<CarTake> filteCarTakes = new ArrayList<CarTake>();
			List<Map<String, String>> mountDatas = bayonetManagerDao.loadAllMountInfos();
			for(CarTake take : results){
				if (take == null) {
					filteCarTakes.add(take);
				} else {
					if (mountDatas != null && mountDatas.size() > 0) {
						for (Map<String, String> dataMap : mountDatas) {
							if (StringUtil.equals(take.getKkbh(), dataMap.get("KKBH"))) {
								take.setKkmc(dataMap.get("KKMC"));
								break;
							}
						}
					}
				}
			}
			if (filteCarTakes != null && filteCarTakes.size() > 0) {
				results.removeAll(filteCarTakes);	
			}
		}
        return results;
	}
	
	/**
     * 根据row_key查询hbase数据
     * @param rowkeys
     * @return
     * @throws Exception
     */
    public List<CarTake> getTakesWithKeys(List<byte[]> rowkeys) throws Exception {
		List<CarTake> result = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowkeys, new RowMapper<CarTake>() {
			@Override
			public CarTake mapRow(Result rs, int i) throws Exception {
				CarTake data = ResultConvertUtils.toTake(rs);
				return data;
			}
		});
		return result;
	}
	
	/**
	 * 查询solr中的数据
	 * @return 查询结果
	 */
	public Map<String, Object> searhSolrData(String[] field, String[] key, Map<String, String> param) {
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
        	String[] hphms = null;
        	StringBuffer hphmBuffer = new StringBuffer();
        	for (int i = 0; i < field.length; i++) {
        		if (StringUtil.isNotBlank(field[i])) {
        			if (StringUtil.equals(field[i], "hphm")) {
        				hphms = key[i].split(",");
        				if (StringUtil.checkStr(buffer.toString())) {
        					buffer.append(" AND ");
        				}
        				if (hphms.length > 1) {
        					buffer.append("(");
        				}
        				for (int j = 0; j < hphms.length; j++) {
        					if (StringUtil.checkStr(hphmBuffer.toString())) {
        						hphmBuffer.append(" OR ");
                    		}
        					hphmBuffer.append(field[i] + ":" + hphms[j]);
        				}
        				buffer.append(hphmBuffer);
        				if (hphms.length > 1) {
        					buffer.append(")");
        				}
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
            //设置起始位置与返回结果数
            query.setStart(0);
            query.setRows(StringUtil.toInt(param.get("limit")));
            //此时间排序比较总有，切不可轻易去掉
    	    query.addSort("jgsj", SolrQuery.ORDER.desc);
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
            List<CarTakeSolr> beans = rsp.getBeans(CarTakeSolr.class);
            resultMap.put("total", amounts);
            resultMap.put("rows", beans);
            //返回查询结果
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMap;
	}
	
}
