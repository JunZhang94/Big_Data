/**
 * 
 */
package com.jp.tic.utils.lang;

import javax.xml.namespace.QName;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;

/**
 * @author tanxx
 * @date 2016-6-22
 * @version 1.0
 */
public class WSUtil {

	public static void main(String[] args) {
		String endpoint = "http://172.31.108.189:8080/zhvmp/services/RoleService?wsdl";
		String targetNamespace = "http://web.systemresecurity.zhvmp.jp.com";
		String method = "getAllRole";
		String result = WSUtil.WSCall(endpoint,targetNamespace,method,new Object[]{},new String[]{});
		System.out.println(result);
	}
	
	public static String WSCall(String endpoint,String targetNamespace,String method,Object[] params,String[] columns){
		String  result = null;
		 try {
            //以下都是套路 
             Service service = new Service();
             Call call = (Call) service.createCall();// 通过service创建call对象
             // 设置service所在URL
             call.setTargetEndpointAddress(endpoint);
             call.setOperationName(new QName(targetNamespace, method));// 域名URI
             //添加请求参数
             for(String obj:columns){
            	 call.addParameter(new QName(targetNamespace, obj),org.apache.axis.encoding.XMLType.XSD_STRING,javax.xml.rpc.ParameterMode.IN);
             }
             call.setUseSOAPAction(true);
             call.setReturnType(org.apache.axis.encoding.XMLType.SOAP_STRING); // 返回参数的类型
             call.setSOAPActionURI(targetNamespace + method); // 这个也要注意
             // 就是要加上要调用的方法getMobileCodeInfo,不然也会报错
             // 给方法传递参数，并且调用方法
             //String str = (String) call.invoke(new Object[] { "JP_admin","JP_admin",temp });
             result = (String) call.invoke(params);
            // System.out.println(result);
      }
      catch (Exception e) {
             System.err.println(e.toString());

      }
      return result;
	}
}
