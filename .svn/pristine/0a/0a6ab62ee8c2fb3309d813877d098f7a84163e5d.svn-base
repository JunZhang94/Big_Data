package com.jp.tic.app.carSearch.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONObject;

import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.system.socket.IUpLoadService;
import com.jp.tic.system.socket.UpLoadService;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

public class CarFeatureUtils {
	
	public static String ip = "";
	public static String typePort = "";
	public static String comparePort = "";
	
	public static String uuid = "";
	
	static {
		try {
			Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
			if (!StringUtil.checkStr(ip)) {
				ip = MapGetUtils.getString(config, "image.server.ip");
			}
			if (!StringUtil.checkStr(typePort)) {
				typePort = MapGetUtils.getString(config, "image.server.type.port");
			}
			if (!StringUtil.checkStr(comparePort)) {
				comparePort = MapGetUtils.getString(config, "image.server.compare.port");
			}
			if (!StringUtil.checkStr(uuid)) {
				String tempId = UUID.randomUUID().toString();
				uuid = tempId.substring(0,8)+tempId.substring(9,13)+tempId.substring(14,18)+tempId.substring(19,23)+tempId.substring(24); 
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 源图片解析图片识别车辆特征数据，返回的JSON数据
	 * @return
	 */
	public String parseVehicleResults() {
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		String responseJson = "{" +
			"ErrCode: 0," +
		    "VehicleResult: [" +
		        "{" +
		            "DetectResult: {" +
		                "ErrCode: 0, Message: 'succ', Result: [" +
		                    "{" +
		                        "BodyRect: [" +
		                            "120," +
		                            "513," +
		                            "647," +
		                            "719" +
		                        "]," +
		                        "WinRect: [" +
		                            "120," +
		                            "513," +
		                            "647," +
		                            "719" +
		                        "]," +
		                        "FaceRect: [" +
		                            "120," +
		                            "513," +
		                            "647," +
		                            "719" +
		                        "]" +
		                    "}" +
		                "]" +
		            "}," +
		            "RecongnizeResult: {" +
		                "BrandResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "CarTypeCode: '100110011001'," +
		                            "CarTypedName: '大众-桑塔纳志俊-20042006'," +
		                            "Confi: 99" +
		                        "}" +
		                    "]" +
		                "}," +
		                "ColorResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "CarColorCode: 1," +
		                            "CarColorName: '黑色'," +
		                            "Confi: 81" +
		                        "}" +
		                    "]" +
		                "}," +
		                "MarkerResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "SunRects: [" +
		                                "{" +
		                                    "Rect: [" +
		                                        "120," +
		                                        "513," +
		                                        "647," +
		                                        "719" +
		                                    "]," +
		                                    "LeftOrRight: 0" +
		                                "}" +
		                            "]," +
		                            "DropRects: [" +
		                                "{" +
		                                    "Rect: [" +
		                                        "120," +
		                                        "513," +
		                                        "647," +
		                                        "719" +
		                                    "]" +
		                                "}" +
		                            "]," +
		                            "PaperRects: [" +
		                                "{" +
		                                    "Rect: [" +
		                                        "120," +
		                                        "513," +
		                                        "647," +
		                                        "719" +
		                                    "]" +
		                                "}" +
		                            "]," +
		                            "FlagRects: [" +
		                                "{" +
		                                    "Rect: [" +
		                                        "120," +
		                                        "513," +
		                                        "647," +
		                                        "719" +
		                                    "]" +
		                                "}" +
		                            "]," +
		                            "FlagLayout: 1" +
		                        "}" +
		                    "]" +
		                "}," +
		                "PlateResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "PlateColor: '白'," +
		                            "PlateColorCode: 4," +
		                            "PlateFlag: 1," +
		                            "PlateNumber: '京D05041'," +
		                            "PlateRect: [" +
		                                "215," +
		                                "637," +
		                                "178," +
		                                "47" +
		                            "]," +
		                            "PlateScore: 78," +
		                            "PlateType: 2," +
		                            "PicLight: 1" +
		                        "}" +
		                    "]" +
		                "}," +
		                "TypeResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "Confi: 94," +
		                            "TypeCode: 1," +
		                            "TypeName: '小型车'" +
		                        "}" +
		                    "]" +
		                "}" +
		            "}" +
		        "}," +
		        "{" +
		            "DetectResult: {" +
		                "ErrCode: 0," +
		                "Message: 'succ'," +
		                "Result: [" +
		                    "{" +
		                        "BodyRect: [" +
		                            "120," +
		                            "513," +
		                            "647," +
		                            "719" +
		                        "]," +
		                        "WinRect: [" +
		                            "120," +
		                            "513," +
		                            "647," +
		                            "719" +
		                        "]," +
		                        "FaceRect: [" +
		                            "120," +
		                            "513," +
		                            "647," +
		                            "719" +
		                        "]" +
		                    "}" +
		                "]" +
		            "}," +
		            "RecongnizeResult: {" +
		                "BrandResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "CarTypeCode: '100110011001'," +
		                            "CarTypedName: '大众-桑塔纳志俊-20042006'," +
		                            "Confi: 99" +
		                        "}" +
		                    "]" +
		                "}," +
		                "ColorResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "CarColorCode: 1," +
		                            "CarColorName: '黑色'," +
		                            "Confi: 81" +
		                        "}" +
		                    "]" +
		                "}," +
		                "MarkerResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "SunRects: [" +
		                                "{" +
		                                    "Rect: [" +
		                                        "120," +
		                                        "513," +
		                                        "647," +
		                                        "719" +
		                                    "]," +
		                                    "LeftOrRight: 0" +
		                                "}" +
		                            "]," +
		                            "DropRects: [" +
		                                "{" +
		                                    "Rect: [" +
		                                        "120," +
		                                        "513," +
		                                        "647," +
		                                        "719" +
		                                    "]" +
		                                "}" +
		                            "]," +
		                            "PaperRects: [" +
		                                "{" +
		                                    "Rect: [" +
		                                        "120," +
		                                        "513," +
		                                        "647," +
		                                        "719" +
		                                    "]" +
		                                "}" +
		                            "]," +
		                            "FlagRects: [" +
		                                "{" +
		                                    "Rect: [" +
		                                        "120," +
		                                        "513," +
		                                        "647," +
		                                        "719" +
		                                    "]" +
		                                "}" +
		                            "]," +
		                            "FlagLayout: 1" +
		                        "}" +
		                    "]" +
		                "}," +
		                "PlateResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "PlateColor: '白'," +
		                            "PlateColorCode: 4," +
		                            "PlateFlag: 1," +
		                            "PlateNumber: '京D05041'," +
		                            "PlateRect: [" +
		                                "215," +
		                                "637," +
		                                "178," +
		                                "47" +
		                            "]," +
		                            "PlateConfi: 78," +
		                            "PlateType: 2," +
		                            "PicLight: 1" +
		                        "}" +
		                    "]" +
		                "}," +
		                "TypeResult: {" +
		                    "ErrCode: 0," +
		                    "Message: 'succ'," +
		                    "Result: [" +
		                        "{" +
		                            "Confi: 94," +
		                            "TypeCode: 1," +
		                            "TypeName: '小型车'" +
		                        "}" +
		                    "]" +
		                "}" +
		            "}" +
		        "}" +
		    "]" +
		"}";
		
		return responseJson;
	}
	
	/**
	 * 调用图片识别打开服务返回json数据潘判读是否调用成功
	 * @return
	 */
	public boolean parseCompareOpenResponse(String openResponse) {
		/*String jsonStr = "{" +
				"Cmd: 'CompareOpen'," +
		    "CmdType: 'response'," +
		    "Seq:'uuid'," +
		    "Content: {" +
		        "ErrCode: '0'," +
		        "Msg: 'success'" +
		    "}" +
		"}";*/
		String jsonStr = openResponse;
		if (jsonStr.indexOf("success") > 0) {
			return true;
		}
		return false;
	}
	
	/**
	 * 调用图片二次识别服务返回json数据潘判读是否调用成功
	 * @return
	 */
	public String parseCompareInfoResponse(String conpareResponse) {
		/*String jsonStr = "{" +
		    "Cmd: 'CompareInfo'," +
		    "CmdType: 'response'," +
		    "Seq:'uuid'," +
		    "Content: {" +
		        "FileId: '1'," +
		        "Confi: '88'" +
		    "}" +
		"}";*/
		String jsonStr = conpareResponse;
		Map<String, Object> dataMap = JsonUtil.jsonToMap(jsonStr);
		JSONObject content = (JSONObject) dataMap.get("Content");
		String confi = StringUtil.toString(content.get("Confi"));
		//Map<String, String> contentMap = JsonUtil.jsonToMap(content);
		if (jsonStr.indexOf("-10") == -1) {
			return confi;
		}
		return "";
	}
	
	/**
	 * 调用图片关闭服务返回json数据潘判读是否调用成功
	 * @return
	 */
	public boolean parseCompareCloseResponse(String closeResponse) {
		/*String jsonStr = "{" +
				"Cmd: 'CompareClose'," +
		    "CmdType: 'response'," +
		    "Seq:'uuid'," +
		    "Content: {" +
		        "ErrCode: '0'," +
		        "Msg: 'success'" +
		    "}" +
		"}";*/
		String jsonStr = closeResponse;
		if (jsonStr.indexOf("success") > 0) {
			return true;
		}
		return false;
	}
	
	/**
	 * 调用wenservice接口，获取服务中的最新图片路径,
	 * @return 服务器返回的新的图片路径,
	 */
	public String  getServiceNewImgUrl(String carImg) {
		ImageUtils utils0 = new ImageUtils();
		//先对图片编码
		String imageStr = utils0.imageToBaseEncoder(carImg);
		UpLoadService service = new UpLoadService();
		IUpLoadService iService = service.getBasicHttpBindingIUpLoadService();
		String imgStr = iService.uploadFile(imageStr);
		return imgStr;
	}
	
	/**
	 * 上传主车图片到识别服务器
	 */
	public String uplowdSourceCarPic(String imgStr) {
		String newImgUrl = imgStr.replaceAll("\\\\", "/");
		/*Map<String, String> imgMap = new HashMap<String, String>();
		imgMap.put("FileId", "23232332");
		imgMap.put("FileName", "D:\\WCF\\1.jpg");
		imgMap.put("Priority", "1");
		imgMap.put("Mode", "0");
		imgMap.put("Version", "1010");
		imgMap.put("Detect", "[0,0,1600,1200]");
		imgMap.put("Marker", "true");
		imgMap.put("Face", "true");*/
		
		String imgJson = "{" +
		"\"Cmd\":\"carInfo\"," +
		"\"FileId\":\"23232332\"," +
        "\"FileName\":\"" + newImgUrl + "\"," +
        "\"Priority\":1," +
        "\"Mode\" : 0," +
        "\"Version\" : 1010," +
        "\"Detect\" : [0,0,1600,1200]," +
        "\"Marker\" :true," +
        "\"Face\":true" +
		"}";
			
		//String imgJson = JSON.toJSONString(imgMap);
		ImageUtils utils = new ImageUtils(ip, StringUtil.toInt(typePort), imgJson);
		String jsonStr = "";
		try {
			if (utils.createConnection()) {
				System.out.println("开始图片特征识别数据");
				jsonStr = utils.sendMessage("ErrCode");
				System.out.println("结束图片特征识别数据");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return jsonStr;
	}
	
	/**
	 * 主车图片车辆识别,调用打开服务
	 */
	public String compareOpenRequest(String imageUrl, String coordInfo, String selectRect, String userArea) {
		//打开图片对比服务，传送坐标数据,附带源车辆坐标数据
		/*String openImgJson = "{" +
				"Cmd: CompareOpen," +
				"CmdType: request," +
				"Seq:uuid," +
		    "Content: {" +
		        "FileId: 1," +
		        "FileName: " + imageUrl + "," +
		        "DetectArea: {" +
		        coordInfo
		        + "}," +
		        "UserArea: [" +
		            "{" +
		            "}" +
		        "]," +
		        "CompareArea: {" +
		            "NumArea: 2," +
		            selectRect
		        + "}" +
		    "}" +
		"}";*/
		String newStr = imageUrl.replaceAll("\\\\", "/");
		String openImgJson = "{\"Cmd\": \"CompareOpen\",\"CmdType\": \"request\",\"Seq\":\"" + uuid + "\",\"Content\": {" +
	        "\"FileId\": \"1\"," +
	        "\"FileName\": \"" + newStr + "\"," +
	        "\"FileBase64\":\"base64encode\"," +
	        "\"DetectArea\": " +
	        coordInfo + "," +
	        "\"UserArea\": [" +
	        	userArea +
	        "]," +
	        "\"CompareArea\": " +
	            selectRect +
	        "}" +
	    "}";
		
		//测试
		//String openImgJson = this.getFileString("D:/WCF/CompareOpenRequest.json");
		
		ImageUtils utils2 = new ImageUtils(ip, StringUtil.toInt(comparePort), openImgJson);
		System.out.println("开始调用打开图片服务");
		String jsonStr = utils2.sendMessage("ErrCode");
		System.out.println("结束调用打开图片服务");
		return jsonStr;
	}
	
	public String getFileString(String path) {
        String fileString;
        byte[] strBuffer = null;
        int    flen = 0;
        File xmlfile = new File(path);
        try {
            InputStream in = new FileInputStream(xmlfile);
            flen = (int)xmlfile.length();
            strBuffer = new byte[flen];
            in.read(strBuffer, 0, flen);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        fileString = new   String(strBuffer);      //构建String时，可用byte[]类型，
        return fileString;
    }
	
	/**
	 *  图片对比服务
	 */
	public String compareInfoRequest(String serverImgUrl, String coordInfo) {
		String newStr = serverImgUrl.replaceAll("\\\\", "/");
		String compareJson = "{" +
			"\"Cmd\": \"CompareInfo\"," +
		    "\"CmdType\": \"request\"," +
		    "\"Seq\":\"" + uuid + "\"," +
		    "\"Content\": {" +
		        "\"FileId\": \"1\"," +
		        "\"FileName\": \"" + newStr + "\"," +
		        "\"DetectArea\": " +
		        	coordInfo +
		    "}" +
		"}";
		ImageUtils utils3 = new ImageUtils(ip, StringUtil.toInt(comparePort), compareJson);
		System.out.println("开始调用图片比对服务");
		String jsonStr = utils3.sendMessage("CompareInfo");
		System.out.println("结束调用图片比对服务");
		return jsonStr;
	}
	
	/**
	 * 请求关闭比对服务
	 */
	public String compareCloseRequest(String serverImgUrl) {
		String newStr = serverImgUrl.replaceAll("\\\\", "/");
		String closeJson = "{" +
			"\"Cmd\": \"CompareClose\"," +
		    "\"CmdType\": \"request\"," +
		    "\"Seq\": \"" + uuid + "\"," +
		    "\"Content\": {" +
		        "\"FileId\": \"1\"," +
		        "\"FileName\": \"" + newStr + "\"" +
    		"}" +
		"}";
		ImageUtils utils4 = new ImageUtils(ip, StringUtil.toInt(comparePort), closeJson);
		System.out.println("开始调用图片关闭服务");
		String jsonStr = utils4.sendMessage("CompareClose");
		System.out.println("结束调用图片关闭服务");
		return jsonStr;
	}
}
