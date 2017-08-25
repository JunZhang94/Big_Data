package com.jp.tic.business.faceRecognition;


import javax.servlet.http.HttpServletRequest;

import org.apache.poi.util.ByteField;

import com.googlecode.javacv.jna.StringByReference;
import com.googlecode.javacv.jna.avformat.ByteIOContext.PointerByReference;
import com.sun.jna.Library;
import com.sun.jna.Native;
import com.sun.jna.Platform;
import com.sun.jna.Pointer;
import com.sun.jna.PointerType;
import com.sun.jna.Structure.ByReference;
import com.sun.jna.ptr.ByteByReference;
import com.sun.jna.ptr.FloatByReference;
import com.sun.jna.ptr.IntByReference;
import com.sun.jna.win32.StdCallLibrary.StdCallCallback;

public interface CLibrary extends Library {
	
	CLibrary INSTANCE = (CLibrary)
    Native.loadLibrary((Platform.isWindows() ? "Fgi" : "c"),
                       CLibrary.class);
	
    public int InitFacegeneLib();//初始化
    
    public void  ExitFacegeneLib ();//释放FGI动态库
    
    /***
     * 连接服务器 在已连接服务器的情况下, 必须先调用FgiDisConnect, 才能使用此接口连接另一个服务器
     * @param ipaddr   [in]服务器Ip地址
     * @param portNum  [in]服务器端口
     * @param timeout  [in]连接超时时间, 毫秒 
     * @return
     */
    public int FgiConnect(String ipaddr,int portNum,int timeout);
    
    /***
     * 断开连接,在连接前或连接后, 均可以通过 FgiSetReqBuffLen(), 调整 Fgi 同时向服务器发出的最大请求数. 
     * @return int是否断开服务器成功
     */
    public int  FgiDisConnect();
    
    /***
     * 用户登录,用户只需登录一次, 即能访问所有该用户拥有权限的数据库
     * @param userName  [in]用户名
     * @param password  [in]登录密码 
     * @param pUsToken  [out]登录用户Id 
     * @return 是否登录成功
     */
    public int FgiLogin(String userName,String password,IntByReference pUsToken);
    
    /** @brief	创建自定义的1-N比对比对涉及的相片由参数指定
	@param	usToken			登陆用户Id
	@param	customName		创建的自定义的1-N比对的别名
	@param	dbNum			自定义比对涉及的相片库数目
	@param	dbParams		FgiDbParams数组, 每个成员指定每个相片库的模板装载(搜索)条件
   */
   //public int FgiCreateCustomDb(int usToken,String customName,int dbNum,FgiCustomDbParams.ByReference dbParams);

   /** @brief	创建只用于1-N比对的自定义相片库
	自定义相片库的相片组成由参数指定
			
	@param	usToken			登陆用户Id
	@param	name			创建的自定义相片库的名称
	@param	description		描述
	@param	paramArray		FgiDbParams数组, 每个元素指定一种从现有相片库选取相片的方式
	@param	arrayLength		paramArray的元素个数
*/
   public int  FgiCreateCustomDb(int usToken,String name,String description,FgiCustomDbParams.ByReference paramArray,int arrayLength);

    
    /***
     * 搜索相似照片 在指定照片数据库中搜索相似照片, 函数在搜索完成后返回
     * @param usToken        [in]登陆用户Id
     * @param dbName         [in]数据库名称 
     * @param customId       [in]自定义任务编号
     * @param pEyesLocation  [in]照片的人脸眼睛坐标
     * @param probe          [in]比对照片(Probe)
     * @param size           [in]照片长度
     * @param algType		 [in]FR算法类型
     * @param pHdlTask       [out]搜索结果句柄
     * @param mode           [in]是否保存任务数据 _FG_NOT_SAVE   
     * @param customType     [in]自定义的类型值
     * @return
     */
    public int FgiIdentifyImage(int usToken,String dbName,String customId,String customType,Eyeslocation.ByReference pEyesLocation,byte[] probe,int size,int algType,PointerByReference pHdlTask,int mode);
    
    /***
     * 根据句柄获取数据 
     * @param pbr  指针的指针
     * @return  NULL 错误的句柄类型或空数据 
     */
    public Fitask.ByReference FgiGetData(PointerByReference pbr);
    
    /***
     * 释放Fgi接口创建的句柄 
     * @param handle 要释放的句柄
     */
    public void FgiCloseHandle(PointerByReference handle);
    
    /***
     * 获取照片内容 
     一次只能取一张照片 
     使用自定义照片编号查询时, 若编号对应多个照片, 将返回错误.
     这种情况下应改用fid进行查询.
     * @param usToken      [in]登录用户
     * @param dbName       [in]数据库名称
     * @param fid          [in]照片id, 0 或 有效值
     * @param customId     [in]自定义照片编号, NULL 或 有效字符串 
     * @param hRecordSet   [in]查询返回照片句柄(记录集合句柄)
     * @return
     */
    public int FgiGetPhoto(int usToken,String dbName,int fid,String customId,PointerByReference hRecordSet);
   
    /***
     * 获取列表元素 返回照片数据
     * @param hList        [in]列表句柄 
     * @param idx          [in]元素索引 0-based 
     * @param pSize        [out]返回元素大小或长度 
     * @return
     */
    public ByteByReference FgiGetField(PointerByReference hList,int idx,IntByReference pSize);
    

    /***
     * 创建空记录集合， 用于获取查询或其他操作返回结果 
     * @return
     */
    public PointerByReference FgiCreateRecordSet();
    
    /***
     * 执行照片验证任务 
       向服务器发送两张照片, 请求验证结果, 函数将在得到结果后返回
     * @param usToken      [in]登陆用户
     * @param dbName       [in]数据库名称
     * @param customId     [in]自定义任务编号, 若选择保存任务数据, 可通过此编号查找任务
     * @param probe        [in]probe照片, 选两张照片中质量好的充当probe 
     * @param probeSize    [in]照片长度
     * @param target       [in]target照片
     * @param targetSize   [in]照片长度
     * @param algType	   [in]FR算法类型
     * @param pTaskId      [out]返回保存的任务Id 若选择保存任务数据, 可通过此Id查找任务, 否则, 请传入NULL 
     * @param pScore       [out]返回验证分值 
     * @param mode         [in]是否保存任务数据
     * @param  @param mode        [in]自定义的类型值
     * @return             是否验证成功
     */
    public int FgiVerifyImage(int usToken,String dbName,String customId,String customType,byte[] probe,int probeSize,byte[] target,int targetSize,int algType,IntByReference pTaskId,FloatByReference pScore,int  mode);
    
    /***
     * 查询照片记录 
     * @param userToken    [in]登录用户
     * @param dbName       [in]数据库名称
     * @param hParams      [in]查询参数集合句柄 
     * @param hRecordSet   [in]返回结果集合的句柄 
     * @return
     */
    public int  FgiQueryPhotos(int userToken,String dbName,PointerByReference hParams,PointerByReference hRecordSet);
    
    /***
     * 向参数集合添加参数 
     * @param hParams       [in]查询参数集合句柄 
     * @param paramName     [in]参数字段名称 
     * @param operatorType  [in]过滤条件类型
     * FaceDb::OpEqual = 0, FaceDb::OpGreater = 1, FaceDb::OpLess = 2, FaceDb::OpTraverse = 3 
     * @param pValue        [in]参数内容
     * @param valueSize     [in]参数内容长度 
     * @return
     */
    public int  FgiAddParameter(PointerByReference hParams,String paramName,int operatorType,String pValue,int valueSize);
    public int  FgiAddParameter(PointerByReference hParams,String paramName,int operatorType,IntByReference pValue,int valueSize);
    public int  FgiAddParameter(PointerByReference hParams,String paramName,int operatorType,StringByReference pValue,int valueSize);
    public int  FgiAddParameter(PointerByReference hParams,String paramName,int operatorType,Pointer pValue,int valueSize);
    /***
     * 查询符合条件的照片记录数 
     * @param usToken       [in]登录用户 
     * @param dbName        [in]数据库名称
     * @param hParams       [in]查询参数集合句柄 
     * @param pTotalCnt     [out]符合查询条件的记录数  
     * @return    
     */
    
    /***
     * 创建空参数集合，填充参数后用于数据查询, 更新和删除等操作 
     */
    public PointerByReference FgiCreateParamSet();
    
    public int FgiCountPhotos(int usToken,String dbName,PointerByReference hParams,IntByReference pTotalCnt);
    
    /***
     * 查询照片验证任务记录总数 
     * @param usToken       [in]登录用户
     * @param dbName        [in]数据库名称
     * @param hParams       [in]查询参数集合句柄
     * @param pTotalCnt     [out]符合查询条件的记录数 
     * @return
     */
    public int  FgiCountVerifyTasks(int usToken,String dbName,PointerByReference hParams,IntByReference pTotalCnt);  
    		 

    /***
     * 设置数据库查询的分页参数 
       当访问大批量数据时, 设置每次返回多少记录, 返回第几页的记录
       注意: 对获取照片类型的接口, 例如 FgiGetPhoto, FgiGetIdentifyTaskPhoto, FgiGetVerifyTaskPhoto, 分页参数均会被自动设定为pageSize=1, pageIdx=1, 通过此接口设置的参数无效.
     * @param hRecordSet     [in]记录集合句柄 
     * @param pageSize       [in]每页记录数
     * @param pageIdx        [in]查询第几页 (1-based)
     * @return
     */
    public int  FgiSetQueryPaging(PointerByReference hRecordSet,int pageSize,int pageIdx);
    
    /***
     * 获取列表所包含的元素个数 
     * @param hList          [in]列表句柄 
     * @return               列表元素个数 
     */
    public int FgiGetFieldCount(PointerByReference hList);
    
    /***
     * 查询照片验证任务记录 
       按查询参数获取照片验证任务记录
     * @param usToken        [in]登录用户 
     * @param dbName         [in]数据库名称
     * @param hParams        [in]查询参数集合句柄 
     * @param hRecordSet     [in]查询返回记录集合句柄 
     * @return
     */
    public int  FgiQueryVerifyTasks(int usToken,String dbName,PointerByReference hParams,PointerByReference hRecordSet);
    /*// 登录
	unsigned int userToken;
	CPPUNIT_ASSERT_EQUAL(_FGE_SUCCESS, FgiLogin(_usName.c_str(), _password.c_str(), &userToken));

	// 查询参数
	FgiHandle hParams = FgiCreateParamSet();
	CPPUNIT_ASSERT(hParams != NULL);
	ret = FgiAddParameter(hParams, "自定义编号", FaceDb::OpEqual, customId.c_str(), customId.size());
	CPPUNIT_ASSERT_EQUAL(_FGE_SUCCESS, ret);


	// 查询验证结果
	FgiHandle hRecords = FgiCreateRecordSet();
	CPPUNIT_ASSERT(hRecords != NULL);
	CPPUNIT_ASSERT_EQUAL(_FGE_SUCCESS, FgiQueryVerifyTasks(userToken, dbName.c_str(), hParams, hRecords));
	CPPUNIT_ASSERT_EQUAL(cnt, FgiGetFieldCount(hRecords));
	for (int i = 0; i < cnt; ++i)
	{
		FgiVerifyTask *pTask = (FgiVerifyTask *)FgiGetField(hRecords, i);
		CPPUNIT_ASSERT_DOUBLES_EQUAL(score, pTask->score, 0.000001);
	}

	FgiCloseHandle(hParams);
	FgiCloseHandle(hRecords);
*/
   
   
    /***
     * 执行照片验证任务 
       向服务器发送两张照片, 请求验证结果, 
       函数将在发出请求后返回, 验证结果通过回调函数返回
     * @param usToken           [in]登陆用户
     * @param dbName            [in]数据库名称 
     * @param customId          [in]自定义任务编号, 若选择在数据库中保存数据, 可通过此编号查找任务 
     * @param probe             [in]probe照片, 照片质量越高越好 
     * @param probeSize         [in]照片长度
     * @param target            [in]target照片
     * @param targetSize        [in]照片长度
     * @param algType			[in]FR算法类型
     * @param callback          [in]任务完成回调函数
     * @param pUserData         [in]用户自定义数据, 将作为回调函数的参数传递 
     * @param mode              [in]是否保存任务数据 
     * @return
     */
    public int FgiVerifyImageAsync(int usToken,String dbName,String customId, byte[] probe,int probeSize,byte[] target,int targetSize,int algType,Ifgitaskcallback  callback,StringByReference pUserData,int mode);
    
    //回调函数接口
    interface Ifgitaskcallback extends StdCallCallback{
        /** Return whether to continue enumeration. */
    	String fgitaskcallbackfun(StringByReference pUserData,int nRetval,FloatByReference pValue);
    }
    
    /***
     * 获取照片验证任务照片 
     按任务Id或自定义任务编号获取任务相关照片,
     只需对 任务Id 或 自定义任务编号 其中之一传入有效值
     * @param usToken           [in]登录用户 
     * @param dbName            [in]数据库名称 
     * @param taksId            [in]任务Id, 0 或 有效值 
     * @param customId          [in]自定义任务编号, NULL 或 有效字符串
     * @param imageType         [in]照片类型 _FG_TASK_PROBE_PHOTO---Probe照片（0）, _FG_TASK_TARGET_PHOTO---Target照片 （1）
     * @param hRecordSet        [in]查询返回照片句柄(记录集合句柄) 
     * @return
     */
    public int FgiGetVerifyTaskPhoto(int usToken,String dbName,int taksId,String customId,int imageType,PointerByReference hRecordSet); 

    /***
     * 查询照片搜索任务记录总数
     * @param usToken           [in]登录用户 
     * @param dbName            [in]数据库名称
     * @param hParams           [in]查询参数集合句柄 
     * @param pTotalCnt         [out]符合查询条件的记录数
     * @return
     */
    public int FgiCountIdentifyTasks(int usToken,String dbName,PointerByReference hParams,IntByReference pTotalCnt);  

    /***
     * 查询照片搜索任务记录 
       按查询参数获取照片搜索任务记录
     * @param usToken           [in]登录用户 
     * @param dbName            [in]数据库名称
     * @param hParams           [in]查询参数集合句柄
     * @param hRecordSet        [in]查询返回记录集合句柄
     * @return
     */
    public int FgiQueryIdentifyTasks(int usToken,String dbName,PointerByReference hParams,PointerByReference hRecordSet);

    /***
     * 获取照片搜索任务Probe照片 
       按任务Id或自定义任务编号获取任务相关照片,
       只需对 任务Id 或 自定义任务编号 其中之一传入有效值
       使用自定义任务编号进行查询时, 若数据库内存在重复编号, 会导致返回错误
     * @param usToken           [in]登录用户
     * @param dbName            [in]数据库名称
     * @param taksId            [in]任务Id, 0 或 有效值
     * @param customId          [in]自定义任务编号, NULL 或 有效字符串 
     * @param hRecordSet        [in]查询返回照片句柄(记录集合句柄) 
     * @return
     */
    public int  FgiGetIdentifyTaskPhoto(int usToken,String dbName,int taksId,String customId,PointerByReference hRecordSet);

    /***
     * 获取用户可访问照片数据库列表
     * @param usToken           [in]登录用户
     * @param hDbList           [out]列表句柄指针
     * @return
     */
   public int FgiGetDbList(int usToken,PointerByReference hDbList);
   
 /**
  * 使用人脸识别工具建模
  * @param usToken  [in]登录用户
  * @param dbName   [in]数据库名称(比对库名称)
  * @param customId [in]自定义照片编号
  * @param personId [in]照片所属人员Id
  * @param desc 	[in]照片描述
  * @param pImage	[in]照片内容
  * @param size		[in]照片内容长度
  * @param pFid		[out]创建的照片记录Id
  * @return
  */
public int FgiAddPhoto(int usToken,String dbName,String customId,int personId,String desc,byte[] pImage,int size,IntByReference pFid);

/**
 * 获取表结构
 * @param usToken [in]登录用户
 * @param dbName  [in]数据库名称(比对库名称)
 * @param type	  [in]类型(1)
 * @return
 */
public PointerByReference  FgiGetSchema(int usToken,String dbName,int type);

/**
 * 创建一条记录
 * @param p [in]句柄
 * @return
 */
public PointerByReference  FgiCreateRecord(PointerByReference p);

/**
 * 设置指定句柄字段的值
 * @param p     [in]句柄
 * @param name	[in]字段名
 * @param value [in]字段值
 * @return
 */
public int FgiSetField_S(PointerByReference p,String name,String value);

/**
 * 添加人员信息
 * @param usToken [in]登录用户
 * @param dbName  [in]数据库名称(比对库名称)
 * @param hPerson [in]句柄
 * @param pId	  [out]照片id
 * @return
 */
public int FgiAddPerson(int usToken,String dbName,PointerByReference hPerson,IntByReference pId); 

/**
 * @param usToken [in]登录用户
 * @param dbName  [in]数据库名称(比对库名称)
 * @param hParams [in]查询参数集合
 * @return
 */
public int FgiDeletePhotos(int usToken,String dbName,PointerByReference hParams); 

/**
 *	usToken    [in]登录用户  
 *	dbName     [in]数据库名称  
 *	hParams    [in]查询参数集合句柄  
 *	pNumDeleted  [out]符合删除条件的记录数  
 * */
public int FgiDeletePersons(int usToken,String dbName,PointerByReference hPerson,IntByReference pNumDeleted);

/**
 *	usToken    [in]登录用户  
 *	dbName     [in]数据库名称  
 *	hParams    [in]查询参数集合句柄  
 *  hRecords   [in]查询到的记录  
 * */
public int FgiQueryPersons(int usToken,String dbName,PointerByReference hPerson,PointerByReference hRecords);

/** @brief	获取服务器当前引擎列表
   @param	nodeName	[in]计算节点名称, 目前无效, 请传入NULL
   @param	pHandle		[out]列表句柄指针
*/

public int FgiGetEngineList(String nodeName,PointerByReference pHandle);

/** @brief	获取引擎详细信息 关于引擎信息 @see FgiEngineStatus
  @param	nodeName		[in]计算节点名称, 目前无效, 请传入NULL	
  @param	engineName		[in]引擎名称, 请使用从FgiGetEngineList或FgiInstallEngine获取的名称	
  @param	pStatus			[out]引擎信息

*/

public int FgiGetEngineStatus(String nodeName,String engineName,FgiEngineStatus.ByReference pStatus);

/** @brief	卸载引擎
  向服务器发出卸载指定引擎的请求

  @param	nodeName		[in]计算节点名称, 目前无效, 请传入NULL
  @param	engineName		[in]引擎名称
*/

public int FgiUninstallEngine(String nodeName,String engineName);


}

