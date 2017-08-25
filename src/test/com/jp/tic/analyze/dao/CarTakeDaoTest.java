package com.jp.tic.analyze.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.hadoop.hbase.client.Scan;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.analyze.dao.impl.CarTakeDaoImpl;
import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao.KKRowKey;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.entity.SliceEntity;
import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.business.cartake.mapper.BasicDataQueryMapper;
import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.system.entity.CarTake;

public class CarTakeDaoTest extends BaseTest {
	private static SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	private CarTakeDao carTakeDao;
	
	@Autowired
	private BasicDataQueryMapper<Map<String, Object>> mapper;
	
	//@Test
	public void testBytes() throws Exception{
		for(int i=0;i<256;i++){
			System.out.println(i+"===="+(byte)i);
		}
	}
	
	//@Test
	public void testGetCarTrace() throws Exception{
		
		List<CarTake> list = carTakeDao.getCarTrace("粤ET8717", null, null, 1000);
		for(CarTake take:list){
			System.out.println(">>>"+take);
		}
	}
	
	//@Test
	public void testGetCarTraceTime() throws Exception{
			
		Date startDate=formatter.parse("2014-05-28 00:00:00");
		Date endDate=formatter.parse("2014-05-28 09:59:37");
		
		List<CarTake> list2 = carTakeDao.getCarTrace("粤A87654", startDate, endDate, 10);
		for(CarTake take:list2){
			System.out.println("testGetCarTrace>>>"+take);
		}
	}
	
	//@Test
	public void testGetMountSnapshot() throws Exception{
		List<CarTake> list = carTakeDao.getMountSnapshot("440119999999999999", null, null, 1000);
		for(CarTake take:list){
			System.out.println(">>>"+take);
		}
		
		Date startDate=formatter.parse("2014-05-28 00:00:00");
		Date endDate=formatter.parse("2014-05-28 09:59:37");
		
		List<CarTake> list2 = carTakeDao.getMountSnapshot("440119999999999999", startDate, endDate, 10);
		for(CarTake take:list2){
			System.out.println("testGetMountSnapshot>>>"+take);
		}
	}
	
	//@Test
	public void testGetMountSnapshot4List() throws Exception{
		List<String> kkbhs=new ArrayList<String>();
		kkbhs.add("440119999999999999");
		//kkbhs.add("KK01");
		List<CarTake> list = carTakeDao.getMountSnapshot(kkbhs, null, null, 1000);
		for(CarTake take:list){
			System.out.println("testGetMountSnapshot4List no dates>>>"+take);
		}
		
//		Date startDate=formatter.parse("2014-05-28 00:00:00");
//		Date endDate=formatter.parse("2014-05-28 09:59:37");
		
		Date startDate=formatter.parse("2014-07-20 00:00:00");
		Date endDate=formatter.parse("2014-07-28 09:59:37");
		
		List<CarTake> list2 = carTakeDao.getMountSnapshot(kkbhs, startDate, endDate, 100);
		for(CarTake take:list2){
			System.out.println("testGetMountSnapshot4List with dates>>>"+take);//.toString().substring(0,take.toString().indexOf("id="))
			System.out.println("rowkey:"+BytesUtils.toValueString(take.getId().getBytes()));
		}
	}
	
	//@Test
	public void testGetCount() throws Exception{
		System.out.println("================="+new Date());
		System.out.println("================="+((CarTakeDaoImpl)carTakeDao).getCount("car_take", new Scan()));
		System.out.println("================="+new Date());
		System.out.println("================="+((CarTakeDaoImpl)carTakeDao).getCount("index_hphm", new Scan()));
		System.out.println("================="+new Date());
		System.out.println("================="+((CarTakeDaoImpl)carTakeDao).getCount("index_kkbh", new Scan()));
		System.out.println("================="+new Date());
		System.out.println("================="+((CarTakeDaoImpl)carTakeDao).getCount("index_jgsj", new Scan()));
		System.out.println("================="+new Date());
	}
	
	//@Test
	public void testGetRowkeyIt() throws Exception{
		System.out.println("================="+new Date());
		//Iterator<KKRowKey> it = ((CarTakeDaoImpl)carTakeDao).getRowkeyIt("index_jgsj");
		//Iterator<KKRowKey> it = ((CarTakeDaoImpl)carTakeDao).getRowkeyIt("index_hphm");
		//Iterator<KKRowKey> it = ((CarTakeDaoImpl)carTakeDao).getRowkeyIt("index_kkbh");
		Iterator<KKRowKey> it = ((CarTakeDaoImpl)carTakeDao).getRowkeyIt("car_take");
		while(it.hasNext()){
			System.out.println("====="+it.next());
		}
		System.out.println("================="+new Date());
	}
	
	//@Test
	public void testGetCount4MountCount() throws Exception{
		System.out.println("================="+new Date());
		Date date=formatter.parse("2014-05-28 00:00:00");
		Map<Date[], Long[]> counts = ((CarTakeDaoImpl)carTakeDao).getCount4MountCount("440119999999999999",date);
		for(Entry<Date[],Long[]> entity:counts.entrySet()){
			System.out.println(entity.getKey()[0]+"-"+entity.getKey()[1]+"========="+entity.getValue()[0]+"-"+entity.getValue()[1]+"-"+entity.getValue()[2]);
		}
		System.out.println("================="+new Date());
	}
	
	//@Test
	public void testQueryCarTake() throws Exception{
		//List<CarTake> takes = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, null, null, "854", 10, true);
		//List<CarTake> takes = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, null, "54", 10, true);
		//List<CarTake> takes = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, null, null, 10, true);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-05-29 00:00:00");
		//List<CarTake> takes = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", date1, date2, "54", 10, true);
		//List<CarTake> takes = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", date1, null, "54", 10, true);
		//List<CarTake> takes = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, date2, "54", 10, true);
		//List<CarTake> takes = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, null, date2, "54", 10, true);
		List<CarTake> takes = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, null, null, "54", 10, true);
		
		for(CarTake take:takes){
			System.out.println("testQueryCarTake>>><<<"+take);
		}
	}
	
	private void printPage(PageEntity page){
		for(CarTake take:page.getResult()){
			System.out.println("testQueryCarTakePage>>><<<"+take);
		}
		
		for(String key:page.getPageStartKeys()){
			System.out.println("testQueryCarTakePage>>><<<"+key);
		}
		
		System.out.println(page);
	}
	
	private void printSlice(SliceEntity slice){
		for(CarTake take:slice.getResult()){
			System.out.println("testQueryCarTakeSlice>>><<<"+take);
		}
		
		System.out.println(slice);
	}
	
	//@Test
	public void testQueryCarTakePage_KKBH_NoCache_NoPreLoad() throws Exception{
		PageEntity page=new PageEntity();
		page.setPageSize(3);
		
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, null, null, page, false);
		this.printPage(page);
		
		page.goNext();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, null, null, page, false);
		this.printPage(page);
		
		page.goLast();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, null, null, page, false);
		this.printPage(page);
	}
	
	//@Test
	public void testQueryCarTakePage_KKBH_NoCache_PreLoad() throws Exception{
		PageEntity page=new PageEntity();
		page.setPageSize(3);
		page.setMaxQueryLoadPageSize(3);
		
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, null, null, page, false);
		this.printPage(page);
		
		page.goNext();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, null, null, page, false);
		this.printPage(page);
		
		page.goLast();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", null, null, null, page, false);
		this.printPage(page);
		
	}
	
	//@Test
	public void testQueryCarTakePage_KKBH_JGSJ_NoCache_NoPreLoad() throws Exception{
		PageEntity page=new PageEntity();
		page.setPageSize(3);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-05-29 00:00:00");
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", date1, date2, null, page, false);
		this.printPage(page);
		
		page.goNext();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", date1, date2, null, page, false);
		this.printPage(page);
		
		page.goLast();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", date1, date2, null, page, false);
		this.printPage(page);
	}
	
	//@Test
	public void testQueryCarTakePage_KKBH_JGSJ_HPHM_NoCache_NoPreLoad() throws Exception{
		PageEntity page=new PageEntity();
		page.setPageSize(3);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-05-29 00:00:00");
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", date1, date2, "粤A87654", page, false);
		this.printPage(page);
		
		page.goNext();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", date1, date2, "粤A87654", page, false);
		this.printPage(page);
		
		page.goLast();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake("440119999999999999", date1, date2, "粤A87654", page, false);
		this.printPage(page);
	}
	
	//@Test
	public void testQueryCarTakePage_JGSJ_NoCache_NoPreLoad() throws Exception{
		PageEntity page=new PageEntity();
		page.setPageSize(3);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-05-29 00:00:00");
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, date1, date2, null, page, false);
		this.printPage(page);
		
		page.goNext();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, date1, date2, null, page, false);
		this.printPage(page);
		
		page.goLast();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, date1, date2, null, page, false);
		this.printPage(page);
	}
	
	//@Test
	public void testQueryCarTakePage_JGSJ_HPHM_NoCache_NoPreLoad() throws Exception{
		PageEntity page=new PageEntity();
		page.setPageSize(3);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-05-29 00:00:00");
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, date1, date2, "粤A87654", page, false);
		this.printPage(page);
		
		page.goNext();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, date1, date2, "粤A87654", page, false);
		this.printPage(page);
		
		page.goLast();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, date1, date2, "粤A87654", page, false);
		this.printPage(page);
	}
	
	//@Test
	public void testQueryCarTakePage_HPHM_NoCache_NoPreLoad() throws Exception{
		PageEntity page=new PageEntity();
		page.setPageSize(3);
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, null, null, "粤A602P0", page, false);
		this.printPage(page);
		
		page.goNext();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, null, null, "粤A602P0", page, false);
		this.printPage(page);
		
		page.goLast();
		
		page = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, null, null, "粤A602P0", page, false);
		this.printPage(page);
	}
	
	//@Test
	public void testQueryCarTakeSlice_JGSJ_NoCache_NoPreLoad() throws Exception{
		SliceEntity slice=new SliceEntity();
		slice.setCount(3);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-05-29 00:00:00");
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, date1, date2, null, slice, false);
		this.printSlice(slice);
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(null, date1, date2, null, slice, false);
		this.printSlice(slice);
		
	}
	
	//@Test
	public void testQueryCarTakeSlice_HPZL_NoCache_NoPreLoad() throws Exception{
		SliceEntity slice=new SliceEntity();
		slice.setCount(300);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-05-29 00:00:00");
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,null,null,null,"9",slice);
		this.printSlice(slice);
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,null,null,null,"9",slice);
		this.printSlice(slice);
		
	}
	
	//@Test
	public void testQueryCarTakeSlice_CSYS_NoCache_NoPreLoad() throws Exception{
		SliceEntity slice=new SliceEntity();
		slice.setCount(3);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-05-29 00:00:00");
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,"S",null,null,null,slice);
		this.printSlice(slice);
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,"S",null,null,null,slice);
		this.printSlice(slice);
		
	}
	
	//@Test
	public void testQueryCarTakeSlice_KKBHS_NoCache_NoPreLoad() throws Exception{
		SliceEntity slice=new SliceEntity();
		slice.setCount(30);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-09-29 00:00:00");
		
		List<String> kkbhs=new ArrayList<String>();
		kkbhs.add("440119999999999999");
		kkbhs.add("440100080700007902");
		kkbhs.add("440116000000001302");
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,kkbhs,null,slice);
		this.printSlice(slice);
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,kkbhs,null,slice);
		this.printSlice(slice);
		
	}
	
	//@Test
	public void testQueryCarTakeSlice_HPHMS_NoCache_NoPreLoad() throws Exception{
		SliceEntity slice=new SliceEntity();
		slice.setCount(30);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-09-29 00:00:00");
		
		List<String> hphms=new ArrayList<String>();
		hphms.add("粤A87654");
		hphms.add("粤A87650123");
		hphms.add("粤A87650123456");
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,null,hphms,slice);
		this.printSlice(slice);
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,null,hphms,slice);
		this.printSlice(slice);
		
	}
	
	@Test
	public void testQueryCarTakeSlice_KKBHS_HPHMS_NoCache_NoPreLoad() throws Exception{
		SliceEntity slice=new SliceEntity();
		slice.setCount(30);
		
		Date date1=formatter.parse("2014-05-28 00:00:00");
		Date date2=formatter.parse("2014-09-29 00:00:00");
		
		List<String> kkbhs=new ArrayList<String>();
		kkbhs.add("440119999999999999");
		kkbhs.add("440100080700007902");
		kkbhs.add("440116000000001302");
		
		List<String> hphms=new ArrayList<String>();
		hphms.add("粤A87654");
		hphms.add("粤A87650123");
		hphms.add("粤A87650123456");
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,kkbhs,hphms,slice);
		this.printSlice(slice);
		
		slice = ((CarTakeDaoImpl)carTakeDao).queryCarTake(date1,date2,hphms,hphms,slice);
		this.printSlice(slice);
		
	}
}
