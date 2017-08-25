package com.jp.tic.common.net.ws;

import java.net.URL;
import java.util.Vector;

import org.apache.soap.Constants;
import org.apache.soap.Fault;
import org.apache.soap.SOAPException;
import org.apache.soap.rpc.Call;
import org.apache.soap.rpc.Parameter;
import org.apache.soap.rpc.Response;


public class SimpleSoapClient {
	private String endPoint;
	
	public SimpleSoapClient(String endPoint){
		this.endPoint=endPoint;
	}
	
	public Object send(String methodName,String[] names,Object[] params){
		try{
			Call call = new Call();
			call.setEncodingStyleURI(Constants.NS_URI_SOAP_ENC);
			call.setTargetObjectURI("urn:xmethods-caSynrochnized");

			call.setMethodName(methodName);
			call.setEncodingStyleURI(Constants.NS_URI_SOAP_ENC);
			Vector<Parameter> paramList = new Vector<Parameter>();
			for(int i=0;i<names.length;i++){
				paramList.addElement(new Parameter(names[i], params[i].getClass(), params[i], null));
			}
			call.setParams(paramList);
			
			Response response = null;
			try {
				URL url = new URL(endPoint);
				response = call.invoke(url, "");
			} catch (SOAPException e) {
				System.err.println("Caught SOAPException (" + e.getFaultCode() + "): " + e.getMessage());
				System.exit(-1);
			}

			if (!response.generatedFault()) {
				Parameter result = response.getReturnValue();
				Object value = result.getValue();
				System.out.println(value);
				return value;
			} else {
				Fault fault = response.getFault();
				System.err.println("Generated fault: ");
				System.out.println(" Fault Code = " + fault.getFaultCode());
				System.out.println(" Fault String = " + fault.getFaultString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
