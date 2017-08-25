package com.jp.tic.analyze.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import jxl.Sheet;
import jxl.Workbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.jp.tic.analyze.dao.CarTakeDao;
import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao.KKRowKey;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.entity.SliceEntity;
import com.jp.tic.analyze.rule.FummyCarRule;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.app.carSearch.entity.CarRercord;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.business.cartake.mapper.BasicDataQueryMapper;
import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.business.device.dao.DeviceManagerDao;
import com.jp.tic.framework.log.ApplicationLogging;
import com.jp.tic.system.dao.OrganizationDao;
import com.jp.tic.system.dao.SystemConfigDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.BaseException;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;


@Service
public class CarTakeServiceImpl extends ApplicationLogging implements CarTakeService {
	@Autowired
	private CarTakeDao carTakeDao;
	
	@Autowired
	private OrganizationDao organizationDao;
	
	@Autowired
	private BasicDataQueryMapper<Map<String, Object>> mapper;
	
	@Autowired
	private DeviceManagerDao deviceManagerDao;
	
	@Autowired
	private BayonetManagerDao bayonetManagerDao;
	
	@Autowired
	private DictionaryService dictionaryService;
	
	@Autowired
	private SystemConfigDao systemConfigDao;
	
	@Autowired
	private CarTypeSearchService carTypeSearchService;
	
	private FummyCarRule rule;
	
	List<Map<String, String>> directionDatas = null;
	List<Map<String, String>> deviceDatas = null;
	
	List<Map<String, String>> mountDatas = null;
	
	/**
     * 导入开始行
     */
    private static int IMPORT_ROW_START=4;
		
	@Override
	public List<CarTake> getCarSnapshot(List<String> hphms, Date startDate, Date endDate, int count) throws Exception {
		List<CarTake> takes = carTakeDao.getCarSnapshot(hphms, startDate, endDate, count);
		this.loadTakesNames(takes);
		return takes;
	}

	@Override
	public List<CarTake> getCarTrace(String hphm, Date startDate, Date endDate, int count) throws Exception {
		List<CarTake> takes = carTakeDao.getCarTrace(hphm, startDate, endDate, count);
		this.loadTakesNames(takes);
		return takes;
	}
	
	/**
	 * 查询地图轨迹数据
	 * @param hphm 号牌号码
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @param count
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<CarTake> getCarTraceForSolr(String hphm, Date startDate, Date endDate, int count) throws Exception {
		Map<String, String> param = new HashMap<String, String>();
		if (!StringUtil.checkStr(hphm)) {
			return new ArrayList<CarTake>();
		}
		String startTime = DateUtil.parseToString(startDate, "yyyy-MM-dd HH:mm:ss");
		String endTime = DateUtil.parseToString(endDate, "yyyy-MM-dd HH:mm:ss");
		param.put("carNum", hphm);
		param.put("startTime", startTime);
		param.put("endTime", endTime);
		param.put("page.start", "0");
		param.put("page.limit", count + "");
		String jsonParam = JSON.toJSONString(param);//查询条件
		Map<String, Object> resultMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
		List<CarTake> carTakes = (List<CarTake>) resultMap.get("rows");
		return carTakes;
	}

	@Override
	public Map<Date[], Long[]> getCount4MountCount(String kkbh, Date date) throws Exception {
		return carTakeDao.getCount4MountCount(kkbh, date);
	}

	@Override
	public List<CarTake[]> getDummyCar(Date startDate, Date endDate, Map<String,Integer> distances, int maxSpeed) throws Exception {
		if(rule==null){
			rule=new FummyCarRule(distances, maxSpeed);
		}
		List<CarTake[]> takes = carTakeDao.getDummyCar(startDate, endDate, rule);
		for(CarTake[] temp:takes){
			for(CarTake take:temp){
				this.loadTakeNames(take);
			}
		}
		return takes;
	}

	@Override
	public List<CarTake> getMountSnapshot(String kkbh, Date startDate, Date endDate, int count) throws Exception {
		List<CarTake> takes = carTakeDao.getMountSnapshot(kkbh, startDate, endDate, count);
		this.loadTakesNames(takes);
		return takes;
	}

	@Override
	public List<CarTake> getMountSnapshot(List<String> kkbhs, Date startDate, Date endDate, int count) throws Exception {
		List<CarTake> takes = carTakeDao.getMountSnapshot(kkbhs, startDate, endDate, count);
		this.loadTakesNames(takes);
		return takes;
	}
	
	/**
	 * 查询实时过车数据，数据查询方式为solr查询
	 * @param kkbhs
	 * @param startDate
	 * @param endDate
	 * @param count
	 * @return
	 * @throws Exception
	 */
	public List<CarTake> getRealtimeTakes(List<String> kkbhs, Date startDate, Date endDate, int count) throws Exception {
		if (kkbhs == null || kkbhs.size() == 0) {
			return new ArrayList<CarTake>();
		}
		Map<String, String> param = new HashMap<String, String>();
		/*String startTime = DateUtil.parseToString(startDate, "yyyy-MM-dd HH:mm:ss");
		String endTime = DateUtil.parseToString(endDate, "yyyy-MM-dd HH:mm:ss");
		param.put("startTime", startTime);
		param.put("endTime", endTime);*/
		param.put("page.start", "0");
		param.put("page.limit", count + "");
		List<CarTake> carTakes = new ArrayList<CarTake>();
		List<CarTake> tempDatas = null;
		for (String kkbh : kkbhs) {
			param.put("mounts", kkbh);
			String jsonParam = JSON.toJSONString(param);//查询条件
			tempDatas = carTypeSearchService.queryRealTimeData(jsonParam);
			if (tempDatas != null) {
				carTakes.addAll(tempDatas);
			}
		}
		List<CarTake> results = carTypeSearchService.trancateDataNames(carTakes, param);
		return results;
	}
	

	@Override
	public Iterator<KKRowKey> getRowkeyIt(String talbeName) throws Exception {
		return carTakeDao.getRowkeyIt(talbeName);
	}

	@Override
	public List<CarTake> queryCarTake(String kkbh, Date startDate, Date endDate, String hphm, int count, boolean fummyHphm) throws Exception {
		List<CarTake> takes = carTakeDao.queryCarTake(kkbh, startDate, endDate, hphm, count, fummyHphm);
		this.loadTakesNames(takes);
		return takes;
	}

	@Override
	public PageEntity queryCarTake(String kkbh, Date startDate, Date endDate, String hphm, PageEntity page) throws Exception {
		info("page>>>"+page);
		page=carTakeDao.queryCarTake(kkbh, startDate, endDate, hphm, page);
		this.loadTakesNames(page.getResult());
		info("page>>>"+page);
		return page;
	}

	/**
	 * 分页查询时空分析数据,及历史过车数据
	 * @param kkbh
	 * @param startDate
	 * @param endDate
	 * @param hphm
	 * @param page
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public PageEntity getHistoryCarTakes(String kkbh, Date startDate, Date endDate, String hphm, PageEntity page) throws Exception {
		Map<String, String> param = new HashMap<String, String>();
		String startTime = DateUtil.parseToString(startDate, "yyyy-MM-dd HH:mm:ss");
		String endTime = DateUtil.parseToString(endDate, "yyyy-MM-dd HH:mm:ss");
		if (StringUtil.checkStr(kkbh)) {
			param.put("mounts", kkbh);
		}
		if (StringUtil.checkStr(hphm)) {
			param.put("carNum", hphm);
		}
		param.put("startTime", startTime);
		param.put("endTime", endTime);
		int startRow = page.getPageSize() * (page.getPageNo() - 1);
		param.put("page.start", startRow + "");
		param.put("page.limit", page.getPageSize() + "");
		String jsonParam = JSON.toJSONString(param);//查询条件
		Map<String, Object> resultMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
		List<CarTake> carTakes = (List<CarTake>) resultMap.get("rows");
		page.setResult(carTakes);
		return page;
	}
	
	@Override
	public PageEntity queryCarTake(String kkbh, Date startDate, Date endDate, String hphm, PageEntity page, boolean fummyHphm) throws Exception {
		info("page>>>"+page);
		page=carTakeDao.queryCarTake(kkbh, startDate, endDate, hphm, page);
		this.loadTakesNames(page.getResult());
		info("page>>>"+page);
		return page;
	}
	
	@Override
	public PageEntity queryCarTake(Date startDate, Date endDate, List<String> kkbhs, List<String> hphms, PageEntity page) throws Exception {
		info("page>>>"+page);
		page=carTakeDao.queryCarTake(startDate, endDate, kkbhs, hphms, page);
		this.loadTakesNames(page.getResult());
		info("page>>>"+page);
		return page;
	}
	
	@Override
	public SliceEntity queryCarTake(String kkbh, Date startDate, Date endDate, String hphm, SliceEntity slice) throws Exception {
		info("slice>>>"+slice);
		slice=carTakeDao.queryCarTake(kkbh, startDate, endDate, hphm, slice);
		this.loadTakesNames(slice.getResult());
		info("slice>>>"+slice);
		return slice;
	}

	@Override
	public SliceEntity queryCarTake(String kkbh, Date startDate, Date endDate, String hphm, SliceEntity slice, boolean fummyHphm) throws Exception {
		info("slice>>>"+slice);
		slice=carTakeDao.queryCarTake(kkbh, startDate, endDate, hphm, slice, fummyHphm);
		this.loadTakesNames(slice.getResult());
		info("slice>>>"+slice);
		return slice;
	}

	@Override
	public SliceEntity queryCarTake(Date startDate, Date endDate, List<String> kkbhs, List<String> hphms, SliceEntity slice) throws Exception {
		info("slice>>>"+slice);
		slice=carTakeDao.queryCarTake(startDate, endDate, kkbhs, hphms, slice);
		this.loadTakesNames(slice.getResult());
		info("slice>>>"+slice);
		return slice;
	}	
	@Override
	public SliceEntity queryCarTake(Date startDate, Date endDate, String csys, String cllx, String clpp, String hpzl, SliceEntity slice) throws Exception {
		info("slice>>>"+slice);
		slice=carTakeDao.queryCarTake(startDate, endDate, csys, cllx, clpp, hpzl, slice);
		this.loadTakesNames(slice.getResult());
		info("slice>>>"+slice);
		return slice;
	}
	
	private Map<String,Map<String,Object>> gates=new Hashtable<String,Map<String,Object>>();
	
	private Map<String,String> settings=new Hashtable<String, String>();
	
	private void loadTakesNames(List<CarTake> takes){
		if(takes==null){
			return ;
		}
		directionDatas = organizationDao.findAllDirectionInfo();
		deviceDatas = deviceManagerDao.findAllDeviceInfo();
		for(CarTake take:takes){
			this.loadTakeNames(take);
		}
	}
	
	private void loadAllTakesNames(List<CarTake> takes){
		if(takes==null){
			return ;
		}
		String time1 = DateUtil.getCurrentDateTime();
		directionDatas = organizationDao.findAllDirectionInfo();
		deviceDatas = deviceManagerDao.findAllDeviceInfo();
		mountDatas = bayonetManagerDao.loadAllMountInfos();
		List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
		List<EnumItem> carNumTypelist = dictionaryService.getEnumListByCode("LicPlateType"); //号牌种类
		String time2 = DateUtil.getCurrentDateTime();
		int usedTime = this.getTwoTimeforMinite(time1, time2);
		System.out.println("获取卡口设备方向准备数据耗时：" + usedTime + "秒");
		String hpysmc = "";
		String hpzlmc = "";
		List<CarTake> filteCarTakes = new ArrayList<CarTake>();
		for(CarTake take:takes){
			if (take == null) {
				filteCarTakes.add(take);
			} else {
				hpysmc = findDictionaryName(carNumColorlist, take.getHpys());
				hpzlmc = findDictionaryName(carNumTypelist, take.getHpys());
				take.setHpysmc(hpysmc);
				take.setHpzlmc(hpzlmc);
				take.setCscd(Long.parseLong(takes.size() + ""));//用车身长度代表加载的数据量
				if (mountDatas != null && mountDatas.size() > 0) {
					for (Map<String, String> dataMap : mountDatas) {
						if (StringUtil.equals(take.getKkbh(), dataMap.get("KKBH"))) {
							take.setKkmc(dataMap.get("KKMC"));
							take.setDwmc(dataMap.get("DWMC"));
							break;
						}
					}
				}
				if (directionDatas != null && directionDatas.size() > 0) {
					for (Map<String, String> dataMap : directionDatas) {
						if (StringUtil.equals(take.getFxbh(), dataMap.get("DIRECTION_NUMBER"))) {
							take.setFxmc(dataMap.get("DIRECTION_NAME"));
							break;
						}
					}
				}
				if (deviceDatas != null && deviceDatas.size() > 0) {
					for (Map<String, String> dataMap : deviceDatas) {
						if (StringUtil.equals(take.getSbbh(), dataMap.get("SBBH"))) {
							take.setSbmc(dataMap.get("SBMC"));
							break;
						}
					}
				}
			}
		}
		if (filteCarTakes != null && filteCarTakes.size() > 0) {
			takes.removeAll(filteCarTakes);	
		}
		String time3 = DateUtil.getCurrentDateTime();
		int usedTime1 = this.getTwoTimeforMinite(time2, time3);
		System.out.println("翻译查询数据耗时：" + usedTime1 + "秒");
	}
	
	public int getTwoTimeforMinite(String startTime, String endTime) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date starDate = null;
		Date endDate = null;
		try {
			starDate = df.parse(startTime);
			endDate = df.parse(endTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long l = endDate.getTime() - starDate.getTime();
		return StringUtil.toInteger(l / 1000);
	}
	
	private void loadTakeNames(CarTake take){
		try{
			Map<String, Object> gate = this.getGate(take);
			if(gate!=null){
				take.setKkmc((String)gate.get("kkmc"));
				take.setDwmc((String)gate.get("dwmc"));
			}
			
			take.setHpysmc(this.getSetting("LicPlateColor", take.getHpys()));
			take.setHpzlmc(this.getSetting("LicPlateType", take.getHpzl()));
			if (directionDatas != null && directionDatas.size() > 0) {
				for (Map<String, String> dataMap : directionDatas) {
					if (StringUtil.equals(take.getFxbh(), dataMap.get("DIRECTION_NUMBER"))) {
						take.setFxmc(dataMap.get("DIRECTION_NAME"));
						break;
					}
				}
			}
			if (deviceDatas != null && deviceDatas.size() > 0) {
				for (Map<String, String> dataMap : deviceDatas) {
					if (StringUtil.equals(take.getSbbh(), dataMap.get("SBBH"))) {
						take.setSbmc(dataMap.get("SBMC"));
						break;
					}
				}
			}
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
	}
	
	private Map<String,Object> getGate(CarTake take){
		if(take.getKkbh()==null){
			return null;
		}
		
		if(take!=null && gates.containsKey(take.getKkbh())==false){
			Map<String,Object> param=new HashMap<String, Object>();
			param.put("kkbh", take.getKkbh());
			try {
				Map<String, Object> gate = mapper.findMountById(param);
				if(gate!=null){
					gates.put(take.getKkbh(), gate);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return gates.get(take.getKkbh());
	}
	
	private String getSetting(String type,String value){
		String key=type+"."+value;
		if(settings.containsKey(key)==false && value!=null && type!=null){
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("val", value);
			param.put("type", type);
			String name;
			try {
				name = mapper.findWordbookByType(param);
				
				if(name==null){
					name="";
				}
				
				settings.put(key,name);
			} catch (Exception e) {
				e.printStackTrace();
				
				settings.put(key,"");
			}
		}
		
		return settings.get(key);
	}

	@Override
	public CarTake getTake(byte[] rowKey) {
		CarTake take = carTakeDao.getTake(rowKey);
		this.loadTakeNames(take);
		return take;
	}

	@Override
	public List<CarTake> getTakes(List<byte[]> rowKeys) {
		List<CarTake> takes=carTakeDao.getTakes(rowKeys);
		this.loadTakesNames(takes);
		return takes;
	}

	@Override
	public Map<String, List<CarTake>> getFollowingCar(Date startDate, Date endDate, String hphm, int mintueOffset, int minCount) throws Exception {
		Map<String, List<CarTake>> map=carTakeDao.getFollowingCar(startDate, endDate, hphm, mintueOffset, minCount);
		for(String key:map.keySet()){
			this.loadTakesNames(map.get(key));
		}
		return map;
	}
	
	@Override
	public Map<String,List<CarTake>> getFollowingCar(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount) throws Exception{
		Map<String, List<CarTake>> map=carTakeDao.getFollowingCar(startDate, endDate, hphm, kkbhs, mintueOffset, minCount);
		for(String key:map.keySet()){
			this.loadTakesNames(map.get(key));
		}
		return map;
	}

	@Override
	public Map<String, List<CarTake>> getTrannelException(Date startTime,
			Date endTime, String kkbh1, String kkbh2) throws Exception {
		return carTakeDao.getTrannelException(startTime, endTime, kkbh1, kkbh2);
	}

	@Override
	public PageEntity queryCarTake(Date startDate, Date endDate, String csys,
			String cllx, String clpp, String hpzl, PageEntity page)
			throws Exception {
		info("page>>>"+page);
		//page=carTakeDao.queryCarTake(startDate, endDate, csys, cllx, clpp, hpzl, page);
		this.loadTakesNames(page.getResult());
		info("page>>>"+page);
		return page;
	}
	
	@Override
	public PageEntity queryCarTake(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms, List<String> fxbhs, String hpys,String carBrand,String carType,String carYear, PageEntity page) throws Exception {
		//info("page>>>"+page);
		String time1 = DateUtil.getCurrentDateTime();
		page=carTakeDao.queryCarTake4fxbh(startDate, endDate, kkbhs, hphms, fxbhs, hpys,carBrand,carType,carYear,page);
		String time2 = DateUtil.getCurrentDateTime();
		int usedTime1 = this.getTwoTimeforMinite(time1, time2);
		System.out.println("查询hbase所用时=" + usedTime1 + "秒");
		this.loadAllTakesNames(page.getResult());
		//info("page>>>"+page);
		return page;
	}
	
	//同时符合经过所有可卡口的数据
	@Override
	public PageEntity getMountSnapshotand(List<String> kkbhs, Date startDate, Date endDate, PageEntity page) throws Exception {
		info("page>>>"+page);
		page = carTakeDao.getMountSnapshotand(kkbhs, startDate, endDate, page);
		info("page>>>"+page);
		return page;
	}
	
	/**
	 * 真正按方向编号进行查询
	 */
	@Override
	public PageEntity queryCarTakeWithFxbh(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms, List<String> fxbhs, String hpys,String carBrand,String carType,String carYear, PageEntity page) throws Exception {
		//info("page>>>"+page);
		String time1 = DateUtil.getCurrentDateTime();
		page=carTakeDao.queryCarTakeByfxbh(startDate, endDate, kkbhs, hphms, fxbhs, hpys,carBrand,carType,carYear,page);
		String time2 = DateUtil.getCurrentDateTime();
		int usedTime1 = this.getTwoTimeforMinite(time1, time2);
		System.out.println("查询hbase所用时=" + usedTime1 + "秒");
		this.loadAllTakesNames(page.getResult());
		//info("page>>>"+page);
		return page;
	}
	
	//查询报备卡口信息
	public PageEntity queryBaobeiCarTake(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms,PageEntity page) throws Exception {
		info("page>>>"+page);
		page=carTakeDao.queryBaobeiCarTake(startDate, endDate, kkbhs, hphms, page);
		this.loadAllTakesNames(page.getResult());
		info("page>>>"+page);
		return page;
	}
	
	/**
     * 获取到了对应的字典code对应的集合后，再根据值来获取对应的中文名称
     * @param list code对应的集合
     * @param value 值
     * @return 处理结果
     */
    public String findDictionaryName(List<EnumItem> list, String value) {
    	String dicName = "";
    	if (!StringUtil.checkStr(value)) {
    		return dicName;
    	}
    	if (list != null && list.size() > 0) {
			for (EnumItem en : list) {
				if (StringUtil.equals(en.getItemValue(), value)) {
					dicName = en.getItemName();
				}
			}
    	}
    	return dicName;
	}
    
    /**
     * 解析文件得到carNum的list
     * @param file
     * @return ArrayList<DevicesEntity>
     * @throws Exception
     */
    public List<Map<String, String>> parseCarNumExcel(MultipartFile file) throws Exception {
        ArrayList<Map<String, String>> result = new ArrayList<Map<String, String>>();
        Workbook wb;
        try {
            wb = Workbook.getWorkbook(file.getInputStream());
        } catch (Exception e) {
            e.printStackTrace();
            BaseException baseException = new BaseException();
            baseException.setMessage("导入失败");
            throw baseException;
        }
        Sheet deviceSheet = wb.getSheet(0);
        // Sheet channelSheet =wb.getSheet(1);
        // 行数
        int deviceRows = deviceSheet.getRows();
        //车牌号码(*)
        try {
            for (int row = IMPORT_ROW_START; row < deviceRows; row++) {
                int colStart = 1;
                Map<String, String> datas = new HashMap<String, String>();
                // 车牌号码(*)
                String carNum = deviceSheet.getCell(colStart++, row).getContents();
                if (!this.checkColumn(carNum, "carNum")) {
                    //throw new Exception("车牌号码模板第" + (row + 1) + "行，车牌号码为空，导入失败，请修改！");
                } else {
                	 datas.put("carNumStr", carNum);
                     result.add(datas);
				}
            }
        } catch (Exception e) {
            e.printStackTrace();
            BaseException baseException = new BaseException();
            baseException.setMessage(e.getMessage());
            throw baseException;
        }finally{
            wb.close();
        }
        return result;
    }
    
    /**
     * 检查excle中的字段是否符合要求
     * @param value
     * @param name
     * @return 符合true 不符合false
     */
    private boolean checkColumn(String value, String name) {
        boolean result = true;
        if ("carNum".equals(name)) {
            if (value == null || value.trim().isEmpty())
                result = false;
        }
        return result;

    }
    
    /**
	 * 测试solr与hbase整合查询
	 * @param param
	 */
	public Map<String, Object> testSearchInfo(Map<String, String> param) {
		return carTakeDao.testSearchInfo(param);
	}

	/**
	 * 实时过车solr整合HBase查询
	 */
	@Override
	public List<CarTake> dealWithRealCarData(List<String> statuMounts, Date startDate, Date endDate) {
		return carTakeDao.dealWithRealCarData(statuMounts, startDate, endDate);
	}

	/**
	 * 临近点分析solr整合HBase查询
	 */
	public List<CarTake> analyzeClosetPointquery(String json) {
//		List<Map<String, String>> list=systemConfigDao.findConfigByCode("MAXSpeed");
//		String max_speed=list.get(0).get("VALUE");
		return carTakeDao.analyzeClosetPointquery(json);
	}
}
