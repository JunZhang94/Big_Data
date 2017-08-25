package com.jp.tic.business.gis.dao.impl;

import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.business.gis.dao.GisDao;
import com.jp.tic.common.net.http.HttpUrlClient;

@Repository
public class GisDaoImpl implements GisDao {
	private String header="http://172.31.108.47/arcgis/rest/services/ZH_NA/NAServer/%E8%B7%AF%E5%BE%84/solve";
	private String otherParams="";

	public GisDaoImpl(){
		header=ConfigManager.getInstance().getString("gis.path.header");
		otherParams=ConfigManager.getInstance().getString("gis.path.otherParams");
	}
	
	@Override
	public int getDistanceWithLine(double jd1, double wd1, double jd2, double wd2) {
		return (int)getDistance(wd1,jd1,wd2,jd2)*1000;
	}

	@Override
	public int getDistanceWithPath(double jd1, double wd1, double jd2, double wd2) {
		
		try {
			String points=jd1+","+wd1+";"+jd2+","+wd2;
			HttpUrlClient client=new HttpUrlClient();
			String urlString=header+"?"+points+"&"+otherParams;
			String result=client.getHttpText(urlString);
			
			JSONObject object=new JSONObject(result);
			double distance=object.getDouble("total_length");
			// TODO Auto-generated method stub
			
			return (int) distance;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return -1;
	}

	private double EARTH_RADIUS = 6378.137;
	
	private double rad(double d) {
		return d * Math.PI / 180.0;
	}

	public double getDistance(double lat1, double lng1, double lat2, double lng2) {
		double radLat1 = rad(lat1);
		double radLat2 = rad(lat2);
		double a = radLat1 - radLat2;
		double b = rad(lng1) - rad(lng2);
		double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
				+ Math.cos(radLat1) * Math.cos(radLat2)
				* Math.pow(Math.sin(b / 2), 2)));
		s = s * EARTH_RADIUS;
		//s = Math.round(s * 10000) / 10000;
		return s;
	}
	
	public static void main(String[] args) {
		try {
			GisDaoImpl dao=new GisDaoImpl();
			System.out.println(dao.getDistance(22.259563473,113.323319818,22.258088177,113.324008135));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
