package com.jp.tic.common.util;

import java.util.Hashtable;

import net.sf.cglib.beans.BeanCopier;
import net.sf.cglib.core.Converter;

public class BeanCopyUtils {
	private static Hashtable<String,BeanCopier> copiers=new Hashtable<String, BeanCopier>();
	
	@SuppressWarnings("unchecked")
	public static void initCopiers(Class... clazzs){
		for(int i=0;i<clazzs.length;i=i+2){
			String key=clazzs[i].getName()+clazzs[i+1].getName();
			BeanCopier beanCopier = BeanCopier.create(clazzs[i], clazzs[i+1], false);
			copiers.put(key, beanCopier);
		}
	}
	
	public static void copy(Object src, Object dest, Converter convertor){
		if(src==null||dest==null){
			return;
		}
		
		String key=src.getClass().getName()+dest.getClass().getName();
		if(copiers.containsKey(key)==false){
			if(convertor==null){
				BeanCopier beanCopier = BeanCopier.create(src.getClass(), dest.getClass(), false);
				copiers.put(key, beanCopier);
			}
			else{
				BeanCopier beanCopier = BeanCopier.create(src.getClass(), dest.getClass(), true);
				copiers.put(key, beanCopier);
			}
		}
		copiers.get(key).copy(src, dest, convertor);
	}
}
