package com.jp.tic.common.util;

import java.util.List;
import java.util.Map;

import org.apache.hadoop.hbase.client.Result;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.hadoop.hbase.RowMapper;

import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.framework.hbase.JPHbaseTemplate;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;

public class SolrUtils {
	
	@Autowired
	protected static JPHbaseTemplate template;

	private static Logger logger = LoggerFactory.getLogger(SolrUtils.class);
	
	private static HttpSolrClient solr = null;
	
	private static CloudSolrClient solrCloud = null;
	
	/**
     * 预加载solr服务
     * @return solr服务
     */
    public static HttpSolrClient initSolr() {
    	if (solr != null) {
    		return solr;
    	} else {
    		try {
            	Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
        		String url = MapGetUtils.getString(config, "solr.single.url");
                //String url = "http://172.31.108.132:8983/solr/db";
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
    
    /**
     * 预加载solrCloud服务
     * @return solrCloud服务
     */
    public static CloudSolrClient initSolrCloud() {
    	if (solrCloud != null) {
    		return solrCloud;
    	} else {
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
    }
    
    /**
     * 根据row_key查询hbase数据
     * @param rowkeys
     * @return
     * @throws Exception
     */
    public static List<CarTake> getTakesWithKeys(List<byte[]> rowkeys) throws Exception {
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
