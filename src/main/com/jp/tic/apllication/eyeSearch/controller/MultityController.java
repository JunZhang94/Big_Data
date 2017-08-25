package com.jp.tic.apllication.eyeSearch.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.framework.controller.AbstractController;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/multity")
public class MultityController extends AbstractController{

	/**
	 * 加载测试页面
	 * @return 页面映射
	 */
	@RequestMapping("/toFirstPage")
	public String toFirstPageLoad() {
		//return "forward:/WEB-INF/app/eyeSearch/main-info.jsp";
		return "forward:/WEB-INF/app/eyeSearch/searchByType.jsp";
	}

	/**
	 * 加载按类别查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/toCategoryPage")
	public String toCategoryPageLoad() {
		return "forward:/WEB-INF/app/eyeSearch/search-category.jsp";
	}
	
	/**
	 * 加载按车牌查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/toLicensePlatePage")
	public String toLicensePlatePageLoad() {
		return "forward:/WEB-INF/app/eyeSearch/search-licensePlate.jsp";
	}
	
	/**
	 * 加载按图片查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/toPhotoPage")
	public String toPhotoPageLoad() {
		return "forward:/WEB-INF/app/eyeSearch/search-photo.jsp";
	}
	/**
	 * 加载初次入城页面
	 * @return 页面映射
	 */
	@RequestMapping("/toFirstInCity")
	public String toFirstInCityPageLoad(){
		return "forward:/WEB-INF/app/largeDataHandle/inCityFirstTime.jsp";
	}
	/**
	 * 加载自定义碰撞页面
	 * @return 页面映射
	 */
	@RequestMapping("/toSelfDefine")
	public String toSelfDefinePageLoad(){
		return "forward:/WEB-INF/app/largeDataHandle/selfDefine.jsp";
	}
	/**
	 * 加载隐匿车辆挖掘页面
	 * @return 页面映射
	 */
	@RequestMapping("/toHiddenVehiclePage")
	public String toHiddenVehiclePageLoad(){
		return "forward:/WEB-INF/app/eyeSearch/hidden-vehicle.jsp";
	}
	/**
	 * 加载相似车辆串并页面
	 * @return 页面映射
	 */
	@RequestMapping("/toSimilarLicensePage")
	public String toSimilarLicensePageLoad(){
		return "forward:/WEB-INF/app/eyeSearch/similar-licensePlate.jsp";
	}
	/**
	 * 加载遮挡面部检测页面
	 * @return 页面映射
	 */
	@RequestMapping("/toOccludedFacePage")
	public String toOccludedFacePageLoad(){
		return "forward:/WEB-INF/app/eyeSearch/detection-occludedFace.jsp";
	}
	/**
	 * 加载车牌搜索页面
	 * @return 页面映射
	 */
	@RequestMapping("/toSearch")
	public String toSearch(){
		return "forward:/WEB-INF/app/eyeSearch/photoList.jsp";
	}
	/**
	 * 初始化下拉框菜单数据
	 * @param model
	 * @param request
	 * @return 结果集
	 */
	@RequestMapping("/loadComboxData")
	@ResponseBody
	public Object loadComboxDataInfo(Model model, HttpServletRequest request) {
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		Map<String, String> map1 = new HashMap<String, String>();
		map1.put("id", "01");
		map1.put("text", "java");
		results.add(map1);
		Map<String, String> map2 = new HashMap<String, String>();
		map2.put("id", "02");
		map2.put("text", "c++");
		results.add(map2);
		Map<String, String> map3 = new HashMap<String, String>();
		map3.put("id", "03");
		map3.put("text", "ruby");
		results.add(map3);
		return results;
	}
}
