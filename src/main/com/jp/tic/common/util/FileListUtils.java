package com.jp.tic.common.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Iterator;

public class FileListUtils {
	
	public static Iterator<String> listFiles(String path){
		try{
			File file=new File(path);
			if(file.exists()){
				final File[] files = file.listFiles();
				
				return new Iterator<String>(){
					int index=-1;
					
					@Override
					public boolean hasNext() {
						return index<files.length;
					}

					@Override
					public String next() {
						index++;
						return files[index].getName();
					}

					@Override
					public void remove() {
						index=-1;
					}
				};
			}
		}
		catch(Exception ex){
			ex.printStackTrace();
			
			return listFilesByCmd(path);
		}
		return null;
	}
	
	private static Iterator<String> listFilesByCmd(String path){
		try{
			String cmd=getCommand(path);
			final InputStream input = runCommand(cmd);
			
			return new Iterator<String>(){

				@Override
				public boolean hasNext() {
					this.readLine();
					return line!=null&&line.length()>0;
				}

				@Override
				public String next() {
					return line.split("-")[4];
				}

				@Override
				public void remove() {
					line=null;
					reader=null;
					try {
						input.reset();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				
				String line;
				BufferedReader reader;
				
				private void readLine(){
					try{
						if(reader==null){
							reader = new BufferedReader (new InputStreamReader(input));
						}
						if ((line = reader.readLine ()) != null){
							System.out.println(line);
						}
					}//end try
					catch(Exception ex){
						ex.printStackTrace();
					}
				}
			};
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		
		return null;
	}
	
	public static InputStream runCommand(String command){
		try  {          
			Process process = Runtime.getRuntime().exec (command);
			return process.getInputStream();
		}
		catch (java.io.IOException e){
			System.err.println ("IOException " + e.getMessage());
		} 
		return null;
	}
	
	private static String getCommand(String path){
		String osName=System.getProperty("os.name");
		
		String cmd="";
		if(osName.toLowerCase().contains("win")){
			cmd="dir";
		}
		else{
			cmd="ls -l ";
		}
		
		if(path!=null&&path.length()>0){
			cmd=cmd+" "+path;
		}
		
		return cmd;
	}
	
	public static void main(String[] args) {
		Iterator<String> it = listFilesByCmd("C:\\");
		while(it.hasNext()){
			System.out.println(it.next());
		}
	}
}
