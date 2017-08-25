package com.jp.tic.hbase;

import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.hbase.KeyValue;
import org.apache.hadoop.hbase.client.Delete;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.util.Bytes;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.hadoop.hbase.HbaseTemplate;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.data.hadoop.hbase.TableCallback;

import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.common.hbase.entity.HBaseColumn;
import com.jp.tic.common.hbase.query.JPHBaseQueryHelper;
import com.jp.tic.common.hbase.utils.CommonBytesUtils;
import com.jp.tic.framework.hbase.JPHbaseTemplate;

/**
 * <b>function:</b>
 * 
 * @author hoojo
 * @createDate 2014-5-20 下午05:19:08
 * @file HbaseTemplateTest.java
 * @package com.jp.tic.hbase
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class HbaseTemplateTest extends BaseTest {

	@Autowired
	private JPHbaseTemplate template;

	@Test
	public void testConfig() {
		System.out.println(template);
	}

	@Test
	public void testGET() throws Exception {
		template.setEncoding("ISO-8859-1");
		
		byte[] bytes=new byte[] { 0,16,120,33,-5,-26,-14,-59,-15,127,-1,52,52,48,49,48,48,48,48,48,48,48,48,0,0,0,0,0,0,-25,-78,-92,65,55,50,54,75,51,0,0,0,0,0,0,83,66,48,48,48,48,49,49,49,0,0,0,0,0,0,0,0,0,48,50 };
		byte[] bytes2=new byte[]{0,16,120,33,-5,-26,-14,-59,-20,127,-1,52,52,48,49,48,48,48,48,48,48,48,48,0,0,0,0,0,0,-25,-78,-92,65,52,54,52,65,83,0,0,0,0,0,0,83,66,48,48,48,48,49,49,49,0,0,0,0,0,0,0,0,0,48,50};
		
		List<byte[]> rows=new ArrayList<byte[]>();
		rows.add(bytes);
		rows.add(bytes2);
		
		template.get("car_take", bytes, new RowMapper<Object>() {
			
			@Override
			public Object mapRow(Result rs, int i) throws Exception {
				System.out.println(rs.getRow() + "#" + rs + "#" + i);
				System.out.println(rs.getMap());
				System.out.println(rs.list());
				System.out.println(rs.value());
				return null;
			}
			
		});
		
		template.get("car_take", rows, new RowMapper<Object>() {
			
			@Override
			public Object mapRow(Result rs, int i) throws Exception {
				System.out.println(rs.getRow() + "#" + rs + "#" + i);
				System.out.println(rs.getMap());
				System.out.println(rs.list());
				System.out.println(rs.value());
				return null;
			}
			
		});
	}
	
	//@Test
	public void testExcute() throws Exception {
		template.setEncoding("ISO-8859-1");
		
		final String rowName = "test", columnName = "take", qualifier = "xxbh", value = "123456789";
		template.execute("car_take", new TableCallback<Object>() {
			
			@Override
			public Object doInTable(HTableInterface table) throws Throwable {
				System.out.println(table.getTableDescriptor());
				
				Put p = new Put(Bytes.toBytes(rowName));
				p.add(Bytes.toBytes(columnName), Bytes.toBytes(qualifier), Bytes.toBytes(value));
				table.put(p);

				System.out.println("Doing put..");
				Get g = new Get(Bytes.toBytes(rowName));
				
				Result r = table.get(g);
				System.out.println(get(r));
				
				byte[] val = r.getValue(Bytes.toBytes(columnName), Bytes.toBytes(qualifier));
				System.out.println(Bytes.toString(val));
				
				//table.delete(new Delete(Bytes.toBytes(rowName)));
				table.delete(new Delete(r.getRow()));
				r = table.get(g);
				System.out.println(get(r));
				
				return null;
			}
		});
	}
	
	//@Test
	public void testFind() throws Exception {
		template.setEncoding("ISO-8859-1");
		
		template.find("car_take", "take", new RowMapper<Object>() {

			@Override
			public Object mapRow(Result rs, int i) throws Exception {
				if (i < 5) {
					//System.out.println(rs.getRow() + "#" + rs + "#" + i);
					
					//log.debug(CommonBytesUtils.toValueString(rs.getRow()));
					
					System.out.println("JJJJ"+JPHBaseQueryHelper.getEntityByRowKey("car_take", rs.getRow()).getProperties());
					System.out.println(i + "#" +ResultConvertUtils.desc(rs, false));
					
					/*
					System.out.println(rs.getMap());
					System.out.println(rs.list().get(0).getKeyString());
					System.out.println(rs.raw());
					System.out.println(rs.value());
					System.out.println(get(rs));
					*/
					
					System.out.println(CommonBytesUtils.toValueString(rs.getRow()));
				}
				return null;
			}

		});

	}
	
	private Object get(Result rs) {
		HBaseColumn column=new HBaseColumn();
		for (KeyValue kv : rs.raw()) {
			try{
				if(isValidKV(kv)){
					
					column.setColumnFamily(Bytes.toString(kv.getFamily()));
					column.setQualifier(Bytes.toString(kv.getQualifier()));
					column.setTime(kv.getTimestamp());
					column.setValue(kv.getValue());
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
		return column;
	}
	
	private static boolean isValidKV(KeyValue kv){
		if ("".equals(new String(kv.getRow()))) {
			return false;
		}
		return true;
	}
}
