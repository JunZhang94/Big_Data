package com.jp.tic.common.util;

import java.io.File;
import java.io.RandomAccessFile;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

public class FileUtils {
	public static boolean deleteAllFiles(String path) {
		boolean flag = true;
		File directory = new File(path);
		if (!directory.exists()) {
			return false;
		}
		
		if (!directory.isDirectory()) {
			return false;
		}
		
		String[] children = directory.list();
		File temp = null;
		for (int i = 0; i < children.length; i++) {
			if (path.endsWith(File.separator)) {
				temp = new File(path + children[i]);
			} else {
				temp = new File(path + File.separator + children[i]);
			}
			
			if (temp.isFile()) {
				temp.delete();
			}
			
			if (temp.isDirectory()) {
				flag=flag&&deleteAllFiles(path + "/" + children[i]);
				temp.delete();
			}
		}
		
		directory.delete();
		
		return flag;
	}
	
	/**
	 * @param path
	 * @param directoryMode 0:no directory, 1:directory first, 2:directory last
	 * @return
	 */
	public static Iterator<String> getDirectoryFileIteratorWithMode(final String path,final int directoryMode){
		File directory = new File(path);
		if (!directory.exists()) {
			return null;
		}
		
		if (!directory.isDirectory()) {
			return null;
		}
		
		final ConcurrentLinkedQueue<String> files=new ConcurrentLinkedQueue<String>();
		final ConcurrentLinkedQueue<String> directories=new ConcurrentLinkedQueue<String>();
		final Map<String, Object> waitingDirectories=new HashMap<String, Object>();
		initQueue(directories, waitingDirectories, files, path,directoryMode);
		
		Iterator<String> reuslt = new Iterator<String>(){

			private String next=null;
			
			@Override
			public boolean hasNext() {
				next=getnext();
				if(next!=null){
					return true;
				}
				else{
					return false;
				}
			}

			private String getnext() {
				if(files.size()>0||directories.size()>0){
					
					if(files.size()>0){
						String fileName=files.poll();
						if(waitingDirectories.containsKey(fileName)){
							String directory=waitingDirectories.remove(fileName).toString();
							files.add(directory);
						}
						return fileName;
					}
					else if(directories.size()>0){
						String subDirectory=directories.poll();
						initQueue(directories, waitingDirectories, files, subDirectory,directoryMode);
						return getnext();
					}
					else{
						return null;
					}
				}
				
				return null;
			}

			@Override
			public void remove() {
				// nothing
			}

			@Override
			public String next() {
				return next;
			}
			
		};
		
		return reuslt;
	}
	
	private static void initQueue(ConcurrentLinkedQueue<String> directories,Map<String, Object> waitingDirectories,ConcurrentLinkedQueue<String> files,String path,int directoryMode){
		File directory = new File(path);
		if (!directory.exists()) {
			return ;
		}
		
		if (!directory.isDirectory()) {
			return ;
		}
		
		if(directoryMode==1){
			files.add(path);
		}
		
		String lastFile=null;
		String lastDirectory=null;
		File[] children = directory.listFiles();
		for (int i = 0; i < children.length; i++) {
			File temp = children[i];
			
			String filePath=temp.getAbsolutePath().replace(File.separatorChar, '/');
			if (temp.isFile()) {
				files.add(filePath);
				lastFile=filePath;
			}
			
			if (temp.isDirectory()) {
				directories.add(filePath);
				lastDirectory=filePath;
			}
		}
		
		if(directoryMode==2){
			if(lastDirectory==null){
				waitingDirectories.put(lastFile, path);
			}
			else{
				waitingDirectories.put(lastDirectory, path);
			}
		}
	}

	public static long getAvailableSpace(String path){
		long space=0;
		
		File[] roots = File.listRoots();
		for (int i = 0; i < roots.length; i++) {
			if((new File(path)).getAbsolutePath().startsWith(roots[i].getAbsolutePath())){
//				System.out.println(roots[i]);
//				System.out.println("Free space = " + roots[i].getFreeSpace());
//				System.out.println("Usable space = " + roots[i].getUsableSpace());
//				System.out.println("Total space = " + roots[i].getTotalSpace());
//				System.out.println();
				space=roots[i].getFreeSpace();
			}
		}
		
		return space;
	}
	
	public static String[] readLastLines(String filePath, int lineCount){
		return readLastLines(filePath, lineCount, null, "UTF-8");
	}
	
	public static String[] readLastLines(String filePath, int lineCount, String keyword, String charset){
		RandomAccessFile file=null;
		String[] lines=null;
		int lineIndex=lineCount-1;
		
		try {
			lines=new String[lineCount];
			file = new RandomAccessFile(filePath, "r");
			
			long fileLength = file.length();
			if(fileLength==0){
				return null;
			}
			
			long start = file.getFilePointer();
			//System.out.println(start);
			long nextend = start + fileLength - 1;

			String line;
			int length=0;
			int readByte = 0;
			while (nextend > start) {
				file.seek(nextend);
				
				readByte = file.read();
				if (readByte == '\n') {
				//if (readByte == '\n' || readByte == '\r') {
					// 当文件指针退至上一行的换行符，则输出下的一行
					byte[] bytes = new byte[length];
					file.read(bytes);
					if (charset == null) {
						line = new String(bytes);
					} else {
						line = new String(bytes, charset);
					}
				      
					//line = file.readLine();
					if(keyword==null||line.contains(keyword)){
						//System.out.println(line);
						lines[lineIndex]=line;
						lineIndex--;
					}
					
					length=-1;
				}
				
				nextend--;
				length++;
				
				if (nextend == 0) {
					// 当文件指针退至文件开始处，输出第一行
					byte[] bytes = new byte[length];
					file.read(bytes);
					if (charset == null) {
						line = new String(bytes);
					} else {
						line = new String(bytes, charset);
					}
					
					//line = file.readLine();
					if(keyword==null||line.contains(keyword)){
						//System.out.println(line);
						lines[lineIndex]=line;
						lineIndex--;
						break;
					}
					
					length=0;
				}
				
				if(lineIndex==-1){
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				file.close();
			} catch (Exception e) {
				e.printStackTrace();
			} 			
		}
		
		if(lineIndex>-1){
			String[] newLines=new String[lines.length-lineIndex-1];
			for(int i=0;i<newLines.length;i++){
				newLines[i]=lines[i+lineIndex+1];
			}
			lines=newLines;
		}
		
		return lines;
	}
	
	public static void main(String[] args) {
		//FileUtils.deleteAllFiles("C:/2013");
		
		
		//Iterator<String> it = FileUtils.getDirectoryFileIterator("C:/360高速下载",true);
		Iterator<String> it = FileUtils.getDirectoryFileIteratorWithMode("C:/360高速下载",1);
		int i=0;
		while(it.hasNext()){
			i++;
			System.out.println(i+">>>"+it.next());
		}
		
		
		String[] lines=null;
		
		/*
		lines=readLastLines("F:/johnny/jp/SICS/图片数据恢复问题/c_picrecord.csv", 30);
		for(String line:lines){
			System.out.println(line);
		}
		
		System.out.println(">>>>>>>>>>>>>>>>>");
		lines=readLastLines("F:/johnny/jp/SICS/图片数据恢复问题/萝岗卡扣数据恢复资料.txt", 10);
		for(String line:lines){
			System.out.println(line);
		}
		*/
		
		System.out.println(">>>>>>>>>>>>>>>>>");
		lines=readLastLines("F:/johnny/jp/SICS/图片数据恢复问题/萝岗卡扣数据恢复资料.txt", 300);
		for(String line:lines){
			System.out.println(line);
		}
	}
}
