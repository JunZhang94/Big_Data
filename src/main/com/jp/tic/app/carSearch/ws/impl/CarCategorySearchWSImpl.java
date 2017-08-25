package com.jp.tic.app.carSearch.ws.impl;

import java.util.Map;

import javax.jws.WebService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.jp.tic.app.carSearch.ws.CarCategorySearchWS;
import com.jp.tic.business.categorySearch.service.CategoryQueryService;
import com.jp.tic.utils.jsonUtil.JsonUtil;

@WebService(endpointInterface="com.jp.tic.app.carSearch.ws.CarCategorySearchWS", serviceName="CarCategorySearchWS")
@Controller
public class CarCategorySearchWSImpl implements CarCategorySearchWS {
	
	@Autowired
	private CategoryQueryService categoryQueryService;

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> queryDates(String json) {
		Map<String, String> searchParam=JsonUtil.jsonToMap(json);
		Map<String,Object> DatasolrIndexMap=categoryQueryService.queryIndexByParams(searchParam);
		Map<String,Object> resultMap=categoryQueryService.queryDataByIndexs(DatasolrIndexMap);
		return resultMap;
	}

}
