package com.jp.tic.business.categorySearch.dao.impl;

import java.util.List;

import org.apache.hadoop.hbase.client.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao;
import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.categorySearch.dao.CategoryQueryDataByIndexDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;

@Repository
public class CategoryQueryDataByIndexDaoImpl extends AbstractKKHBaseDao  implements CategoryQueryDataByIndexDao {
	private static Logger logger=LoggerFactory.getLogger(CategoryQueryDataByIndexDaoImpl.class);
	

	@Override
	public List<CarTake> getDatasByKeys(List<byte[]> rowKeys) {
		List<CarTake> result = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowKeys, new RowMapper<CarTake>() {

			@Override
			public CarTake mapRow(Result rs, int i) throws Exception {
				CarTake data = ResultConvertUtils.toTake(rs);
				logger.debug(i + "#" + data);
				return data;
			}
		});
		return result;
	}

}
