package com.jp.tic.business.oneNumManyCar.dao.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao;
import com.jp.tic.analyze.dao.impl.CarTakeDaoImpl;
import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.business.oneNumManyCar.dao.OneNumManyCarDao;
import com.jp.tic.business.util.SolrSQLUtils;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;
@Repository
public class OneNumManyCarDaoImpl extends AbstractKKHBaseDao implements OneNumManyCarDao {
	
	private static Logger logger=LoggerFactory.getLogger(CarTakeDaoImpl.class);

	/**
	 * 一牌多车
	 */
	public Map<String, List<CarTake>> queryDatasForPages(String json) {
		Map<String, String> searchParam=JsonUtil.jsonToMap(json);
		List<CarTakeSolr> solrList=new ArrayList<CarTakeSolr>();
		Map<String, List<CarTake>> resultMap=new HashMap<String, List<CarTake>>();
		//--------------------------solr配置-----------------------------------
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
		HttpSolrClient solrServer = null;
		CloudSolrClient solrCloud = null;
		if (StringUtil.equals(solrFlag, "single")) {
			solrServer = SolrUtils.initSolr();
		} else {
			solrCloud = SolrUtils.initSolrCloud();
		}
		SolrQuery query=new SolrQuery();
		QueryResponse rsp = null;
		//--------------------------solr配置结束-----------------------------------
		StringBuffer sb=new StringBuffer();
		sb.append("hphm:"+searchParam.get("carNumStr")+" AND ");
		String str=SolrSQLUtils.DateFomatterAndFinishSQL(searchParam, sb);
		query.setQuery(str);
		query.setStart(0);
		query.setRows(500);
		query.setSort("jgsj", ORDER.desc);
		try {
			if (StringUtil.equals(solrFlag, "single")) {
        		rsp = solrServer.query(query);
    		} else {
    			rsp = solrCloud.query(query);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		solrList=rsp.getBeans(CarTakeSolr.class);
		if(solrList.size()>0){
			List<byte[]> rowKeys=new ArrayList<byte[]>();
			for(CarTakeSolr carTakeSolr:solrList){
				rowKeys.add(Bytes.toBytes(carTakeSolr.getRowkey()));
			}
			List<CarTake> list=new ArrayList<CarTake>();
			list=this.getDatasByKeys(rowKeys);
			if(list.size()>0){
				CarTake carTake=list.get(0);
				resultMap=compareForResult(carTake,list,resultMap);
			}
		}
		return resultMap;
	}
	
	/**
	 * 取结果集的第一条数据作为参考值进行整体对比
	 * @param carTake
	 * @param list
	 * @param resultMap
	 * @return
	 */
	public Map<String, List<CarTake>> compareForResult(CarTake carTake,List<CarTake> list,Map<String, List<CarTake>> resultMap){
		Map<String,CarTake> entryMap=new HashMap<String, CarTake>();
		for(CarTake carTake_:list){
			String str=carTake_.getBrand()+carTake_.getType()+carTake_.getCaryear()+carTake_.getClzl()+carTake_.getCsys()
						+carTake_.getHpys()+carTake_.getDropnum()+carTake_.getBoxnum()+carTake_.getTagnum();
			if(entryMap.containsKey(str)){
				continue;
			}else{
				entryMap.put(str, carTake_);
			}
		}
		List<CarTake> list_=new ArrayList<CarTake>();
		for(CarTake carTake_:entryMap.values()){
			list_.add(carTake_);
		}
		Collections.sort(list_, new Comparator<CarTake>() {
			public int compare(CarTake o1, CarTake o2) {
				if(o2.getJgsj().after(o1.getJgsj())){
					return 1;
				}
				return -1;
			}
		});
		resultMap.put("rows", list_);
		return resultMap;
	}
	
	public List<CarTake> getDatasByKeys(List<byte[]> rowKeys) {
		List<CarTake> result = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowKeys, new RowMapper<CarTake>() {

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
