package com.jp.tic.system.dao;

import java.io.IOException;
import java.sql.SQLException;

import org.apache.solr.client.solrj.SolrServerException;

public interface SolrHandlerDao {

	/**
     * 从数据库查找要导入的数据的结果集,测试方法，根据时间递增导入数据
     * @return 结果集
     * @throws SQLException sql异常
     * @throws SolrServerException solr异常
     * @throws IOException IO异常
     */
    public long findResultByDateSet() throws SQLException, SolrServerException, IOException;
}
