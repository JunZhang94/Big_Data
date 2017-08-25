package com.jp.tic.business.categorySearch.dao;

import java.util.Map;


public interface CategoryQuerySolrIndexDao {

	public Map<String, Object> getSolrData(String sql,String order_by,int start,int end);

}
