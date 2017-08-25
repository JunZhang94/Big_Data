<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%

	String path = request.getContextPath();

	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";

	session.invalidate();
	
%>

<!DOCTYPE html>

<html lang="zh-CN">

<head>

    <meta http-equiv="X-UA-Compatible" content="IE=9;IE=8;IE=edge" />

    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />

    <title></title>

    <base href="<%=basePath%>">

    <link rel="icon" href="favicon.ico" type="image/x-icon" />

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

	<link href="css/login.css?v=1.1" rel="stylesheet" type="text/css">

	<!--[if lt IE 8]>

	<script>

		function ie_msg(){

                                        var rst = confirm("提示：为了保证系统的正常运行，请使用IE8或者IE8以上浏览器！");

                                        if(rst){

                                            window.location.href = "${pageContext.request.contextPath}/resources/IE8-WindowsXP-x86.exe";

                                        }

		}

	</script>

	<![endif]-->

	<%@ include file="/tags/jquery-lib.jsp"%>

	<script type="text/javascript">

		if(top!=self){

			if(top.location!=self.location)

			top.location=self.location

		}

	    $.ajax({url:"${pageContext.request.contextPath }/user/to/login.mvc",global:false});

		function toRegister(){

			window.location="${pageContext.request.contextPath}/random";

		}

		//页面初始化加载的js代码

		$(function () {

			if(window.ie_msg){

				ie_msg();

			}
			if ('${homePageFlag}'  == 'jiangan') {
				document.title = "江岸公安卡口大数据查控平台";
				$('html').css('background', 'url(${pageContext.request.contextPath }/images/loginBg_jiangan.png) no-repeat;');
			} else if ('${homePageFlag}'  == 'zhuhai') {
				document.title = "珠海市车辆稽查布控系统";
				$('html').css('background', 'url(${pageContext.request.contextPath }/images/loginBg_zhuhai.png) no-repeat;');
			} else {
				document.title = "综合联网缉查大数据平台";
				$('html').css('background', 'url(${pageContext.request.contextPath }/images/loginBg_all.jpg) no-repeat;');
			}
			$('html').css('background-size', '100% 100%;');

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



				}

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
	<style>
	.loginBox {
		background: url(${pageContext.request.contextPath}/images/txtlogon.png) no-repeat;
		height: 346px;
		width: 362px;
		margin: 0 auto;
	    margin-top: 200px;
	    padding-top: 150px;
	    margin-right: 150px;
	}
	</style>
</head>
<body>
	<div>
		<div class="loginBox">
			<form action="${pageContext.request.contextPath}/user/to/login.mvc" method="post" onkeyup="enterSubmit(event)" style="margin-top: -75px;">
				<div style="height: 42px; clear: both; margin-top: 14px; margin-bottom: 17px;">
					<input class="us" type="text" style="width: 252px; height: 35px; padding-left: 9.99px; margin-right: 39px; margin-left: 13.99px;" name="userName" placeholder="请输入账号" id="userId"  onkeydown="toNext(this.form)"/>
				</div>
				<div style="height: 42px; padding-top: 1px; padding-bottom: 0px; clear: both; margin-top: 14px; margin-bottom: 17px;">
					<input class="pw" type="password" style="height: 34px; padding-bottom: 1.99px; width: 252px; margin-right: 39px;" name="password" placeholder="请输入您的密码…" />
				</div>
				<input type="submit" class="btn1 login" value=""  />
				<div style="clear:both;margin-top:180px;">
					<input type="hidden" value="${message}" id="message"/>
				</div>
			</form>
		</div>
	</div>
	</div>
	<div style="text-align:center;position:absolute;bottom:50px;width:100%;">
	    <div class="copyright" style="margin-top:30px;">版权所有 © 2016 金鹏集团  地址：广州市科学城神舟路9号 联系电话： 020-85571601</div>
	    <br>
	    <div class="copyright">请使用IE8.0以上浏览器，最佳显示分辨率1440×900  <a href = '${pageContext.request.contextPath }/JIT/JITDsignSetup.exe'>控件下载</a></div>
	</div>
	<script>
	/*$('.kpi').hover(function(){
	  $(this).removeClass('kpi-normal').addClass('kpi-hover');
	},function(){
	  $(this).removeClass('kpi-hover').addClass('kpi-normal');
	});
	var href = window.location.href;
	if(/kakou/.test(href)){
		$('#kpiLogin').hide()
		$('#inputLogin').show()
	}*/
	$('.btn1').hover(function(){
		  $(this).removeClass('login').addClass('login-hover');
		},function(){
		  $(this).removeClass('login-hover').addClass('login');
		});
	$('#usernameLogin').click(function(){
	  $('#kpiLogin').hide();
	  $('#inputLogin').show();
	});
	</script>
</body>
</html>



