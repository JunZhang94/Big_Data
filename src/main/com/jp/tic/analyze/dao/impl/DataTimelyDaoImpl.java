package com.jp.tic.analyze.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.analyze.dao.DataTimelyDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class DataTimelyDaoImpl extends BaseDao implements DataTimelyDao {

	/**
	 * 数据及时率统计,0为正常，1为数据延迟，2为不及时
	 * @param param 查询参数
	 * @return 查询结果
	 */
	@RequestMapping("/byOrgGroupping")
	@ResponseBody
	public List<Map<String, String>> dataTimelyStatistic(Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select p.KKMC,p.dwbh,p.dwmc,p.DATA_STATUS from (");
		sqlBuffer.append("select a.KKBH,c.KKMC,d.dwbh,d.dwmc,a.start_time,a.end_time,a.jgsj," +
				"a.update_time,case when ceil((a.update_time - a.JGSJ) * 24 * 60) <= 18 then '0' " +
				"when ceil((a.update_time - a.JGSJ) * 24 * 60) > 18 and ceil((a.update_time - a.JGSJ) * 24 * 60) <=30 then '1' " +
				"when ceil((a.update_time - a.JGSJ) * 24 * 60) > 30 then '2' end as DATA_STATUS " +
				"from DIS_GATE_TIME_STATUS a,(select KKBH, max(JGSJ) NEW_TIME " +
				"from DIS_GATE_TIME_STATUS group by KKBH) b,MOUNT_TAB c,MGMTDEPT_TAB d " +
				"where a.kkbh = b.kkbh and a.JGSJ = b.NEW_TIME and a.kkbh = c.kkbh and c.dwbh = d.dwbh");
		if (StringUtil.equals(param.get("orgType"), "1")) {
			sqlBuffer.append(" and d.dwbh = '" + param.get("orgId") + "'");
		}
		if (StringUtil.equals(param.get("orgType"), "2")) {
			sqlBuffer.append(" and c.kkbh = '440" + param.get("orgId") + "'");
		}
		sqlBuffer.append(") p group by p.kkmc,p.dwbh,p.dwmc,p.DATA_STATUS");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return results;
	}
	
	/**
	 * 数据转移
	 */
	public void startTransferData() {
		this.transferData();
	}
}
