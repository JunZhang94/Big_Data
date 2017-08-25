package com.jp.tic.business.cartake.service.impl;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.cartake.dao.FullTextSearchDao;
import com.jp.tic.business.cartake.service.FullTextSearchService;
import com.jp.tic.business.faceRecognition.CLibrary;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.carinfo.CarInfoUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.view.RequestUtil;
import com.sun.jna.Native;
import com.sun.jna.Platform;
import com.sun.jna.ptr.FloatByReference;
import com.sun.jna.ptr.IntByReference;

@Service
public class FullTextSearchServiceImpl implements FullTextSearchService {

	@Autowired
	private FullTextSearchDao fullTextSearchDao;
	@Autowired
	DictionaryService dictionaryService;
	
	/**
	 * 查询本地车辆库信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryLoaclCarInfos(Map<String, String> param) throws Exception {
		return fullTextSearchDao.queryLoaclCarInfos(param);
	}
	
	/**
	 * 统计本地车辆库信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countLoaclCarInfos(Map<String, String> param) throws Exception {
		return fullTextSearchDao.countLoaclCarInfos(param);
	}

	@Override
	public Map<String,String> getCarOperatorFlag(HttpServletRequest request) {
		Map<String,String> resultMap=new HashMap<String,String>();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String operatorFlagText="否";
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String sfzh=searchParam.get("sfzh");
		String carUrl=searchParam.get("url");
		String hphm=searchParam.get("carNum");
		String jgsj=searchParam.get("jgsj");
		Date jgsjDate=new Date(Long.parseLong(jgsj));
		String jgsjStr = df.format(jgsjDate);
		String srcPicUrl= "http://"+request.getLocalAddr()+":"+request.getLocalPort() +"/Big_Data/image/download/test.jpg";
		carUrl=srcPicUrl;
	//	String srcPicUrl=CarInfoUtils.loadCarOwnerPic(sfzh, request);
		File cutFile= CarInfoUtils.createAndGetDownloadFolder(request.getSession());
		String cutPicName =jgsjStr+ "_" + hphm + ".jpg";
		String cutPicUrl=cutFile.getPath()+File.separator + cutPicName;
		int x=0;
		int y=20;
		int w=250;
		int h=280;
		this.cutOperatorPic(carUrl, cutPicUrl, x, y, w, h);
		String cutPicHttpUrl= "http://"+request.getLocalAddr()+":"+request.getLocalPort() + "/Big_Data/image/download/" +cutPicName;
		boolean operatorFlag=compareTwoPics(srcPicUrl,cutPicHttpUrl);
		if(operatorFlag){
			operatorFlagText="是";
		}
		operatorFlagText="是";
		resultMap.put("srcPicUrl", srcPicUrl);
		resultMap.put("carUrl", carUrl);
		resultMap.put("operatorFlag", operatorFlagText);
		//resultStr="<a href='#' onclick=\"showCarPlace('"+srcPicUrl+"','"+carUrl+"')\">" + operatorFlagText + "</a>";
		return resultMap;
	}
	/**
	 * 全景过车图片里抠出人脸图片
	 * @param srcUrl
	 * @param x
	 * @param y
	 * @param w
	 * @param h
	 * @return
	 */
	public String cutOperatorPic(String srcUrl,String targetUrl,int x, int y, int w, int h){
		String picUrl="";
		BufferedImage srcImg;
		try {
			srcImg = ImageIO.read(new URL(srcUrl));
			//BufferedImage targetImg=srcImg.getSubimage(0, 20, 250, 280);
			BufferedImage targetImg=srcImg.getSubimage(x, y, w, h);
		//	String outImgName="E:/pic/outPic.jpg";
			File outImageFile=new File(targetUrl);
			if(!outImageFile.exists()){
				outImageFile.createNewFile(); 
			}
			ImageIO.write(targetImg, "jpg",outImageFile );
			System.out.println("cut success!!!");
			picUrl=targetUrl;
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return picUrl;
	}

	@Override
	/**
	 * 人脸识别接口
	 */
	public boolean compareTwoPics(String srcPicUrl, String targetPicUrl) {System.out.println("into compareTwoPics");
		boolean result=false;
		int limitVal=0;
		String limitValStr=dictionaryService.getStoreValueByName("FaceCompareLimt","人脸匹配度阀值");
		if(limitValStr !=null){
			limitVal=Integer.parseInt(limitValStr);
		}
	//	在web server时，项目初始化时执行以下语句，整个项目运行期间只需要执行一次。
		String ipaddr="10.0.0.169";
		int usToken=1;
		String myfile1FileName="ligfTest";
		int chushi=CLibrary.INSTANCE.InitFacegeneLib();
		int fuwuqi=CLibrary.INSTANCE.FgiConnect(ipaddr ,6800,3000);//10.0.0.169
		IntByReference renwuid = new IntByReference();
		FloatByReference fengzhi = new FloatByReference();
		byte[] srcPicBytes=this.readPicStream(srcPicUrl);
		byte[] targetPicBytes=this.readPicStream(targetPicUrl);
	//	int ii = CLibrary.INSTANCE.FgiVerifyImage( "1", "sys_admin", myfile1FileName, null, photobyte1, photobyte1.length, photobyte2, photobyte2.length, 6, renwuid, fengzhi, 1);
		int compareVal = CLibrary.INSTANCE.FgiVerifyImage( 1, "sys_admin", myfile1FileName, null, srcPicBytes, srcPicBytes.length, targetPicBytes, targetPicBytes.length, 6, renwuid, fengzhi, 1);
		System.out.println( fengzhi.getValue() + " " + compareVal );
		if(compareVal>=limitVal){
			result=true;
		}
		return result;
	}
	
	private static byte[] readPicStream(String picUrl){
		try {
			BufferedInputStream inPutStream = new BufferedInputStream(new URL(picUrl).openConnection().getInputStream());
			ByteArrayOutputStream outstream = new ByteArrayOutputStream();
			byte[] buffer = new byte[1024]; // 用数据装
			int len = -1;
			while ((len = inPutStream.read(buffer)) != -1) {
				outstream.write(buffer, 0, len);
			}
			inPutStream.close();
			outstream.close();
			// 关闭流一定要记得。
			return outstream.toByteArray();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public static void main(String[] args){
		System.out.println("int");
		String path=CLibrary.class.getResource("/").getPath()+"Fgi.dll";
		System.out.println("path=="+path);
		path="com/Fgi/Fgi";
	//	Native.loadLibrary(path,CLibrary.class);
		CLibrary INSTANCE = (CLibrary)Native.loadLibrary(path,
	                       CLibrary.class);
	//	Native.loadLibrary((Platform.isWindows() ? "com/Fgi/Fgi.dll" : "c"),CLibrary.class);
		System.out.println("good");
		String srcPicUrl="http://localhost:8080/Big_Data/image/download/test.jpg";
		String targetPicUrl="http://localhost:8080/Big_Data/image/download/test.jpg";
		boolean result=false;
		int limitVal=0;
	//	在web server时，项目初始化时执行以下语句，整个项目运行期间只需要执行一次。
		String ipaddr="10.0.0.169";
		int usToken=1;
		String myfile1FileName="ligfTest";
		int chushi=CLibrary.INSTANCE.InitFacegeneLib();
		int fuwuqi=CLibrary.INSTANCE.FgiConnect(ipaddr ,6800,3000);//10.0.0.169
		IntByReference renwuid = new IntByReference();
		FloatByReference fengzhi = new FloatByReference();
		byte[] srcPicBytes=readPicStream(srcPicUrl);
		byte[] targetPicBytes=readPicStream(targetPicUrl);
	//	int ii = CLibrary.INSTANCE.FgiVerifyImage( "1", "sys_admin", myfile1FileName, null, photobyte1, photobyte1.length, photobyte2, photobyte2.length, 6, renwuid, fengzhi, 1);
		int compareVal = CLibrary.INSTANCE.FgiVerifyImage( 1, "sys_admin", myfile1FileName, null, srcPicBytes, srcPicBytes.length, targetPicBytes, targetPicBytes.length, 6, renwuid, fengzhi, 1);
		System.out.println( fengzhi.getValue() + " " + compareVal );
	}
}
