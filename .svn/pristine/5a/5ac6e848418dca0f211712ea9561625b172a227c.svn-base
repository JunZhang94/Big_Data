package com.jp.tic.common.util;

public class XqlUtils {
	public static int OP_EQ=0;
	public static int OP_LIKE=1;
	public static int OP_LT=2;
	public static int OP_GT=3;
	public static int OP_LET=4;
	public static int OP_GET=5;
	public static int OP_IS=6;
	
	public static int LOGIC_AND=0;
	public static int LOGIC_OR=1;
	
	private static String PREFIX="where ";
	
	private static Object[] insertOperatorCode(int operatorCode,Object[] params){
		Object[] result=new Object[params.length+params.length/2];
		for(int i=0;i<result.length/3;i++){
			result[3*i+0]=params[2*i+0];
			result[3*i+2]=params[2*i+1];
			result[3*i+1]=operatorCode;
		}
		return result;
	}
	
	public static XqlFilterGroup collectFilters(Object... objects){
		return collectFilters(true,true,LOGIC_AND,insertOperatorCode(OP_EQ,objects));
	}
	
	public static XqlFilterGroup collectFilters(int operatorCode,Object... objects){
		return collectFilters(true,true,LOGIC_AND,insertOperatorCode(operatorCode,objects)); 
	}
	
	public static XqlFilterGroup collectFilters(boolean ignoreNull,boolean ignoreEmptyString,int logic,Object... objects){		
		XqlFilterGroup result=new XqlFilterGroup();
		
		if(objects.length%3==0){
			String xql="";
			Object[] params=new Object[objects.length/3];
			
			int count=0;
			for(int i=0;i<params.length;i++){
				if(ignoreNull){
					if(objects[3*i+2]==null){
						System.out.println("ignore >>>>>>>>>>>"+objects[3*i+1]);
						continue;
					}
				}
				
				if(ignoreEmptyString){
					if(objects[3*i+2]!=null&&"".equals(objects[3*i+2])){
						System.out.println("ignore >>>>>>>>>>>"+objects[3*i+1]);
						continue;
					}
				}
				
				String condition="";
				
				if(objects[3*i+2] instanceof XqlFilterGroup){
					XqlFilterGroup temp=(XqlFilterGroup) objects[3*i+2];
					condition="("+temp.getWhere().substring(PREFIX.length())+")";
				}
				else{
					String operator="";
					String funLeft="";
					String funRight="";
					
					if((Integer)(objects[3*i+1])==OP_EQ){
						operator="=";
					}
					if((Integer)(objects[3*i+1])==OP_LIKE){
						operator="like";
						objects[3*i+2]="%"+objects[3*i+2]+"%";
						
						funLeft="lower(";
						funRight=")";
					}
					if((Integer)(objects[3*i+1])==OP_LT){
						operator="<";
					}
					if((Integer)(objects[3*i+1])==OP_GT){
						operator=">";
					}
					if((Integer)(objects[3*i+1])==OP_LET){
						operator="<=";
					}
					if((Integer)(objects[3*i+1])==OP_GET){
						operator=">=";
					}
					if((Integer)(objects[3*i+1])==OP_IS){
						operator="is";
					}
					
					
					if(objects[3*i+2]==null){
						condition=objects[3*i].toString()+" is null";
					}
					else{
						condition=funLeft+objects[3*i].toString()+funRight+" "+operator+" "+funLeft+" ? "+funRight;
						
						params[count]=objects[3*i+2];
						count++;
					}
				}
				
				if(xql.startsWith(PREFIX)==false){
					xql=xql+PREFIX+condition;
				}
				else {
					if(logic==LOGIC_AND){
						xql=xql+" and "+condition;
					}
					else if(logic==LOGIC_OR){
						xql=xql+" or "+condition;
					}
				}
			}
			
			Object[] finalParams=new Object[count];
			System.arraycopy(params, 0, finalParams, 0, finalParams.length);
			
			result.setWhere(xql);
			result.setParams(finalParams);
		}
		
		return result; 
	}
	
	public static String collectFields4Insert(String[] fixFields,String[] fixValues,String... fields){
		String xql="";
		String group1="(";
		String group2="(";
		
		for(int i=0;i<fixFields.length;i++){
			group1=group1+fixFields[i]+",";
			group2=group2+fixValues[i]+",";
		}
		
		for(String field:fields){
			group1=group1+field+",";
			group2=group2+"?"+",";
		}
		group1=group1.substring(0,group1.length()-1);
		group2=group2.substring(0,group2.length()-1);
		
		group1=group1+")";
		group2=group2+")";
		
		xql=group1+" values "+group2;
		return xql;
	}
	
	public static String collectFields4Insert(String... fields){
		String xql="";
		String group1="(";
		String group2="(";
		for(String field:fields){
			group1=group1+field+",";
			group2=group2+"?"+",";
		}
		group1=group1.substring(0,group1.length()-1);
		group2=group2.substring(0,group2.length()-1);
		
		group1=group1+")";
		group2=group2+")";
		
		xql=group1+" values "+group2;
		return xql;
	}
	
	public static String collectFields4Update(String[] fields){
		String xql="";
		
		int count=0;
		for(int i=0;i<fields.length;i++){
			String field=fields[i]+" = ? ";
			
			if(count==0){
				xql=xql+field;
			}
			else {
				xql=xql+" , "+field;
			}
			
			count++;
		}
		
		return xql; 
	}
	
	public static XqlFieldGroup collectFields4Update(Object... objects){
		XqlFieldGroup result=new XqlFieldGroup();
		
		if(objects.length%2==0){
			String xql="";
			Object[] params=new Object[objects.length/2];
			
			int count=0;
			for(int i=0;i<params.length;i++){
				String field=objects[2*i].toString()+" = ? ";
				
				if(count==0){
					xql=xql+field;
				}
				else {
					xql=xql+" , "+field;
				}
				
				params[count]=objects[2*i+1];
				count++;
			}
			
			Object[] finalParams=new Object[count];
			System.arraycopy(params, 0, finalParams, 0, finalParams.length);
			
			result.setFields(xql);
			result.setParams(finalParams);
		}
		
		return result; 
	}
	
	public static class XqlFilterGroup{
		private String where;
		private Object[] params;
		
		public String getWhere() {
			return where;
		}
		public void setWhere(String where) {
			this.where = where;
		}
		public Object[] getParams() {
			return params;
		}
		public void setParams(Object[] params) {
			this.params = params;
		}
		
		@Override
		public String toString(){
			String str=where+":";
			if(params!=null){
				for(int i=0;i<params.length;i++){
					str=str+"|"+params[i];
				}
			}
			return str;
		}
	}
	
	public static class XqlFieldGroup{
		private String fields;
		private Object[] params;
		
		public String getFields() {
			return fields;
		}
		public void setFields(String fields) {
			this.fields = fields;
		}
		public Object[] getParams() {
			return params;
		}
		public void setParams(Object[] params) {
			this.params = params;
		}
		
		@Override
		public String toString(){
			String str=fields+":";
			if(params!=null){
				for(int i=0;i<params.length;i++){
					str=str+"|"+params[i];
				}
			}
			return str;
		}
	}
	
	public static void main(String[] args) {
		XqlFilterGroup group = XqlUtils.collectFilters(
									"abc","def","d2",5
								);
		System.out.println(group);
		XqlFilterGroup group2 = XqlUtils.collectFilters(false,false,1,
				"abc",0,"def",
				"d2",0,5,
				"f",0,null,
				"",0,group
			);
		System.out.println(group2);
		
		System.out.println(XqlUtils.collectFields4Insert("a","b","c"));
		
		System.out.println(XqlUtils.collectFields4Update("a","b","c",null));
	}
}
