package com.jp.tic.business.cartake.service;

import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.apache.solr.client.solrj.response.GroupResponse;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.params.GroupParams;
import org.junit.Test;

import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.utils.lang.StringUtil;

public class CarTakeSolrTest extends BaseTest {

	@Test
	public void testDataToSolr() {
		System.out.println("===================================");
        SolrQuery query = new SolrQuery();
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
            query.setParam(GroupParams.GROUP,true);   
            query.setParam(GroupParams.GROUP_FIELD,"hphm");
            query.setParam(GroupParams.GROUP_LIMIT,"1");
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
            if (rsp !=null) {
            	GroupResponse groupResponse = rsp.getGroupResponse();   
            	if(groupResponse !=null) {   
            		List<GroupCommand> groupList = groupResponse.getValues();    
                    for(GroupCommand groupCommand : groupList){   
                    	List<Group> groups =groupCommand.getValues();    
                    	for(Group group : groups) {
                            System.out.println("group查询…"+group.getGroupValue()+"数量为："+group.getResult().getNumFound());
                        }   
                    }
            	}
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
