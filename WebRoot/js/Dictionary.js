Dictionary = function() {
}

Dictionary.prototype = {
    codeDicts:[],
    url : rootpath+"/dictionary/jsonDictsInCombo.mvc",
    
    getValue: function(codeType,codeKey) {
    	var codeList = this.getCodeTypeList(codeType);
		var result = codeKey;
    	for(var i = 0; i < codeList.length; i++ ){
    		if(codeKey == codeList[i].id){
    			result = codeList[i].text;
    			break;
    		}
    	}
    	return result;
    },
    

    getCodeTypeList : function (codeType){
    	var codeList = [];
    	
    	for (var i = 0;i < this.codeDicts.length; i++){
    		if(codeType == this.codeDicts[i].code){
    			codeList.push(this.codeDicts[i]);
    		}
    	}
    	
    	if(codeList.length == 0){
    		//调用ajax请求
    	     Ext.Ajax.request({  
    	        url: this.url,  
    	        async: false,
    	        success: function(response) { 
    	        	//成功  	
    	           var temp=eval("("+response.responseText+")");
     	           var result=temp.data;
    		        for(var i = 0 ;i < result.length ; i++){
    		        	//var ttt=this.dictionary.codeDicts;
    		        	this.dictionary.codeDicts.push(result[i]);
    		        }
    		        codeList = result;
    	        },  
    	        failure: function(response) {  
    	             
    	        },  
    	        params: { code: codeType }  
    	    });  
    		
	    
    	}
    	return codeList ;
    },
    /**
     * 获取常规设置
     * @return 常规设置值
     */
    globalSetting:'',
    getGeneralSetting:function(){
    	//var generalSetting;
    	if(this.globalSetting==''){ 
    	//加载配置参数
		Ext.Ajax.request({
			url : rootpath + '/client/system/jsonLoadGeneralSetting.action',
			scope : this,
			async:false,
			success : function(response, options) {
				json = response.responseText;
				var o = response.responseData || Ext.decode(json);
				if (o && o.success) {
					globalSetting=o.data;
				}
			}
		});
    	}
    	return globalSetting;
    },
    /**
     * 获取告警设置值
     * @return 告警设置值
     */
    alarmtSetting:'',
    getAlarmSetting:function(){
    	if(this.alarmtSetting==''){ 
        	//加载配置参数
    		Ext.Ajax.request({
    			url : rootpath + '/client/system/jsonLoadAlarmSetting.action',
    			scope : this,
    			async:false,
    			success : function(response, options) {
    				json = response.responseText;
    				var o = response.responseData || Ext.decode(json);
    				if (o && o.success) {
    					this.alarmtSetting=o.data;
    				}
    			}
    		});
        	}
        	return this.alarmtSetting;
    },
    /**
     * 更新告警设置
     */
    getAlarmSetUpdate:function(){ 
    	    var alarmtSetUpdate='';
        	//加载配置参数
    		Ext.Ajax.request({
    			url : rootpath + '/client/system/jsonLoadAlarmSetting.action',
    			scope : this,
    			async:false,
    			success : function(response, options) {
    				json = response.responseText;
    				var o = response.responseData || Ext.decode(json);
    				if (o && o.success) {
    					this.alarmtSetUpdate=o.data;
    				}
    			}
    		});
        	
        	return this.alarmtSetUpdate;
    },
    /**
     * 获取图片真是url转换函数
     * @return 返回真实url对象
     * 
     */
    urlSetting:'',
    getUrlSetting:function(imgurl,devId){

    	if(this.urlSetting==''){ 
        	//加载配置参数
    		url=encodeURIComponent(encodeURIComponent(imgurl));
    		Ext.Ajax.request({
    			url : rootpath + "/client/kakou/convertImgUrl.action?imgUrl="+url+"&devDomainId="+devId,
    			scope : this,
    			async:false,
    			success : function(response, options) {
    				json = response.responseText;
    				var o = response.responseData || Ext.decode(json);
    				if (o && o.success) {
    					urlSetting=o.data;
    				}
    			}
    		});
        	}
        	return urlSetting;
    
    },
    /**
     * 获取告警设置值
     * @return 告警设置值
     */
    surveySetting:'',
    getSurveyInfos:function(){
    	if(this.surveySetting==''){ 
    		Ext.Ajax.request({
    			url : rootpath + '/client/check/loadSurveyInfo.action',
    			scope : this,
    			async:false,
    			success : function(response, options) {
    				json = response.responseText;
    				var o = response.responseData || Ext.decode(json);
    				if (o && o.success) {
    					this.surveySetting=o.data;
    				}
    			}
    		});
    	}
    	return this.surveySetting;
    }
   
 }
 


 
 
 