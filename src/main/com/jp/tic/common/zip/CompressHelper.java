package com.jp.tic.common.zip;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;


public class CompressHelper {

	public void zip(String inputFileName,String targetFileName) throws Exception {
        System.out.println(targetFileName);
        zip(targetFileName, new File(inputFileName));
    }

    private void zip(String zipFileName, File inputFile) throws Exception {
        ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipFileName));
        zip(out, inputFile, "");
        System.out.println("zip done");
        out.close();
    }

    private void zip(ZipOutputStream out, File f, String base) throws Exception {
        if (f.isDirectory()) {
           File[] fl = f.listFiles();
           out.putNextEntry(new org.apache.tools.zip.ZipEntry(base + "/"));
           base = base.length() == 0 ? "" : base + "/";
           for (int i = 0; i < fl.length; i++) {
           zip(out, fl[i], base + fl[i].getName());
         }
        }else {
           out.putNextEntry(new org.apache.tools.zip.ZipEntry(base));
           FileInputStream in = new FileInputStream(f);
           int b;
           System.out.println(base);
           while ( (b = in.read()) != -1) {
            out.write(b);
         }
         in.close();
       }
    }

    public void zip(ZipOutputStream out, InputStream in, String base, String fileName) throws Exception {
       ZipEntry zipData = new org.apache.tools.zip.ZipEntry(base+fileName);
       out.putNextEntry(zipData);
       int b;
       System.out.println(base);
       while ( (b = in.read()) != -1) {
    	   out.write(b);
       }
       in.close();
    }
    
    public static void main(String [] temp){
       CompressHelper helper = new CompressHelper();
        try {
//           helper.zip("D:/App_Develop/tempImgPath/admin20140807103605","D://test.zip");//你要压缩的文件夹
           InputStream in = new FileInputStream("D:\\App_Develop\\tempImgPath\\admin20140811152852\\Image\\13-000001-150028093-01-0.jpg");
           ZipOutputStream out = new ZipOutputStream(new FileOutputStream("D:/App_Develop/tempImgPath/test.zip"));
           helper.zip(out, in, "Image/", "3-000001-150028093-01-0.jpg");
           out.flush();
           out.close();
        }catch (Exception ex) {
           ex.printStackTrace();
       }
    }
	
}
