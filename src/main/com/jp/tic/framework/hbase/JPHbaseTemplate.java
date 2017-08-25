package com.jp.tic.framework.hbase;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.springframework.data.hadoop.hbase.HbaseTemplate;
import org.springframework.data.hadoop.hbase.HbaseUtils;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.data.hadoop.hbase.TableCallback;

public class JPHbaseTemplate extends HbaseTemplate {

	public JPHbaseTemplate() {
	}

	public JPHbaseTemplate(Configuration configuration) {
		setConfiguration(configuration);
		afterPropertiesSet();
	}
	   
	@SuppressWarnings("unchecked")
	public <T> T get(String tableName,final byte[] rowKey,final RowMapper<T> mapper) {
		return (T) execute(tableName, new TableCallback() {
			@Override
			public Object doInTable(HTableInterface htable) throws Throwable {
				Get get = new Get(rowKey);
				Result result = htable.get(get);
				return mapper.mapRow(result, 0);
			}
		});
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> get(String tableName,final List<byte[]> rowKeys,final RowMapper<T> mapper) {
		return (List<T>) execute(tableName, new TableCallback() {
			@Override
			public Object doInTable(HTableInterface htable) throws Throwable {
				List<Get> gets=new ArrayList<Get>();
				for(byte[] rowKey:rowKeys){
					Get get = new Get(rowKey);
					gets.add(get);
				}
				
				Result[] results = htable.get(gets);
				
				List<T> items=new ArrayList<T>();
				for(Result result:results){
					items.add(mapper.mapRow(result, 0));
				}
				return items;
			}
		});
	}
	
	public <T> HBaseIterator<T> findIt(final String tableName,final Scan scan,final RowMapper<T> mapper) {
		try {
			final HTableInterface table = getTable(tableName);

			final boolean previousFlushSetting = applyFlushSetting(table);

			final ResultScanner resultScanner = table.getScanner(scan);
			final Iterator<Result> hbaseIt = resultScanner.iterator();

			return new HBaseIterator<T>() {
				private int index = -1;

				@Override
				public void remove() {
					hbaseIt.remove();
				}

				@Override
				public T next() {
					index++;

					Result result = hbaseIt.next();
					if (result != null) {
						try {
							return mapper.mapRow(result, index);
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else {
						closeConnection();
					}
					return null;
				}

				@Override
				public boolean hasNext() {
					if(hbaseIt.hasNext()==false){
						System.out.println("it close connection");
						closeConnection();
						return false;
					}
					return hbaseIt.hasNext();
				}
				
				private void closeConnection(){
					resultScanner.close();
					releaseTable(tableName, table);
					
					try {
						flushIfNecessary(table, previousFlushSetting);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}

				@Override
				public void close() {
					closeConnection();
				}
			};
		} catch (Throwable th) {
			if ((th instanceof Error)) {
				throw ((Error) th);
			}
			if ((th instanceof RuntimeException)) {
				throw ((RuntimeException) th);
			}
			throw convertHbaseAccessException((Exception) th);
		} finally {
		}
	}
	
	protected HTableInterface getTable(String tableName) {
		return HbaseUtils.getHTable(tableName, getConfiguration(), getCharset(), getTableFactory());
	}
	
	protected void releaseTable(String tableName, HTableInterface table) {
		HbaseUtils.releaseTable(tableName, table, getTableFactory());
	}
	
	protected boolean applyFlushSetting(HTableInterface table) {
		boolean autoFlush = table.isAutoFlush();
		if ((table instanceof HTable)) {
			((HTable) table).setAutoFlush(autoFlush);
		}
		return autoFlush;
	}
	
	protected void flushIfNecessary(HTableInterface table, boolean oldFlush) throws IOException {
		table.flushCommits();
		restoreFlushSettings(table, oldFlush);
	}
	
	protected void restoreFlushSettings(HTableInterface table, boolean oldFlush) {
		if (((table instanceof HTable)) && (table.isAutoFlush() != oldFlush))
			((HTable) table).setAutoFlush(oldFlush);
	}
	
	public static interface HBaseIterator<T> extends Iterator<T>{
		public void close();
	}
}
