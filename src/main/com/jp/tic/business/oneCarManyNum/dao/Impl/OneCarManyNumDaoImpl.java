package com.jp.tic.business.oneCarManyNum.dao.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import com.jp.tic.business.oneCarManyNum.dao.OneCarManyNumDao;
import com.jp.tic.business.util.SolrSQLUtils;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class OneCarManyNumDaoImpl extends AbstractKKHBaseDao implements OneCarManyNumDao {
	
	private static Logger logger=LoggerFactory.getLogger(CarTakeDaoImpl.class);
	
	@Override
	public Map<String, Object> queryOneCarManyNumForPages(String json) {
		Map<String, String> searchParam=JsonUtil.jsonToMap(json);
		Map<String,Object> resultMap=new HashMap<String, Object>();
		List<CarTakeSolr> solrList=new ArrayList<CarTakeSolr>();
		StringBuffer sb=new StringBuffer();
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
		//--------------------------solr结束-----------------------------------
		if(searchParam.containsKey("carCategory")){//车辆类别
			if(searchParam.get("carCategory").indexOf(",")>0){
				sb.append("( ");
				String[] str=searchParam.get("carCategory").split(",");
				for(int i=0;i<str.length;i++){
					if(i==str.length-1){
						sb.append("clzl:" + str[i]+" ) AND ");
					}else{
						sb.append("clzl:" + str[i] +" OR ");
					}
				}
			}else{
				sb.append("clzl:"+searchParam.get("carCategory")+" AND ");
			}
		}
		if(searchParam.containsKey("carColor")){//车身颜色
			if(searchParam.get("carColor").indexOf(",")>0){
				sb.append("( ");
				String[] str=searchParam.get("carColor").split(",");
				for(int i=0;i<str.length;i++){
					if(i==str.length-1){
						sb.append("csys:" + str[i]+" ) AND ");
					}else{
						sb.append("csys:" + str[i] +" OR ");
					}
				}
			}else{
				sb.append("csys:"+searchParam.get("carColor")+" AND ");
			}
			
		}
		if(searchParam.containsKey("hpys")){//号牌颜色
			if(searchParam.get("hpys").indexOf(",")>0){
				sb.append("( ");
				String[] str=searchParam.get("hpys").split(",");
				for(int i=0;i<str.length;i++){
					if(i==str.length-1){
						sb.append("hpys:" + str[i]+" ) AND ");
					}else{
						sb.append("hpys:" + str[i] +" OR ");
					}
				}
			}else{
				sb.append("hpys:"+searchParam.get("hpys")+" AND ");
			}
		}
		if(searchParam.containsKey("dropNum")){//挂坠
			sb.append("dropnum:"+searchParam.get("dropNum")+" AND ");
		}
		if(searchParam.containsKey("boxNum")){//纸巾盒
			sb.append("boxnum:"+searchParam.get("boxNum")+" AND ");
		}
		if(searchParam.containsKey("tagNum")){//年检标
			String operate=searchParam.get("operate");
			if("<".equals(operate)){
				sb.append("tagnum:[0 TO "+searchParam.get("tagNum")+" } AND ");
			}else if(">".equals(operate)){
				sb.append("tagnum:["+searchParam.get("tagNum")+" TO 100} AND ");
			}else{
				sb.append("tagnum: "+searchParam.get("tagNum")+" AND ");
			}
		}
		String brand=null;
		String type=null;
		String year=null;
		if(searchParam.containsKey("carBrand")){//车辆品牌
			brand=searchParam.get("carBrand");
		}
		if(searchParam.containsKey("carType")){//车辆型号
			type=searchParam.get("carType");
		}
		if(searchParam.containsKey("carYear")){//车辆年款
			year=searchParam.get("carYear");
		}
		if(brand==null&&type==null&&year==null){
		}else{
			sb=this.fixSQL(sb, brand, type, year);
		}
		if(searchParam.containsKey("mounts")){//卡口编号
			if(searchParam.get("mounts").indexOf(",")>0){
				sb.append("( ");
				String[] str=searchParam.get("mounts").split(",");
				for(int i=0;i<str.length;i++){
					String kkbh="";
					if(str[i].length()<18){
						kkbh="440"+str[i];
					}else{
						kkbh=str[i];
					}
					if(i==str.length-1){
						sb.append("kkbh:" + kkbh+" ) AND ");
					}else{
						sb.append("kkbh:" + kkbh +" OR ");
					}
				}
			}else{
				String kkbh="";
				if(searchParam.get("mounts").length()<18){
					kkbh="440"+searchParam.get("mounts");
				}else{
					kkbh=searchParam.get("mounts");
				}
				sb.append("kkbh:"+kkbh+" AND ");
			}
		}
		String str=SolrSQLUtils.DateFomatterAndFinishSQL(searchParam, sb);
		query.setQuery(str);
		if(searchParam.containsKey("page.start")){
			query.setStart(Integer.parseInt(searchParam.get("page.start")));
		}else{
			query.setStart(0);
		}
		if(searchParam.containsKey("page.limit")){
			query.setRows(Integer.parseInt(searchParam.get("page.limit")));
		}else{
			query.setRows(Integer.MAX_VALUE);
		}
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
				Map<String,CarTake> map=new HashMap<String,CarTake>();
				for(CarTake carTake:list){
					if(map.containsKey(carTake.getHphm())){
						continue;
					}else{
						map.put(carTake.getHphm(), carTake);
					}
				}
				list.clear();
				for(CarTake carTake:map.values()){
					list.add(carTake);
				}
				resultMap.put("rows", list);
			}
		}
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
	
	/**
	 * 组装品牌、型号、年款多选  editBy zh.h
	 * @param sb
	 * @param brand
	 * @param type
	 * @param year
	 * @return
	 */
	public StringBuffer fixSQL(StringBuffer sb,String brand,String type,String year){
		sb.append(" (");
		Set<String> set=new HashSet<String>();
		if(year!=null){
			if (year.indexOf(",")>0){
				String[] a3=year.split(",");
				for(int i=0;i<a3.length;i++){
					if(a3[i].indexOf("_")>0){
						sb.append("(");
						String[] b3=a3[i].split("_");
						for(int j=0;j<b3.length;j++){
							set.add(b3[j]);
							if(j==b3.length-1){
								sb.append("caryear:"+b3[j]+" ) OR ");
							}else if(j==0){
								sb.append("brand:"+b3[j]+" AND ");
							}else{
								sb.append("type:"+b3[j]+" AND ");
							}
						}
					}
				}
			}else{
				sb.append("(");
				String[] b3=year.split("_");
				for(int j=0;j<b3.length;j++){
					set.add(b3[j]);
					if(j==b3.length-1){
						sb.append("caryear:"+b3[j]+" ) OR ");
					}else if(j==0){
						sb.append("brand:"+b3[j]+" AND ");
					}else{
						sb.append("type:"+b3[j]+" AND ");
					}
				}
			}
		}
		if(type!=null){
			if(type.indexOf(",")>0){
				String[] a2=type.split(",");
				for(int i=0;i<a2.length;i++){
					if(a2[i].indexOf("_")>0){
						String[] b2=a2[i].split("_");
						if(set.contains(b2[1])){
							continue;
						}else{
							sb.append("(");
							for(int j=0;j<b2.length;j++){
								if(j==b2.length-1){
									sb.append("type:"+b2[j]+" ) OR ");
								}else{
									sb.append("brand:"+b2[j]+" AND ");
								}
							}
						}
					}
				}
			}else{
				sb.append("(");
				String[] b2=type.split("_");
				for(int i=0;i<b2.length;i++){
					if(set.contains(b2[1])){
						break;
					}else{
						if(i==b2.length-1){
							sb.append("type:"+b2[i]+" )");
						}else{
							sb.append("brand:"+b2[i]+" AND ");
						}
					}
				}
			}
		}
		if(brand!=null){
			if(brand.indexOf(",")>0){
				String[] a1=brand.split(",");
				sb.append("(");
				for(int i=0;i<a1.length;i++){
					if(sb.toString().indexOf(a1[i])>0){
						continue;
					}
					if(i==a1.length-1){
						sb.append("brand:"+a1[i]+" ) ");
					}else{
						sb.append("brand:"+a1[i]+" OR ");
					}
				}
			}else{
				if(sb.toString().indexOf(brand)>0){
					
				}else{
					sb.append("brand:"+brand);
				}
			}
		}
		if(sb.lastIndexOf(")")<sb.lastIndexOf("OR")){
			sb=sb.delete(sb.lastIndexOf(")")+1, sb.length());
		}
		sb.append(") AND ");
		set.clear();
		return sb;
	}

}
