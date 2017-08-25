package com.jp.tic.system.util;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;

public class ZipUtil {
    
    /**
     * 打包文件列表
     * @param files 文件列表
     * @param isDeleteOriFile 是否删除源文件
     * @return 打包后的文件
     */
    public static File zipFiles(List<File> files,boolean isDeleteOriFile){
        File zipFile = null;
        InputStream is = null;
        ZipOutputStream zipOut = null;
        try {
            zipFile = File.createTempFile(UUID.randomUUID().toString().replace("-", ""), ".zip");
            zipOut = new ZipOutputStream(FileUtils.openOutputStream(zipFile));
            
            for(File f:files){
                ZipEntry zipEntry = new ZipEntry(f.getName());
                zipOut.putNextEntry(zipEntry);
                is = FileUtils.openInputStream(f); 
                byte b[] = new byte[10240];
                int length = 0;
                while ((length = is.read(b)) != -1) {
                    zipOut.write(b, 0, length);
                }
                is.close();
                if(isDeleteOriFile){
                    f.delete();
                }
                zipOut.closeEntry();
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            close(is,zipOut);
        }
        return zipFile;
        
    }
    
    public static File zipFiles(boolean isDeleteOriFile,File ...files){
        return zipFiles(Arrays.asList(files),isDeleteOriFile);
    }
    
    
    public static void close(InputStream is, OutputStream os){
        try{
            if(null !=is){
                is.close();
            }
            if(null!=os){
                os.close();
            }
        }catch(Exception e){
            
        }
    }

}
