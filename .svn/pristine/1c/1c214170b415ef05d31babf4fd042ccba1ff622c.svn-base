package com.jp.tic.common.activemq;

import javax.jms.BytesMessage;
import javax.jms.Connection;
import javax.jms.DeliveryMode;
import javax.jms.ExceptionListener;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicSession;
import javax.jms.TopicSubscriber;
import javax.naming.NamingException;

import org.apache.log4j.Logger;

public class MQSignleTopicClient {
	private Logger logger = Logger.getLogger(MQSignleTopicClient.class);
	
	private Connection connection;
	private TopicSession topicSession;
	
	private Topic topic;
	
	private TopicSubscriber subscriber;
	private MessageProducer producer;
	
	public MQSignleTopicClient(Connection connection, String topicName){
		this.connection = connection;
		
		try {
			connection.setExceptionListener(new ExceptionListener() {
				
				@Override
				public void onException(JMSException ex) {
					ex.printStackTrace();
				}
			});
    		initConnectionTopicAndProducer(connection, topicName);
		} catch (Exception e) {
			logger.error("creater ActiveMQSignleTopicNode error", e);
		}
	}
	
	public MQSignleTopicClient(Connection connection, String topicName,MessageListener listener){
		this.connection = connection;
		
		try {
			initConnectionTopicAndProducer(connection, topicName);
			
    		setMessageListener(listener);
		} catch (Exception e) {
			logger.error("creater ActiveMQSignleTopicNode error", e);
		}
	}
	
	private void initConnectionTopicAndProducer(Connection connection, String topicName) throws JMSException{
		if(topicSession==null){
    		synchronized(this){
    			topicSession = ((TopicConnection) connection).createTopicSession(true, Session.AUTO_ACKNOWLEDGE);
    		}
    	}
		topic = topicSession.createTopic(topicName);
		logger.debug("set topic: topicName=" + topicName);
		
		producer = topicSession.createProducer(topic);
		producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
		logger.debug("set producer: topicName=" + topicName);
		
		subscriber = topicSession.createSubscriber(topic);
		logger.debug("set subscriber: topicName=" + topicName);
	}
	
	public void setMessageListener(MessageListener listener) throws NamingException, JMSException {
		try {
			subscriber.setMessageListener(listener);
		} catch (Exception e) {
			logger.error("add listioner error:", e);
		}
	}
	
	public void send(String message) throws NamingException, JMSException {
		TextMessage textMessage = topicSession.createTextMessage(message);
		send(textMessage);
	}

	public void sendBytes(byte[] bytes) throws NamingException, JMSException {
		BytesMessage byteMessage = topicSession.createBytesMessage();
		byteMessage.setObjectProperty("strem", bytes);
		send(byteMessage);
	}
	
	public void send(Message message) throws NamingException, JMSException {
		logger.info("Producer:->Sending message: " + message);
		producer.send(message);
		logger.info("Producer:->Message sent complete!");
	}
	
	public String getName(){
		try {
			return connection.getClientID();
		} catch (JMSException e) {
			return null;
		}
	}
	
	private int runStatus=-1;
	
	public void close() {
		try {
			if(runStatus==1){
				return ;
			}
			
			if(topicSession!=null){
				topicSession.close();
    		}
    		
    		if(connection!=null){
    			connection.stop();
    			connection.close();
    		}
    		
    		runStatus=1;
		} catch (Exception e) {
			logger.error("ActiveMQSignleTopicNode close error:", e);
		}
	}

	public void start() {
		try{
			if(runStatus==0){
				return ;
			}
			
			connection.start();
			runStatus=0;
		}
		catch(Exception e){
			logger.error("ActiveMQSignleTopicNode start error:",e);
		}
	}
}
