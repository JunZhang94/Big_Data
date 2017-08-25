package com.jp.tic.system.util;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/** 
 * <b>function:</b> 磁盘文件操作工具类 
 * @project Test 
 * @package com.hoo.util  
 * @fileName FileUtils.java 
 * @createDate 2010-10-4 下午03:32:42 
 * @author hoojo 
 */ 
@SuppressWarnings("unused") 
public abstract class FileUtils { /** 
     * <b>function:</b>传递一个File，返回该文件的FileInfo实体类 
     * @author hoojo 
     * @createDate Oct 10, 2010 10:10:19 PM 
     * @param file File 
     * @return FileInfo 
     */  
    public static FileInfo getFileInfo(File file) {  
        FileInfo info = new FileInfo();
        if (file != null) {  
            info.setId(UUID.randomUUID().toString()); 
            if (file.getName() == null || "".equals(file.getName()) || "::".equals(file.getName())) {
                info.setName(file.getAbsolutePath());  
            } else {  
                info.setName(file.getName());  
            }  
            //info.setLeaf(file.isFile());  
            info.setLeaf(!file.isDirectory());  
            info.setLength(file.length());  
            info.setPath(getDoPath(file.getAbsolutePath()));  
            info.setSuffix(getType(file.getName()));  
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
            Date date = new Date();  
            date.setTime(file.lastModified());  
            info.setEditDate(sdf.format(date));
        }  
        return info;  
    }  
      
    public static void setFileInfo(File file, FileInfo info) {  
        if (file != null && info != null) {  
            info.setId(UUID.randomUUID().toString());  
            if (file.getName() == null || "".equals(file.getName()) || "::".equals(file.getName())) {  
                info.setName(file.getAbsolutePath());  
            } else {  
                info.setName(file.getName());  
            }  
            //info.setLeaf(file.isFile());  
            info.setLeaf(!file.isDirectory());  
            info.setLength(file.length());  
            info.setPath(getDoPath(file.getAbsolutePath()));  
            info.setSuffix(getType(file.getName()));  
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
            Date date = new Date();  
            date.setTime(file.lastModified());  
            info.setEditDate(sdf.format(date));  
        }  
    }  
      
    /** 
     * <b>function:</b>处理后的系统文件路径 
     * @author hoojo 
     * @createDate Oct 10, 2010 12:49:31 AM 
     * @param path 文件路径 
     * @return 返回处理后的路径 
     */  
    public static String getDoPath(String path) {  
        path = path.replace("//", "/");  
        String lastChar = path.substring(path.length() - 1);  
        if (!"/".equals(lastChar)) {  
            path += "/";  
        }  
        return path;  
    }  
      
    /** 
     * <b>function:</b>和文件后缀一样，不同的是没有“.” 
     * @author hoojo 
     * @createDate Oct 10, 2010 2:42:43 PM 
     * @param fileName 文件名称 
     * @return 
     */  
    public static String getType(String fileName) {  
     int index = fileName.lastIndexOf(".");  
        if (index != -1) {  
            String suffix = fileName.substring(index + 1);//后缀  
            return suffix;   
        } else {  
            return null;  
        }  
    }  
      
    /** 
     * <b>function:</b> 得到指定目录下所有的文件集合 
     * @createDate 2010-10-20 下午02:20:06 
     * @author hoojo 
     * @param info 将数据设置在该变量中 
     * @param file 文件目录 
     */  
    public static void getAllFileInfo(FileInfo info, File file) {  
        if (file.isDirectory()) {  
            long size = 0;  
            File[] allFiles = file.listFiles();  
            for (File f : allFiles) {  
                size += f.length();  
                FileInfo fi = getFileInfo(f);  
                info.getChildren().add(fi);  
                getAllFileInfo(fi, f);  
            }  
            info.setLength(size);  
        }  
    }  
      
    /** 
     * <b>function:</b> 得到当前目录所有文件 
     * @createDate 2010-10-20 下午02:21:06 
     * @author hoojo 
     * @param info 文件对象 
     * @param file 目录 
     */  
    public static void getFileInfo(FileInfo info, File file, String[] allowTypes) {  
        if (file.isDirectory()) {  
            long size = 0;  
            File[] allFiles = file.listFiles();  
            for (File f : allFiles) {  
                size += f.length();  
                FileInfo fi = getFileInfo(f);  
                if (f.isDirectory()) {  
                    info.getChildren().add(fi);  
                } else {  
                    if (validTypeByName(f.getName(), allowTypes, true)) {  
                        info.getChildren().add(fi);  
                    }  
                }  
            }  
            info.setLength(size);  
        }  
    }  
      
    /** 
     * <b>function:</b> 根据文件名和类型数组验证文件类型是否合法，flag是否忽略大小写 
     * @author hoojo 
     * @createDate Oct 10, 2010 11:54:54 AM 
     * @param fileName 文件名 
     * @param allowTypes 类型数组 
     * @param flag 是否获得大小写 
     * @return 是否验证通过 
     */  
    public static boolean validTypeByName(String fileName, String[] allowTypes, boolean flag) {  
        String suffix = getType(fileName);  
        boolean valid = false;  
        if (allowTypes.length > 0 && "*".equals(allowTypes[0])) {  
            valid = true;  
        } else {  
            for (String type : allowTypes) {  
                if (flag) {//不区分大小写后缀  
                    if (suffix != null && suffix.equalsIgnoreCase(type)) {  
                        valid = true;  
                        break;  
                    }  
                } else {//严格区分大小写  
                    if (suffix != null && suffix.equals(type)) {  
                        valid = true;  
                        break;  
                    }  
                }  
            }  
        }  
        return valid;  
    }  
      
    /** 
     * <b>function:</b> 在path目录下创建目录 
     * @createDate 2010-11-3 下午04:03:34 
     * @author hoojo 
     * @param path 
     * @param dirName 
     * @return 
     */  
    public static boolean mkDir(String path, String dirName) {  
        boolean success = false;  
        File file = new File(getDoPath(path) + dirName);  
        if (!file.exists()) {  
            success = file.mkdirs();  
        }   
        return success;  
    }
}
