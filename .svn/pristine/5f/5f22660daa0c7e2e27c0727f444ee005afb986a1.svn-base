package com.jp.tic.business.categorySearch.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.app.carSearch.ws.CarCategorySearchWS;
import com.jp.tic.business.device.service.BayonetManagerService;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

/**
 * 按类别查询
 * @author zh.h
 *
 */
@Controller
@RequestMapping("/CategorySearch")
public class ControlCategoryController extends AbstractController{
	
//	@Autowired
//	private CategoryQueryService categoryQueryService;
	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
    private OrganizationService orgService;
	@Autowired
	private DeviceManagerService deviceManagerService;
	@Autowired
	private CarCategorySearchWS carCategorySearchWS;
	@Autowired
	private BayonetManagerService bayonetManagerService;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/CategorySearchPage")
	public String CategorySearchPageLoad() {
		return "/control/control-category-search";
	}
	
	/**
	 * 分页车辆类型列表数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/queryControlCategory")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'车辆种类列表查询'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime') + ',查询车牌:' + getWebParamInfo().get('carBNum')",needPersist= true,operation="SEARCH")
	public Object queryCategoryPageInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String json= JsonUtil.objToJson(searchParam);
		Map<String,Object> resultMap=carCategorySearchWS.queryDates(json);
		List<CarTake> results = (List<CarTake>) resultMap.get("rows");
		int amounts=StringUtil.toInt(resultMap.get("total"));
		if (results == null) {
			results = new ArrayList<CarTake>();
			amounts = 0;
		}else{
			//相关车辆属性转换
			List<Map<String, String>> directionDatas = orgService.findAllDirectionInfo();
			List<Map<String, String>> deviceDatas = deviceManagerService.findAllDeviceInfo();
			List<Map<String, String>> mountDatas = bayonetManagerService.loadAllMountInfos();
			List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
			List<EnumItem> carNumTypelist = dictionaryService.getEnumListByCode("LicPlateType"); //号牌种类
			List<CarCategory> carCategoryList = dictionaryService.findCarCategory();//车辆种类
			if (results != null && results.size() > 0) {
				String hpysmc = "";
				String hpzlmc = "";
				String clzlmc="";
				List<CarTake> filteCarTakes = new ArrayList<CarTake>();
				for(CarTake take : results){
					if (take == null) {
						filteCarTakes.add(take);
					} else {
						clzlmc=fitCategoryName(take.getClzl(),carCategoryList);
						hpysmc = findDictionaryName(carNumColorlist, take.getHpys());
						hpzlmc = findDictionaryName(carNumTypelist, take.getHpzl());
						take.setClzl(clzlmc);
						take.setHpysmc(hpysmc);
						take.setHpzlmc(hpzlmc);
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
					results.removeAll(filteCarTakes);	
				}
			}
			resultMap.put("rows", results);
		}
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 分页车辆类型图表数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/categoryQuery")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'车辆种类图表查询'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime') + ',查询车牌:' + getWebParamInfo().get('carBNum')",needPersist= true,operation="SEARCH")
	public Object queryCategoryPageInfo2(Model model, HttpServletRequest request) {
		
		return this.queryCategoryPageInfo(model, request);
	}
	
	
	/**
	 * 车辆类型页面名称与数据库值转换
	 * @param clzl
	 * @param carCategoryList
	 * @return
	 */
	private String fitCategoryName(String clzl,List<CarCategory> carCategoryList) {
		if(!StringUtil.checkStr(clzl)){
			return "";
		}
		if(null!=carCategoryList&&carCategoryList.size()>0){
			for(CarCategory cargory:carCategoryList){
				if(clzl.equals(cargory.getStoreValue())){
					return cargory.getDisplayValue();
				}
			}
		}
		return "";
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

}
