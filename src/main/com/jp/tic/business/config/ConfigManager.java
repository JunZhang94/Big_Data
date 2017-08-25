package com.jp.tic.business.config;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ConfigManager {
	protected final Logger log=LoggerFactory.getLogger(ConfigManager.class);;
	
	public static SimpleDateFormat DATE_FORMATTER_REOCRD_YYYY_JJJ=new SimpleDateFormat("yyyyMMddHHmmssSSS");
	
	private  static ConfigManager manager;
	private  static Object lock=new Object();
	
	private List<ConfigChangeEventListener> listeners=new ArrayList<ConfigChangeEventListener>();
	
	private Properties properties;
	
	private ConfigManager(){
		InputStream is = this.getClass().getResourceAsStream("/system.properties");
		properties = new Properties();
		try {
			properties.load(new InputStreamReader(is, "UTF-8"));
			//properties.load(is);
		} catch (IOException ex) {
			log.error("",ex);
		}
		
		log.trace("key set: {}", properties.keySet());
	}
	
	public  static ConfigManager getInstance(){
		if(manager==null){
			synchronized (lock) {
				manager=new ConfigManager();
			}
		}
		return manager;
	}
	
	public boolean changeConfig(Map<Object, Object> config) throws Exception {
		try {
			log.trace("config map: {}", config);
			
			try{
				String date="."+DATE_FORMATTER_REOCRD_YYYY_JJJ.format(new Date());
				String filePath=this.getClass().getResource("/system.properties").getFile()+date;
				filePath=URLDecoder.decode(filePath,"UTF-8");
				File backupFile=new File(filePath);
				if(backupFile.exists()==false){
					backupFile.createNewFile();
				}
				FileOutputStream backOutputStream=new FileOutputStream(backupFile);
				properties.store(backOutputStream, "backup");
			}
			catch(Exception ex){
				log.error("",ex);
			}
			
			Map<Object, Object> origConfig=new HashMap<Object, Object>();
			origConfig.putAll(properties);
			
			FileOutputStream updateOutputStream=new FileOutputStream(this.getClass().getResource("/system.properties").getFile());
			properties.putAll(config);
			properties.store(updateOutputStream, "update");
			
			for(ConfigChangeEventListener listener:this.listeners){
				listener.onChange(origConfig,properties,config,this.getModuleChangedNames(config));
			}
			
		} catch (Exception ex) {
			log.error("",ex);
			return false;
		}
		return true;
	}
	
	public Map<Object,Object> getAllConfig(){
		return this.properties;
	}
	
	public Object getConfig(Object key){
		return this.properties.get(key);
	}
	
	public String getString(Object key){
		if(properties.get(key)==null){
			return "";
		}
		return this.properties.get(key).toString();
	}
	
	public String getStringUTF(Object key){
		if(properties.get(key)==null){
			return "";
		}
		try {
			return new String(this.properties.get(key).toString().getBytes("ISO8859-1"), "UTF-8");
		} catch (Exception e) {
			return "";
		}   
	}
	
	public int getInt(Object key){
		if(properties.get(key)==null){
			return 0;
		}
		return Integer.parseInt(this.properties.get(key).toString());
	}
	
	public boolean getBoolean(Object key){
		if(properties.get(key)==null){
			return false;
		}
		return Boolean.parseBoolean(this.properties.get(key).toString());
	}
	
	private String getModuleChangedNames(Map<Object, Object> config){
		String moduleNames="";
		for(Object key:config.keySet()){
			int index=key.toString().indexOf(".");
			if(index>-1){
				index=key.toString().indexOf(".", index+1);
				if(index>-1){
					//the module name stop at the third dot(.)
					moduleNames+=key.toString().substring(0,index)+";";
				}
			}
		}
		return moduleNames;
	}
	
	public static Map<Object, Object> filtConfig(Map<Object, Object> config,String moduleName){
		Map<Object, Object> result=new Hashtable<Object,Object>();
		for(Map.Entry<Object,Object> entity:config.entrySet()){
			if(entity.getKey().toString().startsWith(moduleName)){
				result.put(entity.getKey(), entity.getValue());
			}
		}
		return result;
	}
	
	public void addEventListener(ConfigChangeEventListener listener){
		this.listeners.add(listener);
	}
	
	public interface ConfigChangeEventListener {
		public void onChange(Map<Object, Object> origConfig, Map<Object, Object> newConfig, Map<Object, Object> changedConfig, String changeModuleNames);
	}
}
