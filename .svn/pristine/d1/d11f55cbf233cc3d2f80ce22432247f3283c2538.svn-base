package com.jp.tic.business.cartake.service;

import javax.xml.namespace.QName;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.business.paas.ws.GateWS;
import com.jp.tic.utils.jsonUtil.JsonUtil;

public class GateWsTest extends BaseTest {

	@Autowired
	GateWS gateWS;
	
	public void testCallWs() {
        try {
               String endpoint = "http://172.31.108.189:8080/zhvmp/services/PublicInterfaceService?wsdl";
               String temp = "{'carId':'1234567890','longitude':'113','latitude':'22'}";
//               				  {"carId":"1234567890","latitude":"22","longitude":"113"}
               /*GPSLocation gps = new GPSLocation();
               gps.setCarId("1234456");
               gps.setLatitude("22.220900");
               gps.setLongitude("113.550200");
               temp = JsonUtil.objToJson(gps);*/

               //直接引用远程的wsdl文件
               //以下都是套路 
               Service service = new Service();
               Call call = (Call) service.createCall();// 通过service创建call对象
               // 设置service所在URL
               call.setTargetEndpointAddress(endpoint);
               call.setOperationName(new QName("http://web.videoclues.zhvmp.jp.com", "locateGPS"));// 域名URI
               // ,http://web.videoclues.zhvmp.jp.com
               // WSDL里面描述的接口名称
               call.addParameter(new QName("http://web.videoclues.zhvmp.jp.com", "username"),
            		   org.apache.axis.encoding.XMLType.XSD_STRING,
            		   javax.xml.rpc.ParameterMode.IN);
               call.addParameter(new QName("http://web.videoclues.zhvmp.jp.com", "password"),
            		   org.apache.axis.encoding.XMLType.XSD_STRING,
            		   javax.xml.rpc.ParameterMode.IN);
               call.addParameter(new QName("http://web.videoclues.zhvmp.jp.com", "gpsJson"),
            		   org.apache.axis.encoding.XMLType.XSD_STRING,
            		   javax.xml.rpc.ParameterMode.IN);
               call.setUseSOAPAction(true);
               call.setReturnType(org.apache.axis.encoding.XMLType.SOAP_STRING); // 返回参数的类型
               call.setSOAPActionURI("http://web.videoclues.zhvmp.jp.com" + "gpsJson"); // 这个也要注意
               // 就是要加上要调用的方法getMobileCodeInfo,不然也会报错
               // 给方法传递参数，并且调用方法
               String str = (String) call.invoke(new Object[] { "JP_admin","JP_admin",temp });
               // call.invoke(new Object[] { temp });
               System.out.println(str);
        }
        catch (Exception e) {
               System.err.println(e.toString());
        }
	}
}
