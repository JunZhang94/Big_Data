package com.jp.tic.business.oneNumManyCar.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

/**
 * 一牌多车查询
 * @author zh.h
 *
 */
@Controller
@RequestMapping("/oneNumManyCar")
public class OneNumManyCarController extends AbstractController{
	
	@Autowired
	private CarTypeSearchWS carTypeSearchWS;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/oneNumManyCarPage")
	public String oneNumManyCarPageLoad() {
		return "/search/oneNumManyCar-page";
	}
	
	/**
	 * 分页车辆类型列表数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/queryOneNumManyCar")
	@ResponseBody
	public Object queryOneNumManyCarPage(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String json= JsonUtil.objToJson(searchParam);
		Map<String, List<CarTake>> resultMap=carTypeSearchWS.queryDatasForPages(json);
		List<CarTake> results = (List<CarTake>) resultMap.get("rows");
		if (results == null) {
			results = new ArrayList<CarTake>();
		}
		return ResponseUtils.sendList(results, results.size());
	}
	
	
	/**
	 * 车辆类型页面名称与数据库值转换
	 * @param clzl
	 * @param carCategoryList
	 * @return
	 */
	@SuppressWarnings("unused")
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
