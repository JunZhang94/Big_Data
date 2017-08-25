package com.jp.tic.business.cartake.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.service.impl.QueryAnalyzeStatServiceImpl;
import com.jp.tic.business.cartake.dao.FullTextSearchDao;
import com.jp.tic.business.cartake.enums.BasicDataType;
import com.jp.tic.business.cartake.mapper.CarQueryAnalyzeStatMapper;
import com.jp.tic.business.cartake.service.BasicDataService;
import com.jp.tic.business.cartake.service.CarQueryStatService;
import com.jp.tic.common.util.BeanIntrospectorUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

/**
 * <b>function:</b> 车辆统计查询
 * @author hoojo
 * @createDate 2014-5-27 上午11:27:40
 * @file CarQueryStatServiceImpl.java
 * @package com.jp.tic.business.cartake.service.impl
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Service
public class CarQueryStatServiceImpl<E extends Map<String, Object>> extends QueryAnalyzeStatServiceImpl<E> implements CarQueryStatService<E> {

	@Autowired
	private BasicDataService<E> service;
	
	@Autowired
	private CarQueryAnalyzeStatMapper<E> mapper;
	
	@Autowired
	private FullTextSearchDao fullTextSearchDao;
	
	@Override
	public List<E> queryBasicData(BasicDataType dataType, String code) throws Exception {
		return service.queryBasicData(dataType, code);
	}

	@Override
	public List<E> queryAnalyzeFakePlate(E param) throws Exception {
		try {
			return mapper.queryAnalyzeFakePlate(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	@Override
	public List<E> queryAnalyzeFakePlates(E param) throws Exception {
		try {
			return mapper.queryAnalyzeFakePlates(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	@Override
	public Integer queryAnalyzeTaopaiche(E param) throws Exception {
		try {
			return mapper.queryAnalyzeTaopaiche(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	@Override
	public List<E> queryAnalyzeFakeiLocalCar(E param) throws Exception {
		try {
			return mapper.queryAnalyzeFakeiLocalCar(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	@Override
	public Integer queryAnalyzeTaopaiLocalCar(E param) throws Exception {
		try {
			return mapper.queryAnalyzeTaopaiLocalCar(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	@Override
	public List<E> queryAnalyzeTaopaichess(E param) throws Exception {
		try {
			return mapper.queryAnalyzeTaopaichess(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	@Override
	public List<E> queryAnalyzeTaopaicheLocal(E param) throws Exception {
		try {
			return mapper.queryAnalyzeTaopaicheLocal(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}

	@Override
	public List<E> queryAnalyzeCarPlateRate(E param) throws Exception {
		try {
			return mapper.queryAnalyzeCarPlateRate(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	@Override
	public List<E> queryAnalyzeCarPlateRates(E param) throws Exception {
		try {
			return mapper.queryAnalyzeCarPlateRates(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	public List<E> huijutongjis(E param) throws Exception {
		try {
			return mapper.huijutongjis(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}	
	public List<E> queryAnalchepaishibielv(E param) throws Exception {
		try {
			return mapper.queryAnalchepaishibielv(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	@Override
	public Integer queryAnalyzeCarcpcxl(E param) throws Exception {
		try {
			return mapper.queryAnalyzeCarcpcxl(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		
		
	}
	
	
	@Override
	public Integer huijutongjiss(E param) throws Exception {
		try {
			return mapper.huijutongjiss(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		
		
	}
	@Override
	public Integer queryAnalyzecheliuliang(E param) throws Exception {
		try {
			return mapper.queryAnalyzecheliuliang(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	@Override
	public List<E> areaStatisticsGrouppingInfo(E param) throws Exception {
		try {
			return mapper.areaStatisticsGrouppingInfo(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	@Override
	public List<E> deptStatisticsGrouppingInfo(E param) throws Exception {
		try {
			return mapper.deptStatisticsGrouppingInfo(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	@Override
	public List<E> queryAnalyzecheliuliangs(E param) throws Exception {
		try {
			return mapper.queryAnalyzecheliuliangs(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	@Override
	public List<E> queryAnalyzeCarPlateRatess(E param) throws Exception {
		try {
			return mapper.queryAnalyzeCarPlateRatess(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}

	@Override
	public List<Map<String, String>> getPictureURLInCarQuery(
			Map<String,String> param) throws Exception {
		try {
			return mapper.getPictureURLInCarQuery(param);
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	/**
	 * 套牌车确认
	 * @param param
	 * @return
	 */
	public int confimTaopaiInfo(Map<String, String> param) {
		return fullTextSearchDao.confimTaopaiInfo(param);
	}
	
	/**
	 * 假牌车确认
	 * @param param
	 * @return
	 */
	public int confimFakeInfo(Map<String, String> param) {
		return fullTextSearchDao.confimFakeInfo(param);
	}
	
	/**
	 * 导出管理查询
	 * @param param
	 * @return
	 */
	public List<Map<String,String>> exportMangerQuery(Map<String,String> param) {
		return fullTextSearchDao.exportMangerQuery(param);
	}
	
	/**
	 * 统计导出管理数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countExportMangerDatas(Map<String, String> param) {
		return fullTextSearchDao.countExportMangerDatas(param);
	}
	
	/**
	 * 下载管理查询
	 * @param param
	 * @return
	 */
	public List<Map<String,String>> imageMangerQuery(Map<String,String> param) {
		return fullTextSearchDao.imageMangerQuery(param);
	}
	
	/**
	 * 统计下载管理数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countimageMangerDatas(Map<String, String> param) {
		return fullTextSearchDao.countimageMangerDatas(param);
	}
	
	/**
	 * 本地套牌车确认
	 * @param param
	 * @return
	 */
	public int confimLocalTaopaiInfo(Map<String, String> param) {
		return fullTextSearchDao.confimLocalTaopaiInfo(param);
	}
	
	/**
	 * 套牌车组装汇聚统计查询语句
	 * @param param
	 * @param searchParam
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public E taopaiches(Map<String, String> param, Map<String, String> searchParam) {
		E queryParam = (E) BeanIntrospectorUtils.desc(param);
	//	List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		StringBuffer buffer = new StringBuffer();
		//dates	2
//		orgId	42011300
		int pageStart = StringUtil.toInteger(searchParam.get("page.start"));
        int rows = StringUtil.toInteger(searchParam.get("page.limit"));
        int carSpeed =  StringUtil.toInteger(searchParam.get("carSpeed")); 
		String startdate = searchParam.get("startdate");
		String enddate = searchParam.get("enddate");
		if (StringUtil.checkStr(searchParam.get("carNum"))) {
			queryParam.put("carNum", searchParam.get("carNum"));
		}
		if (StringUtil.checkStr(searchParam.get("carNumList"))) {
			String carList="'"+searchParam.get("carNumList").replace(",", "','")+"'";
			queryParam.put("carNumList", carList);
		}
		if (pageStart == 0) {
			queryParam.put("sss1","select * from (");
			queryParam.put("sss2",buffer.toString() + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            queryParam.put("sss1","select * from ( select row_.*, rownum rownum_ from (");
            queryParam.put("sss2",buffer.toString() + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		queryParam.put("carSpeed", carSpeed);
		queryParam.put("confimFlag", searchParam.get("confimFlag"));
		queryParam.put("startdate", startdate);
		queryParam.put("enddate", enddate);
		if (StringUtil.checkStr(searchParam.get("mounts"))) {
			String mountStr = "";
			String[] mounts = searchParam.get("mounts").split(",");
			for (int i = 0; i < mounts.length; i++) {
				if (StringUtil.checkStr(mountStr)) {
					mountStr += ",";
				}
				mountStr += "'" + mounts[i] + "'";
			}
			queryParam.put("mounts", mountStr);
		}
		return queryParam;
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> taopaiLocalCarInfo(String jsonParam) throws Exception {
		Map<String, String> searchParam = JsonUtil.jsonToMap(jsonParam);
		E queryParam = this.taopaiches(new HashMap<String, String>(), searchParam);
		List<E> result = new ArrayList<E>();
		int a =	this.queryAnalyzeTaopaiLocalCar(queryParam);
		result.addAll(this.queryAnalyzeFakeiLocalCar(queryParam));
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", result);
		resultMap.put("counts", a);
		return resultMap;
	}
}
