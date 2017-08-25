/**
 * Javascript公共封装
 * Date: 12-9-3
 */
commonJs = function(){
    return {
        /********************************************************************************************************************************/
        /**
         * javascript版HashMap
         * @constructor
         */
        HashMap: function(){
            var size = 0;
            var entry = new Object();
            
            
            this.put = function(key, value){
                entry[key] = value;
                size++;
            };
            
            this.putAll = function(map){
                if (typeof map == "object" && !map.sort) {
                    for (var key in map) {
                        this.put(key, map[key]);
                    }
                }
                else {
                    throw "输入类型不正确，必须是HashMap类型！";
                }
            };
            
            this.get = function(key){
                return entry[key];
            };
            
            this.remove = function(key){
                if (size == 0) 
                    return;
                delete entry[key];
                size--;
            };
            
            this.containsKey = function(key){
                if (entry[key]) {
                    return true;
                }
                return false;
            };
            
            this.containsValue = function(value){
                for (var key in entry) {
                    if (entry[key] == value) {
                        return true;
                    }
                }
                return false;
            };
            
            this.clear = function(){
                entry = new Object();
                size = 0;
            };
            
            this.isEmpty = function(){
                return size == 0;
            };
            
            this.size = function(){
                return size;
            };
            
            this.keySet = function(){
                var keys = new Array();
                for (var key in entry) {
                    keys.push(key);
                }
                return keys;
            };
            
            this.entrySet = function(){
                var entrys = new Array();
                for (var key in entry) {
                    var et = new Object();
                    et[key] = entry[key];
                    entrys.push(et);
                }
                return entrys;
            };
            
            this.values = function(){
                var values = new Array();
                for (var key in entry) {
                    values.push(entry[key]);
                }
                return values;
            };
            
            this.each = function(cb){
                for (var key in entry) {
                    cb.call(this, key, entry[key]);
                }
            };
            
            this.toString = function(){
                return obj2str(entry);
            };
            
            function obj2str(o){
                var r = [];
                if (typeof o == "string") 
                    return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
                if (typeof o == "object") {
                    for (var i in o) 
                        r.push("\"" + i + "\":" + obj2str(o[i]));
                    if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                        r.push("toString:" + o.toString.toString());
                    }
                    r = "{" + r.join() + "}";
                    return r;
                }
                return o.toString();
            }
            
        },
        /**
         * post传递参数的window.open方式,依赖jquery
         * @param url
         * @param data
         * @param name
         */
        openPostWindow: function(url, data, name){
            var tempForm = document.createElement("form");
            tempForm.id = "tempForm";
            tempForm.method = "post";
            tempForm.action = url;
            tempForm.target = name;
            
            var hideInput = document.createElement("input");
            hideInput.type = "hidden";
            hideInput.name = "tempContent"
            hideInput.value = data;
            
            tempForm.appendChild(hideInput);
            
            $(tempForm).bind("onsubmit", function(){
                if (!commonJs.isEmpty(name)) {
                    commonJs.openWindow("about:blank", "", "", name);
                }
            });
            
            $(tempForm).appendTo(document.body);
            $(tempForm).trigger("onsubmit");
            $(tempForm).submit();
            document.body.removeChild(tempForm);
        },
        openWindow: function(url, width, height, name){
            var left, top, _width, _height;
            _width = width || window.screen.availWidth;
            _height = height || window.screen.availHeight;
            left = (window.screen.availWidth - _width) / 2;
            top = (window.screen.availHeight - _height) / 2;
            var newWindow = window.open(url, "_blank", "top=" + top + ",left=" + left + ",width=" + _width + ",height=" + _height + ",location=no,resizable=yes,scrollbars=yes");
            newWindow.resizeTo(screen.availWidth, screen.availHeight);
            //给新窗口命名
            if (!commonJs.isEmpty(name)) 
                newWindow.name = name;
            //返回当前窗口
            return newWindow;
        },
        isEmpty: function(obj){
            if (typeof(obj) == "undefined" || obj == null || obj == "null" || (typeof(obj) != "object" && (obj + "").replace(/ /g, "") == "")) {//||obj.length==0
                return true;
            }
            return false;
        },
        /**
         * 获取url地址传递的参数
         * @param {Object} name
         */
        getUrlParam: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) 
                return unescape(r[2]);
            return null;
        },
        /**
         * 获取request中URL的参数，存放在Map中，可能过get获取具体的链值
         */
        getParamMap: function(){
            var url = location.href, params = url.substring(url.indexOf("?") + 1, url.length).split("&"), map = new commonJs.HashMap();
            for (var i = 0; i < params.length; i++) {
                var param = params[i], key, value, returnValue;
                key = param.substring(0, param.indexOf("="));
                value = param.substring(param.indexOf("=") + 1);
                map.put(key, typeof(value) == "undefined" ? "" : value);
            }
            return map;
        },
        /**
         * 将表单转换为URL形式传参
         * @param {Object} target
         */
        formatForm2URL: function(target, params,fields){

            var formObj = AjaxRequest.serializeForm2(target),fieldObj = {};
            $.each(fields,function(i,field){
                if(!commonJs.isEmpty(formObj[field])){
                    fieldObj[field] = formObj[field];
                }
            });
            var obj = $.extend({}, fieldObj, params);

            var result = "",index=0;
            for (var i in obj) {
                if(index == 0){
                    result += "?"+i+"="+obj[i];
                }else{
                    result += "&"+i+"="+obj[i];
                }
                index++;
            }

            return result;
        }
        
        /********************************************************************************************************************************/
    };
}();
