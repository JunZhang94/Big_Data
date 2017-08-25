package com.jp.tic.analyze.dao.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.DeckCarAnalysisDao;
import com.jp.tic.analyze.dao.MountDistanceDao;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.system.dao.OrganizationDao;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class MountDistanceDaoImpl implements MountDistanceDao {

	@Autowired
	private DeckCarAnalysisDao deckCarAnalysisDao;
	@Autowired
	private OrganizationDao organizationDao;
	
	Map<String,String> allMountsMap = new HashMap<String, String>();
	
	String kkbhKeyTemp = "";
	
	private boolean gisInitFlag=false;
	
	/*String httpUrl = "http://10.0.0.172:6080/arcgis/rest/services/RouteAnalyst/NAServer/路径/solve?" +
			"stops=KKJD1%2CKKWD1%3BKKJD2%2CKKWD2&barriers=&" +
			"polylineBarriers=&polygonBarriers=&outSR=4326&ignoreInvalidLocations=true&accumulateAttributeNames=&" +
			"impedanceAttributeName=length&restrictionAttributeNames=Oneway%2C+turns&attributeParameterValues=&" +
			"restrictUTurns=esriNFSBAllowBacktrack&useHierarchy=false&returnDirections=false&returnRoutes=true&" +
			"returnStops=false&returnBarriers=false&returnPolylineBarriers=false&returnPolygonBarriers=false&" +
			"directionsLanguage=&directionsStyleName=&outputLines=esriNAOutputLineTrueShape&findBestSequence=false&" +
			"preserveFirstStop=true&preserveLastStop=true&useTimeWindows=false&startTime=&outputGeometryPrecision=&" +
			"outputGeometryPrecisionUnits=esriDecimalDegrees&directionsTimeAttributeName=&directionsLengthUnits=esriNAUMeters&f=pjson";*/
	
//	String httpUrl = "http://10.0.0.172:6080/arcgis/rest/services/RouteAnalyst/NAServer/路径/solve?" +
//			"stops=KKJD1%2CKKWD1%3BKKJD2%2CKKWD2&barriers=&" +
//			"polylineBarriers=&polygonBarriers=&outSR=&ignoreInvalidLocations=true&accumulateAttributeNames=&" +
//			"impedanceAttributeName=Length&restrictionAttributeNames=&attributeParameterValues=&" +
//			"restrictUTurns=esriNFSBAllowBacktrack&useHierarchy=false&returnDirections=false&returnRoutes=true&" +
//			"returnStops=false&returnBarriers=false&returnPolylineBarriers=false&returnPolygonBarriers=false&" +
//			"directionsLanguage=zh-CN&directionsStyleName=&outputLines=esriNAOutputLineTrueShapeWithMeasure&" +
//			"findBestSequence=false&preserveFirstStop=false&preserveLastStop=false&useTimeWindows=false&" +
//			"startTime=0&outputGeometryPrecision=&outputGeometryPrecisionUnits=esriDecimalDegrees&" +
//			"directionsOutputType=esriDOTComplete&directionsTimeAttributeName=&directionsLengthUnits=esriNAUMiles&returnZ=false&f=pjson";
	
	/*String httpUrl = "http://172.31.108.58:6080/arcgis/rest/services/RouteAnalyst/NAServer/路径/solve?" +
	"stops=KKJD1%2CKKWD1%3BKKJD2%2CKKWD2&barriers=&polylineBarriers=&polygonBarriers=&" +
	"outSR=&ignoreInvalidLocations=true&accumulateAttributeNames=&impedanceAttributeName=Length&" +
	"restrictionAttributeNames=&attributeParameterValues=&restrictUTurns=esriNFSBAllowBacktrack&useHierarchy=" +
	"false&returnDirections=false&returnRoutes=true&returnStops=false&returnBarriers=false&returnPolylineBarriers=" +
	"false&returnPolygonBarriers=false&directionsLanguage=zh-CN&directionsStyleName=&outputLines=" +
	"esriNAOutputLineTrueShapeWithMeasure&findBestSequence=false&preserveFirstStop=false&preserveLastStop=" +
	"false&useTimeWindows=false&startTime=0&outputGeometryPrecision=&outputGeometryPrecisionUnits=" +
	"esriDecimalDegrees&directionsOutputType=esriDOTComplete&directionsTimeAttributeName=&directionsLengthUnits=" +
	"esriNAUMiles&returnZ=false&f=pjson";*/
	
	String httpUrl = "http://172.31.100.142:6080/arcgis/rest/services/RouteAnalyst/NAServer/路径/solve?" +
	"stops=KKJD1%2CKKWD1%3BKKJD2%2CKKWD2&barriers=&" +
	"polylineBarriers=&polygonBarriers=&outSR=&ignoreInvalidLocations=true&accumulateAttributeNames=&" +
	"impedanceAttributeName=Length&restrictionAttributeNames=&attributeParameterValues=&" +
	"restrictUTurns=esriNFSBAllowBacktrack&useHierarchy=false&returnDirections=false&returnRoutes=true&" +
	"returnStops=false&returnBarriers=false&returnPolylineBarriers=false&returnPolygonBarriers=false&" +
	"directionsLanguage=zh-CN&directionsStyleName=&outputLines=esriNAOutputLineTrueShapeWithMeasure&" +
	"findBestSequence=false&preserveFirstStop=false&preserveLastStop=false&useTimeWindows=false&" +
	"startTime=0&outputGeometryPrecision=&outputGeometryPrecisionUnits=esriDecimalDegrees&" +
	"directionsOutputType=esriDOTComplete&directionsTimeAttributeName=&directionsLengthUnits=esriNAUMiles&returnZ=false&f=pjson";
	
	String sIndexFlag;
	String eIndexFlag;
	
	public String getDinstanceInfo(String httpUrlTemp) {
		String distance = "";
		try {
			System.out.println("当前卡口编号KEY:" + kkbhKeyTemp + "要执行的HTTPURL字符串：" + httpUrlTemp);  
			DefaultHttpClient client = new DefaultHttpClient();
			//发送get请求
			HttpGet request = new HttpGet(httpUrlTemp);
			HttpResponse response = client.execute(request);
			//请求发送成功，并得到响应
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				 //读取服务器返回过来的json字符串数据
				 HttpEntity httpEntity = response.getEntity();
				 if (httpEntity != null){
					 InputStream instreams = httpEntity.getContent(); 
					 BufferedReader br = new BufferedReader(new InputStreamReader(instreams,"utf-8"));  
		             String str;  
		             StringBuffer dataStr = new StringBuffer();  
		             while((str = br.readLine()) != null)  
		             {  
		            	 dataStr.append(str);
		             }  
		             String jsonStr = dataStr.toString();
		             //GIS服务路径计算问题,不存在对应的经纬度信息
		             if (jsonStr.indexOf("error") == -1) {
		            	 
		            	// int startIndex = jsonStr.lastIndexOf("Total_Length");
		            //   int endIndex = jsonStr.lastIndexOf("\"Shape_Length");
		            	 int startIndex = jsonStr.lastIndexOf(this.sIndexFlag);
		            	 int endIndex = jsonStr.lastIndexOf("\""+this.eIndexFlag);
			             String subStr = jsonStr.substring(startIndex, endIndex);
			             String[] subStrs = subStr.split(":");
			             String distanceStr = subStrs[1].split(",")[0].trim();
			             distance = distanceStr;
			             System.out.println("卡口距离：" + distanceStr);  
		             }
				 }
			} else {    
				System.out.println("get请求提交失败1");
			}
		} catch (IOException e) {      
			System.out.println("get请求提交失败2");
		}
		return distance;
	}
	
	public String initHttpUrl(String kkjd1, String kkwd1, String kkjd2, String kkwd2) {
		String httpUrlStr1 = httpUrl.replaceAll("KKJD1", kkjd1);
		String httpUrlStr2 = httpUrlStr1.replaceAll("KKWD1", kkwd1);
		String httpUrlStr3 = httpUrlStr2.replaceAll("KKJD2", kkjd2);
		String httpUrlStr4 = httpUrlStr3.replaceAll("KKWD2", kkwd2);
		return httpUrlStr4;
	}
	
	/**
	 * 计算两个卡口之间的距离
	 * @param kkjd1 卡口经度1
	 * @param kkwd1 卡口纬度1
	 * @param kkjd2 卡口经度2
	 * @param kkwd2 卡口纬度2
	 * @return
	 */
	public int calculateDistance(String kkjd1, String kkwd1, String kkjd2, String kkwd2) {
		if(!gisInitFlag){
			this.initGisInfor();
		}
		String httpUrlTemp = this.initHttpUrl(kkjd1, kkwd1, kkjd2, kkwd2);
		String distance = this.getDinstanceInfo(httpUrlTemp);
		int distanceInt = 0;
		if (StringUtil.checkStr(distance)) {
			double distanceDb = Double.parseDouble(distance);
			distanceInt = (int) distanceDb;
		} else {
			//此情况一般为调用距离计算异常导致
			distanceInt = 0;
		}
		return distanceInt;
	}
	
	/**
	 * 卡口之间距离计算
	 */
	public void initMountDistanceInfo() {
		List<Map<String,String>> allMountsInfo = organizationDao.loadAllMountInfoTwo();
		if (allMountsMap.isEmpty() || allMountsMap == null) {
			try {
				allMountsMap = deckCarAnalysisDao.loadAllMountDistance();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		List<String> resultDatas = new ArrayList<String>();
		StringBuffer sqlBuffer = new StringBuffer();
		if (allMountsInfo != null && allMountsInfo.size() > 0) {
			String kkbhKey = "";
			String kkjd1 = "", kkwd1 = "", kkjd2 = "", kkwd2 = "";
			String distance = "";
			//每次批量提交最大长度为1000
			String[] sqlArray = null;
			String httpUrlTemp = "";
			for (Map<String,String> dataMap1 : allMountsInfo) {
				kkjd1 = dataMap1.get("KKJD");
				kkwd1 = dataMap1.get("KKWD");
				if (!StringUtil.checkStr(kkjd1) || !StringUtil.checkStr(kkwd1)) {
					continue;
				}
				for (Map<String,String> dataMap2 : allMountsInfo) {
					sqlBuffer = new StringBuffer();
					kkjd2 = dataMap2.get("KKJD");
					kkwd2 = dataMap2.get("KKWD");
					if (!StringUtil.equals(dataMap1.get("KKBH"), dataMap2.get("KKBH"))) {
						if (!StringUtil.checkStr(kkjd2) || !StringUtil.checkStr(kkwd2)) {
							continue;
						}
						//初始化请求url
						httpUrlTemp = this.initHttpUrl(kkjd1, kkwd1, kkjd2, kkwd2);
						kkbhKey = dataMap1.get("KKBH") + "-" + dataMap2.get("KKBH");
						kkbhKeyTemp = kkbhKey;
						if (!allMountsMap.isEmpty() && allMountsMap != null) {
							if (StringUtil.checkStr(allMountsMap.get(kkbhKey))) {
								continue;
							} else {
								distance = this.getDinstanceInfo(httpUrlTemp);
								sqlBuffer.append("insert into MOUNT_DISTANCE_TAB(ID,KKBH1,KKBH2,DISTANCE) values (SEQ_MOUNT_DISTANCE_TAB.NEXTVAL");
								int distanceInt = 0;
								if (StringUtil.checkStr(distance)) {
									double distanceDb = Double.parseDouble(distance);
									distanceInt = (int) distanceDb;
								} else {
									//此情况一般为调用距离计算异常导致
									distanceInt = 0;
								}
								sqlBuffer.append(",'" + dataMap1.get("KKBH") + "'");
								sqlBuffer.append(",'" + dataMap2.get("KKBH") + "'");
								sqlBuffer.append("," + distanceInt);
								sqlBuffer.append(")");
								resultDatas.add(sqlBuffer.toString());
								//等于100的时候，暂时保存
								if (resultDatas.size() == 100) {
									sqlArray = resultDatas.toArray(new String[]{});
									int saveCount = deckCarAnalysisDao.saveDistanceInfo(sqlArray);
									System.out.println("保存过车数据成功，数量：" + saveCount);
									resultDatas = new ArrayList<String>();
								}
							}
						} else {
							distance = this.getDinstanceInfo(httpUrlTemp);
							sqlBuffer.append("insert into MOUNT_DISTANCE_TAB(ID,KKBH1,KKBH2,DISTANCE) values (SEQ_MOUNT_DISTANCE_TAB.NEXTVAL");
							int distanceInt = 0;
							if (StringUtil.checkStr(distance)) {
								double distanceDb = Double.parseDouble(distance);
								distanceInt = (int) distanceDb;
							} else {
								//此情况一般为调用距离计算异常导致
								distanceInt = 0;
							}
							sqlBuffer.append(",'" + dataMap1.get("KKBH") + "'");
							sqlBuffer.append(",'" + dataMap2.get("KKBH") + "'");
							sqlBuffer.append("," + distanceInt);
							sqlBuffer.append(")");
							resultDatas.add(sqlBuffer.toString());
							//等于200的时候，暂时保存
							if (resultDatas.size() == 200) {
								sqlArray = resultDatas.toArray(new String[]{});
								int saveCount = deckCarAnalysisDao.saveDistanceInfo(sqlArray);
								System.out.println("保存过车数据成功，数量：" + saveCount);
								resultDatas = new ArrayList<String>();
							}
						}
					}
				}
			}
		}
	}

	@Override
	public void initGisInfor() {
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String tmpUrl = MapGetUtils.getString(config, "gis.getHttpUrl");
		try {
			httpUrl = new String(tmpUrl.getBytes("ISO8859-1"),"UTF-8");
			sIndexFlag=MapGetUtils.getString(config, "gis.sIndexFlag");
			eIndexFlag=MapGetUtils.getString(config, "gis.eIndexFlag");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}
