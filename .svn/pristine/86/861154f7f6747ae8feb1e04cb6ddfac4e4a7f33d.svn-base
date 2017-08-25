package com.jp.tic.business.faceRecognition;


import java.util.List;

import com.sun.jna.Structure;

public class Idtytask extends Structure {
	public int taskId;					///< 任务Id
	public int cuid;
	public int cdt;
	public int taskType;					///< 任务类型
	public int customType;				///< 业务类型
	public int clientType;				///< 客户端类型
	public int rflags;
	public int taskCost;					///< 任务耗时
	public int matchCnt;					///< 搜索结果候选照片数,返回匹配照片数量
	public float score;							///< 验证分值 or 搜索结果首位分值

	public byte[] taskParams=new byte[10];	///< 任务参数
	public byte[] customId=new byte[41]; //自定义任务编号

	 public static class ByReference extends Idtytask implements
	 Structure.ByReference {}

	 public static class ByValue extends Idtytask implements Structure.ByValue {}

	@Override
	protected List getFieldOrder() {
		// TODO Auto-generated method stub
		return null;
	}

	
}
