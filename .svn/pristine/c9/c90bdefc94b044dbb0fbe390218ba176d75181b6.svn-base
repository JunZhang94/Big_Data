package com.jp.tic.analyze.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.analyze.service.FollowCarLocalService;
import com.jp.tic.business.datacenter.service.TimeTaskManageService;
import com.jp.tic.business.user.service.UserService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/followCarLocal")
public class FollowCarLocalController extends AbstractController {
	
	@Autowired
	private CarTakeService carTakeService;
	@Autowired
	private FollowCarLocalService followCarLocalService;
	@Autowired
	private UserService userService;
	@Autowired
	private TimeTaskManageService timeTaskManageService;

	private ConcurrentLinkedQueue<CarTake> carDatas = new ConcurrentLinkedQueue<CarTake>();
	private Map<String, String> condtionParam = null;
	private String styleStr = "yyyy-MM-dd HH:mm:ss";
	//判断多线程是否允许完成
	private int runingFlag = 0;
	//oracle每次入库的数量
	private int dbCounts = 1000;
	private int allCounts = 0;
	private boolean finishFlag = false;
	
	private Map<String, String> param;
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/followLocalCarPage")
	public String followLocalCarLoad() {
		return "/analyze/follow-local-car-analysis";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/followCarResultPage")
	public String followCarResultLoad() {
		return "/analyze/follow-local-car-result";
	}
	
	/**
	 * 跟随车分析，本地系统分析
	 * @param model
	 * @param request
	 * @param response
	 * @return 返回结果
	 * @throws Exception 
	 */
	@RequestMapping("/followCarnAlyzeLocal")
	@ResponseBody
	public Object FollowCarnAlyzeLocal(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String startTimeStr = searchParam.get("startTime");
		String endTimeStr = searchParam.get("endTime");
		Date startDate = DateUtil.parseToDate(startTimeStr, styleStr);
		Date endDate = DateUtil.parseToDate(endTimeStr, styleStr);
		//输入的时间条件相差时间数,加一个小时
		int hours = (int)(endDate.getTime() - startDate.getTime()) / (1000*60*60) + 1;
		String startTimeTemp = null;
		String endTimeTemp = null;
		Date endDateTemp = null;
		Calendar cal = Calendar.getInstance();
		for (int i = 0; i < hours; i++) {
			//初始化运行标志
			runingFlag = 0;
			startTimeTemp = startTimeStr;
			endDateTemp = DateUtil.parseToDate(startTimeTemp, styleStr);
			cal.setTime(endDateTemp);
			cal.add(Calendar.HOUR_OF_DAY, 1);
			endDateTemp = cal.getTime();
			endTimeTemp = DateUtil.parseToString(endDateTemp, styleStr);
			if (endDate.getTime() - endDateTemp.getTime() < 60 * 60 * 1000) {
				endDateTemp = endDate;
			}
			searchParam.put("startTime", startTimeTemp);
			searchParam.put("endTime", endTimeTemp);
			condtionParam = searchParam;
			String[] kkbhs = searchParam.get("mounts").split(",");
			//界面严格判断跟随卡点必须大于或等于2个
			for (String kkbhStr : kkbhs) {
				condtionParam.put("kkbh", kkbhStr);
				QueryThread thread=new QueryThread(new Runnable() {
					@Override
					public void run() {
						String kkbh = condtionParam.get("kkbh");
						Date startDate = DateUtil.parseToDate(condtionParam.get("startTime"), styleStr);
						Date endDate = DateUtil.parseToDate(condtionParam.get("endTime"), styleStr);
						String hphm = condtionParam.get("carFNum");
						try {
							//限制一天的时间单位数据量内
							List<CarTake> carTacks = carTakeService.queryCarTake(kkbh, startDate, endDate, hphm, 100000, true);
							addDatasToLink(carTacks);
							countsFlag();
						} catch (Exception e) {
							log.error("",e);
						}
					}
				});
				thread.start();
			}
			while (true) {
				//判断读取每个小时的数据直到读完为止再接着读下一个小时的数据
				if (runingFlag == kkbhs.length) {
					break;
				}
				Thread.sleep(2000);
			}
		}
		finishFlag = true;
		return null;
	}
	
	public int saveCarDatas() {
		//把查询出来的数据录入数据库
		int saveCounts = 0;
		while (true) {
			List<CarTake> carTakes = this.getQueryDatas();
			saveCounts += followCarLocalService.saveCarDatas(carTakes);
			log.info("当前批量插入数据量" + saveCounts + "条");
			//说明数据已经完全入数据库
			if (finishFlag && carDatas.size() == 0) {
				break;
			}
		}
		return saveCounts;
	}
	
	public List<CarTake> getQueryDatas() {
		List<CarTake> carTakes = new ArrayList<CarTake>();
		if (carDatas.size() > 0) {
			int dataSize = carDatas.size();
			if (dbCounts > dataSize) {
				dbCounts = dataSize;
			}
			CarTake carTake;
			for (int i = 0; i < dbCounts; i++) {
				carTake = carDatas.poll();
				carTakes.add(carTake);
			}
		}
		return carTakes;
	}
	
	public synchronized void addDatasToLink(List<CarTake> datas) {
		allCounts += carDatas.size();
		carDatas.addAll(datas);
	}
	
	public synchronized void countsFlag() {
		runingFlag = runingFlag + 1;
	}
	
	private class QueryThread extends Thread{
		
		public QueryThread(Runnable runnable){
			super(runnable);
		}
		
		private boolean running=true;
		
		public boolean isRunning() {
			return running;
		}

		@Override
		public void run() {
			running=true;
			super.run();
			running=false;
		}
	}
	
	/**
	 * 提交跟随车分析任务
	 * @param model
	 * @param request 请求
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	@RequestMapping("/commitTask")
	@ResponseBody
	public Object commitTaskInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String taskStartTime = DateUtil.getCurrentDateTime();
		searchParam.put("taskStartTime", taskStartTime);
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
			searchParam.put("userCode", StringUtil.toString(userMap.get("USER_CODE")));
		}
		if (StringUtils.isNotEmpty(searchParam.get("startTime"))) {
			String startTime = searchParam.get("startTime").replace("T", " ");
			searchParam.put("startTime", startTime);
		}
		if (StringUtils.isNotEmpty(searchParam.get("endTime"))) {
			String endTime = searchParam.get("endTime").replace("T", " ");
			searchParam.put("endTime", endTime);
		}
		String carNum = "";
		if (StringUtil.checkStr(searchParam.get("carFNum"))) {
			carNum = carNum + searchParam.get("carFNum");
		}
		if (StringUtil.checkStr(searchParam.get("carBNum"))) {
			carNum = carNum + searchParam.get("carBNum");
		}
		searchParam.put("carNum", carNum);
		/*int mintueOffset = 0;
		if (StringUtil.checkStr(searchParam.get("vilidTime"))) {
			mintueOffset = StringUtil.toInt(searchParam.get("vilidTime"));
		}*/
		String nowTime = DateUtil.getCurrentTimeStr();
    	String[] nowDateTime = nowTime.substring(0, 8).split(":");
    	String nowDateMill = nowTime.substring(9, 12);
    	String taskId = nowDateTime[0] + nowDateTime[1] + nowDateTime[2] + nowDateMill;
    	searchParam.put("taskId", taskId);
		//int kakouTimes = StringUtil.toInt(searchParam.get("kakouTimes"));
		int saveFlag = this.timeTaskManageService.commitTaskInfo(searchParam);
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("saveFlag", saveFlag + "");
		results.add(resultMap);
		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
			param = searchParam;
			new Thread(){
				 public void run(){
					try {
						 List<Map<String, String>> resultDatas = followCarLocalService.alyzeLocalFollowCarInfo(param);
						 //因为会把本身找出来
						 if (resultDatas != null && resultDatas.size() > 1) {
							 saveDbFollowData(resultDatas);
							 param.put("havingFlag", "have");
							 updateFollowTask("success");
						 } else {
							 param.put("havingFlag", "none");
							 updateFollowTask("success");
						 }
					} catch (Exception e) {
						param.put("havingFlag", "none");
						updateFollowTask("fail");
						e.printStackTrace();
					}
				 }
				}.start();
		} else {
			saveFlag = 0;
		}
		return ResponseUtils.sendList(results, saveFlag);
	}
	
	/**
	 * 处理分析数据更新和
	 * @param flag 分析状态
	 * @return 更新条数
	 */
	public int updateFollowTask(String flag) {
		int updateFlag = followCarLocalService.updateFollowTask(param.get("taskId"), flag, param.get("havingFlag"));
		return updateFlag;
	}
	
	/**
	 * 分析数据入库
	 * @param resultDatas 分析结果数据
	 * @return 入库条数
	 */
	public int saveDbFollowData(List<Map<String, String>> resultDatas) {
		int updateFlag = followCarLocalService.saveDbFollowData(resultDatas, param);
		return updateFlag;
	}
}
