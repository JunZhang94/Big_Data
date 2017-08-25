package com.jp.tic.system.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import jxl.Workbook;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.support.ServletContextResource;

import com.alibaba.fastjson.JSON;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.business.cartake.dao.HotRecodeDao;
import com.jp.tic.business.compareByTime.service.CompareByTimeService;
import com.jp.tic.business.oneCarManyNum.service.OneCarManyNumService;
import com.jp.tic.business.user.dao.UserDao;
import com.jp.tic.common.util.SpringApplicationContextUtils;
import com.jp.tic.system.dao.DictionaryDao;
import com.jp.tic.system.dao.ExcelExportDao;
import com.jp.tic.system.dao.SystemConfigDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.entity.ExportStatus;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.ExcelExportService;
import com.jp.tic.system.util.ExtPager;
import com.jp.tic.system.util.ZipUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

@Service("excelExportService")
@SuppressWarnings("unchecked")
@Scope("prototype")
public class ExcelExportServiceImpl implements ExcelExportService {
    
    private ApplicationContext ctx = null;
    
    @Autowired
    ExcelExportDao excelExportDao ;
    
    @Autowired
	private CarTakeService takeService;
    
    @Autowired
	private CarTypeSearchService carTypeSearchService;
    
    @Autowired
    private CompareByTimeService compareByTimeService;
    
    @Autowired
    private OneCarManyNumService oneCarManyNumService;
    
    @Autowired
	DictionaryService dictionaryService;
    
    @Autowired
	SystemConfigDao systemConfigDao;
    
    @Autowired
	private HotRecodeDao hotRecodeDao;
    
    @Autowired
	UserDao userDao;
    
    @Autowired
    private DictionaryDao dictionaryDao;
    
    public static int COUNT_PER_EXCEL = 2000;
    public static String EXPORT_ZIP_FILE = "export_zip_file";
    public static String EXCEL_PROCESSOR = "excel_processor";
    public static String EXCEL_HQL = "excel_hql";
    public static String EXCEL_SQL = "excel_sql";
    public static String EXCEL_DC = "excel_dc";
    public static String EXCEL_FILENAME = "excel_fileName";
    public static String EXCEL_DOWNLOAD_FOLDER = "content/resources/download";
    public static String AMOUNTS = "amounts";
    public static String EXCEL_EXPORTTYPE = "exportType";
    public static String TITLE_TEXTS = "title_texts";
    public static String TITLE_WITHS = "title_withs";
    public static String EXPORT_FLAG = "export_flag";
    public static String CONDITION_PARAM = "condition_param";
    
    public int exportCounts = 0; //统计导出的数据量
    
    private static GeneralCacheAdministrator acacheAdmin = new GeneralCacheAdministrator();
    
    public String endKey = "";
    
    public boolean pageFlag = false;
    
    @PostConstruct
    public void init(){
        if(ctx ==null){
            ctx = SpringApplicationContextUtils.getContext();
        }
    }

    /**
     * 采用JDBC sql同步导出
     * @param processorName
     * @param hql
     * @return 导出的文件
     */
    public void doExportSyncSQL(String processorName, OutputStream stream, String[] texts, int[] widths, List data, String exportFlag) {
        WritableWorkbook wb = null;
        try {
            init();
            BusinessExportService processor = (BusinessExportService)ctx.getBean(processorName);
            wb = Workbook.createWorkbook(stream);
            WritableSheet sheet = wb.createSheet("data", 0);
            Object[] dataSource = null;
            if (StringUtil.equals(exportFlag, "alarm")) {
            	dataSource = processor.exportAlarmDataSource(data);
            }
            if (StringUtil.equals(exportFlag, "control")) {
            	dataSource = processor.exportControlDataSource(data);
            }
            if (StringUtil.equals(exportFlag, "dictionary")) {
            	dataSource = processor.exportDictionaryDataSource(data);
            }
            if (StringUtil.equals(exportFlag, "quality")) {
            	dataSource = processor.exportDataQualitySource(data);
            }
            if (StringUtil.equals(exportFlag, "query")) {//导出3000条数据
            	dataSource = processor.exportQueryDataSource(data);
            }
            processor.process(sheet, data, texts, widths, dataSource);
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            close(wb,stream);
        }
    }
    
    /**
     * 异步导出查询数据
     * @param processorName 实例对象
     * @param param 查询条件
     * @param name 文件名称
     * @param userId 用户ID
     * @param httpSession 会话
     */
    public void doExportAsyncSQL(String processorName, Map<String, String> param, String name,Map<String, Object> userMap,HttpSession httpSession, String[] texts, int[] widths) {
        FileOutputStream stream = null;
        WritableWorkbook wb = null;
        ExcelExportService excelService = null;
        ExportStatus exportStatus = null;
        boolean isCancel = false;
        exportCounts = 0;
        try {
            init();
            Map<String,Object> exportData=null;
            BusinessExportService processor = (BusinessExportService)ctx.getBean(processorName);
            excelService = (ExcelExportService)ctx.getBean("excelExportService");
            ExcelExportPager pager = new ExcelExportPager();
            String fileName = this.getFileName(name, StringUtil.toString(userMap.get("USER_CODE")));
            exportStatus = excelService.saveAsynExportStatus(fileName, StringUtil.toString(userMap.get("USER_CODE")));
            pager.setLimit(COUNT_PER_EXCEL);
            pager.setPageSize(COUNT_PER_EXCEL);
            List<Map<String, String>> datas = null;
            List<CarTake> data = null;
            Object[] dataSource = null;
            List<File> files = new ArrayList<File>();
            String[] carNums = StringUtils.split(param.get("carNum"), ",");
            if (carNums != null && carNums.length > 1) {
            	for (int i = 0; i < carNums.length; i++) {
            		endKey = "";
            		pager.setStart(0);
            		int currentPage = pager.getPageNo();
            		param.put("carNum", carNums[i]);
            		int downCount=0;
            		do {
                        try{
                        	String jsonParam = JSON.toJSONString(param);
                        	/*按模块导出功能标示*/
                            String modelExportType=param.get("modelExportType");
                	    	if(StringUtil.checkStr(modelExportType)&&"compareByTime".equals(modelExportType)){
                	    		exportData=compareByTimeService.compareByTimeQueryForpages(jsonParam);
                	    	}else if(StringUtil.checkStr(modelExportType)&&"oneCarManyNum".equals(modelExportType)){
                	    		exportData=oneCarManyNumService.queryOneCarManyNumForPages(jsonParam);
                	    	}else{
                	    		exportData = carTypeSearchService.dealWithCarTypeData(jsonParam);
                	    	}
                         	if(null!=exportData){
                         		data=(List<CarTake>) exportData.get("rows");
                         		Long count=(Long) exportData.get("total");
                         		datas=transDatas4Export(data);
    	                        if (datas != null&&datas.size()>0) {
    	                        	downCount+=data.size();
    	                        	dataSource = processor.exportHistoryDataSource(datas);
    	                        	System.out.println("后台已导出=" + downCount + "条数据,总计需要导出="+count+"条");
    	                        	currentPage = pager.getPageNo();
    	                            // 处理当前页
    	                            String fileExeleName = "CAR_DATA_" + currentPage;
    	                            File file = File.createTempFile(fileExeleName, ".xls");
    	                            stream =  new FileOutputStream(file);
    	                            wb = Workbook.createWorkbook(stream);
    	                            WritableSheet sheet = wb.createSheet("data", 0);
    	                            processor.process(sheet, datas, texts, widths, dataSource);
    	                            files.add(file);
    	                            if(excelService.isUserCancelExport(exportStatus.getId())) {
    	                                isCancel=true;
    	                                break;
    	                             }
    	                             currentPage++;
    	                             pager.setStart((currentPage - 1) * COUNT_PER_EXCEL);
    	                             param.put("page.start", pager.getStart()+"");
    	                        }
                         	}
                        } finally {
                        	if (data != null) {
                        		close(wb,stream);
                        	}
                        }
                    } while (data != null && data.size() > 0 && !pageFlag);
            	}
            } else {
            	pager.setStart(0);
            	int currentPage = pager.getPageNo();
            	int downCount=0;
            	 do {
                     try{
                    	String jsonParam = JSON.toJSONString(param);
                    	/*按模块导出功能标示*/
                        String modelExportType=param.get("modelExportType");
            	    	if(StringUtil.checkStr(modelExportType)&&"compareByTime".equals(modelExportType)){
            	    		exportData=compareByTimeService.compareByTimeQueryForpages(jsonParam);
            	    	}else if(StringUtil.checkStr(modelExportType)&&"oneCarManyNum".equals(modelExportType)){
            	    		exportData=oneCarManyNumService.queryOneCarManyNumForPages(jsonParam);
            	    	}else{
            	    		exportData = carTypeSearchService.dealWithCarTypeData(jsonParam);
            	    	}
                     	if(null!=exportData){
                     		data=(List<CarTake>) exportData.get("rows");
                     		Long count=(Long) exportData.get("total");
                     		datas=transDatas4Export(data);
	                        if (datas != null&&datas.size()>0) {
	                        	downCount+=data.size();
	                        	dataSource = processor.exportHistoryDataSource(datas);
	                        	System.out.println("后台已导出=" + downCount + "条数据,总计需要导出="+count+"条");
	                        	currentPage = pager.getPageNo();
	                            // 处理当前页
	                            String fileExeleName = "CAR_DATA_" + currentPage;
	                            File file = File.createTempFile(fileExeleName, ".xls");
	                            stream =  new FileOutputStream(file);
	                            wb = Workbook.createWorkbook(stream);
	                            WritableSheet sheet = wb.createSheet("data", 0);
	                            processor.process(sheet, datas, texts, widths, dataSource);
	                            files.add(file);
	                            if(excelService.isUserCancelExport(exportStatus.getId())) {
	                                isCancel=true;
	                                break;
	                             }
	                             currentPage++;
	                             pager.setStart((currentPage - 1) * COUNT_PER_EXCEL);
	                             param.put("page.start", pager.getStart()+"");
	                        }
                     	}
                     } finally {
                    	 if (data != null) {
                     		close(wb,stream);
                     	}
                     }
                 } while (data != null && data.size() > 0 && !pageFlag);
			}
            moveExportFile(zipFiles(files),fileName,httpSession);
            exportStatus.setEndTime(new Date());
            if (isCancel) {
                exportStatus.setStatus(ExportStatus.CANCEL_STATUS);
            } else {
                exportStatus.setStatus(ExportStatus.END_STATUS);
            }
            excelService.updateExport(exportStatus);
        } catch (Exception e) {
            e.printStackTrace();
            exportStatus.setEndTime(new Date());
            exportStatus.setStatus(ExportStatus.ERROR_STATUS);
            exportStatus.setMsg("导出失败"+e.getMessage());
            excelService.updateExport(exportStatus);
        }
    }
    
    /**
     * 集合数据转换
     */
	public List<Map<String,String>> transDatas4Export(List<CarTake> newResult){
    	List <Map<String,String>> datas=new ArrayList<Map<String,String>>();
    	List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
		Map<String, String> dataMap = null;
		if (newResult != null && newResult.size() > 0) {
			for (CarTake carTake : newResult) {
				dataMap = new HashMap<String, String>();
				dataMap.put("XXBH", carTake.getXxbh());
				dataMap.put("HPHM", carTake.getHphm());
				dataMap.put("HPYSMC", findDictionaryName(carNumColorlist,carTake.getHpys()));
				dataMap.put("CLSD", StringUtil.toString(carTake.getClsd()));
				dataMap.put("KKMC", carTake.getKkmc());
				dataMap.put("FXMC", carTake.getFxmc());
				dataMap.put("DWMC", carTake.getDwmc());
				dataMap.put("JGSJ", DateUtil.parseToString(carTake.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
				dataMap.put("tx1", carTake.getTx1());
				datas.add(dataMap);
			}
		} 
		return datas;
    }
	
	/**
     * 获取到了对应的字典code对应的集合后，再根据值来获取对应的中文名称
     * @param list code对应的集合
     * @param value 值
     * @return 处理结果
     */
    public String findDictionaryName(List<EnumItem> list, String value) {
    	String dicName = "";
    	if (!StringUtil.checkStr(value)) {
    		return dicName;
    	}
    	if (list != null && list.size() > 0) {
			for (EnumItem en : list) {
				if (StringUtil.equals(en.getItemValue(), value)) {
					dicName = en.getItemName();
				}
			}
    	}
    	return dicName;
	}
    
    /**
     * 查询历史过车导出数据
     * @param param 查询参数
     * @param pageNo 起始位置
     * @return 查询结果
     * @throws Exception 异常
     */
    public List<Map<String, String>> loadConditionData(Map<String, String> param, int startRow, int pageSize, Map<String, Object> userMap) throws Exception {
    	PageEntity page = new PageEntity();
    	int pageNo = startRow / pageSize + 1;
    	page.setPageNo(pageNo);
		page.setPageSize(pageSize);
		String historyFlag = "";
		List<Map<String, String>> configList = systemConfigDao.findConfigByCode("historyFlag");
		if (configList != null && configList.size() > 0) {
			historyFlag = configList.get(0).get("VALUE");
		} else {
			historyFlag = "mounts"; //确实默认
		}
		SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date startDate = null;
		if (StringUtils.isNotEmpty(param.get("startTime"))) {
			startDate = formatter.parse(param.get("startTime"));
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(param.get("endTime"))) {
			endDate = formatter.parse(param.get("endTime"));
		}
		String[] mounts = StringUtils.split(param.get("mounts"), ",");
		List<String> mountList = new ArrayList<String>();
		if (mounts != null) {
			for (String mount : mounts) {
				mountList.add(mount);
			}
		}
		String[] carNums = StringUtils.split(param.get("carNum"), ",");
		List<String> carNumList = new ArrayList<String>();
		if(carNums != null ){
			for (String plateNo : carNums) {
				carNumList.add(plateNo);
			}
		}
		List<String> kyeStrs = null;
		Map<String, Object> dataMap= new HashMap<String, Object>();
		if (StringUtil.equals(startRow + "", "0")) {
			if (StringUtil.equals(historyFlag, "mounts")) {
				page = takeService.queryCarTake(startDate, endDate, null, carNumList, mountList, null,null,null,null, page);
			} else {
				page = takeService.queryCarTakeWithFxbh(startDate, endDate, null, carNumList, mountList, null,null,null,null, page);
			}
			if (page.getPageStartKeys().size() == 1) {
				pageFlag = true;
			}
			dataMap.put("startKeys", page.getPageStartKeys());
			acacheAdmin.putInCache("EXPORT_KEYS", dataMap);
		} else {
			try {
				kyeStrs = (List<String>)(((Map<String, Object> )acacheAdmin.getFromCache("EXPORT_KEYS", 3600)).get("startKeys"));
				int preSize = kyeStrs.size();
				page.setPageStartKeys(kyeStrs);
				page.goNext();
				page.goLast();
				boolean endKeyFlag = false;
				if (StringUtil.equals(page.getCurrentEndKey(), "*")) {
					endKeyFlag = true;
				}
				if (StringUtil.equals(historyFlag, "mounts")) {
					page = takeService.queryCarTake(startDate, endDate, mountList, carNumList, mountList, null,null,null,null, page);
				} else {
					page = takeService.queryCarTakeWithFxbh(startDate, endDate, mountList, carNumList, mountList, null,null,null,null, page);
				}
				int nowSize = page.getPageStartKeys().size();
				if (preSize == nowSize && endKeyFlag) {
					pageFlag = true;
				}
				dataMap.put("startKeys", page.getPageStartKeys());
				acacheAdmin.putInCache("EXPORT_KEYS", dataMap);
			} catch (Exception e) {
				int preSize = kyeStrs.size();
				boolean endKeyFlag = false;
				if (StringUtil.equals(page.getCurrentEndKey(), "*")) {
					endKeyFlag = true;
				}
				if (StringUtil.equals(historyFlag, "mounts")) {
					page = takeService.queryCarTake(startDate, endDate, mountList, carNumList, mountList, null,null,null,null, page);
				} else {
					page = takeService.queryCarTakeWithFxbh(startDate, endDate, mountList, carNumList, mountList, null,null,null,null, page);
				}
				int nowSize = page.getPageStartKeys().size();
				if (preSize == nowSize && endKeyFlag) {
					pageFlag = true;
				}
				dataMap.put("startKeys", page.getPageStartKeys());
				acacheAdmin.putInCache("EXPORT_KEYS", dataMap);
			}
		}
		List<Map<String, String>> hotRecodes = hotRecodeDao.queryHotRecodes(null);
		List<CarTake> filteTakes = new ArrayList<CarTake>();
		String roleId = userMap.get("ROLE_ID").toString();
		List<Map<String, String>> roleInfos = dictionaryDao.findRoleInfo(roleId);
		if (page != null && roleInfos != null && roleInfos != null && roleInfos.size() > 0 && !roleInfos.get(0).get("ROLE_NAME").contains("超级管理员")) {
			if (page.getResult() != null && page.getResult().size() > 0) {
				Date jgsjDate = null;
				String jgsjTime = "";
				String startTime = "";
				String endTime = ""; 
				for (int i = 0; i < page.getResult().size(); i++) {
					jgsjDate = page.getResult().get(i).getJgsj();
					jgsjTime = DateUtil.parseToString(jgsjDate, "yyyy-MM-dd HH:mm:ss");
					if (hotRecodes != null && hotRecodes.size() > 0) {
						for (Map<String, String> hotMap : hotRecodes) {
							startTime = hotMap.get("START_DATE");
							endTime = hotMap.get("END_DATE");
							int startFlag = DateUtil.getTwoTimeDay(startTime, jgsjTime);
							int endFlag = DateUtil.getTwoTimeDay(jgsjTime, endTime);
							if (StringUtil.equals(page.getResult().get(i).getHphm(), hotMap.get("CAR_NUM"))
									&& startFlag >= 0 && endFlag >= 0) {
								if (!StringUtil.checkStr(hotMap.get("KKBHS"))) {
									filteTakes.add(page.getResult().get(i));
								} else if (hotMap.get("KKBHS").indexOf(page.getResult().get(i).getKkbh()) != -1) {
									filteTakes.add(page.getResult().get(i));
								}
							}
						}
					}
				}
			}
			page.getResult().removeAll(filteTakes);
		}
		List<CarTake> datas = null;
		//if (!StringUtil.equals(endKey, "*") && !StringUtil.equals(endKey, "-")) {
		datas = page.getResult();
		//}
		endKey = page.getCurrentEndKey();
		List<Map<String, String>> results = this.copyDataToMap(datas);
		return results;
    }
    
    /**
	 * 过车市局整理
	 * @param searchParam 查询条件
	 * @param partIds 信息编号
	 * @return 处理结果
	 */
	public List<Map<String, String>> copyDataToMap(List<CarTake> datas) throws Exception {
		List<Map<String, String>> results = null;
		Map<String, String> dataMap = null;
		if (datas != null && datas.size() > 0) {
			results = new ArrayList<Map<String,String>>();
			for (CarTake carTake : datas) {
				dataMap = new HashMap<String, String>();
				dataMap.put("HPHM", carTake.getHphm());
				dataMap.put("HPYSMC", carTake.getHpysmc());
				dataMap.put("CLSD", StringUtil.toString(carTake.getClsd()));
				dataMap.put("KKMC", carTake.getKkmc());
				dataMap.put("FXMC", carTake.getFxmc());
				dataMap.put("DWMC", carTake.getDwmc());
				dataMap.put("JGSJ", DateUtil.parseToString(carTake.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
				dataMap.put("tx1", carTake.getTx1());
				results.add(dataMap);
			}
		}
		return results;
	}
	
    /**
     *  保存导出状态
     * @param fileName 文件名称
     * @param userCode 用户ID
     */
     public ExportStatus saveAsynExportStatus(String fileName, String userCode) {
    	 Map<String, String> param = new HashMap<String, String>();
         param.put("fileName", fileName);
         param.put("startTime", DateUtil.getCurrentDateTime());
         param.put("status", ExportStatus.PROCESSING_STATUS + "");
         param.put("type", ExportStatus.EXPORT_TYPE_ASYN + "");
         param.put("userId", userCode);
         String uniqueId = UUID.randomUUID() + "";
         param.put("uniqueId", uniqueId);
         excelExportDao.saveAsynExportStatus(param);
         ExportStatus exportStatus = new ExportStatus();
         exportStatus.setId(uniqueId);
         return exportStatus;
     }
     
     /**
      * 更新保存状态
      * @param exportStatus 状态信息对象
      */
     public void updateExport(ExportStatus exportStatus){
    	 excelExportDao.updateExport(exportStatus);
     }
     
     /**
   	  * 通过JDBC，sql查询出要导出的数据
   	  * @param sql 查询语句
   	  * @param start 开始位置
   	  * @param limit 结束位置
   	  * @return 返回结果
   	  */
   	 public List<Map<String, String>> loadPageDataSQL(String sql, int start, int limit) {
 		return excelExportDao.loadPageDataSQL(sql, start, limit);
 	 }
   	 
   	 /**
      * 是否取消导出
      * @param id 状态ID
      * @return true 取消  false 未取消
      */
     @Transactional
     public boolean isUserCancelExport(String id){
    	 List<Map<String, String>> datas = excelExportDao.getInfoById(id);
         if(StringUtil.toInteger(datas.get(0).get("STATUS")) == ExportStatus.CANCEL_STATUS){
             return true;
         }
         return false;
     }
    
    /**
     * 组装文件名称
     * @param name 文件命名
     * @param userID 用户ID
     * @return 组装结果
     */
    public String getFileName(String name,String userCode){
        return name+"_"+userCode+"_"+(new Date()).getTime()+".zip";
    }
    
    class ExcelExportPager extends ExtPager{
        @Override
        public void setPageSize(final int pageSize) {
            this.pageSize = pageSize;
        }
    }
    
    /**
     * 资源关闭
     * @param wb
     * @param stream
     */
    private void close(WritableWorkbook wb ,OutputStream stream){
        try{
            if(null!=wb){
                wb.write();
                wb.close();
            }
            if(null!=stream){
                stream.close();
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    /**
     * 打包
     * @param files
     */
    public File zipFiles(List<File> files){
        return ZipUtil.zipFiles(files,true);
    }
    
    /**
     * 移除导出文件
     * @param file 文件对象
     * @param fileName 文件名
     * @param session 会话
     * @throws Exception 
     */
    public void moveExportFile(File file,String fileName,HttpSession session) {
        File destfolder = createAndGetDownloadFolder(session);
        if(null != file){
            File newFile = new File(destfolder, fileName);
            if(!newFile.exists()){
                try {
                    FileUtils.copyFile(file, newFile);
                    file.delete();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    /**
     * 初始化话文件对象
     * @param session 会话
     * @return 返回结果
     */
    public File createAndGetDownloadFolder(HttpSession session){
        ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), EXCEL_DOWNLOAD_FOLDER);
        File folder =null;
        try {
            folder = contextResource.getFile();
            if (!folder.exists()) {
                folder.mkdirs();
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return folder;
    }
    
    /**
	 * 通过JDBC，sql查询出要导出的数据
	 * @param sql 查询语句
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadExportDataSQL(String sql) {
		List data = excelExportDao.loadExportDataSQL(sql);
		return data;
	}
	
	/**
	 * 删除导出状态
	 * @param id
	 * @param session
	 * @throws Exception
	 */
    @Transactional
    public void deleteExport(String id, HttpSession session) throws Exception {
        Map<String, String> status = excelExportDao.findExportItems(id).get(0);
        ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), EXCEL_DOWNLOAD_FOLDER+"/"+status.get("FILE_NAME"));
        contextResource.getFile().delete();
        excelExportDao.deleteExportItems(id);
    }
    
    /**
	 * 删除下载文件
	 * @param id
	 * @param session
	 * @throws Exception
	 */
    @Transactional
    public void deleteDownload(String id, HttpSession session) throws Exception {
        Map<String, String> status = excelExportDao.getImageStatusById(id).get(0);
        ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), "image/download/"+status.get("FILE_NAME"));
        contextResource.getFile().delete();
        excelExportDao.deleteDownloadItems(id);
    }
    
    /**
     * 查询导出状态
     * @param id
     * @throws Exception
     */
    public List<Map<String, String>> findExportItemsById(String id) throws Exception {
    	return excelExportDao.findExportItems(id);
    }
    
    /**
     * 更新导出状态
     * @param exportStatus 状态信息对象
     */
    public void updateExportStatus(Map<String, String> param) {
        excelExportDao.updateExportStatus(param);
    }
    
    /**
	 * 清空导出数据
	 * @param ids
	 * @param session
	 * @throws Exception
	 */
    @Transactional
    public void clearnExportInfo(String ids, HttpServletRequest request, HttpSession session) throws Exception {
    	String userCode = "";
    	if (StringUtil.checkStr(ids)) {
    		List<Map<String, String>> statuDatas = excelExportDao.findAllExportItems(ids);
    		this.deleteExportById(statuDatas, session);
    	} else {
    		Map<String, Object> userMap = userDao.getCurrentUser(request);
    		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
    			userCode = StringUtil.toString(userMap.get("USER_CODE"));
    		}
    		List<Map<String, String>> userDatas = excelExportDao.findDataByUserCode(userCode);
    		ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), EXCEL_DOWNLOAD_FOLDER);
    		File folder = null;
	        try {
	            folder = contextResource.getFile();
	            if (folder.exists()) {
	            	String[] tempList = folder.list();
	            	String path = folder.getPath();
	            	File temp = null;
	            	for (int i = 0; i < tempList.length; i++) {
	            		if (userDatas != null && userDatas.size() > 0) {
	            			for (Map<String, String> userDataMap : userDatas) {
								if (StringUtil.equals(userDataMap.get("FILE_NAME"), tempList[i])) {
									if (path.endsWith(File.separator)) {
										temp = new File(path + tempList[i]);
									} else {
										temp = new File(path + File.separator + tempList[i]);
									}
									if (temp.isFile()) {
										temp.delete();
									}
								}
	            			}
	            		}
	            	}
	            	//folder.delete();
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
    	}
        excelExportDao.clearnExportInfo(ids, userCode);
    }
    
    /**
	 * 清空图片下载数据
	 * @param ids
	 * @param session
	 * @throws Exception
	 */
    @Transactional
    public void clearnDownloadInfo(String ids, HttpServletRequest request, HttpSession session) throws Exception {
    	String userCode = "";
    	if (StringUtil.checkStr(ids)) {
    		List<Map<String, String>> statuDatas = excelExportDao.findAllDownloadItems(ids);
    		this.deleteDownladById(statuDatas, session);
    	} else {
    		Map<String, Object> userMap = userDao.getCurrentUser(request);
    		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
    			userCode = StringUtil.toString(userMap.get("USER_CODE"));
    		}
    		List<Map<String, String>> userDatas = excelExportDao.findDownloadDataByUserCode(userCode);
    		ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), "image/download");
    		File folder = null;
	        try {
	            folder = contextResource.getFile();
	            if (folder.exists()) {
	            	String[] tempList = folder.list();
	            	String path = folder.getPath();
	            	File temp = null;
	            	for (int i = 0; i < tempList.length; i++) {
	            		if (userDatas != null && userDatas.size() > 0) {
	            			for (Map<String, String> userDataMap : userDatas) {
								if (StringUtil.equals(userDataMap.get("FILE_NAME"), tempList[i])) {
									if (path.endsWith(File.separator)) {
										temp = new File(path + tempList[i]);
									} else {
										temp = new File(path + File.separator + tempList[i]);
									}
									if (temp.isFile()) {
										temp.delete();
									}
								}
	            			}
	            		}
	            	}
	            	//folder.delete();
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
    	}
        excelExportDao.clearnDownloadInfo(ids, userCode);
    }
    
    public void deleteExportById(List<Map<String, String>> statuDatas, HttpSession session) throws Exception {
    	if (statuDatas != null && statuDatas.size() > 0) {
    		for (Map<String, String> status : statuDatas) {
    			ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), EXCEL_DOWNLOAD_FOLDER+"/"+status.get("FILE_NAME"));
    			File folder = null;
    	        try {
    	            folder = contextResource.getFile();
    	            if (folder.exists()) {
    	            	folder.delete();
    	            }
    	        } catch (IOException e) {
    	            e.printStackTrace();
    	        }
    		}
    	}
    }
    
    /**
     * 根据ID删除图片下载数据
     * @param statuDatas
     * @param session
     * @throws Exception
     */
    public void deleteDownladById(List<Map<String, String>> statuDatas, HttpSession session) throws Exception {
    	if (statuDatas != null && statuDatas.size() > 0) {
    		for (Map<String, String> status : statuDatas) {
    			ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), "image/download/"+status.get("FILE_NAME"));
    			File folder = null;
    	        try {
    	            folder = contextResource.getFile();
    	            if (folder.exists()) {
    	            	folder.delete();
    	            }
    	        } catch (IOException e) {
    	            e.printStackTrace();
    	        }
    		}
    	}
    }
    
    /**
     * 保存图片下载状态
     * @param param 查询参数
     */
     public int saveAsynDownloadImage(Map<String, String> param) {
    	 return excelExportDao.saveAsynDownloadImage(param);
     }
     
     /**
      * 更新图片下载保存状态
      * @param param 状态信息对象
      */
     public void updateDownloadImag(Map<String, String> param) {
    	 excelExportDao.updateDownloadImag(param);
     }
     
     /**
      * 是否取消图片下载
      * @param id 状态ID
      * @return true 取消  false 未取消
      */
     @Transactional
     public boolean isUserCancelDownload(String id){
    	 List<Map<String, String>> datas = excelExportDao.getImageStatusById(id);
         if(StringUtil.toInteger(datas.get(0).get("STATUS")) == 3){
             return true;
         }
         return false;
     }
     
     /**
  	  * 根据ID取得下载状态表数据
  	  * @param id 主键
  	  * @return 查询结果
  	  */
  	 public List<Map<String, String>> getImageStatusById(String id) {
  		return excelExportDao.getImageStatusById(id);
  	 }
  	 
  	/**
      * 更新下载状态
      * @param exportStatus 状态信息对象
      */
     public void updateDownloadStatus(Map<String, String> param) {
    	 excelExportDao.updateDownloadStatus(param);
     }
}