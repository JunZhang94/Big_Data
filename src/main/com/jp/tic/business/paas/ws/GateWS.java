package com.jp.tic.business.paas.ws;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.jws.WebParam;
import javax.jws.WebService;

import org.dom4j.DocumentException;

import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.Gate;

@WebService
public interface GateWS {
	public String getLicense(String code);
	
	public List<Gate> getAllGates(String license);
	
	public List<Gate> getAllGates4Gis(String license);
	
	public CarTake getTake(String rowKey);
	
	public List<CarTake> getTake1(List<String> rowKeys);
	
	//GIS轨迹查回放-正在应用
	public List<CarTake> queryCarTrace(String license, String hphm, Date startTime, Date endTime, int count);
	
	public List<CarTake> queryGatesRealtimeTakes(String license, List<String> kkbhs,int mintue);
	
	//实时过车-GIS正在应用
	public List<CarTake> queryGateLatestTakes(String license, String kkbh, int count);
	
	public List<CarTake> queryGatesLatestTakes(String license, List<String> kkbhs);
	
	public List<CarTake> queryTakesPageWithKkbhHphmAndTimeRange(String license, String kkbh, Date startTime, Date endTime, String hphm);//to do
	
	public List<Map<String,String>> queryCarInfoByhphm(String hphm)throws DocumentException;
	
	//GIS时空分析-正在应用
	public PageEntity queryTakesWithKkbhHphmAndTimeRange(String license, String kkbh, Date startTime, Date endTime, String hphm, PageEntity page);
	
	//public List<Map<String, String>> queryAlarmInfo(Date startDate, Date endDate);
	
	/**
	 * 卡口在线状态接口查询
	 * @param searchParam 参数详细说明，（orgType，单位类型，取值：0代表选择为广州市一级别，最顶级别，1代表选的是分局这级别，及第二级别，
	 * 					  2代表选的是卡口这一级别，及第三级别），（orgId：选择的节点ID，如选择的是广州市为440100，如选择的是分局440116000000，
	 * 					    需要注意点，选择的是卡口的时候，因为卡口是18位数字长度，转Long类型会报错，因此特对卡口的长度进行了截取，截取掉了前面3位数字长度，
	 * 					   如：京珠北太和收费站以北路段：440192000040001000，截取后变成：192000040001000，请麻烦做下处理吧，这边确实没弄好。），
	 * @return 查询处理结果
	 */
	public List<Map<String, String>> mountStatusGroupping(Map<String, String> searchParam);
	
	/**
	 * 多卡口过车查询
	 * @param kkbhs 卡口编号集合
	 * @param startTime 开始时间
	 * @param endTime 结束时间
	 * @param hphm 车牌号码集合
	 * @param page 分页对象
	 * @return 查询结果
	 */
	public PageEntity queryTakesManyKkbhs(List<String> kkbhs, Date startTime, Date endTime, List<String> hphms, PageEntity page);
	
	/**
	 * 多卡口过车查询,查询报备卡口信息
	 * @param kkbhs 卡口编号集合
	 * @param startTime 开始时间
	 * @param endTime 结束时间
	 * @param hphm 车牌号码集合
	 * @param page 分页对象
	 * @return 查询结果
	 */
	public PageEntity queryTakesManyBaobeiKkbhs(List<String> kkbhs, Date startTime, Date endTime, List<String> hphms, PageEntity page);
	
	/**
	 * 多卡口过车查询,查询报备卡口信息,时间传字符串
	 * @param kkbhs 卡口编号集合
	 * @param startTime 开始时间
	 * @param endTime 结束时间
	 * @param hphm 车牌号码集合
	 * @param page 分页对象
	 * @return 查询结果
	 */
	public PageEntity queryBaobeiKkbhs(List<String> kkbhs, String startTime, String endTime, List<String> hphms, PageEntity page);
	
	/**
	 * 获取视频编辑按钮状态
	 * @param userCode 用户账号
	 * @return 返回结果，元素1表示状态，0表示未授权，1表示已授权，元素2表示组织CODE
	 */
	public String[] getEditVediaoStatus(String userCode);
	
	/**
	 * 修改卡口XY坐标
	 * @param license:预留字段，kkhb：卡口编号，kkjd：卡口经度，kkwd：卡口纬度
	 * @return true：代表更新XY坐标成功，false代表失败。
	 * */
	public boolean updateMountTabXY(String license,String kkbh,String kkjd,String kkwd);
	
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
	public String queryTaopaiches(String conjson);
	
	/**
	 * 套牌车查询接口 - 方正调用--同步视频网方法
	 * @param conjson
	 * @return
	 */
	public String taopaiLocalCarInfo(String conjson);
	
	/**
	 * 卡口在线状态
	 * @param jsonParam
	 * @return
	 */
	public String mountStatusSearch(String jsonParam);
	
	/**
	 * 测试接口,注意这个@WebParam，在使用axis调用传参才能接收，如果不加，就接收不到
	 * @param str
	 * @return
	 */
	public String testGateWs(@WebParam(name="str")String inputJson);
	
	/**
	 * 获取饱和度
	 * @return
	 */
	public String getSaturations();
	
	/**
	 * 查询所有虚拟卡口
	 * @return
	 */
	public String findAllVirturalMounts();
	
	/**
	 * 查询所有虚拟卡口或者实体卡口信息
	 * @return
	 */
	public String findAllVirturalMountInfos(String flag);
	
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
}
