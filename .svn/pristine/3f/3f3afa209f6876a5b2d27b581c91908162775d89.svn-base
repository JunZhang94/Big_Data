package com.jp.tic.app.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarBrandItem;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/systemApp")
public class SystemAppController extends AbstractController {

	@Autowired
	DictionaryService dictionaryService;
	
	private List<CarBrandItem> carBrandList=new ArrayList<CarBrandItem>();
	private List<CarBrandItem> carTypeList=new ArrayList<CarBrandItem>();
	private List<CarBrandItem> carYearList=new ArrayList<CarBrandItem>();
	
	/**
     * JSON根据字典类别获取字典项目列表的功能（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/findDicData")
	@ResponseBody
    public Object findDictionaryData(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<EnumItem> list = dictionaryService.getEnumListByCode(searchParam.get("code"));
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if (list != null) {
			for (EnumItem en : list) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("text", en.getItemName());
				map.put("id", en.getItemValue());
				results.add(map);
			}
		}
        return results;
    }
	
	/**
	 * 加载车辆品牌下拉信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/jsonCarBrandInCombo")
	@ResponseBody
    public Object findCarBrandData(Model model, HttpServletRequest request) {
		
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if(this.carBrandList.size()==0){
			this.carBrandList = dictionaryService.findCarBrandTemp();
		}
		for (CarBrandItem item : carBrandList) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", item.getValue());
			map.put("text", item.getKey());
			results.add(map);
		}
		return results;
    }
	/**
	 * 根据车辆品牌加载车辆型号下拉信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/jsonCarTypeInCombo")
	@ResponseBody
    public Object findCarTypeData(Model model, HttpServletRequest request) {
		
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carBrand=searchParam.get("carBrand");
		if(this.carTypeList.size()==0){
			this.carTypeList = dictionaryService.findCarType();
		}
		for (CarBrandItem item : carTypeList) {
			if(item.getParentid().equals(carBrand)){
				Map<String, String> map = new HashMap<String, String>();
				map.put("id", item.getValue());
				map.put("text", item.getKey());
				results.add(map);
			}
		}
		return results;
    }
	/**
	 * 根据车辆品牌和车辆型号加载车辆年款下拉信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/jsonCarYearInCombo")
	@ResponseBody
    public Object findCarYearData(Model model, HttpServletRequest request) {
		
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carBrand=searchParam.get("carBrand");
		String carType=searchParam.get("carType");
		String parentId=carBrand+"_"+carType;
		if(this.carYearList.size()==0){
			this.carYearList = dictionaryService.findCarYear();
		}
		for (CarBrandItem item : carYearList) {
			if(item.getParentid().equals(parentId)){
				Map<String, String> map = new HashMap<String, String>();
				map.put("id", item.getValue());
				map.put("text", item.getKey());
				results.add(map);
			}
		}
		return results;
    }
}
