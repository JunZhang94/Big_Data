var Util = (function(){
	return {
		apply : function(o, c, defaults){
		    // no "this" reference for friendly out of scope calls
		    if(defaults){
		        Util.apply(o, defaults);
		    }
		    if(o && c && typeof c == 'object'){
		        for(var p in c){
		            o[p] = c[p];
		        }
		    }
		    return o;
		},
		 /**
		  * 判断是否为空值
         * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
         * @return {Boolean}
         */
		isEmpty : function(v, allowBlank){
            return v === null || v === undefined || ((Ext.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },
		/**
		 * 把数据设置到对应的目
		 */
		loadData : function(target, data){
			if (typeof data == 'string'){
				Ext.ajax({
					url: data,
					dataType: 'json',
					success: function(data){
						_load(target,data);
					}
				});
			} else {
				_load(target,data);
			}
			
			function _load(target,data){
				var obj = $('#'+target);
				if(Util.isHTMLElement(obj,'form')){
					for(var name in data){
						var val = data[name];
						$('input[name='+Util.escName(name)+']', obj).val(val);
						$('textarea[name='+name+']', obj).val(val);
						$('select[name='+name+']', obj).val(val);
					}
				}else{
					for(var name in data){
						var val = data[name];
						$('#'+Util.escName(name), obj).html(val);
					}
				}
				
			}
		},
		/**
		 * 转义id或者name的名字，以方便jquery查询
		 */
		escName : function(name,delimiter){
			if(typeof delimiter == 'undefined' || !delimiter){
				delimiter = ".";
			}
			var arrName = name.split(delimiter);
			var returnName = '';
			if(arrName.length > 1){
				Ext.each(arrName,function(item,i){
					if(i == 0){
						returnName += item;
					}else
						returnName += ('\\'+delimiter+item);
				});
				return returnName;
			}else
				return name;
		},
		/**
		 * 判断元素dom类型
		 * @param ele The element to test
		 * @param nodeName eg "input", "textarea" - check for node name (optional)
		 *         if nodeName is an array then check all for a match.
		 */
		isHTMLElement : function(ele, nodeName) {
		  var target = $(ele);
		  if (target == null || typeof target != "object" || target[0].nodeName == null) {
		    return false;
		  }
		  if (nodeName != null) {
		    var test = target[0].nodeName.toLowerCase();
		    if (typeof nodeName == "string") {
		      return test == nodeName.toLowerCase();
		    }
		    if (Ext.isArray(nodeName)) {
		      var match = false;
		      for (var i = 0; i < nodeName.length && !match; i++) {
		        if (test == nodeName[i].toLowerCase()) {
		          match =  true;
		        }
		      }
		      return match;
		    }
		    return false;
		  }
		  return true;
		},
		/**
		 * 添加前缀到对象的每一个属性
		 */
		addPrefix : function(obj,prefix){
			var returnObj = {};
			Ext.iterate(obj,function(property,value){
				if(value != null && value != ''){
					if(typeof value == 'string'){
						value = "'"+value+"'";
					}else if(typeof value == 'object')return;
					eval('returnObj["'+prefix+'.'+property+'"]='+value);
				}else if(typeof value == 'number'){
					eval('returnObj["'+prefix+'.'+property+'"]='+value);
				}else
					eval('returnObj["'+prefix+'.'+property+'"]=null');
			});
			return returnObj;
		},
		/**
		 * 设置属性值
		 */
		 setValue : function(obj, keyPath, value){
			keyPath = keyPath.split('.');
			lastKeyIndex = keyPath.length - 1;
			for ( var i = 0; i < lastKeyIndex; ++i) {
				key = keyPath[i];
				if (!(key in obj))
					obj[key] = {};
				obj = obj[key];
			}
			obj[keyPath[lastKeyIndex]] = value;
        },
        getValue : function(obj, keyPath){
//			keyPath = keyPath.split('.');
//			lastKeyIndex = keyPath.length - 1;
//			for ( var i = 0; i < lastKeyIndex; ++i) {
//				key = keyPath[i];
//				if (!(key in obj))
//					obj[key] = {};
//				obj = obj[key];
//			}
//			obj[keyPath[lastKeyIndex]] = value;
        	try{
        		return eval('obj.'+keyPath);
        	}catch(err){
        		return null;
        	}
        	
        },
        getObjFromForm : function(jq){
        	var paramObj = {};
        	Ext.each(jq.serializeArray(), function(i, kv) {
        	  if (paramObj.hasOwnProperty(kv.name)) {
        	    paramObj[kv.name] = Ext.makeArray(paramObj[kv.name]);
        	    paramObj[kv.name].push(kv.value);
        	  }
        	  else {
        	    paramObj[kv.name] = kv.value;
        	  }
        	});
        	return paramObj;
        },
        toStr : function(arr,field,delimiter){
    		if(!field)
    			field = 'id';
    		if(!delimiter)
    			delimiter = ',';
    		var returnString = '';
    		for(var i = 0;i < arr.length;i++){
    			if(typeof arr[i] == 'object')//process the ext record type 
    				returnString += Util.getValue(arr[i],field)+delimiter;
    			else
    				returnString += (arr[i])[field]+delimiter;
    		}
    		return returnString;
    	},
    	toSubArray : function(arr,field,delimiter){
    		if(!field)
    			field = 'id';
    		if(!delimiter)
    			delimiter = ',';
    		var returnArr = [];
    		for(var i = 0;i < arr.length;i++){
    			if(typeof arr[i] == 'object')//process the ext record type 
    				returnArr.push(Util.getValue(arr[i],field));
    			else
    				returnArr.push((arr[i])[field]);
    		}
    		return returnArr;
    	},
    	
    	/**
    	 * 把jsobject(包括array属性)转化为queryString
    	 * @param a
    	 * @param traditional
    	 * @returns
    	 */
    	param: function( a, traditional ) {
    		var s = [],
    			add = function( key, value ) {
    				// If value is a function, invoke it and return its value
    				value = Ext.isFunction( value ) ? value() : value;
    				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
    			};

    			traditional = false;
    		if ( Ext.isArray( a ) || ( a.jquery && !Ext.isObject( a ) ) ) {
    			Ext.each( a, function() {
    				add( this.name, this.value );
    			});

    		} else {
    			for ( var prefix in a ) {
    				Util.buildParams( prefix, a[ prefix ], traditional, add );
    			}
    		}
    		return s.join( "&" ).replace( /%20/g, "+" );
    	},
    	/**
    	 * param的辅助方法
    	 * @param prefix
    	 * @param obj
    	 * @param traditional
    	 * @param add
    	 * @returns
    	 */
    	buildParams : function(prefix, obj, traditional, add ){
    		if ( Ext.isArray( obj ) ) {
    			Ext.each( obj, function( v, i ) {
    				if ( traditional || /\[\]$/.test( prefix ) ) {
    					add( prefix, v );

    				} else {
    					Util.buildParams( prefix + "[" + ( typeof v === "object" ? i : i ) + "]", v, traditional, add );
    				}
    			});

    		} else if ( !traditional && typeof obj  === "object" ) {
    			for ( var name in obj ) {
    				Util.buildParams( prefix + "." + name , obj[ name ], traditional, add );
    			}

    		} else {
    			add( prefix, obj );
    		}
    	},
    	weekConvert:function(i){
    		i = i>7?7:(i<1?1:i);
    		var chineseDay = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
    		return chineseDay[i-1];
    	},
    	processEmptyImgUrl : function(url){
    		if(!url||url=='0') url = rootpath + "/themes/client/blue/images/null.jpg";
    		return this.processRelativeURL(url);
    	},
    	processRelativeURL:function(url){
    		return url;
    		//return url.indexOf("http://")>-1?url:_app.contextPath+"/"+url;
    	},
    	processInsertImgUrl : function(url){
    		if(!url||url=='0') return rootpath + "/themes/client/blue/images/null.jpg";
    		return url;
    	}
	};
})();