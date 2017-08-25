package com.jp.tic.framework.hbase.filter;

import java.io.DataInput;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;

import org.apache.axis.utils.ByteArrayOutputStream;
import org.apache.kahadb.util.ByteArrayInputStream;

public class FilterSeriTest {
	public static void main(String[] args) throws IOException {
		ByteArrayOutputStream temp = new ByteArrayOutputStream(4);
		DataOutputStream out=new DataOutputStream(temp);
		out.writeInt(1);
		out.writeInt(3);
		out.writeUTF("粤54");
		
		byte[] data=temp.toByteArray();
		DataInput in=new DataInputStream(new ByteArrayInputStream(data));
		int start=in.readInt();
		int end=in.readInt();
		String str = in.readUTF();
		
		System.out.println(start);
		System.out.println(end);
		System.out.println(str);
	}
}
