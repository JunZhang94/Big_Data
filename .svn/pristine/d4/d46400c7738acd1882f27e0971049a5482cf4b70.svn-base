package com.jp.tic.common.activemq;

import java.util.Hashtable;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.log4j.Logger;

public class MQConnectionManager {

	private static Logger logger = Logger.getLogger(MQConnectionManager.class);
	
	private Context context;
	
	protected Hashtable<?,?> contextInitParams;
	
	public MQConnectionManager(){
		
	}
	
	public MQConnectionManager(Hashtable<?,?> contextInitParams){
		this.contextInitParams=contextInitParams;
	}
	
	protected Context getContext()  {
    	try {
    		  if (context == null){
				synchronized (logger) {
					context = new InitialContext(contextInitParams);
				}
    	        } 
		} catch (Exception e) {
			logger.error(e, e);
			e.printStackTrace();
		}
             
        return context;
    }
	
	public Connection getConnection() {
		Connection connection = null;
    	try {
    		ConnectionFactory connectionFactory = (ConnectionFactory) getContext().lookup("ConnectionFactory");
			connection = connectionFactory.createConnection();
		} catch (Exception e) {
			logger.error(e, e);
			e.printStackTrace();
		}
    	return connection;
    }
}
