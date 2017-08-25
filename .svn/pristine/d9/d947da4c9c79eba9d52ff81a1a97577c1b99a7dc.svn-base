package com.jp.tic.analyze.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.system.entity.CarLibrary;
import com.jp.tic.system.entity.CarTake;

public interface DeckCarAnalysisDao {

	/**
	 * 保存套牌车数据
	 * @return 返回条数
	 */
	public int saveDeckCarToDb(List<CarTake> records);
	/**
	 * 保存车辆库比对的套牌车数据
	 * @param records
	 * @return
	 */
	public int saveCompareTaopai(List<CarTake> records);
	
	/**
	 * 加载所有的卡口之间的距离数据
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, String> loadAllMountDistance() throws Exception;
	
	/**
	 * 检查数据库表中是否已经存在套牌车记录
	 * @param carNum 车牌号码
	 * @return 查询结果
	 */
	public boolean checkCarnumInfo(String carNum);
	
	/**
	 * 查出数据库中所有的套牌车数据
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllCarnumInfo();
	
	/**
	 * 查出数据库中所有的套牌车数据
	 * @return 查询结果
	 * @throws Exception 
	 */
	public Map<String, String> loadAllCarnumInfo2() throws Exception;
	
	/**
	 * 保存卡口之间的距离
	 * @param sqlArray
	 * @return
	 */
	public int saveDistanceInfo(String[] sqlArray);
	
	/**
	 * 加载所有的卡口数据
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, Map<String, String>> loadAllMountInfo() throws Exception;
	
	/**
	 * 加载无效套牌计算无用的卡口信息
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, Map<String, String>> loadInValidMountInfo() throws Exception;
	
	/**
	 * 查询一个时间段内的套牌车数据
	 */
	public List<Map<String, String>> seleteTaopaiData();
	
	/**
	 * 查询当天内的套牌车数据
	 */
	public List<Map<String, String>> seleteTaopaiData(String kkbh1,String kkbh2);
	/**
	 * 清理掉当天内的套牌车数据
	 * @param kkbh1
	 * @param kkbh2
	 * @return
	 */
	public int deleteTaopaiData(String kkbh1,String kkbh2);
	
	public int saveInvalidMount(String kkbh1,String kkbh2);
	
	/**
	 * 清理掉一个小时前前两个小时内没用的套牌车数据
	 * @param ids ID
	 * @return 查询结果
	 */
	public int deleteTaopaiData(String[] ids);
	/**
	 * 获取本地车辆库信息
	 * @param hphmList
	 * @return
	 */
	public List<Map<String, String>> getLocatCarLibrary(List<CarTake> objectList);
	/**
	 * 获取远端车辆库信息
	 * @param hphmList
	 * @return
	 */
	public List<Map<String, String>> getRemoteCarLibrary(List<CarTake> objectList,String dburl,String dbtab,String username,String password);
	
}
