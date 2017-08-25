package com.jp.tic.common.net.ws;

import java.util.Date;
import java.util.List;

import javax.xml.namespace.QName;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.ser.BeanDeserializerFactory;
import org.apache.axis.encoding.ser.BeanSerializerFactory;

public class SimpleAxisClient {
	private String endPoint;
	
	public SimpleAxisClient(String endPoint){
		this.endPoint=endPoint;
	}
	
	public Object send(String methodName,String[] names,Object[] params){
		return send(null, methodName, names, params,5000);
	}
	
	public Object send(String nameSpace, String methodName,String[] names,Object[] params){
		return send(nameSpace, methodName, names, params, 5000);
	}
	
	public Object send(String methodName,String[] names,Object[] params,int timeout){
		return send(null, methodName, names, params, timeout);
	}
	
	public Object send(String nameSpace, String methodName,String[] names,Object[] params,int timeout){
		try{
			Service service = new Service();
			Call call = (org.apache.axis.client.Call) service.createCall();
			call.setTimeout(new Integer(timeout));

			call.setTargetEndpointAddress(endPoint);
			if(nameSpace==null||"".equals(nameSpace)){
				call.setOperationName(methodName);
			}
			else{
				call.setOperationName(new QName(nameSpace, methodName));
			}
			
			for(int i=0;i<names.length;i++){
				call.addParameter(names[i], getParamType(params[i]),javax.xml.rpc.ParameterMode.IN);
			}
			
			QName qn= new QName("urn:GenCheGuanLianService", "stringArray");
//			call.registerTypeMapping(List.class, qn, new BeanSerializerFactory(List.class, qn), 
//                    new BeanDeserializerFactory(List.class, qn));
			call.registerTypeMapping(String[].class, qn, new BeanSerializerFactory(String[].class, qn), 
                    new BeanDeserializerFactory(String[].class, qn));

			
			//call.setReturnType(org.apache.axis.encoding.XMLType.XSD_ANY);
			call.setReturnType(org.apache.axis.encoding.XMLType.XSD_STRING);
			//call.setReturnType(org.apache.axis.encoding.XMLType.SOAP_ARRAY);

			Object result=call.invoke(params);
			System.out.println("调用服务成功！");
			return result;
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println("调用服务失败！！！");
		}
		return null;
	}
	
	@SuppressWarnings("unchecked")
	private javax.xml.namespace.QName getParamType(Object param){
		if(param instanceof String){
			return org.apache.axis.encoding.XMLType.XSD_STRING;
		}
		if(param instanceof Integer||param instanceof Short){
			return org.apache.axis.encoding.XMLType.XSD_INTEGER;
		}
		if(param instanceof Long){
			return org.apache.axis.encoding.XMLType.XSD_LONG;
		}
		if(param instanceof Double){
			return org.apache.axis.encoding.XMLType.XSD_DOUBLE;
		}
		if(param instanceof Float){
			return org.apache.axis.encoding.XMLType.XSD_FLOAT;
		}
		if(param instanceof Date){
			return org.apache.axis.encoding.XMLType.XSD_DATE;
		}
		if(param instanceof Object[]){
			return new QName("urn:GenCheGuanLianService", "stringArray");
			//return new QName("http://hbase.com/", "stringArray");
			//return new QName("http://jaxb.dev.java.net/array", "stringArray");
			//return new QName("http://jaxb.dev.java.net/array", "http://172.31.100.236:8089/HbaseJPService/GenCheGuanLianPort?xsd=1");
			//return org.apache.axis.encoding.XMLType.SOAP_ARRAY;
		}
		if(param instanceof List){
			return new QName("urn:GenCheGuanLianService", "stringArray");
			//return org.apache.axis.encoding.XMLType.SOAP_ARRAY;
		}
		return org.apache.axis.encoding.XMLType.XSD_ANYTYPE;
	}
}
