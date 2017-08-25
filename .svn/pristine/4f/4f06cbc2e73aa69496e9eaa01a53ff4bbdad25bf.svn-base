package com.jp.tic.common.service.impl;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.common.entity.IDGenerator;
import com.jp.tic.common.enums.IdType;
import com.jp.tic.common.service.IDGeneratorService;
import com.jp.tic.framework.dao.BaseDao;

/**
 * <b>function:</b> id 生成器测试用例
 * @author hoojo
 * @createDate 2013-4-26 下午03:10:03
 * @file IDGeneratorServiceImplTest.java
 * @package com.jp.tic.framework.service.impl
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class IDGeneratorServiceImplTest extends BaseTest {
	
	@Autowired
	private IDGeneratorService<IDGenerator> generatorService;
	
	@Autowired
	private BaseDao dao;

	@Test
	public void testGeneratorId() {
		IdType idType = IdType.DEVICEINFO_ID;
		try {
			System.out.println(generatorService.executeGeneratorId(idType));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testGeneratorId2() {
		IdType idType = IdType.DEVICEINFO_ID;
		IDGenerator generator = new IDGenerator(idType, 1000); 
		try {
			System.out.println(generatorService.executeGeneratorId(generator));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testGeneratorId3() {
		IdType idType = IdType.DEVICEINFO_ID;
		IDGenerator generator = new IDGenerator(idType, 1, 1, "ABC", "UD"); 
		try {
			System.out.println(generatorService.executeGeneratorId(generator));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testFindGeneratorId() {
		IdType idType = IdType.DEVICEINFO_ID;
		try {
			System.out.println(dao.get(IDGenerator.class, idType).getVal());
			// 不够5为 前面补0
			System.out.println(String.format("%0" + 5 + "d", dao.get(IDGenerator.class, idType).getVal()));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testAdd() {
		dao.add(new IDGenerator(IdType.DEVICEINFO_ID));
	}
}
