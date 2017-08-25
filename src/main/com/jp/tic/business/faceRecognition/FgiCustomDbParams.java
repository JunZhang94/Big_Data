package com.jp.tic.business.faceRecognition;


import java.util.List;

import com.sun.jna.Pointer;
import com.sun.jna.Structure;
import com.sun.jna.ptr.IntByReference;
import com.sun.jna.ptr.PointerByReference;

public class FgiCustomDbParams extends Structure{
	public String dbName;			///< 模板数据所属相片库
	public int paramType;		///< 模板数据选取方式 FgiCustomDbParamsType
	public PointerByReference	hParams=new PointerByReference();		///< 模板数据按搜索条件进行选取
	public Pointer fidArray;		///< 模板数据按指定fid进行选取
	public int arrayLength;	///< fid个数


	public static class ByReference extends FgiCustomDbParams implements Structure.ByReference { }

    public static class ByValue extends FgiCustomDbParams implements Structure.ByValue{ }

	@Override
	protected List getFieldOrder() {
		// TODO Auto-generated method stub
		return null;
	}
}
