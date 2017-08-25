package com.jp.tic.business.cartake.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.jp.tic.analyze.service.QueryAnalyzeStatService;
import com.jp.tic.business.cartake.enums.BasicDataType;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.view.RequestUtil;

/**
 * <b>function:</b> 车辆查询、统计
 * @author hoojo
 * @createDate 2014-5-27 上午11:00:05
 * @file CarQueryStatService.java
 * @package com.jp.tic.business.cartake.service
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface CarQueryStatService<E extends Map<String, Object>> extends QueryAnalyzeStatService<E> {
	
	public List<E> queryBasicData(BasicDataType dataType, String code) throws Exception;

	/**
	 * <b>function:</b> 查询套牌车分析结果
	 * @author hoojo
	 * @createDate 2014-8-14 上午11:41:55
	 * @return
	 * @throws Exception
	 */
	public List<E> queryAnalyzeFakePlate(E param) throws Exception;
	public List<E> queryAnalyzeFakePlates(E param) throws Exception;
	public List<E> queryAnalyzeFakeiLocalCar(E param) throws Exception;
	public Integer queryAnalyzeTaopaiche(E param) throws Exception;
	public Integer queryAnalyzeTaopaiLocalCar(E param) throws Exception;
	public List<E>  queryAnalyzeTaopaichess(E param) throws Exception;
	public List<E>  queryAnalyzeTaopaicheLocal(E param) throws Exception;

	/**
	 * <b>function:</b> 过车频度统计、识别率统计
	 * @author hoojo
	 * @createDate 2014-8-14 下午04:27:39
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<E> queryAnalyzeCarPlateRate(E param) throws Exception;
	public List<E> queryAnalyzeCarPlateRates(E param) throws Exception;
	public List<E> huijutongjis(E param) throws Exception;
	public List<E> queryAnalchepaishibielv(E param) throws Exception;
	public Integer queryAnalyzeCarcpcxl(E param) throws Exception;
	public Integer huijutongjiss(E param) throws Exception;
	public Integer queryAnalyzecheliuliang(E param) throws Exception;
	public List<E> areaStatisticsGrouppingInfo(E param) throws Exception;
	public List<E> deptStatisticsGrouppingInfo(E param) throws Exception;
	public List<E> queryAnalyzecheliuliangs(E param) throws Exception;
	public List<E> queryAnalyzeCarPlateRatess(E param) throws Exception;
	
	/**
	 * <b>function:</b>获取套牌车分析中的Id、图像1和图像2的信息
	 * @author jzxie
	 * @createDate 2014-10-25 10:43 am
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,String>> getPictureURLInCarQuery(Map<String,String> param)throws Exception;
	
	/**
	 * 套牌车确认
	 * @param param
	 * @return
	 */
	public int confimTaopaiInfo(Map<String, String> param);
	
	/**
	 * 假牌车确认
	 * @param param
	 * @return
	 */
	public int confimFakeInfo(Map<String, String> param);
	
	/**
	 * 导出管理查询
	 * @param param
	 * @return
	 */
	public List<Map<String,String>> exportMangerQuery(Map<String,String> param);
	
	/**
	 * 统计导出管理数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countExportMangerDatas(Map<String, String> param);
	
	/**
	 * 下载管理查询
	 * @param param
	 * @return
	 */
	public List<Map<String,String>> imageMangerQuery(Map<String,String> param);
	
	/**
	 * 统计下载管理数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countimageMangerDatas(Map<String, String> param);
	
	/**
	 * 本地套牌车确认
	 * @param param
	 * @return
	 */
	public int confimLocalTaopaiInfo(Map<String, String> param);
	
	public Map<String, Object> taopaiLocalCarInfo(String jsonParam) throws Exception;
	
}
