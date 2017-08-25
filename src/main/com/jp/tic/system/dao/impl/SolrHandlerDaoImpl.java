package com.jp.tic.system.dao.impl;

import java.io.IOException;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.CountDownLatch;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrInputDocument;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.dao.SolrHandlerDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.ICarTake;
import com.jp.tic.system.hbase.JPControlHBaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.security.MD5Tool;

@Repository
public class SolrHandlerDaoImpl extends BaseDao implements SolrHandlerDao {
	
	private static final Log log = LogFactory.getLog(SolrHandlerDaoImpl.class);
	
	private JPControlHBaseDao hbaseDao;
	
	public SolrHandlerDaoImpl(){
		hbaseDao=new JPControlHBaseDao(CarTake.class);
	}
	
	/**
     * 从数据库查找要导入的数据的结果集,测试方法，根据时间递增导入数据
     * @return 结果集
     * @throws SQLException sql异常
     * @throws SolrServerException solr异常
     * @throws IOException IO异常
     */
    public long findResultByDateSet() throws SQLException, SolrServerException, IOException {
        String sql = this.initSqlStr();
        StackTraceElement[] ste = new Throwable().getStackTrace();
        StringBuffer CallStack = new StringBuffer();
        for (int i = 0; i < ste.length; i++) {
            CallStack.append(ste[i].toString() + " | ");
            if (i > 1)
                break;
        }
        ste = null;
        String press = MD5Tool.getMD5String();
        Date startDate = null;
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        conn = getConnetionByJdbc();
        st = conn.createStatement();
        long count = 0;
        String pageSql = "";
        long allCount = 0;
        Date endDate = null;
        Date startDateTwo = null;
        
        String sqlStartTime = "2015-10-01 00:00:00";
        String sqlEndTime = null;
        Date sqlStartDate = null;
        //以时间递增一个小时为例
        do {
        	sqlStartDate = DateUtil.parseToDate(sqlStartTime, "yyyy-MM-dd HH:mm:ss");
        	//sqlStartDate.setMinutes(sqlStartDate.getMinutes() + 15); //每次导入15分钟内的数据
        	sqlStartDate.setHours(sqlStartDate.getHours() + 1);
        	sqlEndTime = DateUtil.parseToString(sqlStartDate, "yyyy-MM-dd HH:mm:ss");
        	
        	//测试
        	//sqlEndTime = "2015-09-01 00:15:00";
        		
            pageSql = sql + " where t.JGSJ > to_date('" + sqlStartTime + "', 'yyyy-mm-dd hh24:mi:ss')" +
                    " and t.JGSJ <= to_date('" + sqlEndTime + "', 'yyyy-mm-dd hh24:mi:ss')";
            printPressAndSql(CallStack,press,pageSql);
            startDate = new Date();
            rs = st.executeQuery(pageSql);
            endDate = new Date();
            log.info(press + "数据库查询时间：" + StringUtil.getTimeInMillis(startDate, endDate));
            startDateTwo = new Date();
            count = this.addResultSet(rs);
            endDate = new Date();
            log.info(press + "导数执行时间：" + StringUtil.getTimeInMillis(startDateTwo, endDate) + 
            		",本次导入数据：" + count + "条,执行时间段：" + sqlStartTime + " - " + sqlEndTime);
            allCount = allCount + count;
            sqlStartTime = sqlEndTime;
            
            //测试
            //count = 0l;
        } while(count > 0l);
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (st != null) {
            try {
                st.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //solr.commit();
        //solr.shutdown();
        log.info(press + "总共导入数据量：" + allCount + "条");
        return allCount;
    }

	/**
     * 从数据库总查找要导入的数据的结果集
     * @return 结果集
     * @throws SQLException sql异常
     * @throws SolrServerException solr异常
     * @throws IOException IO异常
     */
    public long findResultByIdSet() throws SQLException, SolrServerException, IOException {
    	HttpSolrClient solr = null;
    	List<CarTakeSolr> beans = null;
        solr = initSolr();
        beans = this.findMaxIdFromSolr(solr);
        String maxId = this.dealMaxPicId(beans);
        //临时造数据时使用
        if (!StringUtil.checkStr(maxId)) {
        	maxId = "3623151";
        }
        String sql = this.initSqlStr();
        StackTraceElement[] ste = new Throwable().getStackTrace();
        StringBuffer CallStack = new StringBuffer();
        for (int i = 0; i < ste.length; i++) {
            CallStack.append(ste[i].toString() + " | ");
            if (i > 1)
                break;
        }
        ste = null;
        String press = MD5Tool.getMD5String();
        Date startDate = null;
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        conn = getConnetionByJdbc();
        st = conn.createStatement();
        BigInteger selectCounts = new BigInteger("0");
        long count = 0;
        String pageSql = "";
        //long pageLimit = 50000l;
        BigInteger pageLimit = new BigInteger("10000");
        long allCount = 0;
        Date endDate = null;
        Date startDateTwo = null;
        
        BigInteger maxIdBigStart = new BigInteger(maxId); 
        BigInteger startIdBig = null;
        BigInteger endIdBig = null;
        BigInteger addOnePageId = null;
        BigInteger oneBig = null;
        if (StringUtil.checkStr(maxId)) {//永远都不会再出现删除数据的情况了
            do {
                startIdBig = selectCounts.multiply(pageLimit).add(maxIdBigStart);
                addOnePageId = new BigInteger("1");
                endIdBig = selectCounts.add(addOnePageId).multiply(pageLimit).add(maxIdBigStart);
                pageSql = sql + " where a.ID >" + startIdBig.toString() +
                        " and a.ID <=" + Math.abs(StringUtil.toInt(endIdBig));
                printPressAndSql(CallStack,press,pageSql);
                startDate = new Date();
                rs = st.executeQuery(pageSql);
                endDate = new Date();
                log.info(press + "数据库查询时间：" + StringUtil.getTimeInMillis(startDate, endDate));
                oneBig = new BigInteger("1");
                selectCounts = selectCounts.add(oneBig);
                //selectCounts++;
                startDateTwo = new Date();
                count = this.addResultSet(rs);
                endDate = new Date();
                log.info(press + "导数执行时间：" + StringUtil.getTimeInMillis(startDateTwo, endDate) + ",本次导入数据：" + count + "条");
                allCount = allCount + count;
                startIdBig = null;
                addOnePageId = null;
                endIdBig = null;
                oneBig = null;
            } while(count > 0l);
        }
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (st != null) {
            try {
                st.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        solr.commit();
        solr.shutdown();
        log.info(press + "总共导入数据量：" + allCount + "条");
        return allCount;
    }
    
    /**
     * 添加数据库结果集到solr
     * @param rs 结果集
     * @return 插入的条数
     * @throws SQLException sql异常
     * @throws SolrServerException solr异常
     * @throws IOException IO异常
     */
    public long addResultSet(ResultSet rs) throws SQLException,
            SolrServerException, IOException {
        //HttpSolrServer solrCore = this.initSolr();
        int fetchSize = 1000;
        long count = 0;
        int innerCount = 0;
        Collection<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();
        ResultSetMetaData rsm = rs.getMetaData();
        int numColumns = rsm.getColumnCount();
        //String[] colNamesA = new String[numColumns + 1];
        String[] colNames = this.initSolrFiled();
        Object f;
        SolrInputDocument doc = null;
        boolean dataFlag = false;
        
        CarTake record = null;
        List<CarTake> records = new ArrayList<CarTake>();
        while (rs.next()) {
            if (!dataFlag) {
                dataFlag = true;
            }
            count++;
            innerCount++;

            doc = new SolrInputDocument();
            /**
             * At this point, take care of manual document field assignments for
             * which you previously assigned the colNames entry to null.
             */
            // doc.addField("solr_db_id", rs.getLong("db_id"));
            //由于采用了分页所以多了一个rownum字段，因此numColumns + 1变为numColumns
            record = new CarTake();
            String[] brands = {"海马","猎豹","现代","福特","雪铁龙","雷克萨斯","雷诺","马自达","黄海","吉利"};
            String[] types = {"MG3", "丘比特","福美来","欧酷曼","飞扬皮卡","毕加索", "东风","小宝马","速腾","旗云2"};
            String[] carYears = {"2011", "2010","2012","2013","2014","2011", "2010","2012","2013","2014"};
            String[] carTypes = {"Z11", "Z21","Z31","Z41","Z51","Z71", "B12","B11","B13","B14"};
            String[] csys = {"A","K","Y","C","E","F","H","I","J","B"};
            String[] hpys = {"0","1","2","3","4","0","1","2","3","4"};
            String[] clzls = {"01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20"};
            for (int j = 1; j < (numColumns); j++) { 
                if (colNames[j] != null) {
                    if (StringUtil.equals(colNames[j], "jgsj") || StringUtil.equals(colNames[j], "rksj")) {
                        //时间转换
                        if (StringUtil.checkStr(rs.getString(j))) {
                            f = DateUtil.parseToDate(rs.getString(j), "yyyy-MM-dd HH:mm:ss");
                        } else {
                            f = rs.getString(j);
                        }
                    } else {
                        f = rs.getString(j);
                    }
                    /*if (colNames[j] != "rksj" && colNames[j] != "cdbh") {
                    	 doc.addField(colNames[j], f);
                    }*/
                    
                    //hbase
                    if (j == 1) {
                    	 record.setId(StringUtil.toString(f));
                    }
                    if (j == 2) {
	                   	 record.setXxbh(StringUtil.toString(f));
                    }
                    if (j == 3) {
	                   	 record.setJgsj((Date)f);
                    }
                    if (j == 4) {
	                   	 record.setRksj((Date)f);
                    }
                    if (j == 5) {
	                   	 record.setHphm(StringUtil.toString(f));
                    }
                    if (j == 6) {
	                   	 record.setKkbh(StringUtil.toString(f));
                    }
                    if (j == 7) {
	                   	 record.setFxbh(StringUtil.toString(f));
                    }
                    if (j == 8) {
	                   	 record.setSbbh(StringUtil.toString(f));
                    }
                    if (j == 9) {
	                   	 record.setCdbh(StringUtil.toString(f));
                    }
                    if (j == 10) {
	                   	 record.setHpzl(StringUtil.toString(f));
                    }
                    int counts = new Random().nextInt(10);
                    int countsTwo = new Random().nextInt(19);
                    record.setBrand(brands[counts]);
                    record.setType(types[counts]);
                    record.setCaryear(carYears[counts]);
                    record.setCllx(carTypes[counts]);
                    record.setDropnum("3");
                    record.setBoxnum("2");
                    record.setSunflag("4");
                    record.setTagnum("5");
                    record.setCsys(csys[counts]);
                    record.setHpys(hpys[counts]);
                    record.setClzl(clzls[countsTwo]);
                    f = null;
                }
            }
            records.add(record);
            
            /*docs.add(doc);
            doc = null; 
            *//**
             * When we reach fetchSize, index the documents and reset the inner
             * counter.
             *//*
            if (innerCount == fetchSize) {
                solrCore.add(docs);
                docs.clear();
                innerCount = 0;
            }*/
        }
        this.saveRecordsToHbase(records);

        /**
         * If the outer loop ended before the inner loop reset, index the
         * remaining documents.
         */
        /*if (innerCount != 0) {
            solrCore.add(docs);
        }*/
        return count;
    }
    
    /**
     * 加载solr字段
     * @return 返回结果
     */
    public String[] initSolrFiled() {
        String[] colNames = {"null",
        		"id",
                "xxbh",
                "jgsj",
                "rksj",
                "hphm",
                "kkbh",
                "fxbh",
                "sbbh",
                "cdbh",
                "hpzl",
                "hpys"
               };
        return colNames;
    }
    
    /**
     * 初始化导数sql,暂时注释CAP_TYPE字段
     * @return 初始化结果
     * @throws SQLException sql异常
     * @throws SolrServerException solr异常
     * @throws IOException IO异常
     */
    public String initSqlStr() throws SQLException, SolrServerException, IOException {
        String sql = "select SEQ_CAR_TAB_TEMP.Nextval as id, t.xxbh,t.jgsj,sysdate as rksj,t.hphm,t.kkbh," +
        		"'4401000086' as fxbh,t.sbbh,t.cdbh,t.hpzl,t.hpys from CAR_TAB_TEMP_3 t";
        return sql;
    }
    
    /**
     * 由于通过读取配置文件上下文去去调用数据库的时候,系统不稳定,
     * 会出现后台报错,因此没办法,自己在代码里面直接调用数据库了
     * @return 返回连接
     */
    public synchronized Connection getConnetionByJdbc() {
        String jdbcDriverName = "oracle.jdbc.OracleDriver";
        String jdbcUrl = "jdbc:oracle:thin:@172.31.108.194:1521:SICSDB";
        String username = "si01";
        String password = "jp2011";
        Connection conn = null;
        try{    
            //加载Oracle的驱动类   
            Class.forName(jdbcDriverName) ;    
        }catch(ClassNotFoundException e){    
            System.out.println("找不到驱动程序类 ，加载驱动失败！");    
            e.printStackTrace() ;    
        }    
        try{    
            conn = DriverManager.getConnection(jdbcUrl , username , password ) ;    
         }catch(SQLException se){    
             System.out.println("数据库连接失败！");    
             se.printStackTrace() ;    
         }    
        return conn;
    }
    
    /**
     * 调用统一打印的语句
     * @param CallStack
     * @param press
     * @param sql
     */
    private static void printPressAndSql(StringBuffer CallStack,String press, String sql) {
        log.info(press + "执行路径：" + CallStack.toString());
        log.info(press + "执行脚本：" + sql);
    }
    
    /**
     * 从结果集中过滤最大的ID
     * @param beans ID记录
     * @return 查找结果
     */
    public String dealMaxPicId(List<CarTakeSolr> beans) {
    	CarTakeSolr tempPicSolr = null;
    	CarTakeSolr picSolr = null;
        if (beans != null && beans.size() > 0) {
            picSolr = beans.get(0);
            for (int i = 1; i < beans.size(); i++) {
                if (StringUtil.toInt(beans.get(i).getId()) > StringUtil.toInt(picSolr.getId())) {
                    tempPicSolr = beans.get(i);
                }
            }
            if (tempPicSolr == null) {
                tempPicSolr = picSolr;
            }
            return tempPicSolr.getId();
        } else {
            return null;
        }
    }
    
    /**
     * 每次导数完成，查找solr服务器，找出最大ID的记录
     * @return
     * @throws IOException 
     */
    public List<CarTakeSolr> findMaxIdFromSolr(HttpSolrClient solr) throws IOException {
        Map<String, Long> resultMap = new HashMap<String, Long>();
        //HttpSolrServer solr = initSolr();
        SolrQuery query = new SolrQuery();
        //初始化查询对象
        String searchStr = this.intSeachMaxIds();
        if (StringUtil.isNotBlank(searchStr)) {
           query.setQuery(searchStr);
        }
        //设置起始位置与返回结果数
        query.setStart(0);
        query.setRows(4000);//一次性设置4000条，不可能一秒钟长生4000条数据吧，但是solr也会去找4000条数据
        query.addSort("capDate", SolrQuery.ORDER.desc);
        QueryResponse rsp = null;
        try {
            rsp = solr.query(query);
        } catch (Exception e) {
            if (rsp == null) {
                try {
                    Thread.sleep(1000);//等待1秒
                    rsp = solr.query(query);
                } catch (SolrServerException e1) {
                } catch (InterruptedException e1) {
                    e1.printStackTrace();
                }
                e.printStackTrace();
                return null;
            }
        } finally { //如果请求失败，则再请求一次，如果还失败，说明solr服务已经关闭
            if (rsp == null) { //判断第一次求情后的结果是否为空
                try {
                    Thread.sleep(1000);//再等待1秒
                    rsp = solr.query(query);
                } catch (SolrServerException e) {
                } catch (InterruptedException e1) {
                    e1.printStackTrace();
                }
            }
        }
        List<CarTakeSolr> beans = rsp.getBeans(CarTakeSolr.class);
        return beans;
    }
    
    /**
     * 初始化查找最大ID的solr条件
     * @return 组装结果
     */
    public String intSeachMaxIds() {
        StringBuffer buffer = new StringBuffer();
        buffer.append("*:*");
        return buffer.toString();
    }
    
    /**
     * 预加载服务器所需要的solr服务
     * @param domainFlag 上下级平台标识
     * @return 处理结果
     */
    public Object initSolrInstance(String domainFlag) {
        Object solr = null;
        if (StringUtil.equals(domainFlag, "0")) {
            solr = initSolr();
        } 
        if (StringUtil.equals(domainFlag, "1")) {
            solr = initSolrCloud();
        } 
        return solr;
    }
    
    /**
     * 预加载solr服务
     * @return solr服务
     */
    public HttpSolrClient initSolr() {
    	HttpSolrClient solr = null;
        try {
            //String url = ScriptUtilsComponent.systemConfig.getProperty("solr_server_url");
            String url = "http://172.31.108.116:8983/solr/db";
            solr = new HttpSolrClient(url);
            solr.setSoTimeout(10000);  
            solr.setConnectionTimeout(10000);
            solr.setDefaultMaxConnectionsPerHost(100);
            solr.setMaxTotalConnections(100);
            solr.setMaxRetries(1); 
        } catch (Exception e) {
            System.out.println("请检查solr的服务器或端口是否开启!");
            e.printStackTrace();
        }
        return solr;
    }
    
    /**
     * 预加载solrCloud服务
     * @return solrCloud服务
     */
    public CloudSolrClient initSolrCloud() {
    	CloudSolrClient solrCloud = null;
        try {
            String zkHost = "172.31.108.116";     
            String  defaultCollection = "gettingstarted_shard2_replica1";
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
     * 单条记录插入数据
     * @param record
     * @return
     */
    public boolean saveRecordToHbase(CarTake record) {
		try{
			hbaseDao.insertCarTake(record);
			return true;
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return false;
	}
    
    /**
     * 多条记录插入数据，待优化为批量
     * @param records
     * @return
     */
    public boolean saveRecordsToHbase(List<CarTake> records) {
		try{
			//List<ICarTake> iCarTakes = new ArrayList<ICarTake>();
			/*ICarTake iCarTake = null;
			for(CarTake record:records){
				iCarTake = new CarTake();
				iCarTake = record;
				iCarTakes.add(iCarTake);
			}*/
			
			int dataNumber = records.size() / 7; //一个线程执行最多dataNumber条数据
			List<List<ICarTake>> dataRsults = new ArrayList<List<ICarTake>>();
			List<ICarTake> childList = new ArrayList<ICarTake>();
			ICarTake iCarTake = null;
			for(int m = 0; m < records.size(); m++){
				iCarTake = new CarTake();
				iCarTake = records.get(m);
				childList.add(iCarTake);
				if (m != 0 && m%dataNumber == 0) {
					dataRsults.add(childList);
					childList = new ArrayList<ICarTake>();
				}
			}
			if (childList != null && childList.size() > 0) {
				dataRsults.add(childList);	
			}
			
			CountDownLatch statuLatch = new CountDownLatch(dataRsults.size());//threadNumber个线程并发执行
			DealDataWorker dealDataWorker = null;
			for (int i = 0; i < dataRsults.size(); i++) {
				dealDataWorker = new DealDataWorker(dataRsults.get(i), statuLatch);
				dealDataWorker.start();
			}
			statuLatch.await();//等待所有线程完成工作  
			//hbaseDao.insertAllCarTakesForSolr(iCarTakes);
			return true;
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return false;
	}
    
    class DealDataWorker extends Thread{  
    	List<ICarTake> iCarTakes;
    	CountDownLatch downlatch;  
    	public DealDataWorker(List<ICarTake> iCarTakes, CountDownLatch latch){  
        	this.iCarTakes = iCarTakes;
        	 this.downlatch = latch;  
        }  
    	public void run(){  
    		hbaseDao.insertAllCarTakesForSolr(iCarTakes);
    		downlatch.countDown();//完成工作，计数器减一  
    	}
    }
    
    public static void main(String[] args) {
    	long counts = 0l;
    	SolrHandlerDaoImpl solrHandlerDao = new SolrHandlerDaoImpl();
		try {
			counts = solrHandlerDao.findResultByDateSet();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("===================================" + counts);
    }
}
