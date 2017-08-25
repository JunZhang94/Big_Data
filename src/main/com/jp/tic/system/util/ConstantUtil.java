package com.jp.tic.system.util;

import java.util.ArrayList;
import java.util.List;


public class ConstantUtil {
  
    public static int NODE_TYPE_REGION = 99;// 组织机构
    public static int NODE_TYPE_KAKOU = 88;// 卡口类型
    public static int NODE_TYPE_DERECTION = 77;//
    public static Long ORG_DERECTION = 2L;
    public static Long ORG_KAKOU = 1L;
    
    public static String AREA_ORG_TYPE = "0";// 表示区域
    public static String DEPT_ORG_TYPE = "1";// 表示部门或分局
    public static String MOUNT_ORG_TYPE = "2";// 表示卡点
    public static String DEVICE_ORG_TYPE = "3";// 表示设备
    
    public static String MOUNT_CODE_PRDFIX = "440";// 卡口编码前缀，由于卡口编码太长，导致数据类型转型出现BUG，因此针对长类型的卡口编码截取前缀。
    
    //广州市的卡口编号
    public static String GZS_QYDM = "440100";
    
    
  
   
    //分局的卡口编号集合
    public  static List getFenju_kkbhs(){
    	  String[] fenju_kkbhs = {"440100000000","440100230000","440113000000","440114000000","440115000000","440116000000","440183000000","440184000000", "440112000000"};
    	  List<String> fenju_kkbhs_list = new ArrayList<String>();
  		  for(int i = 0; i < fenju_kkbhs.length; i++){
  			fenju_kkbhs_list.add(fenju_kkbhs[i]);
  		  }
  		  return fenju_kkbhs_list;
    }
}
