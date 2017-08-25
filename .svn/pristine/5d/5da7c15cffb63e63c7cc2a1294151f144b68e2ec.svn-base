package com.jp.tic.business.datacenter.dao;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.CarTake;

public interface FakeCarNumDao {

	/**
	 * 假牌车查询
	 */
	public List<Map<String, String>> fakeCarNumSearch();
	
	/**
	 * 更新假牌车的统计数或者保存新的记录数，可是操作起来麻烦，因此，建议直接先把数据删掉，在重新插入数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateOrSaveRecords(List<Map<String, String>> updateDatas, List<Map<String, String>> saveDatas);
	
	/**
     * 假牌车查询
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> fackCarNumSearchInfo(Map<String, String> param);
    
    /**
     * 假牌车数量统计
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> countfackCarNumDatas(Map<String, String> param);
    
    /**
	 * 查询车辆库信息
	 * @return 查询结果
	 */
    public Map<String, String> queryCarSourceInfo() throws Exception;
    
    /**
     * 第二种算法，查询出存在的车牌数据
     * @param hbaseDatas 数据源
     * @return 查询结果
	 * @throws Exception 
     */
    public List<CarTake> filteCarNumInfo(List<CarTake> hbaseDatas) throws Exception;
    
    /**
	 * 查询所有的套牌车数据
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryAllTaopaiInfo();
}
