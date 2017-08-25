package com.jp.tic.analyze.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.jp.tic.analyze.service.PictureToSearchService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

/** 
 * PictureToSearchController.java Create on 2016-10-26 上午09:55:25      
 * Copyright (c) 2016-10-26 by jinpeng         
 * @author lsg     
 * @version 1.0 
 */
@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/picture")
public class PictureToSearchController extends AbstractController {

	@Autowired
	private PictureToSearchService pictureToSearchService;
	
	@Autowired
	private DictionaryService dictionaryService;
	
	/**
	 * 加载按车型查询页面,加载图片展示列表
	 * @return 页面映射
	 */
	@RequestMapping("/imageSearchResultPage")
	public String imageSearchResultPageLoad() {
		return "/analyze/image-search-result";
	}
	
	/**
	 * 定时调用车辆特征查询
	 * @return 查询结果
	 * @throws Exception 
	 */
	@RequestMapping("/checkImageStatus")
	@ResponseBody
	public Object checkImageStatus(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object>  datas = pictureToSearchService.checkImageStatus();
		this.jsonResult.setData(datas);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 加载车辆识别详细信息
	 * @return
	 */
	@RequestMapping("/loadCarDetail")
	@ResponseBody
	public Object loadCarDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		String targetImage = searchParam.get("carImg");
		Map<String, String> resultMap = pictureToSearchService.loadCarDetailInfo(targetImage);
		this.jsonResult.setData(resultMap);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 车辆比对
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/pictureCompare")
	@ResponseBody
	public Object pictureCompareInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		String jsonParam = this.initSearchParam(searchParam);
		Map<String, Object> resultsMap = pictureToSearchService.pictureCompareInfo(jsonParam);
		List<CarTake> pageDatas = (List<CarTake>) resultsMap.get("pageDatas");
		int counts = StringUtil.toInt(resultsMap.get("counts"));
		return ResponseUtils.sendList(pageDatas, counts);
	}
	
	/**
	 * 加载最后分析完成的数据
	 * @return 查询结果
	 * @throws Exception 
	 */
	@RequestMapping("/loadLastDatas")
	@ResponseBody
	public Object loadLastDatas(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		Map<String, Object> results = pictureToSearchService.loadLastDatas(searchParam);
		List<CarTake> pageDatas = (List<CarTake>) results.get("pageDatas");
		int counts = StringUtil.toInt(results.get("counts"));
		return ResponseUtils.sendList(pageDatas, counts);
	}
	
	/**
	 * 初始化查询条件
	 * @param searchParam
	 * @return
	 */
	public String initSearchParam(Map<String, String> searchParam) {
		String carBrand = searchParam.get("carBrand");
		List<EnumItem> hpysDatas = dictionaryService.getEnumListByCode("LicPlateColor");
		List<EnumItem> cllxDatas = dictionaryService.getEnumListByCode("CarCategory");
		String hpys = "4";
		if (!StringUtil.equals(searchParam.get("hpys"), "绿色")) {
			hpys = this.findDictionaryValue(hpysDatas, searchParam.get("hpys"));
		}
		String cllxName = searchParam.get("carCategory");
		String cllx = "";
		if (StringUtil.equals(cllxName, "越野车")) {
			cllx = "2"; //越野车/SUV
		} else if (StringUtil.equals(cllxName, "商务车")) {
			cllx = "3"; //商务车/MPV
		} else if (StringUtil.equals(cllxName, "微面")) {
			cllx = "4"; //面包车
		} else if (StringUtil.equals(cllxName, "小型货车")) {
			cllx = "7"; //货车
		} else if (StringUtil.equals(cllxName, "大型货车")) {
			cllx = "9"; //重型货车
		} else if (StringUtil.equals(cllxName, "轻客")) {
			cllx = "6"; //轻型客
		} else if (StringUtil.equals(cllxName, "小型客车")) {
			cllx = "10"; //客车
		} else if (StringUtil.equals(cllxName, "混凝土搅拌车") || StringUtil.equals(cllxName, "罐车") || 
				StringUtil.equals(cllxName, "随车吊") || StringUtil.equals(cllxName, "消防车") || 
				StringUtil.equals(cllxName, "渣土车") || StringUtil.equals(cllxName, "押运车") || 
				StringUtil.equals(cllxName, "工程抢修车") || StringUtil.equals(cllxName, "救援车") || 
				StringUtil.equals(cllxName, "栏板卡车")) {
			cllx = "0"; //其他
		} else {
			cllx = this.findDictionaryValue(cllxDatas, cllxName);
		}
		String brand = "", type = "", year = "";
		if (StringUtil.checkStr(carBrand)) {
			String[] brands = carBrand.split("-");
			if (brands.length == 1) {
				brand = brands[0];
			} else if (brands.length == 2) {
				brand = brands[0];
				type = brands[0] + "_" + brands[1];
			} else if (brands.length == 3) {
				brand = brands[0];
				type = brands[0] + "_" + brands[1];
				year = brands[0] + "_" + brands[1]  + "_" + brands[2];
			}
		}
		Map<String, String> param = new HashMap<String, String>();
		if (StringUtil.checkStr(brand)) {
			param.put("carBrand", brand);
		}
		if (StringUtil.checkStr(type)) {
			param.put("carType", type);
		}
		if (StringUtil.checkStr(year)) {
			param.put("carYear", year);
		}
		//主图片
		param.put("imageStr", searchParam.get("imageStr"));
		param.put("similaty", searchParam.get("similaty"));
		param.put("startTime", searchParam.get("startTime"));
		param.put("endTime", searchParam.get("endTime"));
		if (StringUtil.checkStr(searchParam.get("carRects"))) {
			param.put("carRects", searchParam.get("carRects"));
		}
		if (StringUtil.checkStr(hpys)) {
			param.put("hpys", hpys);
		}
		if (StringUtil.checkStr(cllx)) {
			param.put("carCategory", cllx);
		}
		param.put("page.start", "0");
		param.put("page.limit", "0");
		String jsonParam = JSON.toJSONString(param);//查询条件
		return jsonParam;
	}
	
	/**
     * 获取到了对应的字典code对应的集合后，再根据值来获取对应的值
     * @param list code对应的集合
     * @param value 值
     * @return 处理结果
     */
    public String findDictionaryValue(List<EnumItem> list, String value) {
    	String divValue = "";
    	if (!StringUtil.checkStr(value)) {
    		return divValue;
    	}
    	if (list != null && list.size() > 0) {
			for (EnumItem en : list) {
				if (StringUtil.equals(en.getItemName(), value)) {
					divValue = en.getItemValue();
					break;
				}
			}
    	}
    	return divValue;
	}
}
