<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<%
	session.invalidate();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>综合联网缉查大数据平台</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible" />
		<meta content="IE=7" http-equiv="X-UA-Compatible" />
		<style type="text/css">
			body {
				margin-left: 0px;
				margin-top: 0px;
				margin-right: 0px;
				margin-bottom: 0px;
				overflow:hidden;
			}
			.STYLE1 {font-size: 15px}
		</style>
		<script type="text/javascript">
			if(top!=self){
				if(top.location!=self.location)
				top.location=self.location
			}
		    $.ajax({url:"${pageContext.request.contextPath }/user/to/login.mvc",global:false}) 
  			
			var BrowserDetect = { 
		      init: function () { 
		         this.browser = this.searchString(this.dataBrowser) || "An unknown browser"; 
		         this.version = this.searchVersion(navigator.userAgent) 
		         || this.searchVersion(navigator.appVersion) 
		         || "an unknown version"; 
		      }, 
		      searchString: function (data) { 
		         for (var i=0;i<data.length;i++) { 
		            var dataString = data[i].string; 
		            var dataProp = data[i].prop; 
		            this.versionSearchString = data[i].versionSearch || data[i].identity; 
		            if (dataString) { 
		               if (dataString.indexOf(data[i].subString) != -1) 
		                  return data[i].identity; 
		            } 
		            else if (dataProp) 
		               return data[i].identity; 
		         } 
		      }, 
		      searchVersion: function (dataString) { 
		         var index = dataString.indexOf(this.versionSearchString); 
		         if (index == -1) return; 
		         return parseFloat(dataString.substring(index+this.versionSearchString.length+1)); 
		      }, 
		      dataBrowser: [ 
		         { 
		            string: navigator.userAgent, 
		            subString: "Chrome", 
		            identity: "Chrome" 
		         }, 
		         { 
		            string: navigator.vendor, 
		            subString: "Apple", 
		            identity: "Safari", 
		            versionSearch: "Version" 
		         }, 
		         { 
		            prop: window.opera, 
		            identity: "Opera", 
		            versionSearch: "Version" 
		         }, 
		         {  
		            string: navigator.userAgent, 
		            subString: "Firefox", 
		            identity: "Firefox" 
		         }, 
		         { 
		            string: navigator.userAgent, 
		            subString: "MSIE", 
		            identity: "Explorer", 
		            versionSearch: "MSIE" 
		         }, 
		         { 
		            string: navigator.userAgent, 
		            subString: "Gecko", 
		            identity: "Mozilla", 
		            versionSearch: "rv" 
		         }, 
		         { // for older Netscapes (4-) 
		            string: navigator.userAgent, 
		            subString: "Mozilla", 
		            identity: "Netscape", 
		            versionSearch: "Mozilla" 
		         } 
		      ]
		   }; 
		   BrowserDetect.init(); 
		
			function toRegister(){
				window.location="${pageContext.request.contextPath}/random";
			}
			//页面初始化加载的js代码
			$(function () {
				if (BrowserDetect.browser == "Explorer") {
					if(BrowserDetect.version <= 7){ 
						if(confirm("当前IE版本过低，请下载并安装IE8!")){
							window.location="${pageContext.request.contextPath}/resources/IE8-WindowsXP-x86.exe";
					    }
					}
				} else {
					alert("提示：为了保证系统的正常运行，请使用IE8或者IE9浏览器！");
				}
				
				 $("#userId").focus();
				
				$(".btn1").click(function () {
					if (!$(".us:eq(0)").val()) {
					   // document.getElementById("message").innerHTML="账号不能为空！";
					    alert('账号不能为空！');
					     $("#userId").focus();
						return false;
					}else if ($(".us:eq(0)").val().length > 18) {
					  //  document.getElementById("message").innerHTML="账号不能为空！";
					    alert( '账号不能为空！');
					     $("#userId").focus();
						return false;
					}/*else if (!$(".pw:eq(0)").val()) {
						 document.getElementById("message").innerHTML="密码不能为空！";
						return;
					}*/
					//from表单的提交
					$("form:eq(0)").submit();
					
										
				});
				 var msg = document.getElementById("message").innerHTML;
			    if(msg!=""){
			    	alert(msg);
			    	$('#message').val("");
			    }
				
			});
			
			//对用户提示的处理
			function hideDiv(){
			    if($('#userId').val()){
			        $('#message').hide();
			    }else{
			        document.getElementById("message").innerHTML="账号不能为空！";
			        alert('账号不能为空！');
			       /* $('#message').show();*/
			        $('#message').hide();
			    }
			}
			
			//input标签敲回车键的处理
			function toNext(frm){
			    if(window.event.keyCode == 13){
			        window.event.keyCode=9;//这是一个tab键的unicode编码
			    }
			}
			//敲回车键的时候from表单提交处理
			function enterSubmit(e) {
			   var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
			   $(".btn1").keypress(function(keyCode){ 
			       	  if (keyCode == 13) {
						for (var i = 0; i < this.form.elements.length; i++) {
							if (this == this.form.elements[i])
							  break;
						}
						i = (i + 1) % this.form.elements.length;
						this.form.elements[i].focus();
						return false;
					  } else {
						return true;
					  }
			       	  
			       });
				
			}
		</script>
	</head>

	<body>
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
			  <tr>
			    <td bgcolor="9fc967">&nbsp;</td>
			  </tr>
			  <tr>
			    <td height="604"><table width="100%" border="0" cellspacing="0" cellpadding="0">
			      <tr>
			        <td height="604" background="themes/client/login/login_02.gif">&nbsp;</td>
			        <td width="989"><table width="100%" border="0" cellspacing="0" cellpadding="0">
			          <tr>
			            <td height="345" background="themes/client/login/login_1.jpg">&nbsp;</td>
			          </tr>
			          <tr>
			            <td height="47"><table width="100%" border="0" cellspacing="0" cellpadding="0">
			              <tr>
			                <td width="539" height="47" background="themes/client/login/login_05.gif" nowrap="nowrap">&nbsp;</td>
			                <td width="206" background="themes/client/login/login_06.gif" nowrap="nowrap">
			                <table width="100%" border="0" cellspacing="0" cellpadding="0">
			                <form action="${pageContext.request.contextPath}/user/login.mvc" method="post" onkeyup="enterSubmit(event)" >
			                  <tr>
			                    <td width="20%" height="22"><div align="center"><span class="STYLE1"><strong>用户</strong></span></div></td>
			                    <td width="58%" height="22"><div align="center">
			                        <input type="text" name="userName" placeholder="请输入账号/身份证号…" id="userId"  onkeydown="toNext(this.form)" size="15" style="height:17px; border:solid 1px #bbbbbb">
			                    </div></td>
			                    <td width="25%" height="22">&nbsp;</td>
			                  </tr>
			                  <tr>
			                    <td height="22"><div align="center"><span class="STYLE1"><strong>密码</strong></span></div></td>
			                    <td height="22"><div align="center">
			                        <input type="password" name="password" placeholder="请输入您的密码…" size="15" style="height:17px; width: 117px; border:solid 1px #bbbbbb">
			                    </div></td>
			                  </tr>
			                  <tr>
			                  	<td height="22">
			                    	<div align="center">
				                    	<input type="submit" class="btn1" value="登录"  />
			                    	</div>
		                    	</td>
		                    	<td height="22">
			                    	<div align="center">
			                    		<button type="button" onclick="toRegister();" width="40" class="btn2" value="PKI" />
			                    	</div>
		                    	</td>
			                  </tr>
			                  </form>
			                </table>
			                </td>
			                <td width="244" background="themes/client/login/login_07.gif" nowrap="nowrap">&nbsp;</td>
			              </tr>
			            </table></td>
			          </tr>
			          <tr>
			            <td height="212" background="themes/client/login/login_08.gif">&nbsp;</td>
			          </tr>
			        </table></td>
			        <td background="themes/client/login/login_04.gif">&nbsp;</td>
			      </tr>
			    </table></td>
			  </tr>
			  <tr>
			    <td bgcolor="70ad21">&nbsp;</td>
			  </tr>
			</table>
	</body>
</html>
