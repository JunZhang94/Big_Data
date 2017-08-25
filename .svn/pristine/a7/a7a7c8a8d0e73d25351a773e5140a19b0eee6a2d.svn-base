package com.jp.tic.utils.carinfo;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.web.context.support.ServletContextResource;

import sun.misc.BASE64Decoder;

import com.dragonsoft.adapter.service.QueryAdapterSend;
import com.dragonsoft.pci.exception.InvokeServiceException;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

public class CarInfoUtils {
	
	/**conditions的key为条件字段，value为对应值
	 * 成功返回数据格式如下：
<?xml version="1.0" encoding="UTF-8"?>
<RBSPMessage>
    <Version/>
    <ServiceID>S10-00000931</ServiceID>
    <TimeStamp/>
    <Validity/>
    <Security>
        <Signature Algorithm=""/>
        <CheckCode Algorithm=""/>
        <Encrypt/>
    </Security>
    <Method>
        <Name>Query</Name>
        <Items>
            <Item>
                <Value Type="arrayOfArrayOf_string">
                    <Row>
                        <Data>000</Data>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                    </Row>
                    <Row>
                        <Data>ZZL</Data>
                        <Data>ZZDZXZ</Data>
                        <Data>ZQYZL</Data>
                        <Data>SFZJZL</Data>
                        <Data>SFZH</Data>
                        <Data>RLZL</Data>
                        <Data>PL</Data>
                        <Data>LXFS</Data>
                        <Data>JDCZT</Data>
                        <Data>JDCSYR</Data>
                        <Data>HPZL</Data>
                        <Data>HPHM</Data>
                        <Data>HDZZL</Data>
                        <Data>HDZK</Data>
                        <Data>GL</Data>
                        <Data>FZJG</Data>
                        <Data>FDJXH</Data>
                        <Data>FDJH</Data>
                        <Data>DJZZXZ</Data>
                        <Data>CSYS</Data>
                        <Data>CLXH</Data>
                        <Data>CLSBDH</Data>
                        <Data>CLPP1</Data>
                        <Data>CCRQ</Data>
                        <Data>CCDJRQ</Data>
                    </Row>
                    <Row>
                        <Data>1545</Data>
                        <Data>广东省广州市越秀区水荫路52号大院之七105房</Data>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data/>
                        <Data>1595</Data>
                        <Data/>
                        <Data/>
                        <Data>北京神州汽车租赁有限公司广州分公司</Data>
                        <Data>02</Data>
                        <Data>粤AN133K</Data>
                        <Data/>
                        <Data/>
                        <Data>70</Data>
                        <Data>粤A</Data>
                        <Data>BJT</Data>
                        <Data>961164</Data>
                        <Data>广东省广州市越秀区水荫路52号大院之七105房</Data>
                        <Data>B/灰</Data>
                        <Data/>
                        <Data>LFV2A11G4C3336592</Data>
                        <Data>捷达牌</Data>
                        <Data/>
                        <Data/>
                    </Row>
                    
                </Value>
            </Item>
        </Items>
    </Method>
</RBSPMessage>
	*/
	public static String QueryCarInfoByHPHM(Map<String,String> conditions){
		String conditionStr="";
		for(String key:conditions.keySet()){
			if (conditionStr != "") {
				conditionStr += " and ";
			}
			conditionStr+=key+"='"+conditions.get(key)+"'";
		}
		//信息查询条件 
		//String condition = "HPHM='"+hphm+"'";  
		//strReturns即为返回的结果报文,为xml字符串 
		String strReturns = null; 
		try { 
			QueryAdapterSend adapter = new QueryAdapterSend(); 
		      /** 
			* 方法参数说明： 
			* QueryZZRK：在rbsp_setup.ini配置的服务名称。 
			* condition：信息查询条件 
			* userCardId：用户身份证号 
			* userName：用户名 
			* userDept：用户单位 
			*/  
			if (conditionStr != "") {
				strReturns = adapter.sendQuery("QueryCARINFO", conditionStr, "320107198210242616", "彭俊", "010000"); 
			}
		  
		    /**	注意，结果报文中有服务方的返回码，请参考《GA/T 739.2 公安请求服务平台技术规范 第2部分:
		    *	请求服务应用接口》中对结果报文的说明部分;同时参考《公安请求服务系统应用服务规范 第1部分：
		    *	数据查询服务》中对结果报文的说明部分
		    */
		    return strReturns;
		} catch (InvokeServiceException e) { 
		  //捕获到异常,此处示范获得错误码和错误信息 
		//有关错误码的说明请查看《GA/T 739.2 公安请求服务平台技术规范 第2部分:请求服务应用接口》 
		  e.printStackTrace(); 
		  e.getErrorCode();//获取错误代码 
		  e.getErrorMessage();//获取错误详细信息 
		}
		return null;
	}
	/**
	 * 加载驾驶人照片信息
	 */
	public static String loadCarOwnerPic(String sfzh, HttpServletRequest request) {
		String xmlBody = "<?xml version='1.0' encoding='utf-8'?>" +
		"<Request>" +
		    "<SenderID>KKZH</SenderID>" +
		    "<Method>" +
		        "<Name>Query_G_JDCJSR_ZP</Name>" +
		        "<Security Algorithm='' />" +
		    "</Method>" +
		    "<Items>" +
			    "<Item>" +
				  "<Name>Condition</Name>" +
				  "<Value Type='string'>" +
					"<Data> carinfos</Data>" +
				  "</Value>" +
				"</Item>" +
		        "<Item>" +
		            "<Name>RequiredItems</Name>" +
		            "<Value Type='arrayof_string'>" +
		                "<Data>ZP</Data>" +
		                "<Data>SFZMHM</Data>" +
		            "</Value>" +
		        "</Item>" +
		        "<Item>" +
		            "<Name>StartPosition</Name>" +
		            "<Value Type='long'>" +
		                "<Data>0</Data>" +
		            "</Value>" +
		        "</Item>" +
		        "<Item>" +
		            "<Name>MaxResultCount</Name>" +
		            "<Value Type='long'>" +
		                "<Data>1</Data>" +
		            "</Value>" +
		        "</Item>" +
		        "<Item>" +
		            "<Name>RequestResultCount</Name>" +
		            "<Value Type='boolean'>" +
		                "<Data>false</Data>" +
		            "</Value>" +
		        "</Item>" +
		    "</Items>" +
		"</Request>";
		String condition = "SFZMHM = '" + sfzh + "'";
		String xmlStr = xmlBody.replaceAll("carinfos", condition);
		byte[] xmlData = xmlStr.getBytes();   
		String urlStr = "http://10.235.36.11/EZSPservice/Query_G_JDCJSR_ZP";   
		InputStream input = null;   
		java.io.ByteArrayOutputStream out = null;   
		String nowTime = DateUtil.getCurrentDateTime();
		String timeStr = DateUtil.parseToString(nowTime, "yyyyMMddHHmmss");
		String imgStr = "";
		String imgFlag = "0";
		String imgName = "";
		try{   
			//获得到位置服务的链接   
			URL url = new URL(urlStr);   
			HttpURLConnection urlCon = (HttpURLConnection) url.openConnection();   
			//urlCon.connect();
			urlCon.setDoOutput(true);   
			urlCon.setDoInput(true);   
			urlCon.setRequestMethod("POST");
			urlCon.setUseCaches(false);   
			//将xml数据发送到位置服务   
			urlCon.setRequestProperty("Content-Type", "text/xml");   
			urlCon.setRequestProperty("Content-length",String.valueOf(xmlData.length));   
			urlCon.connect();
			DataOutputStream printout = new DataOutputStream(urlCon.getOutputStream());   
			printout.write(xmlData);   
			printout.flush();   
			printout.close();   
			input = urlCon.getInputStream();   
			byte[] rResult;   
			out = new java.io.ByteArrayOutputStream();   
			byte[] bufferByte = new byte[1024];   
			int l = -1;   
			int downloadSize = 0;   
			while ((l = input.read(bufferByte)) > -1) {   
			   downloadSize += l;   
			   out.write(bufferByte, 0, l);   
			   out.flush();   
			}   
			rResult = out.toByteArray();   
			String xml = new String(rResult);
			System.out.println("===========" + xml);
			if (StringUtil.checkStr(xml)) {
				Document doc = DocumentHelper.parseText(xml);  
				Element root = doc.getRootElement();
				Element Items = root.element("Method").element("Items");//.element("Item").element("Value");  
				List<Element> Rows = Items.elements("Item"); 
				List<Element> records = null;
				List<Element> datas = null;
				records = Rows.get(1).element("Value").element("Records").elements("Record");  
				String carNumStream = "";
				for (int j = 0; j < records.size(); j++) {
					datas = records.get(j).elements("Data");
					carNumStream = datas.get(0).getText();
				}
				File file= createAndGetDownloadFolder(request.getSession());
				imgName = timeStr + "_" + sfzh + ".jpg";
				imgStr = file.getPath()+File.separator + imgName;
				//imgStr = "E:\\apache-tomcat-6-business\\webapps\\iVMS_Business\\image\\download\\20141030220016赣G32856.jpg";
				DataOutputStream dataOut = null;
				if (StringUtil.checkStr(carNumStream)) {
					byte[] image = new BASE64Decoder().decodeBuffer(carNumStream);
					dataOut = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(imgStr)));
					dataOut.write(image);
				}
				imgFlag = "1";
				System.out.println(imgStr);
			}
			urlCon.disconnect();
		}   
		catch(Exception e){   
			imgFlag = "0";
			e.printStackTrace();   
		}   
		finally {   
			try {   
			     out.close();   
			     input.close();   
			}   
			catch (Exception ex) {   
				ex.printStackTrace();
			}   
		}  
		String fanwenUrl = "0";
		if (StringUtil.equals(imgFlag, "1")) {
			fanwenUrl = "http://"+request.getLocalAddr()+":"+request.getLocalPort() + "/Big_Data/image/download/" +imgName;
		}
		//fanwenUrl = "http://localhost:8080/a/20151203000311_44070119631001033X.jpg";
        return fanwenUrl;
	}
	/**
     * 初始化话文件对象
     * @param session 会话
     * @return 返回结果
     */
    public static File createAndGetDownloadFolder(HttpSession session){
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
}

	