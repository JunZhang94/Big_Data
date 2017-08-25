package com.jp.tic.common.activemq;

import java.util.Properties;

import javax.naming.Context;

public class ActiveMQConnectionManager extends MQConnectionManager {

	private static final String INITIAL_CONTEXT_FACTORY = "org.apache.activemq.jndi.ActiveMQInitialContextFactory";
	private static final String AUTHENTICATION = "simple";
	private static final String CONNECTION_PROTOCOL="s";
	
	public ActiveMQConnectionManager(String hostname, int port){
		
		Properties properties = new Properties();
		properties.put(Context.INITIAL_CONTEXT_FACTORY,	INITIAL_CONTEXT_FACTORY);
		properties.put(Context.PROVIDER_URL, getUrl(hostname,port));
		
		contextInitParams=properties;
	}
	
	public ActiveMQConnectionManager(String hostname, int port, String username, String password){
		
		Properties properties = new Properties();
		properties.put(Context.INITIAL_CONTEXT_FACTORY,	INITIAL_CONTEXT_FACTORY);
		properties.put(Context.PROVIDER_URL, getUrl(hostname,port));
		
		properties.put(Context.SECURITY_AUTHENTICATION, AUTHENTICATION);
		properties.put(Context.SECURITY_PROTOCOL, CONNECTION_PROTOCOL);
		
		properties.put(Context.SECURITY_PRINCIPAL, username);
        
        if (password != null || !"".equals(password)) {
        	properties.put(Context.SECURITY_CREDENTIALS, password);
        }
        
        contextInitParams=properties;
	}
	
	private String getUrl(String hostname,int port){
		//return "tcp://"+hostname+":"+port+"?wireFormat.maxInactivityDuration=0";
		
		//>=5.6
		return "failover:(tcp://"+hostname+":"+port+"?wireFormat.maxInactivityDuration=0)?timeout=15000&maxReconnectDelay=6000&maxReconnectAttempts=-1";
		
		//<5.6
		//return "failover:(tcp://"+hostname+":"+port+"?wireFormat.maxInactivityDuration=0)?timeout=15000&maxReconnectDelay=6000&maxReconnectAttempts=0";
		
		//return "";
	}
	
}
