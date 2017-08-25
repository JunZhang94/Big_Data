/******************************************
*设置 “头部固定内容区”的高宽
*参数 无
*返回值 无
*******************************************/
function setWH(){
	var	$mainContent = $('#mainContent')
	,	fixHeaderWestHeight = $('div.fixHeader-west').outerHeight()
	,	fixHeaderCenterHeight = $('div.fixHeader-center').outerHeight()
	,	fixHeaderSouthHeight = $('div.fixHeader-south').outerHeight()
	,	westWidth = outerLayout.state.west.outerWidth
	,	westHeight = outerLayout.state.west.outerHeight - fixHeaderWestHeight
	,	southWidth = outerLayout.state.center.outerWidth
	,	southHeight = ($mainContent.length > 0)  
						? innerLayout.state.south.innerHeight - fixHeaderSouthHeight 
						: 0
	,	centerWidth =  outerLayout.state.center.outerWidth
	,	centerHeight = ($mainContent.length > 0)  
						? innerLayout.state.center.outerHeight - fixHeaderCenterHeight 
						: outerLayout.state.center.outerHeight - fixHeaderCenterHeight;
	
	$('.content-west').height(westHeight).width(westWidth).parent().css('overflow', 'hidden');
	$('.content-center').height(centerHeight).width(centerWidth).parent().css('overflow', 'hidden');
	if($('.content-south').length > 0){ 
		$('.content-south').height(southHeight).width(southWidth).parent().css('overflow', 'hidden');		
	}
	if( $.browser.msie && $.browser.version == 6 ){
		$('.content-center, .content-west, .content-south').fadeIn();
	}
}

/******************************************
*修复 layout 插件嵌有iframe时不能拖拽的问题
*参数 无
*返回值 无
*******************************************/
function fixIframe(){
	var $contain = $('div.ui-layout-west, div.ui-layout-center, div.ui-layout-south');
	if($contain.length > 0){
		$contain.each(function(){
			var $iframe = $(this).find('iframe');
			$iframe.length > 0
				? $iframe.after('<div class = "fix"><!- -></div>')
				: $(this).append('<div class = "fix"><!- -></div>');
		});
	}
	$('div.ui-layout-resizer').mousedown(function(){
									$('.fix').addClass('cover');
								})
							  .mouseup(function(){
									$('.fix').removeClass('cover');
								}
	);
	//必需得阻止事件冒泡
	$('div.ui-layout-toggler').mousedown(function(e){
		e.stopPropagation();
	});
}


/******************************************
*jqGrid插件的表头右键菜单 选项卡
*参数 grid 为当前页面的jqGrid实例
*参数 $width为一个jQuery对象
*返回值 无
*******************************************/
function jqGridContext(grid, $width){
	var	titleArray = []
	,	nameArray = []
	,	o = grid.jqGrid('getGridParam','colModel')
	,	o2 = grid.jqGrid('getGridParam','colNames');
	for(var n = 0; n < o.length; n++){
		if('cb' !== o[n].name) nameArray.push(o[n].name);
	}
	for(var i = 0; i < o2.length; i ++){
		if(!(/^<.*\/>$/.test(o2[i]))){
			titleArray.push(o2[i]);
		}
	}
	for(var i = 0, str, cacheArray = [], o3 = {}; i < titleArray.length; i++){
		str = "<input  type='checkbox' checked = ''/>  <label style = 'position:relative;  top:-2px; margin-left:5px;'>"
			+ titleArray[i]
			+ "</label>";
		o3[str] = function( item, menu ){
			var cBox = $(item).find(':checkbox')[0];
			if(cBox.checked){
				cBox.checked = false;
				grid.jqGrid('hideCol', nameArray[$.inArray($(item).find('label').text(), titleArray)]);
				setWidth();
			}else{
				cBox.checked = true;
				grid.jqGrid('showCol',nameArray[$.inArray($(item).find('label').text(), titleArray)]);
				setWidth();
			}
			return false;
		};
	}
	cacheArray.push(o3);
	grid.parents('div.ui-jqgrid-bdiv').siblings('div.ui-jqgrid-hdiv').contextMenu(cacheArray,{
		shadow: true,
		beforeShow: function(){
			$(this.menu).find(':checkbox').on('click', function(e){
				if(!this.checked){
					this.checked = false;
					grid.jqGrid('hideCol', nameArray[$.inArray($(this).next('label').text(), titleArray)]);
					setWidth();
				}else{
					this.checked = true;
					grid.jqGrid('showCol',nameArray[$.inArray($(this).next('label').text(), titleArray)]);
					setWidth();
				} 
				e.stopPropagation();
			});
		}
	});
	
	var pWidth = $width.parent().innerWidth() - 5;
	function setWidth() {
		grid.jqGrid('setGridWidth', pWidth);
	}
}

/******************************************
*判断一个元素是否绑有特定命名空间事件
* elem 要判断的dom
* event 要判定的时间类型
* key 要判断的事件命名空间
* 返回一个布尔值
*******************************************/
function namespaceEvent( elem, event, key ){
	if( $.data(elem, 'events') && $.data(elem,'events')[event]){
		for(var i = 0, l = (arr = $.data(elem,'events')[event]).length; i < l; i++){
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