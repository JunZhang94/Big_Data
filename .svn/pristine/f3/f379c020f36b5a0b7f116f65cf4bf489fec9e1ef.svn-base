package com.jp.tic.app.carSearch.ws;

import java.util.List;
import java.util.Map;

import javax.jws.WebService;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSON;

import org.springframework.ui.Model;

import com.jp.tic.app.carSearch.entity.CarRercord;
import com.jp.tic.system.entity.CarTake;

@WebService
public interface CarTypeSearchWS {

	/**
	 * 接口-solr查询历史过车
	 */
	public Map<String, Object> testSearchInfo(CarRercord rercord);
	
	/**
	 * 接口-按车辆特征查询,采用json-lib
	 * @return
	 */
	public String carTypeSeachInfo(String jsonParam);
	
	/**
	 * 接口-solr按车辆特征查询,采用fastjson,号称效率最好的
	 * @return
	 */
	public String carSearchInfo(String jsonParam);
	
	/**
	 * 实时过车solr-HBase查询
	 * @param json
	 * @return
	 */
	public List<CarTake> dealWithRealTimeDatas(String json)throws Exception ;
	
	/**
	 * 临近点分析solr-HBase查询
	 * @param json
	 * @return
	 */
	public List<CarTake> analyzeClosetPointquery(String json);
	
	/**
	 *相似车辆串并
	 * @return
	 */
	public String similaritySearchInfo(String jsonParam);
	
	/**
	 * 一牌多车查询
	 */
	public Map<String,List<CarTake>> queryDatasForPages(String json);
	
	/**
	 * 一车多牌查询
	 */
	public Map<String,Object> queryOneCarManyNumForPages(String json);
	
	/**
	 * 昼伏夜出
	 * @return
	 */
	public String queryNightAndDazedData(String jsonParam);

	/**
	 * 时间比对
	 * @param json
	 * @return
	 */
	public Map<String, Object> compareByTimeQueryForpages(String json);
	
	
	/**
	 * 布控查询
	 */
	public Map<String,Object> queryControlInfoWS(Map<String, String> searchParam);
	
	/**
	 * 新增布控
	 * @param model
	 * @param request
	 * @return
	 */
	public int saveControlInfoWS(Map<String, String> searchParam);
	
	/**
	 * 布控详细数据加载
	 * @param searchParam
	 * @return
	 */
	public List<Map<String, String>> loadControlDetailInfoWS(Map<String, String> searchParam);
	
	/**
	 * 修改布控信息
	 * @param searchParam
	 * @return
	 */
	public int updateControlInfoWS(Map<String, String> searchParam);
	
	/**
	 * 删除布控
	 * @param searchParam
	 * @return
	 */
	public int deleteControlInfoWS(Map<String, String> searchParam);
	
	/**
	 * 审核布控
	 * @param searchParam
	 * @return
	 */
	public int verifyControlInfoWS(Map<String, String> searchParam);
	
	/**
	 * 撤销布控
	 * @param searchParam
	 * @return
	 */
	public int revokeControlInfoWS(Map<String, String> searchParam);
	
	/**
	 * 撤销审核
	 * @param searchParam
	 * @return
	 */
	public int revokeVerifyControlInfoWS(Map<String, String> searchParam);
	
	/**
	 * 获取饱和度
	 * @return
	 */
	public String getSaturations();
	
	/**
	 * 区域碰撞查询接口
	 * @param jsonParam
	 * @return
	 */
	public String regionCrashQuery(String jsonParam);
	
	/**
	 * 套牌车
	 * @param jsonParam
	 * @return
	 */
	public String taopaiLocalCarInfo(String jsonParam);
	
	/**
	 * 卡口在线状态
	 * @param jsonParam
	 * @return
	 */
	public String mountStatusGroupping(String jsonParam);
	
	/**
	 * 加载所有车辆品牌信息
	 * @return
	 */
	public String findCarBrand();
	
	/**
	 * 加载车辆品牌车辆类型多选下拉框信息
	 */
	public String findCarTypeCombox(String carBrand);
	
	/**
	 * 加载品牌年款车辆类型多选下拉框信息
	 */
	public String findCarYearCombox(String carType);
	
	/**
	 * 查询所有虚拟卡口
	 * @return
	 */
	public String findAllVirturalMounts(String flag);
	
	/**
	 * 查询所有虚拟卡口
	 * @return
	 */
	public String findAllVirturalDepts();
	
	/**
	 * 查询所有实体卡口
	 * @return
	 */
	public String findAllDeptMounts();
}
