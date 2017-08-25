package com.jp.tic.framework.hbase.filter;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;

import org.apache.hadoop.hbase.Cell;
import org.apache.hadoop.hbase.filter.FilterBase;
import org.apache.hadoop.hbase.util.Bytes;

/**
 * ROW KEY 局部字节匹配过滤器
 * 指定开始位置，结束位置，要匹配的目标字节数组
 * 目标字节数组中的元素，不计顺序，重复次数
 * 如ab=ba, aab=ab
 * @author John
 *
 */
public class RowKeyByteRangeSplitFilter extends FilterBase {
	private int start;
	private int end;
	private byte[] bytes;
	
	public RowKeyByteRangeSplitFilter(){
	}
	
	public RowKeyByteRangeSplitFilter(int start, int end, byte[] bytes){
		this.start=start;
		this.end=end;
		this.bytes=bytes;
	}

	public boolean filterRowKey(byte[] rowkey, int offset, int length) {
		if ((rowkey == null) || (this.bytes == null)) {
			return true;
		}

		boolean matchAll = true;
		for (int i = 0; i < bytes.length; i++) {
			boolean match = false;

			for (int rowBytesIndex = start; rowBytesIndex < rowkey.length && rowBytesIndex < end; rowBytesIndex++) {
				if (rowkey[rowBytesIndex] == bytes[i]) {
					match = true;
					break;
				}
			}

			if (match == false) {
				matchAll = false;
				break;
			}
		}

		return matchAll == false;
	}

	public boolean filterAllRemaining() {
		return false;
	}

	public void write(DataOutput out) throws IOException {
		out.writeInt(this.start);
		out.writeInt(this.end);
		out.writeUTF(Bytes.toString(this.bytes));
	}

	public void readFields(DataInput in) throws IOException {
		this.start=in.readInt();
		this.end=in.readInt();
		this.bytes = Bytes.toBytes(in.readUTF());
	}

	public String toString() {
		return getClass().getSimpleName() + " " + start + ", " + end + "," + Bytes.toStringBinary(this.bytes);
	}

	@Override
	public ReturnCode filterKeyValue(Cell arg0) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

}
