
/**
** 重置IE窗口高度
**/
function setSize(){
	var h =GetIEVersion();
	var hei=(parseInt(tav.offsetHeight)+h) + "px";
	var w=(parseInt(tav.offsetWidth)+h) + "px";
	window.dialogHeight=hei+"px";
}

  	/*
 * 获取ie版本 然后返回要调整的高度,窗口调整大小用
 * */
function GetIEVersion(){
	var ua = navigator.userAgent.toLowerCase();
   	var s= ua.match(/msie ([\d.]+)/)[1]
    var hei=0;
    if(s=='6.0'){
    	hei=55
    }
	return hei;
}

//替换全部
String.prototype.replaceAll  = function(s1,s2){   
return this.replace(new RegExp(s1,"gm"),s2);   
}  

//prototype中的$方法
function GetObj() {
  var elements = new Array();
  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);
    if (arguments.length == 1)
      return element;
    elements.push(element);
  }
  return elements;
}

var AllWINDOW=[];
/*
** 函数: SystemWindow
** 输入: url,width,height
** 输出: handle
** 描述: 开窗
*/
function SystemWindow(url,width,height,name,resizable)
{	
	var left, top;
	if(IsEmpty(width))width=screen.width;//如果没给宽度，则以屏幕宽度
	if(IsEmpty(height))height=screen.height;//如果没给高度，则以屏幕高度
	if(IsEmpty(resizable)){resizable="yes";}//如果没给是否重置大小，则默认可以
	left = parseInt((screen.width - width)/2);
	top  = parseInt((screen.height - height)/2);
	var newWindown= window.open(url, "", "top="+top+",left="+left+",width="+width+",height="+height+",location=no,scrollbars = no,resizable="+resizable);
	/*
	//给新窗口命名
	if(!IsEmpty(name))
		newWindown.name=name;
	//当前窗口保存子窗口
	AllWINDOW.push(newWindown);
	//保存所有子窗口
	var parent=newWindown;
	while(!IsEmpty(parent.opener)){
		if(!IsEmpty(parent.AllWINDOW))
			parent.AllWINDOW.push(newWindown);
		parent=parent.opener;
	}	
	*/
	//返回当前窗口
	return newWindown;
}

//打开一个新窗口,如果不指定宽高,则会全屏打开
function WindowOpen(url,width,height,name){
    var left, top,width,height;
    width=width||window.screen.availWidth;
    height=height||window.screen.availHeight;
    left = (window.screen.availWidth-width)/2;
    top  = (window.screen.availHeight-height)/2;
    var newWindown = window.open(url, "_blank", "top="+top+",left="+left+",width="+width+",height="+height+",location=no,resizable=yes,scrollbars=yes");
	newWindown.resizeTo(screen.availWidth,screen.availHeight); 
	//给新窗口命名
	if(!IsEmpty(name))
		newWindown.name=name;
	//当前窗口保存子窗口
	AllWINDOW.push(newWindown);
	//保存所有子窗口
	var parent=newWindown;
//	while(!IsEmpty(parent.opener)){
//		if(!IsEmpty(parent.AllWINDOW))
//			parent.AllWINDOW.push(newWindown);
//		parent=parent.opener;
//	}	
	//返回当前窗口
	return newWindown;
}

//resize为no，表示不能最大化
function WindowOpenDetail(url,width,height,name,resize){
    var left, top,width,height;
    width=width||window.screen.availWidth;
    height=height||window.screen.availHeight;
    left = (window.screen.availWidth-width)/2;
    top  = (window.screen.availHeight-height)/2;
    var newWindown = window.open(url, "_blank", "top="+top+",left="+left+",width="+width+",height="+height+",location=no,resizable="+resize+",scrollbars=yes");
	//newWindown.resizeTo(screen.availWidth,screen.availHeight); 
	//给新窗口命名
	if(!IsEmpty(name))
		newWindown.name=name;
	//当前窗口保存子窗口
	AllWINDOW.push(newWindown);
	//保存所有子窗口
	var parent=newWindown;
//	while(!IsEmpty(parent.opener)){
//		if(!IsEmpty(parent.AllWINDOW))
//			parent.AllWINDOW.push(newWindown);
//		parent=parent.opener;
//	}	
	//返回当前窗口
	return newWindown;
}

/*
**单例开窗
**url,width,height,name,resizable
**singleType=1：如果已有该窗口，是否提示重新加载，0代表不提示，1代表提示，2代表不提示也不重新加载
*/
function SystemSingleWindow(url,name,singleType,content,width,height,resizable){
	var win=null;
	for(var i=(AllWINDOW.length-1);i>=0;i--){
		if(!IsEmpty(AllWINDOW[i])&&AllWINDOW[i].closed){//如果已经关闭
			AllWINDOW.splice(i,1);
		}else if(!IsEmpty(AllWINDOW[i])&&!AllWINDOW[i].closed){//如果未关闭
			if(AllWINDOW[i].name==name){//如果是要找的窗体
				win=AllWINDOW[i];
				if((singleType+'')=='1'){
					win.focus();
					content=(IsEmpty(content))?"已填内容还未保存，确定不保存？":content;
					if(confirm(content))
						SysReLoadByUrl(win,url);//重新加载
				}else if((singleType+'')=='0'){
					SysReLoadByUrl(win,url);//重新加载
				}
				break;
			}
		}
	}
	if(win==null)//第一次开窗时
		win=SystemWindow(url,width,height,name,resizable);
	else
		win.focus();
	return win;
}

//重置窗口url
function SysReLoadByUrl(win,url){
	win.location.href=url;
}

/**
*关闭所有子窗口
*返回关掉窗口的数量
*/
function SystemCloseWin(){
	var cnt=0;
	for(var i=AllWINDOW.length-1;i>=0;i--){
		if(!IsEmpty(AllWINDOW[i])&&!AllWINDOW[i].closed){
			AllWINDOW[i].close();
			cnt++;
		}
	}
	return cnt;
}

/*
** 函数: SystemModelessDialog
** 输入: url,width,height
** 输出: handle
** 描述: 弹出非模式窗口
*/
function SystemModelessDialog(url,width,height,dailogArgs)
{
	return window.showModelessDialog(url, dailogArgs, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:no;resizable:yes;scroll:no;status:no");
}

/*
** 函数: SystemModalDialog
** 输入: url,width,height
** 输出: handle
** 描述: 弹出模式窗口
*/
function SystemModalDialog(url,width,height,dailogArgs,resizable)
{
	//判断浏览器版本
	if(GetBrowserType()== 'IE 6.0'){
		height += 50;
	}
	if(IsEmpty(resizable))resizable='yes';
	return window.showModalDialog(url, dailogArgs, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:no;resizable:"+resizable+";scroll:no;status:no");
}

/*
** 函数: SystemIsEmpty
** 输入: str
** 输出: bool
** 描述: 验证字符串是否为空
*/
function SystemIsEmpty(str)
{
	var regExp = /^\s*$/;
	if (str == null) return true;
	if (regExp.test(str)) return true;
	return false;
}

/*
**如果对象未定义，或者为空，或者是空字符串，返回真，否则返回假
*/
function IsEmpty(obj){
	if(typeof(obj)=="undefined"||obj==null||(typeof(obj)!="object"&&(obj+"").replace(/ /g,"")=="")){//||obj.length==0
		return true;
	}
	return false;
}

/*
** 函数: SystemTrim
** 输入: str
** 输出: string
** 描述: 去除字符串首尾空格
*/
function SystemTrim(str)
{
	var
		regExp = /(^\s*)|(\s*$)/;

	return str.replace(regExp,"");
}
/**
**获取浏览器类型与版本
**/
function GetBrowserType(){
		var browserType = "";
		navigator.appName 
        var ua = navigator.userAgent.toLowerCase();
        if (window.ActiveXObject)
            browserType ="IE "+ ua.match(/msie ([\d.]+)/)[1]
        else if (document.getBoxObjectFor)
            browserType ="FIREFOX "+ ua.match(/firefox\/([\d.]+)/)[1]
        else if (window.MessageEvent && !document.getBoxObjectFor)
            browserType ="CHROME "+ ua.match(/chrome\/([\d.]+)/)[1]
        else if (window.opera)
            browserType ="OPERA "+ ua.match(/opera.([\d.]+)/)[1]
        else if (window.openDatabase)
            browserType ="SAFARI "+ ua.match(/version\/([\d.]+)/)[1];
        return browserType;
}


/**
**算出一个对象的绝对位置
**/ 
	function position(obj){
		var left = 0;
		var top = 0;
		while (obj != document.body) {
			left += obj.offsetLeft;
			top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {x:left,y:top};
	}


/**
 * 修改成功并刷新列表后，让原选中行重新选中
 * treelist对象,主键Id名称,主键Id值,页面信息条数。
 * 比如setSelectedItem(document.all.powerPortList,"iPortId",index,jsonData.length);
 * 
 */
function setSelectedItem(treeListObj,idName,idValue,pageSize){
	for(var i=0;i<pageSize;i++){
		var str=eval("treeListObj.items["+i+"]."+idName);
		if(str==idValue){
			eval("treeListObj.items["+i+"].setSelected()");
			break;
		}
	}
}

/**
**form转换json,仅限于简单表单转换
**/
function form2Json(formId)
{
	var form = document.getElementById(formId);
	var count = form.elements.length;
	var json = {};
	for(var i = 0;i < count;i++)
	{
		var ele = form.elements[i];
		if(ele == null) continue;
		var tagName = ele.tagName;
		var name = ele.name;
		if(name == null || name == '') continue;
		var value = ele.value;
		eval("json."+name+"='"+value+"'");	
	}
	return json;
}
/**
 * form参数转换json
 * @param formId
 * @return
 */
function serializeForm(formId) {
    var arrayValue = $(formId).serializeArray();
    var json = {};
    $.each(arrayValue, function () {
        var item = this;
        if (json[item["id"]]) {
            json[item["name"]] = json[item["name"]] + "," + item["value"];
        }
        else {
            json[item["name"]] = item["value"];
        }
    });
    return json;
}

/*
** 函数: SystemGet
** 输入: sUrl
** 输出: obj
** 描述: 向服务器以get的方式提交内容
*/
function SystemGet(sUrl)
{
	var objXMLHttp = GetXMLHTTPPoint();
	if (objXMLHttp)
	{
		objXMLHttp.open("GET", sUrl, false);
		objXMLHttp.send(null);

		var objXMLDoc = GetXMLDOM();
		if (objXMLDoc)
		{
			try
			{
				objXMLDoc.loadXML(objXMLHttp.responseXML.xml);
				var root = objXMLDoc.documentElement;
				return {tipFlag : parseInt(GetXmlText(root.childNodes[0], "0"), 10), tipContent : GetXmlText(root.childNodes[1], "")};
			}catch(e){}
		}
	}
	return {tipFlag : 0, tipContent : '获取返回数据失败'};
}

/*
** 函数: SystemCheckEmail
** 输入: email
** 输出: bool
** 描述: 验证电子邮件的格式是否正确
*/
function SystemCheckEmail(email)
{
	var
		regExp = /^\S+@\S+\.\w{2,4}$/gi;

	email = SystemTrim(email);
	if (regExp.test(email)) return true;
	return false;
}

/*
** 函数: SystemCheckAccount
** 输入: str
** 输出: bool
** 描述: 验证登录帐号是否为5到15位的字符
*/
function SystemCheckAccount(str)
{
	var
		regExp = /^\w{5,15}$/gi;

	str = SystemTrim(str);
	if (regExp.test(str)) return true;
	return false;
}

/*
** 函数: SystemCheckMinLength
** 输入: str,len
** 输出: bool
** 描述: 验证字符串长度是否小于len
*/
function SystemCheckMinLength(str,len)
{
	str = SystemTrim(str);
	if (str.length < len) return true;
	return false;
}

/*
** 函数: SystemCheckMaxLength
** 输入: str,len
** 输出: bool
** 描述: 验证字符串长度是否大于len
*/
function SystemCheckMaxLength(str,len)
{
	str = SystemTrim(str);
	if (str.length > len) return true;
	return false;
}

/*
** 函数: SystemCheckPicExt
** 输入: pic
** 输出: bool
** 描述: 验证图片扩展名是否在接受范畴
*/
function SystemCheckPicExt(pic)
{
	pic=pic.substring(pic.lastIndexOf(".")+1,pic.length).toUpperCase();
	switch(pic)
	{
		case "BMP": return true;break;
		case "JPEG": return true;break;
		case "JPG": return true;break;
		case "GIF": return true;break;
		case "PNG": return true;break;
	}
	return false;
}

/*
** 函数: SystemShowSelect
** 输入: select,value
** 输出: void
** 描述: 
*/
function SystemShowSelect(select,value)
{
	var i = 0;

	for (i = 0; i < select.options.length; i++)
	{
		if (select.options[i].value == value)
		{
			select.options[i].selected = true;
			break;
		}
	}
}

/*
** 函数: GetXMLHTTPPoint
** 输入: 
** 输出: 
** 描述: 获取XMLHTTP的句柄
*/
function GetXMLHTTPPoint()
{
	var pXMLHTTP = null;

	try
	{
		pXMLHTTP = new ActiveXObject("Msxml2.XMLHTTP") ;
	}catch(e)
	{
		try
		{
			pXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e)
		{
			pXMLHTTP = null;
		}
	}

	if (!pXMLHTTP && typeof(XMLHttpRequest) != "undefined") pXMLHTTP = new XMLHttpRequest();

	return pXMLHTTP;
}

/*
** 函数: GetXMLDOM
** 输入: 
** 输出: 
** 描述: 获取XMLDOM对象句柄
*/
function GetXMLDOM()
{
	var pXMLDOM = null;

	try
	{
		pXMLDOM = new ActiveXObject("Microsoft.XMLDOM");
		pXMLDOM.async = false;
	}catch(e)
	{
		pXMLDOM = null;
	}

	return pXMLDOM;
}

/*
** 函数: GetXmlText
** 输入: url, content
** 输出: 
** 描述: 取得XML结点文字
*/
function GetXmlText(pNode, sDefaultValue)
{
	var sValue = "";
	try
	{
		switch(pNode.childNodes[0].nodeType)
		{
			case 3 :
				sValue = pNode.childNodes[0].text;
			break;
			case 4 :
				sValue = pNode.childNodes[0].nodeValue;
			break;
		}
	}catch(e){alert(e.description);}

	if (sValue == null || SystemIsEmpty(sValue)) sValue = sDefaultValue;
	sValue = SystemTrim(sValue);
	return sValue;
}

/*
** 函数: SystemPost
** 输入: url, content
** 输出: 
** 描述: 向服务器以post的方式提交内容
*/
function SystemPost(url, content)
{
	var objXMLHttp = GetXMLHTTPPoint();
	if (objXMLHttp)
	{
		objXMLHttp.open("POST", url, false);
		objXMLHttp.setRequestHeader("Content-Length", content.length); 
		objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		objXMLHttp.setRequestHeader("Connection", "Keep-Alive");
		objXMLHttp.send(content);

		var objXMLDoc = GetXMLDOM();
		if (objXMLDoc)
		{
			try
			{
				objXMLDoc.loadXML(objXMLHttp.responseXML.xml);
				var root = objXMLDoc.documentElement;
				return {tipFlag : parseInt(GetXmlText(root.childNodes[0], "0"), 10), tipContent : GetXmlText(root.childNodes[1], "0")};
			}catch(e){}
		}
	}
	return {tipFlag : 0, tipContent : '获取返回数据失败'};
}


function SystemPost2(url, content)
{
	if (content.length == 0) return false;
	var ret_msg = "";
	var postAction = new ActiveXObject("Microsoft.XMLHTTP");
	postAction.open("POST", url, false);
	//postAction.setRequestHeader("Content-Type", "text/html; charset=gb2312");
	postAction.setRequestHeader("Content-Length", content.length); 
	postAction.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	postAction.setRequestHeader("Connection", "Keep-Alive");
	//postAction.setRequestHeader("enctype","multipart/form-data");
	postAction.send(content);
	ret_msg = postAction.responseText;
	return ret_msg;
//	mb_covent_encode
}

/*
** 类  : SystemXmlObject
** 输入: url
** 输出: 
** 描述: 返回对象句柄
*/
function SystemXmlObject(sUrl)
{
	var objXMLHttp = GetXMLHTTPPoint();
	if (objXMLHttp)
	{
		objXMLHttp.open("GET", sUrl, false);
		objXMLHttp.send(null);

		var objXMLDoc = GetXMLDOM();
		if (objXMLDoc)
		{
			try
			{
				objXMLDoc.loadXML(objXMLHttp.responseXML.xml);
				return objXMLDoc.documentElement;
			}catch(e){}
		}
	}
	return null;
}

/*
** 函数: GetMonthFirstDay
** 输入: void
** 输出: string
** 描述: 返回当前月的第一天
*/
function GetMonthFirstDay()
{
	var 
		date = new Date(),
		iMonth = date.getMonth() + 1,
		sMonth = "";
	sMonth = (iMonth < 10) ? "0" + iMonth : iMonth;
	return date.getYear() + "-" + sMonth + "-" + "01";
}

/*
** 函数: GetMonthLastDay
** 输入: void
** 输出: string
** 描述: 返回当前月的当前一天
*/
function GetMonthLastDay()
{
	var 
		date = new Date(),
		iMonth = date.getMonth() + 1,
		iLastDay = date.getDate(),
		sLastDay = "",
		sMonth = "";
	sMonth = (iMonth < 10) ? "0" + iMonth : iMonth;
	sLastDay = (iLastDay < 10) ? "0" + iLastDay : iLastDay;
	return date.getYear() + "-" + sMonth + "-" + sLastDay;
}

/*
** 函数: SystemCancelEvent
** 输入: void
** 输出: bool
** 描述: 返回假
*/
function SystemCancelEvent()
{
	return false;
}

function ToExcel()
{
	var sPostContent = ContainId.innerHTML;
	var sTmp  = ContainId.innerHTML;
	var reg1 = /<a (.*)>(.*)<\/a>/gi;
	var reg2 = /width="(.*)"/gi;
	var reg4 = /<img (.*?)src=\\?\"(.*?)\"(.*?)>/gi;
	var reg5 = /(\<script.*\>)(.[^\[]*?)(\<\/script\>)/ig;
	sPostContent=sPostContent.replace(reg4,"<img $1 src=$2 $3>");
	sPostContent=sPostContent.replace(reg5, "");
	sPostContent = sPostContent.replace(reg1, "$2");
	sPostContent = sPostContent.replace(reg2, "width=$1");
	ContainId.innerHTML = sPostContent;

	try
	{
		var oXL = new ActiveXObject("Excel.Application");
		var oWB = oXL.Workbooks.Add();
		var oSheet = oWB.ActiveSheet; 
		var sel=document.body.createTextRange();
		sel.moveToElementText(ContainId);
		sel.select();
		sel.execCommand("Copy");
		oSheet.Paste();
		oXL.Visible = true;
	}catch(e){alert(e.description)}

	ContainId.innerHTML = sTmp;
}
     
function ToWord()
{
	var sPostContent = ContainId.innerHTML;
	var sTmp  = ContainId.innerHTML;
	var reg1 = /<a (.*)>(.*)<\/a>/gi;
	var reg2 = /width="(.*)"/gi;
	var reg4 = /<img (.*?)src=\\?\"(.*?)\"(.*?)>/gi;
	var reg5 = /(\<script.*\>)(.[^\[]*?)(\<\/script\>)/ig;
	sPostContent=sPostContent.replace(reg4,"<img $1 src=$2 $3>");
	sPostContent=sPostContent.replace(reg5, "");
	sPostContent = sPostContent.replace(reg1, "$2");
	sPostContent = sPostContent.replace(reg2, "width=$1");
	ContainId.innerHTML = sPostContent;

	try
	{
		var oWD = new ActiveXObject("Word.Application");
		var oDC = oWD.Documents.Add("",0,1);
		var oRange =oDC.Range(0,1);
		var sel = document.body.createTextRange();
		sel.moveToElementText(ContainId);
		sel.select();
		sel.execCommand("Copy");
		oRange.Paste();
		oWD.Application.Visible = true;
	}catch(e){alert(e.description)}

	ContainId.innerHTML = sTmp;
}
     
function CellAreaExcel(tabId)
{
	try
	{
		var oTable = eval(tabId);
		var oXL = new ActiveXObject("Excel.Application");
		var oWB = oXL.Workbooks.Add();
		var oSheet = oWB.ActiveSheet;
		var Lenr = oTable.rows.length;
		for (i=0;i<Lenr;i++)
		{
			var Lenc = oTable.rows(i).cells.length;
			for (j=0;j<Lenc;j++)
			{
				oSheet.Cells(i+1,j+1).value = oTable.rows(i).cells(j).innerText;
			}
		}
		oXL.Visible = true;
	}catch(e){alert(e.description)}
}


/*
**说明：为了能让输入错误的日期后，能弹出错误提示，添加此函数 －－－by Jiazhizhong
**函数：CheckDate(date),date指日期控件
**描述：对日期文本框中的内容及格式进行判断
*/
function OnCheckDate(e)
{
	if(SystemIsEmpty(e.value))
	{
		alert("时间不能为空!设为当前时间\n正确格式为:2008-01-01 00:00:00");
		var d = new Date();
		e.value=d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	}
	var monthOfDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var sReason = "";
	var sDateTime = "";
	var reg=/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	if(reg.test(e.value))
	{
		var year = parseInt(RegExp.$1,10);
		var month = parseInt(RegExp.$3,10);
		var day = parseInt(RegExp.$4,10);
		var hour = parseInt(RegExp.$5,10);
		var minute = parseInt(RegExp.$6,10);
		var second = parseInt(RegExp.$7,10);
		if (!(month>0 && month<13))
		{
			sReason += "月份输入错误！";
		}
		if (!(day>0 && day<= monthOfDays[month-1]))
		{
			sReason += "天数输入错误！";
		}
		if (!(hour>=0 && hour<24))
		{
			sReason += "小时输入错误！";
		}
		if (!(minute>=0 && minute<60))
		{
			sReason += "分钟输入错误！";
		}
		if (!(second>=0 && second<60))
		{
			sReason += "秒数输入错误！";
		}									
	}
	else
	{
		sReason = "日期格式不正确!设为当前时间\n正确格式为:2004-01-01 00:00:00";
		var d = new Date();
		e.value=d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	}
	if(sReason)
	{
		alert(sReason);
		e.focus();
		return false;
	}
	else
	{
		month = (month < 10) ? '0' + month : month,
		day = (day < 10) ? '0' + day : day,
		hour = (hour < 10) ? '0' + hour : hour,
		minute = (minute < 10) ? '0' + minute : minute,
		second = (second < 10) ? '0' + second : second;	
		sDateTime += year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
		e.value=sDateTime;
		return true;
	}	
}
function CheckDate(date)
{
	var Flag = "";
	var Reg = /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})\s([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
	if(Reg.test(date.value))
	{
		if (parseInt(RegExp.$1,10)<2000)
		{
			Flag += "年份输入错误(请输入大于2000年整数)！";
		}
		if (!(parseInt(RegExp.$2,10)>0 && parseInt(RegExp.$2,10)<13))
		{
			Flag += "月份输入错误！";
		}
		if (!(parseInt(RegExp.$3,10)>0 && parseInt(RegExp.$3,10)<32))
		{
			Flag += "天数输入错误！";
		}
		if (!(parseInt(RegExp.$4,10)>=0 && parseInt(RegExp.$4,10)<25))
		{
			Flag += "小时输入错误！";
		}
		if (!(parseInt(RegExp.$5,10)>=0 && parseInt(RegExp.$5,10)<61))
		{
			Flag += "分钟输入错误！";
		}
		if (!(parseInt(RegExp.$6,10)>=0 && parseInt(RegExp.$6,10)<61))
		{
			Flag += "秒数输入错误！";
		}										
	}
	else
	{
		Flag = "日期格式错误!";
	}
	if(Flag)
	{
		alert(Flag);
		date.focus();
		return false;
	}
	else
		return true;
}
/*
**函数：Check
**描述：对日期文本框中的内容及格式进行判断
*/
function CheckCanlendar(str)
{
	var Flag = "";
	var Reg = /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})\s([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
	if(Reg.test(str))
	{
		if (parseInt(RegExp.$1,10)<2000)
		{
			Flag += "年份输入错误！";
		}
		if (!(parseInt(RegExp.$2,10)>0 && parseInt(RegExp.$2,10)<13))
		{
			Flag += "月份输入错误！";
		}
		if (!(parseInt(RegExp.$3,10)>0 && parseInt(RegExp.$3,10)<32))
		{
			Flag += "天数输入错误！";
		}
		if (!(parseInt(RegExp.$4,10)>=0 && parseInt(RegExp.$4,10)<25))
		{
			Flag += "小时输入错误！";
		}
		if (!(parseInt(RegExp.$5,10)>=0 && parseInt(RegExp.$5,10)<61))
		{
			Flag += "分钟输入错误！";
		}
		if (!(parseInt(RegExp.$6,10)>=0 && parseInt(RegExp.$6,10)<61))
		{
			Flag += "秒数输入错误！";
		}										
	}else
	{
		Flag = "<font color='red'>日期格式错误！</font>";
	}
	if(Clew1)
	{
		if(Flag!="" && str!="")
			Clew1.innerHTML=Flag;
		else
			Clew1.innerHTML="";
	}
}

/*
** 函数: SystemPostValue
** 输入: sValue
** 输出: string
** 描述: 把&替换成[_!-]
*/
function SystemPostValue(sValue)
{
	return sValue.replace(/&/g, "[_!-]");
}

//导出报表时，表单提交到的IFRAME
function ExportIframe()
{
	var sIFrameName = 'ExportFrame';
	var pIFrame = document.getElementById(sIFrameName);
	if(pIFrame) document.body.removeChild(pIFrame);
	if(/msie/i.test(navigator.userAgent))
	{
		pIFrame = document.createElement('<iframe id="' + sIFrameName + '" name="' + sIFrameName + '">');
	}
	else
	{
		pIFrame = document.createElement('iframe');
		pIFrame.id = sIFrameName;
		pIFrame.name = sIFrameName;
	}
	with(pIFrame)
	{
		width = '0';
		height = '0';
		style.display = 'none';
		scrolling = 'no';
		src = 'about:blank';
	}
	return pIFrame;
}

/*
** 函数: GetAttribute
** 输入: pNode, sKey, sDefaultValue
** 输出: 
** 描述: 取得属性值
*/
function GetAttribute(pNode, sKey, sDefaultValue)
{
	var sAttribute = "";

	try
	{
		sAttribute = pNode.getAttribute(sKey);
	}catch(e){alert(e.description);}

	if (sAttribute == null || SystemIsEmpty(sAttribute)) sAttribute = sDefaultValue;
	sAttribute = SystemTrim(sAttribute);
	return sAttribute;
}
/*
** 函数: GetXmlUrl
** 输入: sUrl
** 输出: 
** 描述: 取得XML句柄
*/
function GetXmlUrl(sUrl)
{
	try
	{
		pXMLHTTP = GetXMLHTTPPoint();
		if (pXMLHTTP)
		{
			pXMLHTTP.open("GET", sUrl, false);
			pXMLHTTP.send(null);
			pXMLDOM = GetXMLDOM();
			if (pXMLDOM)
			{
				pXMLDOM.loadXML(pXMLHTTP.responseXML.xml);
				return pXMLDOM.documentElement;
			}
		}
	}catch(e){alert(e.description)}
	return null;
}

//过滤特殊字符
function filterStr(strValue){
    strValue = strValue.replace(/%/g,'％');
    strValue = strValue.replace(/&/g,'＆');
    strValue = strValue.replace(/</g,'＜');
    strValue = strValue.replace(/>/g,'＞');
    strValue = strValue.replace(/#/g,'＃');
    strValue = strValue.replace(/'/g,'‘');
    return strValue;
}

// 权限检证
function validateStaffRight(iStaffId,NodeId)                    
{
	Ext.Ajax.request({
     url: path+'/login.do',
     sync: false,                   //true表是异步，false表示同步，不配置该属性则默认（异步）
     params: {
         action: 'validateRight',
		 iStaffId: iStaffId,
		 NodeId: NodeId
     },     
     method: 'POST',
     callback: function(opts, success, response) 
     {
         if(success) 
         {   
            var jsonData = Ext.util.JSON.decode(response.responseText);
            return jsonData;
         }
         else
         {  
           Ext.MessageBox.alert("提示信息","请求失败!"); 
         }
     }
  });
}


/**
**导出
**URL : 导出时获取数据路径
**headConfig : 表头配置格式[{name:'',text:'',width:''},{...}]
**queryForm : 查询表单ID
**contextPath : contextpath
**/
function exportList(url,headConfig,queryForm,contextPath)
{	
	var form = {};
	if(typeof(queryForm) === 'string')
		form = form2Json(queryForm);
	else if(typeof(queryForm) === 'object')
		form = queryForm;
	else return;

	form.pageNo = 1;
	form.limit = 1000;
	var data = [];
	var returnHtml = "";
	if(!confirm("提示：一次最多只能导出1000条记录，继续请按“确定”。"))return;
	AjaxRequest.doRequest(null, url,form, function(backData){
		backData = backData.replace(/<p>/gi,'');
		backData = backData.replace(/<\\\/p>/gi,'');
		backData = backData.replace(/<br \/>/gi,'');
		data = Ext.util.JSON.decode(backData);
		transEnum(data);
		var tableHtml = "<table border=1 style=\"font-size:14px\"><tr style=\"font-weight:600;height:25px\">";
		for(var i = 0;i < headConfig.length;i++)
		{
			config = headConfig[i];
			var text = config.text;
			var width = config.width;
			tableHtml += "<td width='"+width+"' style='background-color:#0099FF;'>";
			tableHtml += text;
			tableHtml += "</td>";
		}
		tableHtml += "</tr>";
		for(var i = 0;i < data.length;i++)
		{
			var row = "<tr>";
			for(var j = 0;j < headConfig.length;j++)
			{
				row += "<td>";
				var name = headConfig[j].name;
				var content = eval("data[i]."+name);
				if(content=="null"||content==null)content="";
				row += "&nbsp;"+content;
				row += "</td>";
			}
			row += "</tr>";
			tableHtml += row;
		}
		tableHtml += "</table>";
		document.getElementById('sContent').value = tableHtml;
		document.getElementById('excelform').submit();
	});
	return returnHtml;
}

/**
 * 取到htc控件的表头
 */
function YWGetInfo(listName,resName){
	var allItems=document.getElementById(listName).checkedItems;
	
	var list = document.getElementById(listName);
	var value='';
	for(var k=0;k<allItems.length;k++){	//遍历多个对象
		if(k>0){
			value+="<br>";
		}
		var items=allItems[k];
		value=value+"<br>" ;
		var i=0;
		var j=0;
		for(var p in items){	//遍历对象属性
			
			if(typeof ( items [ p ]) != "function"){
				if(i<3){
					i++
					continue;
				}
				if(list.getDisplayText(j)==undefined){
					continue;
				}
				if(items [ p ]==undefined){
					items [ p ]="";
				}
				if(j>0){
					value+="<br>";
				}
				value +="【"+ list.getDisplayText(j) + "】:" + items [ p ]+""  ;
				j++;
			}
		}
		value+="";
	}
	value=resName+": "+value;
	return value;
}

//清空选择框
function reSetSelect(arrays)
		{	
		  if(!arrays)
		  {
		    return;
		  }		  
		  for(var i=0;i<arrays.length;	i++)
		  {
		     document.getElementById(arrays[i]).value="";
		  }
		}
		

//翻译枚举值
function transEnum(jsonData){
	for(var i = 0; i < jsonData.length; i++){
		traverseTree(jsonData[i]);	
	}
}

//递归遍历权限树
function traverseTree(tree) { 
	transValue(tree,'logType','iLogType');
	transValue(tree,'rightAppFor','iAppFor');
    var children = tree.children;   
    if (children != null) {   
        for(var n = 0; n < children.length; n++){
        	traverseTree(children[n]);
        }
    }  
}  

function transValue(tree,name,id)
{
	EnumRequest.getEnum(name, function(data){
  		if(data == null) return;
		for(var j = 0; j < data.length; j++){
			if(data[j].id == tree[id]){
				tree[id] = data[j].text;
				break;
			}
		}
	});
}

function getDicItem(target, dic){
    param = {
        enumcode: dic
    };
    AjaxRequest.doRequest('', ctx + '/commons/common!getEnum.action', param, function(backData){
		$(target).yhDropDown({
            json: backData,
            checkbox: true,
            noChild: true, //没有子节点时设置
            post:"id",
            createdTree: function( e, tree ){
				var $north = $("div.layout-panel-north");
				$north.length && $north.eq(0).css("overflow","visible");
			}
        });
    });
}
