package com.jp.tic.business.faceRecognition;


import java.util.List;

import com.sun.jna.Structure;

public class Fitask extends Structure {
	public Idtytask.ByValue idtytask;// 任务列表信息
	public Htask.ByReference htask=new Htask.ByReference();// 照片列表信息
	
	public static class ByReference extends Fitask implements Structure.ByReference { }

    public static class ByValue extends Fitask implements Structure.ByValue{ }

	@Override
	protected List getFieldOrder() {
		// TODO Auto-generated method stub
		return null;
	}
}
