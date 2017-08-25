package com.jp.tic.analyze.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.mail.Flags.Flag;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.tools.zip.ZipOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jp.tic.analyze.service.impl.DealProcessServiceImpl;
import com.jp.tic.business.alarm.service.FollowCarService;
import com.jp.tic.business.cartake.entity.CarTake;
import com.jp.tic.business.cartake.service.CarTakeWSService;
import com.jp.tic.business.cartake.service.impl.CarTakeWSServiceImpl;
import com.jp.tic.business.datacenter.service.TimeTaskManageService;
import com.jp.tic.business.user.service.UserService;
import com.jp.tic.common.zip.CompressHelper;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.impl.OrganizationServiceImpl;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/followCar")
public class FollowCarController extends AbstractController  {

	@Autowired
	private CarTakeWSService carTakeWSService;
	
	@Autowired
    private OrganizationServiceImpl organizationService;
	
	@Autowired
    private FollowCarService followCarService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TimeTaskManageService timeTaskManageService;
	
	@Autowired
	private DealProcessServiceImpl dealProcessServiceImpl;
	
	@Autowired
	private DealProcess dealProcess;
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public int taskId_p;
	public String userCode;
	public Date startDate_p;
	public Date endDate_p;
	public String carNum_p;
	public List<String> kkbhs_p;
	public int mintueOffset_p;
	public int kakouTimes_p;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/followCarPage")
	public String followCarLoad() {
		return "/analyze/follow-car-analysis";
	}
	
	/**
	 * 分页告警信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/followData")
	@ResponseBody
	public Object queryControlAlarmInfo(Model model, HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("carNum", "粤A12345");
		map.put("placeAndTime", "地点一：2014-08-22 15:39:20,地点2：2014-08-22 16:28:36,地点3：2014-08-28 10:28:36,地点4：2014-08-29 12:28:36");
		map.put("image1", "http://10.173.239.216:8080/Y/wp.jpg");
		map.put("image2", "http://10.173.239.216:8080/Y/111.jpg");
		map.put("image3", "http://10.173.239.216:8080/Y/wp.jpg");
		map.put("image4", "http://10.173.239.216:8080/Y/111.jpg");
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		results.add(map);
		int amounts = 1;
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 跟随车分析,查询数据库获取结果集
	 * @param model
	 * @param request 请求
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	@RequestMapping("/query/findFollowCarFromDb")
	@ResponseBody
	public Object findFollowCarFromDbInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = followCarService.findFollowCarFromDbInfo(searchParam);
		String[] imgs = null;
		List<Map<String, String>> filtes = new ArrayList<Map<String,String>>();
		Map<String, String> targetMap = new HashMap<String, String>();
		int followTimes = 0;
		int kkbhMounts = 0;
		String maxKkmcStr = "";
		if (results.size() > 0) {
			for (Map<String, String> map : results) {
				map.put("carNum", map.get("CAR_NUM"));
				map.put("placeAndTime", map.get("MOUNTS_STR"));
				if (map.get("MOUNTS_STR").split(";").length > kkbhMounts) {
					kkbhMounts = map.get("MOUNTS_STR").split(";").length;
					maxKkmcStr = map.get("MOUNTS_STR");
				}
				/*imgs = map.get("IMG").split(",");
				followTimes = imgs.length;
				if (followTimes > 0) {
					for (int i = 0; i < followTimes; i++) {
						map.put("image" + (i + 1), imgs[i]);
					}
				}*/
				map.put("followTimes", followTimes + "");
				if (StringUtil.equals(map.get("FOLLOW_CAR_NUM"), searchParam.get("carNum"))) {
					targetMap = map;
					filtes.add(map);
				}
			}
		}
		
		int limit = StringUtil.toInt(searchParam.get("page.limit"));
        int start = StringUtil.toInt(searchParam.get("page.start"));
        List<Map<String, String>> filteResults = new ArrayList<Map<String, String>>();
		if (results != null && results.size() > 0) {
        	int endLimits = start + limit;
        	if (results.size() > start && results.size() < (start + limit)) {
    			endLimits = results.size();
        	}
        	for (int i = start; i < endLimits; i++) {
        		filteResults.add(results.get(i));
        	}
        }
		targetMap.put("maxKkmcStr", maxKkmcStr);
		filteResults.removeAll(filtes);
		filteResults.add(0, targetMap);
		//第二次循环，对第一次清洗过的数据赋予图片对应
		if (filteResults.size() > 1) {
			String[] mounts = null;
			String[] targetMounts = null;
			List<Integer> valStr = new ArrayList<Integer>();
			boolean boo = false;
			boolean childboo = false;
			String[] imgsTemp = null;
			String[] mountsTemp = null;
			String mountStr = "";
			for (int i = 0; i < filteResults.size(); i++) {
				boo = false;
				if (targetMounts == null) {
					targetMounts = filteResults.get(0).get("MOUNTS_NUMBER").split(",");
				}
				mounts = filteResults.get(i).get("MOUNTS_NUMBER").split(",");
				for (int j = 0; j < targetMounts.length; j++) {
					childboo = false;
					if (targetMounts.length > mounts.length) {
						for (int m = 0; m < mounts.length; m++) {
							if (StringUtil.equals(targetMounts[j], mounts[m])) {
								childboo = true;
							}
						}
						if (!childboo) {
							valStr.add(j);
						}
						boo = false;
					} else {
						boo = true;
					}
				}
				if (boo) {
					imgs = filteResults.get(i).get("IMG").split(",");
					followTimes = imgs.length;
					for (int n = 0; n < followTimes; n++) {
						filteResults.get(i).put("image" + (n + 1), imgs[n]);
					}
				} else {
					imgs = filteResults.get(i).get("IMG").split(",");
					followTimes = imgs.length;
					for (int n = 0; n < followTimes; n++) {
						for (int str : valStr) {
							imgsTemp = this.add(str, "", imgs, imgs.length);
							mountsTemp = this.add(str, targetMounts[str], mounts, mounts.length);
						}
					}
					for (int j = 0; j < imgsTemp.length; j++) {
						if (imgsTemp[j] != null && !StringUtil.equals(imgsTemp[j], "null")) {
							filteResults.get(i).put("image" + (j + 1), imgsTemp[j]);
							if (StringUtil.checkStr(mountStr)) {
								mountStr += ",";
							}
							mountStr += mountsTemp[j];
						}
					}
					filteResults.get(i).put("MOUNTS_NUMBER", mountStr);
				}
			}
		}
		return ResponseUtils.sendList(filteResults, results.size());
	}
	
	public String[] add(int pos, String value, String[] array, int index) {
		String[] temp = null;
		if (index > array.length - 1) {
			temp = new String[array.length * 3 / 2];
			System.arraycopy(array, 0, temp, 0, array.length);
			array = temp;
		}
		for (int i = index; i > pos; i--) {
			array[i] = array[i - 1];
		}
//		array[pos] = value;
//		index++;
		return temp;
	}
	
	/**
	 * 提交跟随车分析任务
	 * @param model
	 * @param request 请求
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	@RequestMapping("/query/commitTask")
	@ResponseBody
	public Object commitTaskInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		Date startDate = null;
		String taskStartTime = DateUtil.getCurrentDateTime();
		searchParam.put("taskStartTime", taskStartTime);
		if (StringUtils.isEmpty(searchParam.get("mounts"))) {
			return null;
		}
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
			searchParam.put("userCode", StringUtil.toString(userMap.get("USER_CODE")));
		}
		if (StringUtils.isNotEmpty(searchParam.get("startTime"))) {
			String startTime = searchParam.get("startTime").replace("T", " ");
			searchParam.put("startTime", startTime);
			startDate = formatter.parse(startTime);
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(searchParam.get("endTime"))) {
			String endTime = searchParam.get("endTime").replace("T", " ");
			searchParam.put("endTime", endTime);
			endDate = formatter.parse(endTime);
		}
		String carNum = "";
		if (StringUtil.checkStr(searchParam.get("carFNum"))) {
			carNum = carNum + searchParam.get("carFNum");
		}
		if (StringUtil.checkStr(searchParam.get("carBNum"))) {
			carNum = carNum + searchParam.get("carBNum");
		}
		searchParam.put("carNum", carNum);
		int mintueOffset = 0;
		if (StringUtil.checkStr(searchParam.get("vilidTime"))) {
			mintueOffset = StringUtil.toInt(searchParam.get("vilidTime"));
		}
		String[] mounts = searchParam.get("mounts").split(",");
		String[] kkmcs = searchParam.get("kkmcs").split(",");
		List<String> kkbhs = new ArrayList<String>();
		String kkbhStr = "";
		String kkmcStr = "";
		for (int i = 0; i < mounts.length;  i++) {
			if (StringUtil.checkStr(mounts[i])) {
				kkbhs.add("440" + mounts[i]);
				if (StringUtil.checkStr(kkbhStr)) {
					kkbhStr += ",";
					kkmcStr += ",";
				}
				kkbhStr += "440" + mounts[i];
				kkmcStr += kkmcs[i];
			}
		}
		searchParam.put("kkbhs", kkbhStr);
		searchParam.put("kkmcs", kkmcStr);
		String nowTime = DateUtil.getCurrentTimeStr();
    	String[] nowDateTime = nowTime.substring(0, 8).split(":");
    	String nowDateMill = nowTime.substring(9, 12);
    	String taskId = nowDateTime[0] + nowDateTime[1] + nowDateTime[2] + nowDateMill;
    	searchParam.put("taskId", taskId);
		int kakouTimes = StringUtil.toInt(searchParam.get("kakouTimes"));
		int saveFlag = this.timeTaskManageService.commitTaskInfo(searchParam);
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("saveFlag", saveFlag + "");
		results.add(resultMap);
		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
			taskId_p = StringUtil.toInt(taskId);
			userCode = StringUtil.toString(userMap.get("USER_CODE"));
			startDate_p = startDate;
			endDate_p = endDate;
			carNum_p = carNum;
			kkbhs_p = kkbhs;
			mintueOffset_p = mintueOffset;
			kakouTimes_p = kakouTimes;
			new Thread(){
				 public void run(){
					 CarTakeWSService carTakeWSService_n = new CarTakeWSServiceImpl();
					 try {
						carTakeWSService_n.commitFollowTaskWS(taskId_p, userCode, startDate_p, 
								 endDate_p, carNum_p, kkbhs_p, mintueOffset_p, kakouTimes_p);
					 } catch (Exception e) {
						e.printStackTrace();
					 }
				 }
				}.start();
		} else {
			saveFlag = 0;
		}
		return ResponseUtils.sendList(results, saveFlag);
	}
	
	@Async
    public void testAsyncMethod(){
        try {
            //让程序暂停100秒，相当于执行一个很耗时的任务
            Thread.sleep(100000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

	/*
	  * 跟随车分析
	  */
	@RequestMapping("/query/findFollowCar")
	@ResponseBody
	public Object findFollowCarInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		Date startDate = null;
		if (StringUtils.isEmpty(searchParam.get("mounts"))) {
			return null;
		}
		if (StringUtils.isNotEmpty(searchParam.get("startTime"))) {
			String startTime = searchParam.get("startTime").replace("T", " ");
			startDate = formatter.parse(startTime);
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(searchParam.get("endTime"))) {
			String endTime = searchParam.get("endTime").replace("T", " ");
			endDate = formatter.parse(endTime);
		}
		String carNum = "";
		if (StringUtil.checkStr(searchParam.get("carFNum"))) {
			carNum = carNum + searchParam.get("carFNum");
		}
		if (StringUtil.checkStr(searchParam.get("carBNum"))) {
			carNum = carNum + searchParam.get("carBNum");
		}
		int mintueOffset = 0;
		if (StringUtil.checkStr(searchParam.get("vilidTime"))) {
			mintueOffset = StringUtil.toInt(searchParam.get("vilidTime"));
		}
		String[] mounts = searchParam.get("mounts").split(",");
		List<String> kkbhs = new ArrayList<String>();
		for (int i = 0; i < mounts.length;  i++) {
			if (StringUtil.checkStr(mounts[i])) {
				kkbhs.add("440" + mounts[i]);
			}
		}
		int kakouTimes = StringUtil.toInt(searchParam.get("kakouTimes"));
		Map<String,List<CarTake>> resultMap = carTakeWSService.getFollowingCarWithOuterWSNoHbase(startDate, endDate, carNum, kkbhs, mintueOffset, 0, kakouTimes); 
		Iterator it = resultMap.keySet().iterator();
		String key = null;
		List<CarTake> values = null;
		Map<String, String> map = null;
		String placeAndTime = "";
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		Map<String, String> targetMap = new HashMap<String, String>();
		targetMap.put("carNum", carNum);
		results.add(targetMap);
		List<CarTake> targetCarInfos = resultMap.get(carNum);
		int space = 0;
		int spaceAmount = 0;
		List<Map<String, String>> allMounts = organizationService.loadAllMountInfo();
		String mountName = "";
		while(it.hasNext()){
			spaceAmount = 0;
			placeAndTime = "";
			key = (String) it.next();
			values = resultMap.get(key);
			int i  = 0;
			if (values != null && values.size() > 0) {
				map = new HashMap<String, String>();
				map.put("carNum", key);
				for (int m = 0; m < values.size(); m++) {
					for (int j = 0; j < targetCarInfos.size(); j++) {
						if (StringUtil.equals(values.get(m).getKkbh(), targetCarInfos.get(j).getKkbh())) {
							space = j - (m + spaceAmount);
							break;
					}
					}
					spaceAmount = spaceAmount + space;
					i = i + 1 + space;
					map.put("image" + i, values.get(m).getTx());
					if (StringUtil.checkStr(placeAndTime)) {
						placeAndTime += ",";
					}
					for (Map<String, String> mountMap : allMounts) {
						if (StringUtil.equals(values.get(m).getKkbh(), mountMap.get("KKBH"))) {
							mountName =  mountMap.get("KKMC");
							//map.put("kkbhs",  mountMap.get("KKBH"));
							break;
						}
					}
					placeAndTime += mountName + " " + DateUtil.parseToString(new Date(values.get(m).getJgsj()), "yyyy-MM-dd HH:mm:ss");
				}
				map.put("placeAndTime", placeAndTime);
				
				if (StringUtil.equals(key, results.get(0).get("carNum"))) {
					for (int j = 1; j <= values.size(); j++) {
						results.get(0).put("image" + j, map.get("image" + j));
					}
					results.get(0).put("placeAndTime", placeAndTime);
				} else {
					results.add(map);
				}
			}
		}
		if (results.size() == 1 && StringUtil.equals(results.get(0).get("carNum"), carNum)) {
			results = new ArrayList<Map<String,String>>();
		}
		return ResponseUtils.sendList(results, results.size());
	}
	
	/**
	 * 跟随车分析的图片下载
	 * 这个是一个查询列表中的行中出现多张图片要下载的时候
	 * 分别是不通过的路径时的下载方法
	 * @author jzxie
	 * @date 2014-10-28 10:13am
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/downLoadFollowCarImages")
	@ResponseBody
	 public Object downLoadFollwCarPic(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		    Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		 
		    //这是获取session
		    request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
			Map<String, Object> userMap = (Map<String, Object>)(request.getSession().getAttribute(AbstractController.SESSION_USER));
			String userCode = userMap.get("USER_CODE").toString();//USER_NAME=超级管理员
			//生成UUID
			String uuid = UUID.randomUUID().toString();
			String uidSub =  uuid.substring(0,8)+uuid.substring(9,13)+uuid.substring(14,18)+uuid.substring(19,23)+uuid.substring(24); 
			//生成时间和格式化时间
			SimpleDateFormat time=new SimpleDateFormat("yyyyMMddHHmmss");
			String date =time.format(new Date()); 
			
			//获取tomcat的根目录webapp目录
			String downLoadUrl = this.getClass().getClassLoader().getResource("").getPath();
			//保存文件夹的拼接和创建
			String saveZipUrl = new File(downLoadUrl).getParentFile().getParentFile().getParentFile()+File.separator+userCode+File.separator+uidSub;
			
			String idstr = searchParam.get("idstr");//这里是前台传回来的图片的URL
			
			
			if (StringUtil.isNotBlank(idstr)) {

				    String[] imageUrls = idstr.trim().split(",");
					String httpUrl = null;
					String pictureId =null;
					File file= new File(saveZipUrl);
		        	if(!file.exists()){
		        		file.mkdirs();
		        	}
		        	//压缩保存的路径
		        	ZipOutputStream out = new ZipOutputStream(new FileOutputStream(saveZipUrl+File.separator+"analyCar_"+date+".zip"));
		        	InputStream in = null;
		        	CompressHelper helperZip = new CompressHelper();
					if(imageUrls.length>0){
						//下载地址和保存地址的操作
			            for(int i=0;i<imageUrls.length;i++){
			            			httpUrl = imageUrls[i];
			            			//保存之后的图片命名已经包括后缀名
			            			if(httpUrl.lastIndexOf(".jpg")==-1 && httpUrl.lastIndexOf(".JPG")==-1){
			            				httpUrl = httpUrl + ".jpg";
			            			} 
			            			httpUrl.replace("?", "_");
			                		pictureId = "analyCarTx"+i+httpUrl.substring(httpUrl.lastIndexOf("."));
			                		in = new URL(httpUrl).openConnection().getInputStream();
			                		String url =httpUrl.substring(httpUrl.lastIndexOf("/")+1,httpUrl.lastIndexOf("."))+"-"+pictureId;
			                		String urlnew = url.replace("?", "_");
			                		helperZip.zip(out, in,"Image/", urlnew);
			                		out.flush();		            		
			             }
			            in.close();
		                out.close();
					}

	        } 
			String fanwenUrl = "http://"+request.getLocalAddr()+":"+request.getLocalPort()+"/"+userCode+File.separator+uidSub+File.separator+"analyCar_"+date+".zip";
	        return fanwenUrl;
		 
	 }
	
	/**
	 * 跟随车分析 直接查询数据库
	 * @param model
	 * @param request
	 * @return 返回结果
	 * @throws Exception 异常
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/loadFollowInfo")
	@ResponseBody
	public Object loadFollowCarInfo(Model model, HttpServletRequest request) throws Exception {
		return null;
	}
}
