package com.jp.tic.business.faceRecognition;

import java.util.List;

import com.sun.jna.Structure;

public class Htask extends Structure{
	public int pid;// 人员id
	public int tid;// 照片id
	public float score;// 相似分值
	public byte[] customId=new byte[41];// 照片自定义编号

	public static class ByReference extends Htask implements Structure.ByReference { }

    public static class ByValue extends Htask implements Structure.ByValue{ }

	@Override
	protected List getFieldOrder() {
		// TODO Auto-generated method stub
		return null;
	}
}
