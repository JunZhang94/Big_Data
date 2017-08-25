package com.jp.tic.analyze.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import sun.misc.BASE64Decoder;

import com.alibaba.fastjson.JSON;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.app.carSearch.util.CarFeatureUtils;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/mapCarNum")
public class MapCarNumController extends AbstractController {
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
	SystemConfigService systemConfigService;
	
	@Autowired
	private CarTypeSearchService carTypeSearchService;
	
	
	private CarFeatureUtils carFeatureUtils = new CarFeatureUtils();
	
	public String optFlag = "";
	public String lastPage = "data";
	
	public List<CarTake> filteDatas = new ArrayList<CarTake>();
	List<List<CarTake>> mounteRsults = new ArrayList<List<CarTake>>();
	public volatile int counts = 0;
	public int dealCounts = 0;
	public String lock = "0";
	public volatile int faildCounts = 0;
	public int amounts = 0;
	public String serverImgUrl = "";
	public boolean exitBool = false;
	int realThreadNumber = 0;
	public boolean searchFlag = false;
	
	public int precent = 0; //完成百分比取值0-100之间

	@RequestMapping("/mapCarNumPage")
	public String mapCarNumPageLoad() throws Exception {
		return "/analyze/map-carNum-condition";
	}
	
	/**
	 * 加载按车型查询页面,加载图片展示列表
	 * @return 页面映射
	 */
	@RequestMapping("/mapCarNumResultPage")
	public String mapCarNumResultPageLoad() {
		return "/analyze/map-carNum-result";
	}
	
	public String coordInfoTemp = "";
	public String similatyTemp = "";
	public List<CarTake> carTakeTemsps = null;
	
	/**
	 * 车辆特征查询
	 * @return 查询结果
	 * @throws Exception 
	 */
	@RequestMapping("/checkImageStatus")
	@ResponseBody
	public Object checkImageStatus(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object>  datas = new HashMap<String, Object>();
		//没有数据的情况
		if (searchFlag && amounts == 0) {
			datas.put("percent", 1);
			datas.put("counts", 0);
			this.jsonResult.setData(datas);
		    this.jsonResult.setNeedAlert(false);
		    return jsonResult;
		}
		if (dealCounts == 0 || amounts == 0) {
			datas.put("percent", 0);
			this.jsonResult.setData(datas);
		    this.jsonResult.setNeedAlert(false);
		    return jsonResult;
		}
		float percent = (float) dealCounts / amounts;
		datas.put("percent", percent);
		if (dealCounts == amounts) {
			if (!exitBool) {
				try {
					exitBool = true;
					//关闭比对服务
					String closeResponse = carFeatureUtils.compareCloseRequest(serverImgUrl);
					//关闭对比服务返回结果数据
					carFeatureUtils.parseCompareCloseResponse(closeResponse);
					System.out.println("图片关闭服务完成并退出");
				} catch (Exception e) {
					System.out.println("图片关闭服务失败");
					e.printStackTrace();
				}
				System.out.println("后台任务已执行完成，页面将重新刷新数据！");
				datas.put("counts", filteDatas.size());
				this.jsonResult.setData(datas);
			    this.jsonResult.setNeedAlert(false);
			    return jsonResult;
			} else {
				System.out.println("图片分析已经完成,清理多余动作！");
				Map<String, Object>  tesmps = new HashMap<String, Object>();
				this.jsonResult.setData(tesmps);
			    this.jsonResult.setNeedAlert(false);
			    return jsonResult;
			}
			//return ResponseUtils.sendList(filteDatas, counts);
		} else {
			System.out.println("定时调度任务，获取后台执行情况,当前进度：" + percent);
			datas.put("percent", percent);
			this.jsonResult.setData(datas);
		    this.jsonResult.setNeedAlert(false);
		    return jsonResult;
		}
	}
	
	/**
	 * 加载最后分析完成的数据
	 * @return 查询结果
	 * @throws Exception 
	 */
	@RequestMapping("/loadLastDatas")
	@ResponseBody
	public Object loadLastDatas(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		Collections.sort(filteDatas, new Comparator<CarTake>() {
			public int compare(CarTake item1, CarTake item2) {
				return item2.getWfzt().compareTo(item1.getWfzt());
			}
		});
		List<CarTake> pageDatas = new ArrayList<CarTake>();
		int start = StringUtil.toInt(searchParam.get("page.start"));
		int limit = StringUtil.toInt(searchParam.get("page.limit"));
		if (counts > limit) {
			for (int i = start; i < limit + start; i++) {
				if (i >= counts) {
					break;
				}
				pageDatas.add(filteDatas.get(i));
			}
		} else {
			pageDatas.addAll(filteDatas);
		}
		return ResponseUtils.sendList(pageDatas, counts);
	}
	
	/**
	 * 车辆比对
	 * @return 查询结果
	 * @throws Exception 
	 */
	@RequestMapping("/mapSearchCar")
	@ResponseBody
	public Object mapSearchCarInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		//处理分页问题
		int start = StringUtil.toInt(searchParam.get("page.start"));
		if (start > 0) {
			return this.loadLastDatas(request, response);
		}
		//数据初始化
		exitBool = false;
		searchFlag = false;
		if (amounts != 0) {
			dealCounts = 0;
			amounts = 0;
			counts = 0;
		}
		if (filteDatas != null && filteDatas.size() > 0) {
			filteDatas = new ArrayList<CarTake>();
			mounteRsults = new ArrayList<List<CarTake>>();
		}
		
		serverImgUrl = searchParam.get("imgUrl");
		//图片自己识别的车辆坐标信息
		String coordInfo = searchParam.get("coordInfo");
		coordInfoTemp = coordInfo;
		//用户框选的坐标信息
		String selectRect = searchParam.get("rects");
		//用户框选车身区域
		String userArea = searchParam.get("userArea");
		//MultipartFile file = (MultipartFile) request.getFile("carNumExcel");
		boolean compareBoo = false;
		try {
			//图片对比,打开对比服务
			String openResponse = carFeatureUtils.compareOpenRequest(serverImgUrl, coordInfo, selectRect, userArea);
			//对比服务返回请求结果数据
			compareBoo = carFeatureUtils.parseCompareOpenResponse(openResponse);
		} catch (Exception e) {
			System.out.println("图片打开服务失败");
			e.printStackTrace();
		}
		//List<CarTake> filteDatas = new ArrayList<CarTake>();
		//int counts = 0;
		if (compareBoo) {
			//才用轮询的方式过滤出车辆特征数据，每次轮询N条，N=2000条为例
			//String limit = "2000";
			//String start = "0";
			List<CarTake> results = null;
			List<EnumItem> hpysDatas = dictionaryService.getEnumListByCode("LicPlateColor");
			List<EnumItem> carColorDatas = dictionaryService.getEnumListByCode("CarColor");
			String hpys = this.findDictionaryValue(hpysDatas, searchParam.get("hpys"));
			String carColor = this.findDictionaryValue(carColorDatas, searchParam.get("carColor"));
			String typeName = searchParam.get("carCategory");
			String typeValue = "";
			if (StringUtil.equals(typeName, "小型车")) {
				typeValue = "01";
			} else if (StringUtil.equals(typeName, "中型车")) {
				typeValue = "04";
			} else if (StringUtil.equals(typeName, "大型车")) {
				typeValue = "08,11";
			} else if (StringUtil.equals(typeName, "未知")) {
				typeValue = "15";
			}
			searchParam.put("hpys", hpys);
			searchParam.put("carColor", carColor);
			searchParam.put("carCategory", typeValue);
			String carBrand = searchParam.get("carBrand");
			String brand = "", type = "", year = "";
			if (StringUtil.checkStr(carBrand)) {
				String[] brands = carBrand.split("-");
				if (brands.length == 1) {
					brand = brands[0];
				} else if (brands.length == 2) {
					brand = brands[0];
					type = brands[0] + "_" + brands[1];
				} else if (brands.length == 3) {
					brand = brands[0];
					type = brands[0] + "_" + brands[1];
					year = brands[0] + "_" + brands[1]  + "_" + brands[2];
				}
			}
			if (StringUtil.checkStr(brand)) {
				searchParam.put("carBrand", brand);
			}
			if (StringUtil.checkStr(type)) {
				searchParam.put("carType", type);
			}
			if (StringUtil.checkStr(year)) {
				searchParam.put("carYear", year);
			}
			
			//采用测试方案（以车辆品牌来查询）
			Map<String, String> param = new HashMap<String, String>();
			if (StringUtil.checkStr(brand)) {
				param.put("carBrand", brand);
			}
			if (StringUtil.checkStr(type)) {
				param.put("carType", type);
			}
			if (StringUtil.checkStr(year)) {
				param.put("carYear", year);
			}
			param.put("startTime", searchParam.get("startTime"));
			param.put("endTime", searchParam.get("endTime"));
			param.put("page.start", "0");
			param.put("page.limit", "0");
			String jsonParam = JSON.toJSONString(param);//查询条件
			//先查询数据量
			Map<String, Object> mountsMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
			amounts = StringUtil.toInt(mountsMap.get("total"));
			searchFlag = true;
			System.out.println("本次查询数据量为：" + amounts);
			//暂时限制数据量，避免程序执行效率问题
			/*int limits = 1000;
			if (amounts > limits) {
				amounts = limits;
			}*/
			//根据数据量查询对应的所有数据
			param.put("page.limit", amounts + "");
			jsonParam = JSON.toJSONString(param);//查询条件
			Map<String, Object> resultMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
			results = (List<CarTake>) resultMap.get("rows");
			if (results != null && results.size() > 0) {
				//第一种情况，根据车牌号码查询出来的数据，如果连续3次都相似度都在90%以上，则后面的就不用再继续匹配了
				/*if (StringUtil.checkStr(searchParam.get("carNum")) &&
    				!StringUtil.equals(searchParam.get("carNum"), "-") &&
    				!StringUtil.equals(searchParam.get("carNum"), "—") &&
    				!StringUtil.equals(searchParam.get("carNum"), "无牌") &&
    				!StringUtil.equals(searchParam.get("carNum"), "车牌") &&
    				!StringUtil.equals(searchParam.get("carNum"), "无车牌") &&
    				!StringUtil.equals(searchParam.get("carNum"), "null")) {
						boolean boo = false;
						if (results.size() < 3) {
							boo = true;
						} else {
							for (CarTake carTake : results) {
								i += 1;
								System.out.println("第" + i + "次执行");
								//打开二次识别服务请求
								conpareResponse = carFeatureUtils.compareInfoRequest(carTake.getTx1(), coordInfo);
								//二次识别返回结果数据
								confi = carFeatureUtils.parseCompareInfoResponse(conpareResponse);
								if (StringUtil.toInt(confi) > 90) {
									reali += 1;
									//以连续三次识别率在百分之90以上为标准
									if (i == 3 && reali == 3) {
										boo = false;
										break;
									} else if (reali == 3 && i != 3) {
										boo = true;
										break;
									} else if (i == 3 && reali != 3) {
										boo = true;
										break;
									}
								}
							}
						}
						if (!boo) {
							for (CarTake takeTemp : results) {
								takeTemp.setWfzt(confi + "%");
								filteDatas.add(takeTemp);
								counts++;
							}
						} else {
							for (CarTake carTake : results) {
								i += 1;
								System.out.println("第" + i + "次执行");
								//打开二次识别服务请求
								conpareResponse = carFeatureUtils.compareInfoRequest(carTake.getTx1(), coordInfo);
								//二次识别返回结果数据
								confi = carFeatureUtils.parseCompareInfoResponse(conpareResponse);
								if (StringUtil.toInt(confi) >= StringUtil.toInt(searchParam.get("similaty"))) {
									//以违法状态代替相似度
									carTake.setWfzt(confi + "%");
									filteDatas.add(carTake);
									counts++;
								}
							}
						}
				} else {*/
					/*for (CarTake carTake : results) {
						i += 1;
						System.out.println("第" + i + "次执行");
						try {
							//打开二次识别服务请求
							conpareResponse = carFeatureUtils.compareInfoRequest(carTake.getTx1(), coordInfo);
							//二次识别返回结果数据
							confi = carFeatureUtils.parseCompareInfoResponse(conpareResponse);
						} catch (Exception e) {
							System.out.println("图片比对服务失败");
							e.printStackTrace();
						}
						if (StringUtil.toInt(confi) >= StringUtil.toInt(searchParam.get("similaty"))) {
							//以违法状态代替相似度
							carTake.setWfzt(confi + "%");
							filteDatas.add(carTake);
							counts++;
						}
					}*/
					
				//采用多线程方式去做图片比对服务
				//List<List<CarTake>> mounteRsults = new ArrayList<List<CarTake>>();
				Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
				//页面配置的线程数，实际执行线程加1个
				int threadNumber = StringUtil.toInt(MapGetUtils.getString(config, "image.server.thread.numbers"));
				List<CarTake> childList = new ArrayList<CarTake>();
				int oneThreadCounts = results.size() / threadNumber;
				for(int m = 0; m < results.size(); m++){
					childList.add(results.get(m));
					if (m != 0 && m%oneThreadCounts == 0) {
						mounteRsults.add(childList);
						childList = new ArrayList<CarTake>();
					}
				}
				if (childList != null && childList.size() > 0) {
					mounteRsults.add(childList);	
				}
				realThreadNumber = mounteRsults.size();
				//CountDownLatch countLatch=new CountDownLatch(realThreadNumber);//realThreadNumber个线程并发执行
				//CarTakeWorker carTakeWorker = null;
				similatyTemp = searchParam.get("similaty");
				new Thread(){
					 public void run(){
						 for (int j = 0; j < realThreadNumber; j++) {
							 carTakeTemsps = mounteRsults.get(j);
							 dealCompareInfo(carTakeTemsps, coordInfoTemp, similatyTemp);
						 }
					 }
				}.start();
					//carTakeWorker =new CarTakeWorker(mounteRsults.get(j), countLatch, coordInfo, searchParam.get("similaty"));  
					//carTakeWorker.start();
				//countLatch.await();//等待所有线程完成工作  
					
				//}
			}
			while (true) {
				//System.out.println("同步执行状态,当前处理情况:,已处理" + dealCounts + "条，总共：" + amounts + ",筛选出 " + counts);
				if (amounts != 0) {
					if (dealCounts == amounts) {
						if (counts <= 15) {
							System.out.println("后台分析完成，数据量总共小于15条，直接返回结果展示");
							//return ResponseUtils.sendList(new ArrayList<CarTake>(), counts);
							//return ResponseUtils.sendList(filteDatas, counts);
							return ResponseUtils.sendList(filteDatas, counts);
						}
					} else if (counts == 15) {
						System.out.println("后台分析完成，数据量总共等于15条，直接返回结果展示");
						return ResponseUtils.sendList(filteDatas, counts);
					}
				}
			}
		}
		return ResponseUtils.sendList(new ArrayList<CarTake>(), 0);
		//模拟分页效果
		/*List<CarTake> pageDatas = new ArrayList<CarTake>();
		int start = StringUtil.toInt(searchParam.get("page.start"));
		int limit = StringUtil.toInt(searchParam.get("page.limit"));
		if (counts > limit) {
			for (int i = start; i < limit + start; i++) {
				if (i >= counts) {
					break;
				}
				pageDatas.add(filteDatas.get(i));
			}
		} else {
			pageDatas.addAll(filteDatas);
		}*/
		//return ResponseUtils.sendList(filteDatas, counts);
	}
	
	//并发执行图片比对服务
	class CarTakeWorker extends Thread{  
		List<CarTake> results;
		String coordInfo;
		String similaty;
        CountDownLatch downlatch;  
        public CarTakeWorker(List<CarTake> results ,CountDownLatch latch, String coordInfo, String similaty){  
        	this.results = results;
            this.downlatch = latch;  
            this.coordInfo = coordInfo;
            this.similaty = similaty;
        }  
        public void run(){  
            iamgeDoWork();//工作
            downlatch.countDown();//完成工作，计数器减一  
  
        }  
        private void iamgeDoWork(){  
    		String conpareResponse = "";
			String confi = "0";
            try {  
            	for (CarTake carTake : results) {
        			try {
						//打开二次识别服务请求
						conpareResponse = carFeatureUtils.compareInfoRequest(carTake.getTx1(), coordInfo);
						//二次识别返回结果数据
						confi = carFeatureUtils.parseCompareInfoResponse(conpareResponse);
					} catch (Exception e) {
						System.out.println("图片比对服务失败");
						e.printStackTrace();
					}
					if (StringUtil.toInt(confi) >= StringUtil.toInt(similaty)) {
						//以违法状态代替相似度
						carTake.setWfzt(confi + "%");
						synchronized (filteDatas) {
							filteDatas.add(carTake);
							counts++;
							System.out.println("当前符合标准的数据量为：" + counts);
						}
					}
				}
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
    }  
	
	/**
	 * 执行图片比对服务
	 */
	public void dealCompareInfo(List<CarTake> results, String coordInfo, String similaty) {  
		String conpareResponse = "";
		String confi = "0";
        try {  
        	for (CarTake carTake : results) {
    			try {
					//打开二次识别服务请求
					conpareResponse = carFeatureUtils.compareInfoRequest(carTake.getTx1(), coordInfo);
					//二次识别返回结果数据
					confi = carFeatureUtils.parseCompareInfoResponse(conpareResponse);
					synchronized (lock) {
						dealCounts += 1;
						System.out.println("当前处理第" + dealCounts + "条记录,本次分析信息编号:" + carTake.getXxbh() + "车牌号码:" + carTake.getHphm());
					}
				} catch (Exception e) {
					faildCounts++;
					System.out.println("图片比对服务失败,信息编号为：" + carTake.getXxbh());
					e.printStackTrace();
				}
				if (StringUtil.toInt(confi) >= StringUtil.toInt(similaty)) {
					//违法状态代替相似度
					carTake.setWfzt(confi + "%");
					synchronized (filteDatas) {
						filteDatas.add(carTake);
						counts++;
						System.out.println("当前处理了：" + dealCounts + "条数据，处理异常导致失败：" + faildCounts + "条数据,其中符合标准的数据量为：" + counts);
					}
				}
			}
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }
	
	/**
     * 获取到了对应的字典code对应的集合后，再根据值来获取对应的值
     * @param list code对应的集合
     * @param value 值
     * @return 处理结果
     */
    public String findDictionaryValue(List<EnumItem> list, String value) {
    	String divValue = "";
    	if (!StringUtil.checkStr(value)) {
    		return divValue;
    	}
    	if (list != null && list.size() > 0) {
			for (EnumItem en : list) {
				if (StringUtil.equals(en.getItemName(), value)) {
					divValue = en.getItemValue();
					break;
				}
			}
    	}
    	return divValue;
	}
	
	/**
	 * 返回车辆识别数据
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/loadPicture")
	@ResponseBody
	public Object loadPictureInfo(HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String httpImg = searchParam.get("carImg");
		String tempPath = httpImg.split("http://"+request.getLocalAddr()+":"+request.getLocalPort() + request.getContextPath())[1];
		//获取tomcat的根目录webapp目录
		String classPath = this.getClass().getClassLoader().getResource("/").getPath();
		classPath = classPath.split("/WEB-INF/classes")[0];
		String carImg = classPath + tempPath;
		//MultipartFile file = (MultipartFile) request.getFile("carNumExcel");
		String imageUrl = "";
		try {
			imageUrl = carFeatureUtils.getServiceNewImgUrl(carImg);
		} catch (Exception e) {
			System.out.println("调动WSDL服务失败");
			e.printStackTrace();
		}
		String jsonStr = "";
		try {
			//调用源图片识别服务
			jsonStr = carFeatureUtils.uplowdSourceCarPic(imageUrl);
		} catch (Exception e) {
			System.out.println("调用车型识别失败");
			e.printStackTrace();
		}
		//源图片识别返回请求结果数据
		//String sjonStr = carFeatureUtils.parseVehicleResults();
		Map<String, String> detailMap = new HashMap<String, String>();
		detailMap.put("imgUrl", imageUrl);
		detailMap.put("sjonStr", jsonStr);
		/*detailMap.put("carNumStr", "粤A12345");
		detailMap.put("hpys", "2");
		detailMap.put("carCategory", "15");
		detailMap.put("carColor", "A");
		detailMap.put("carBrand", "奥迪_A1_20122014(低配版)");*/
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(detailMap);
		return jsonResult;
	}
	
	/**
	 * 保存款项的图片到tomcat指定图片存储位置
	 * @return 查询结果
	 * @throws Exception 
	 */
	@RequestMapping("/saveBigPicture")
	@ResponseBody
	public void saveBigPictureInfo(Model model, MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartFile file = (MultipartFile) request.getFile("pictureWin");
		InputStream inStream = file.getInputStream();
		//生成时间和格式化时间
		SimpleDateFormat time=new SimpleDateFormat("yyyyMMddHHmmss");
		String dateStr =time.format(new Date()); 
		//File imageFile= this.createAndGetDownloadFolder(request.getSession());
		ByteArrayOutputStream outStream = new ByteArrayOutputStream(); 
		//创建一个Buffer字符串 
		byte[] buffer = new byte[1024]; 
		//每次读取的字符串长度，如果为-1，代表全部读取完毕 
		int len = 0; 
		//使用一个输入流从buffer里把数据读取出来 
		while( (len=inStream.read(buffer)) != -1 ){ 
			//用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度 
			outStream.write(buffer, 0, len); 
		} 
		//关闭输入流 
		inStream.close(); 
		//把outStream里的数据写入内存 

		//得到图片的二进制数据，以二进制封装得到数据，具有通用性 
		byte[] data = outStream.toByteArray(); 
		//获取tomcat的根目录webapp目录
		String classPath = this.getClass().getClassLoader().getResource("").getPath();
		classPath = classPath.split("/WEB-INF/classes")[0];

		//new一个文件对象用来保存图片，默认保存当前工程根目录 
		File imageFile = new File(classPath + "/image/download/" + dateStr + ".jpg"); 
		File parentFile = imageFile.getParentFile();
		if (!parentFile.exists()) {
			parentFile.mkdirs();
        }
		//创建输出流 
		FileOutputStream fileOutStream = new FileOutputStream(imageFile); 
		//写入数据 
		fileOutStream .write(data); 
		response.reset();
		response.setContentType("text/html;charset=UTF-8");  
		PrintWriter out = response.getWriter();
		String fanwenUrl = "http://"+request.getLocalAddr()+":"+request.getLocalPort() + request.getContextPath() + "/image/download/" +dateStr+".jpg";
		out.print(fanwenUrl);
		out.flush();
		out.close();
	}
	
	/**
	 * 保存框选的图片到tomcat指定图片存储位置
	 * @return 查询结果
	 * @throws Exception 
	 */
	@RequestMapping("/saveSmallPicture")
	@ResponseBody
	public Object saveSmallPictureInfo(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String imgStr = searchParam.get("smallImg");
		BASE64Decoder decoder = new BASE64Decoder();
		String uuid = UUID.randomUUID().toString();
		String uidSub =  uuid.substring(0,8)+uuid.substring(9,13)+uuid.substring(14,18)+uuid.substring(19,23)+uuid.substring(24); 
		try {
			// Base64解码
			byte[] b = decoder.decodeBuffer(imgStr);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {// 调整异常数据
					b[i] += 256;
				}
			}
			// 生成jpeg图片
			File file= this.createAndGetDownloadFolder(request.getSession());
			String imgName = file.getPath()+File.separator + uidSub + ".jpg";
			String imgFilePath = imgName;// 新生成的图片
			OutputStream out = new FileOutputStream(imgFilePath);
			out.write(b);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		String fanwenUrl = "http://"+request.getLocalAddr()+":"+request.getLocalPort() + request.getContextPath() + "/image/download/" + uidSub +".jpg";
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(fanwenUrl);
		return jsonResult;
	}
	
	/**
     * 初始化话文件对象
     * @param session 会话
     * @return 返回结果
     */
    public File createAndGetDownloadFolder(HttpSession session){
        ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), "image/download");
        File folder =null;
        try {
            folder = contextResource.getFile();
            if (!folder.exists()) {
                folder.mkdirs();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return folder;
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
}
