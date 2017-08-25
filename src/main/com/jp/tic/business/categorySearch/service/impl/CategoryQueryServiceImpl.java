package com.jp.tic.business.categorySearch.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.hbase.util.Bytes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.categorySearch.dao.CategoryQueryDataByIndexDao;
import com.jp.tic.business.categorySearch.dao.CategoryQuerySolrIndexDao;
import com.jp.tic.business.categorySearch.entity.CarModel;
import com.jp.tic.business.categorySearch.service.CategoryQueryService;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class CategoryQueryServiceImpl implements
		CategoryQueryService {

	private static Logger logger=LoggerFactory.getLogger(CategoryQueryServiceImpl.class);
	
	@Autowired
	private CategoryQuerySolrIndexDao categoryQuerySolrIndexDao;
	@Autowired
	private CategoryQueryDataByIndexDao categoryQueryDataByIndexDao;
	
	/**
	 * 多条件组合查询solr索引
	 */
	@Override
	public Map<String, Object> queryIndexByParams(Map<String, String> searchParam) {
//		System.out.println(searchParam);
		StringBuffer sb=new StringBuffer();
		int start=StringUtil.toInt(searchParam.get("page.start"));
		int end=StringUtil.toInt(searchParam.get("page.limit"));
		
		String order_by=searchParam.get("dir");
		/*
		 * Solr_SQL组装
		 * solr模糊查询可参考oracle的sql模式
		 */
		if(searchParam.containsKey("carFNum")){
			if(searchParam.containsKey("carBNum")){
				sb.append("hphm:"+searchParam.get("carFNum")+(searchParam.get("carBNum").replace("?", "*").toUpperCase())+" AND ");
			}else{
				sb.append("hphm:"+searchParam.get("carFNum")+"* AND ");
			}
		}else{
			if(searchParam.containsKey("carBNum")){
				if(searchParam.get("carBNum").indexOf("*")!=0){
					sb.append("hphm:*"+(searchParam.get("carBNum").replace("?", "*").toUpperCase())+" AND ");
				}else{
					sb.append("hphm:"+(searchParam.get("carBNum").replace("?", "*").toUpperCase())+" AND ");
				}
			}
		}
//		if(searchParam.containsKey("mountFlag")){
//			sb.append("mountFlag:"+searchParam.get("mountFlag")+" AND ");
//		}
		if(searchParam.containsKey("passStation")){
			if(searchParam.get("passStation").indexOf(",")<0){
				sb.append("kkbh:"+searchParam.get("passStation")+" AND ");
			}else{
				String[] passes=searchParam.get("passStation").split(",");
				sb.append("(");
				for(int i=0;i<passes.length;i++){
					String str=passes[i];
					if(str.length()==18){
						sb.append("kkbh:"+str);
					}else{
						sb.append("kkbh:440"+str);
					}
					if(i!=passes.length-1){
						sb.append(" OR ");
					}else{
						sb.append(" ) AND ");
					}
				}
			}
		}
		if(searchParam.containsKey("carColor")){
			sb.append("csys:"+searchParam.get("carNumColor")+" AND ");
		}
		if(searchParam.containsKey("carBrand")){
			sb.append("brand:"+searchParam.get("carBrand")+" AND ");
		}
		if(searchParam.containsKey("carType")){
			sb.append("type:"+searchParam.get("carType")+" AND ");
		}
		if(searchParam.containsKey("carYear")){
			sb.append("caryear:"+searchParam.get("carYear")+" AND ");
		}
		/*
		 * solr的日期格式需要注意
		 */
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		Date startDate = DateUtil.parseToDate(searchParam.get("startTime"), "yyyy-MM-dd HH:mm:ss");
		Date endDate = DateUtil.parseToDate(searchParam.get("endTime"), "yyyy-MM-dd HH:mm:ss");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
        sb.append("jgsj:[" + startTime + " TO " + endTime + "] AND ");
		
		if(searchParam.containsKey("carCategory")){
			sb.append("clzl:"+searchParam.get("carCategory"));
		}
		String str=sb.toString();
		if(str.lastIndexOf("AND")>str.lastIndexOf(":")){
			str=str.substring(0, str.lastIndexOf("AND"));
		}
		logger.debug("query carCategory_solr sql==>"+str);
		
		return categoryQuerySolrIndexDao.getSolrData(str,order_by,start,end);
	}
	
	public Map<String, Object> queryDataByIndexs(Map<String, Object> map) {
		List<CarModel> list= (List<CarModel>) map.get("rows");
		List<String> rowsKeysList=new ArrayList<String>();
		if(null!=list&&list.size()>0){
			for(CarModel car:list){
				rowsKeysList.add(car.getRowKey());
			}
		}
		List<CarTake> result = null;
        if (rowsKeysList.size() > 0) {
        	List<byte[]> rowKeys=new ArrayList<byte[]>();
        	byte[] rowkey = null;
        	for (String str : rowsKeysList) {
        		rowkey = Bytes.toBytes(str);
        		rowKeys.add(rowkey);
        	}
        	try {
				result = categoryQueryDataByIndexDao.getDatasByKeys(rowKeys);
			} catch (Exception e) {
				e.printStackTrace();
			}
        }
        map.put("rows", result);
        return map;
	}

}
