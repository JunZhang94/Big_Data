package com.jp.tic.business.categorySearch.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.categorySearch.dao.CategoryQuerySolrIndexDao;
import com.jp.tic.business.categorySearch.entity.CarModel;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class CategoryQuerySolrIndexDaoImpl implements CategoryQuerySolrIndexDao {

	@Override
	public Map<String, Object> getSolrData(String sql,String order_by,int start,int limit) {
		Map<String,Object> map=new HashMap<String,Object>(); 
		List<CarModel> list=new ArrayList<CarModel>();
		SolrQuery query=new SolrQuery();
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
		HttpSolrClient solrServer = null;
		CloudSolrClient solrCloud = null;
		if (StringUtil.equals(solrFlag, "single")) {
			solrServer = SolrUtils.initSolr();
		} else {
			solrCloud = SolrUtils.initSolrCloud();
		}
		if(null!=order_by&&!"".equals(order_by)){
			if(order_by.equalsIgnoreCase("desc")){
				query.setSort("jgsj", SolrQuery.ORDER.desc);
			}else{
				query.setSort("jgsj", SolrQuery.ORDER.asc);
			}
		}
		query.setQuery(sql);
		query.setStart(start);
        query.setRows(limit);
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
        list=rsp.getBeans(CarModel.class);
        map.put("rows", list);
        map.put("total", amounts);
		return map;
	}
	
	/**
     * 预加载solr服务
     * @return solr服务
     */
    public HttpSolrClient initSolr() {
    	HttpSolrClient solr = null;
        try {
            String url = "http://172.31.108.116:8983/solr/db";
            solr = new HttpSolrClient(url);
            solr.setSoTimeout(10000);  
            solr.setConnectionTimeout(10000);
            solr.setDefaultMaxConnectionsPerHost(100);
            solr.setMaxTotalConnections(100);
            //solr.setMaxRetries(3); 
        } catch (Exception e) {
            System.out.println("请检查solr的服务器或端口是否开启!");
            e.printStackTrace();
        }
        return solr;
    }
	
	  public CloudSolrClient initSolrCloud() {
	    	CloudSolrClient solrCloud = null;
	        try {
	        	Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
	    		String zkHost = MapGetUtils.getString(config, "solr.cloud.url");
	    		String collection = MapGetUtils.getString(config, "solr.cloud.collection");
	        	//172.31.108.118:2181,172.31.108.119:2182,172.31.108.120:2183//公司solr集群地址
	        	//String zkHost = "10.204.248.140:2181,10.204.248.141:2182,10.204.248.142:2183";     
	            String  defaultCollection = "myconf";
	            if(collection !=null && !collection.equals("")){
                	defaultCollection=collection;
                }
	            int zkClientTimeout = 20000;
	            int zkConnectTimeout = 10000;
	            solrCloud = new CloudSolrClient(zkHost);
	            solrCloud.setDefaultCollection(defaultCollection);
	            solrCloud.setZkClientTimeout(zkClientTimeout);
	            solrCloud.setZkConnectTimeout(zkConnectTimeout);  
	            solrCloud.connect();
	        } catch (Exception e) {
	            System.out.println("请检查solrCloud的服务器或端口是否开启!");
	            e.printStackTrace();
	        }
	        return solrCloud;
	    }

}
