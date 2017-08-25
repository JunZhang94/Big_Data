var initParam="<?xml version=\"1.0\" encoding=\"utf-8\"?><authinfo><liblist><lib type=\"CSP\" version=\"1.0\" dllname=\"\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib><lib type=\"SKF\" version=\"1.1\" dllname=\"bXRva2VuX2dtMzAwMF9KSVQuZGxs\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib><lib type=\"SKF\" version=\"1.1\" dllname=\"SERfR01DQUlTLmRsbA==\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib><lib type=\"SKF\" version=\"1.1\" dllname=\"U2h1dHRsZUNzcDExXzMwMDBHTS5kbGw=\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib><lib type=\"SKF\" version=\"1.1\" dllname=\"SklUR01LRVlfU0pLMTQyNC5kbGw=\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib><lib type=\"SKF\" version=\"1.1\" dllname=\"U0tGQVBJLmRsbA==\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib></liblist></authinfo>";
var deftype="";
var steps={
	"first":{"name": "Initialize","p1":initParam},
	"Initialize":{"name": "SetCertChooseType","p1":0},
	"SetCertChooseType":{"name": "SetCert","p1":"SC","p2":"","p3":"","p4":"","p5":"","p6":""},
	"SetCert":{"name": "P1SignStr","p1":"","p2":""},
	"P1SignStr":{"name": "Finalize"},
	"AttachSignStr":{"name": "Finalize"},
	"DetachSignStr":{"name": "Finalize"},
	"ErrorMsg":{"name": "GetErrorMessage","p1":0}
};
//obj格式{}
function sign(ori,inp,type,cb){
	var errormsg = false;//错误提示
	var errornum = "";//错误码
	if(!ori) return;//不传对象提示错误
	steps["first"].p1=inp;//更换初始化参数的值
	changeType(type);//更换签名类型
	var port=chrome.runtime.connect("djecflencmelegbbemkcoolabllaeeka");
	var message=steps.first;
	port.postMessage(message);//发送初始化请求
	port.onMessage.addListener(function(o) {
		var r=JSON.parse(o);
		if(errormsg){
			cb(null,"错误码："+errornum+" 错误信息："+r.value);
			port.disconnect();
			return;
		}
		if (r.error!=0){//处理错误
			message=steps.ErrorMsg;
			message.p1=r.error;
			errornum = r.error;
			errormsg = true;

		}else{
			message=steps[message.name];			
		}
		if(!message){
			port.disconnect();
			return;
		}
		if (message.name==deftype){//如果是签名方法,将传入的原文赋值给p2
			message.p2=ori;
		}
		if (message.name=="Finalize"){
			cb(r.value);
		}
		port.postMessage(message);
	});
}
function changeType(type){
	deftype=type;
	steps["SetCert"].name=deftype;
}