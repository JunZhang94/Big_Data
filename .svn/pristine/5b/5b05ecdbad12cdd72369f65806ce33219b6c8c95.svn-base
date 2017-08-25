package com.jp.tic.business.faceRecognition;

import java.util.List;

import com.sun.jna.Structure;

public class FgiEngineStatus extends Structure{
	public int type;							///< 引擎处理任务类型: ENROLL, VERIFY, IDENTIFY
	public int algorithm;				///< 算法类型: FaceAlgorithm
	public int resourceType;					///< 资源类型
	public int status;							///< 当前状态
	public int autoRecycleTime;		///< 自动回收时间
	public int spareTime;				///< 已空闲时间
	public int processRequests;				///< 已处理请求数
	public int templates;						///< 总需要装载照片模板数
	public int templateLoadProgress;			///< 已装载照片模板数
	public byte[] name=new byte[21];	///< 引擎名称
	public byte[] dbName=new byte[31];					///< 引擎装载的照片数据库名称
	
	public static class ByReference extends FgiEngineStatus implements Structure.ByReference { }

    public static class ByValue extends FgiEngineStatus implements Structure.ByValue{ }

	@Override
	protected List getFieldOrder() {
		// TODO Auto-generated method stub
		return null;
	}
}
