package com.jp.tic.analyze.dao.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.FacetField.Count;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.utils.lang.StringUtil;

public abstract class AbstractKKSolrDao extends AbstractKKHBaseDao {
	
	HttpSolrClient solrServer = null;
	CloudSolrClient solrCloud = null;
	
	public List<CarTakeSolr> QueryCloudSolrCarList(String query,int start,int limit,int orderFlag){
		
		List<CarTakeSolr> result=null;
		SolrQuery solrQuery = new SolrQuery();
		solrQuery.setQuery(query);
		if(limit>0){
			//设置起始位置与返回结果数
			solrQuery.setStart(start);
			solrQuery.setRows(limit);
		}
		//设置排序
		if(orderFlag==0){
			solrQuery.addSort("jgsj", SolrQuery.ORDER.asc);
		}else{
			solrQuery.addSort("jgsj", SolrQuery.ORDER.desc);
		}
		 try {
			 QueryResponse rsp = null;
			 
			 Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
    		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
//    		HttpSolrClient solrServer = null;
//    		CloudSolrClient solrCloud = null;
    		if (StringUtil.equals(solrFlag, "single")) {
    			if(solrServer ==null){
    				solrServer = SolrUtils.initSolr();
    			}
    			rsp = solrServer.query(solrQuery);
    		} else {
    			if(solrCloud ==null){
    				solrCloud = SolrUtils.initSolrCloud();
    			}
    			rsp = solrCloud.query(solrQuery);
			}
			result = rsp.getBeans(CarTakeSolr.class);
       } catch (Exception e) {
       	e.printStackTrace();
       }
		return result;
		
	}
public List<CarTakeSolr> QuerySolrCarList(String query,int start,int limit,String[] orderIndexs,int orderFlag){
		
		List<CarTakeSolr> result=null;
		SolrQuery solrQuery = new SolrQuery();
		solrQuery.setQuery(query);
		if(limit>0){
			//设置起始位置与返回结果数
			solrQuery.setStart(start);
			solrQuery.setRows(limit);
		}
		//设置排序
		if(orderFlag>0){
			for(int i=0;i<orderIndexs.length;i++){
				solrQuery.addSort(orderIndexs[i], SolrQuery.ORDER.desc);
			}
		}else{
			for(int i=0;i<orderIndexs.length;i++){
				solrQuery.addSort(orderIndexs[i], SolrQuery.ORDER.asc);
			}
		}
		 try {
			 QueryResponse rsp = null;
			 
			 Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
    		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
//    		HttpSolrClient solrServer = null;
//    		CloudSolrClient solrCloud = null;
    		if (StringUtil.equals(solrFlag, "single")) {
    			if(solrServer ==null){
    				solrServer = SolrUtils.initSolr();
    			}
    			rsp = solrServer.query(solrQuery);
    		} else {
    			if(solrCloud ==null){
    				solrCloud = SolrUtils.initSolrCloud();
    			}
    			rsp = solrCloud.query(solrQuery);
			}
			result = rsp.getBeans(CarTakeSolr.class);
       } catch (Exception e) {
       	e.printStackTrace();
       }
		return result;
		
	}
	
	public int countCarList(String query){
		
		int count=0;
		List<CarTakeSolr> result=null;
		SolrQuery solrQuery = new SolrQuery();
		solrQuery.setQuery(query);
		 try {
			 QueryResponse rsp = null;
			 Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
	    		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
//	    		HttpSolrClient solrServer = null;
//	    		CloudSolrClient solrCloud = null;
	    		if (StringUtil.equals(solrFlag, "single")) {
	    			if(solrServer ==null){
	    				solrServer = SolrUtils.initSolr();
	    			}
	    			rsp = solrServer.query(solrQuery);
	    		}else {
	    			if(solrCloud ==null){
	    				solrCloud = SolrUtils.initSolrCloud();
	    			}
	    			rsp = solrCloud.query(solrQuery);
				}
			 long amounts = rsp.getResults().getNumFound();
			 count=(int) amounts;
		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}
	
	public Map<String,Long> getSolrCarByGroup(String query,String groupId,int minCount,int maxCount){
		
		Map<String,Long> resultMap=new HashMap<String, Long>();
		SolrQuery solrQuery = new SolrQuery();
		solrQuery.setQuery(query);
		solrQuery.setFacet(true);
		solrQuery.addFacetField(groupId); //根据字段分组
		if(minCount>0){
			solrQuery.setFacetMinCount(minCount);
		}
		try {
			 QueryResponse rsp = null;
			 Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
	    		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
//	    		HttpSolrClient solrServer = null;
//	    		CloudSolrClient solrCloud = null;
	    		if (StringUtil.equals(solrFlag, "single")) {
	    			if(solrServer ==null){
	    				solrServer = SolrUtils.initSolr();
	    			}
	    			rsp = solrServer.query(solrQuery);
	    		}else {
	    			if(solrCloud ==null){
	    				solrCloud = SolrUtils.initSolrCloud();
	    			}
	    			rsp = solrCloud.query(solrQuery);
				}
			 List<Count> countList=rsp.getFacetField(groupId).getValues();
			 for (Count count : countList) { 
				 if(maxCount>0){
					 if(count.getCount() <= maxCount){
						 resultMap.put(count.getName(),count.getCount());
					 }
				 }else{
					 resultMap.put(count.getName(),count.getCount());
				 }
	        } 
		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return resultMap;		
		
	}
	
	/**
     * 预加载solrCloud服务
     * @return solrCloud服务
     */
    public CloudSolrClient initSolrCloud() {
    	CloudSolrClient solrCloud = null;
        try {
        	Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
    		String zkHost = MapGetUtils.getString(config, "solr.cloud.url");
    		String collection = MapGetUtils.getString(config, "solr.cloud.collection");
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
    
    /**
     * 预加载solr服务
     * @return solr服务
     */
    public HttpSolrClient initSolr() {
    	HttpSolrClient solr = null;
        try {
            String url = "http://172.31.108.132:8983/solr/db";//本机 http://172.31.108.116:8983/solr/db
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

}
