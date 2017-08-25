package com.jp.tic.utils.cons;

/**
 * 系统常量类
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class Constants {

	//定义数据库类型
	public static final String DATABASE_TYPE_ORACLE = "Oracle";
	public static final String DATABASE_TYPE_SYSBASE = "Sybase";
	public static final String DATABASE_TYPE_MYSQL = "Mysql";
	
	//定义Sql查询过滤模式
	public static final String SQL_FITER_EQ = "EQ";
	public static final String SQL_FITER_IN = "IN";
	public static final String SQL_FITER_NE = "NE";
	public static final String SQL_FITER_GT = "GT";
	public static final String SQL_FITER_GE = "GE";
	public static final String SQL_FITER_LT = "LT";
	public static final String SQL_FITER_LE = "LE";
	public static final String SQL_FITER_LIKE = "LIKE";
	
	//文件上传方式 add by ouyangzhiming 2012-10-19
	public static final String UPLOAD_FASTDFS = "0";
	public static final String UPLOAD_LOCAL = "1";
	
	//上传处理状态
	public static final int UPLOAD_QUEUED = -1;
	public static final int UPLOAD_IN_PROGRESS = -2;
	public static final int UPLOAD_ERROR = -3;
	public static final int UPLOAD_SUCCESS = -4;
	public static final int UPLOAD_CANCELLED = -5;
	
	
	//环节监测界面使用的常量
	public static final String NODE_PROD_ID = "769001";
	public static final String NODE_TYPE_ID= "402881bb3310eafb013310ff67030006";
	public static final String BIG_NODE_ID= "402881bb3310eafb01331105eee30012";
	
	public static final String NODE_PROVINCE_ID = "440";
	public static final String NODE_PROVINCE_NAME = "广东分公司";
	public static final String NODE_GD_NATIVENET_ID = "500001";
	
	public static final String WS_SUPERVISE_MONITOR_SUC="1";
	public static final String WS_SUPERVISE_MONITOR_ERROR="2";
	public static final String WS_SUPERVISE_MONITOR_FAILT="3";
	
	public static final String INTERFACE_MONITOR_NODE_ID_ONE="b0cddb2ed6aa455eb1d9e7c4a1e51707";
	public static final String INTERFACE_MONITOR_NODE_ID_TWO="b488460228494e05b16ce7c4a1e51707";
	public static final String INTERFACE_MONITOR_NODE_ID_THREE="d5437e7cd46f4be58af1e7c4a1e51707";
	public static final String INTERFACE_MONITOR_NODE_ID_FOUR="4d1faa9c7aca462ba308e7c4a1e51707";
	
	public static final String NODE_PROD_NAME_YICHANG = "异常单";
	public static final String NODE_PROD_NAME_ZAITU = "在途单";
	public static final String NODE_PROD_NAME_GAOJING = "告警单";
	public static final String NODE_PROD_NAME_YUJING = "预警单";
	public static final String NODE_PROD_NAME_OUTTIME = "超时单";
	public static final String NODE_PROD_NAME_HUANJIETIME = "环节平均历时";
	public static final String NODE_PROD_NAME_HIGH_WARN = "高竞争预警";
	public static final String NODE_PROD_NAME_FTTO_WARN = "FTTO预警";
	public static final String NODE_PROD_NAME_FTTH_WARN = "FTTH预警";

	public static final String NODE_PROD_ID_YICHANG = "03cc6a0ab1af405baebffd271dd9f9d1";
	public static final String NODE_PROD_ID_ZAITU = "93783787889a46a49087fd271dd9f9d1";
	public static final String NODE_PROD_ID_GAOJING = "977943d49773432db4128cda73762118";
	public static final String NODE_PROD_ID_YUJING = "cf59dc06ece849a8975a8cda73762118";
	public static final String NODE_PROD_ID_OUTTIME = "f5ef56592539466095648cda73762118";
	public static final String NODE_PROD_ID_HUANJIETIME = "d42c4567ffdf481e980efd271dd9f9d1";
	
	public static final String HIGH_TYPE = "1";//高竞争类型
	public static final String FTTO_TYPE = "2";//FTTO类型
	public static final String FTTH_TYPE = "3";//HTTO类型
	public static final String HIGH_WARN_TYPE = "11";//高竞争预警类型
	public static final String FTTO_WARN_TYPE = "12";//FTTO预警类型
	public static final String FTTH_WARN_TYPE = "13";//HTTO预警类型
	
	public static final String INTERFACE_AREE_NAME = "申告地市ID";
	public static final String INTERFACE_CITY_ID = "市分公司ID";
	public static final String INTERFACE_SUBST_ID = "县分公司ID";
	public static final String INTERFACE_BRANCH_ID = "营销中心ID";
	
	/*
	 * 这里有几个字段是在接口监测开通督办的时候，要插入督办队列表的，不写在常量类里无法自动化。
	 */
	public static final String INTERFACE_OPEN_SUBS_CODE = "订单号";//订单号，督办时候用，插入督办队列表
	public static final String INTERFACE_OPEN_STATE = "订单状态"; //订单状态，督办时候用，插入督办队列表
	public static final String INTERFACE_OPEN_STEP_NAME = "工单环节"; //工单环节，督办时候用，插入督办队列表
	public static final String INTERFACE_OPEN_BEN_DATE = "工单开始时间"; //工单开始时间，督办时候用，插入督办队列表
	public static final String INTERFACE_OPEN_ORDER_TYPE = "工单类型";//工单类型，督办时候用，插入督办队列表
	
	/*
	 * 这里有几个字段是在接口监测保障督办的时候，要插入督办队列表的，不写在常量类里无法自动化。
	 */
	public static final String INTERFACE_SAVE_STEP_STATE = "工单状态"; //工单状态，督办时候用，插入督办队列表
	public static final String INTERFACE_SAVE_STEP_NAME = "当前环节"; //当前环节，督办时候用，插入督办队列表
	public static final String INTERFACE_SAVE_ACC_DATE = "受理时间"; //受理时间，督办时候用，插入督办队列表
	
	public static final String INTERFACE_SAVE_PLEASE_SELECT = "请选择";
}
