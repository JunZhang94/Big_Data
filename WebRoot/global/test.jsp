<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" > 
<head>
<title>Insert title here</title>
</head>
<body>
<input type="button" value="下载测试文件" onclick="StartDown()" /> 
<div id="downDiv"></div> 
    <script type="text/javascript" language="javascript"> 
        var downerMgr = new FileDownloaderMgr(); 
        downerMgr.Config["Folder"] = "F:\\"; 
        downerMgr.LoadTo("downDiv"); 
  
        window.onload = function() 
        { 
            downerMgr.Init(); 
        }; 
          
        function StartDown() 
        { 
            //添加到下载队列 
            downerMgr.AddFile("http://www.ncmem.com/images/ico-ftp.jpg"); 
            downerMgr.PostFirst(); 
        } 
  
        function copyFile() 
        { 
            var obj = new ActiveXObject(downerMgr.ActiveX["Partition"]); 
            obj.CopyFile("f:\\ftp\\test.gif","f:\\ftp\\test1.gif"); 
        } 
  
        function copyFolder() 
        { 
            var obj = new ActiveXObject(downerMgr.ActiveX["Partition"]); 
            obj.CopyFile("f:\\ftp\\test.gif","f:\\ftp\\ftp1"); 
        } 
          
        function moveFile() 
        { 
            var obj = new ActiveXObject(downerMgr.ActiveX["Partition"]); 
            obj.MoveFile("f:\\ftp\\test.gif","f:\\ftp\\test2.gif"); 
        } 
          
        function moveFolder() 
        { 
            var obj = new ActiveXObject(downerMgr.ActiveX["Partition"]); 
            obj.MoveFile("f:\\ftp\\test2.gif","f:\\ftp\\ftp1"); 
        } 
          
    </script> 
    <input type="button" value="复制到文件" onclick="copyFile()" /> 
    <input type="button" value="复制到文件夹" onclick="copyFolder()" /> 
    <input type="button" value="移动文件" onclick="moveFile()" /> 
    <input type="button" value="移动到文件夹" onclick="moveFolder()" /> 
</body>
</html>