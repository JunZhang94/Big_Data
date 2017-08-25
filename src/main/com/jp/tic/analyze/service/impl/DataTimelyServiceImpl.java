package com.jp.tic.analyze.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jp.tic.analyze.dao.DataTimelyDao;
import com.jp.tic.analyze.service.DataTimelyService;

@Service
public class DataTimelyServiceImpl implements DataTimelyService {
	
	@Autowired
	DataTimelyDao dataTimelyDao;

	@RequestMapping("/dataTimelyPage")
	public String dataTimelyPageLoad() throws Exception {
		return "/datacenter/data-timely";
	}
	/**
	 * 数据及时率统计
	 * @param param 查询参数
	 * @return 查询结果
	 */
	@Override
	public List<Map<String, String>> dataTimelyStatistic(
			Map<String, String> param) {
		return this.dataTimelyDao.dataTimelyStatistic(param);
	}

	/**
	 * 数据转移
	 */
	public void startTransferData() {
		this.dataTimelyDao.startTransferData();
	}
}
