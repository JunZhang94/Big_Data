(function($, undefined){
	$.yhui = $.yhui || {};
	if ( $.yhui.version ) {
		return;
	}
	$.extend( $.yhui, {
		version: "1.12.1",

		isIE: !!( document.all && window.ActiveXObject ),
		
		isIE6: !!( $.browser.msie && $.browser.version == 6 ),
		
		isIE67: !( $.support.getSetAttribute ),
		
		isIE678: !( $.support.opacity ),

		isIE8: !!( $.browser.msie && $.browser.version == 8 ),
		isIE9: !!( $.browser.msie && $.browser.version == 9 ),
		
		getHeight: function() {
			var i, len = arguments.length, height = 0;
			for ( i = 0; i < len; i ++ ) {
				arguments[i].length && ( height += arguments[i].outerHeight() );
			}
			return height;	
		},
		
		namespaceEvent: function( elem, event, key ) {
			if ( !elem ) {
				alert( "No Elem" );
			}

			if ( $.data(elem, "events") && $.data(elem,"events")[event] ){
				for( var i = 0, l = ( arr = $.data(elem,"events")[event] ).length; i < l; i++ ) {
					if ( arr[i].namespace === key ) {
						return true;
					}
				}
			}
			return false;
		},
		
		createTable: function( $dom, row, col) {
			var table = [];
			if ( $.isArray( row ) ){
				col = null;
				table.push( "<table>" );
				for( var i = 0, l = row.length; i < l; i++ ) {
					table.push("<tr>");
					for ( var j = 0, len = row[i].length; j < len; j++ ) {
						table.push( "<td>", row[i][j], "</td>" );
					}
					table.push( "</tr>" );
				}
				table.push( "</table>" );
				$dom.html( table.join("") );
				return $dom.children( "table" );
				
			} else {
				table.push( "<table>" );
				for ( var i = 0; i < row; i++ ) {
					table.push("<tr>");
					for( var j = 0; j < col; j++ ) {
						table.push("<td>", i + "行" + j + "列", "</td>");
					}
					table.push("</tr>");
				}
				table.push( "</table>" );
				$dom.html( table.join("") );
				return $dom.children( "table" );
			}
		},
		
		clone: function( jsonObj ) {
			var buf;
			if ( jsonObj instanceof Array ) {
				buf = [];
				var i = jsonObj.length;
				while ( i-- ) {
					buf[i] = arguments.callee(jsonObj[i]);//递归复制
				}
				return buf;
			} else if ( typeof jsonObj == "function" ) {
				return jsonObj;
			} else if ( jsonObj instanceof Object ) {
				buf = {};
				for ( var k in jsonObj ) {
					buf[k] = arguments.callee(jsonObj[k]);
				}
				return buf;
			} else {
				return jsonObj;
			}
		},
		
		log: function( mess ) {
			window.console ? console.log( mess ) : alert( mess );
		},
		
		setDay: function( date, day ) {
			if ( !date || !day ) return;
			
			var changeType = day.substring( 0, 1 ), 
				numOfDay = parseInt( day.substring( 1 ) ),
				newDay = new Date();
			
			if ( changeType === "+" ) {
				newDay = new Date( date.getTime() + numOfDay * 24 * 60 * 60 * 1000 );
			}
			
			if ( changeType === "-") {
				newDay = new Date( date.getTime() - numOfDay * 24 * 60 * 60 * 1000 );
			}
			
			return newDay;
		},

		isLeapYear: function( year ) {
			if( /00$/.test(year) ){
				return	year%400 === 0;
			}else{
				return year%4 === 0 && year%100 !== 0;
			}
		},

		stringToDate: function(	value, split ) {
			if ( !value ) return;
			if ( !split ) {
				split = "-";
			}

			var rDate = new RegExp( split, "g");
			return new Date( value.replace( rDate, "/") );
		},

		getDocHeight: function ( D ) {
		    var height = Math.max(
		        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
		    );

		    if ( $.browser.msie && $.browser.version == 6 ) {
		    	height = $(D.body).height()
		    }

		    return height;
		},

		byId: function( id ) {
			return document.getElementById( id );
		},

		byTag: function( tag ) {
			return document.getElementsByTagName( tag );
		}
	});
})(jQuery);


//下面的函数都是不推荐使用的，以后会被删除
/******************************************
* 判断一个元素是否绑有特定命名空间事件
* elem 要判断的dom
* event 要判定的事件类型
* key 要判断的事件命名空间
* 返回一个布尔值
*******************************************/
function namespaceEvent( elem, event, key ){
	if( $.data(elem, "events") && $.data(elem,"events")[event]){
		for(var i = 0, l = (arr = $.data(elem,"events")[event]).length; i < l; i++){
			if(arr[i].namespace === key){
				return true;
			}
		}
	}
	return false;
}

/******************************************
*判断浏览器是否为IE6
*返回一个布尔值
*******************************************/
function isIE6(){
	return $.browser.msie && $.browser.version == 6;
}

/******************************************
*判断是否为闰年
*参数year 数字，四位数年份
*返回一个布尔值
*******************************************/
function isLeapYear( year ){
	if( /00$/.test(year) ){
		return	year%400 === 0;
	}else{
		return year%4 === 0 && year%100 !== 0;
	}
	
}

/******************************************
*获取一个或者多个元素的高度或者累加高度
*参数为元素的jQuery对象
*返回一个数字
*******************************************/
function getHeight(){
	var i, len = arguments.length, height = 0;
	for(i = 0; i < len; i ++){
		arguments[i].length && (height += arguments[i].outerHeight());
	}
	return height;
}

