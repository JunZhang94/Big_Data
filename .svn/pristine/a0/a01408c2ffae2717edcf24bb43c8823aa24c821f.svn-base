Ext.onReady(function() {
	var _s_menus_ = [{label:'当天',url:'/car/historyQueryPage.mvc'},
		{label:'三天',url:'/client/kakou/realtimeCarsStatisticsByPlaceIndex.action'},
		{label:'一周',url:'/client/kakou/realtimeCarsStatisticsByTimeIndex.action'},
		{label:'一月',url:'/client/kakou/realtimeCarsStatisticsByTypeIndex.action'}];;
	Ext.useShims = true;
	var _items = [];
	if(null != _s_menus_){
		for(var i = 0 ;i < _s_menus_.length ;i++){
			_items.push({
				boxLabel : _s_menus_[i]['label'],
				name : 'typeItem',
				inputValue : rootpath + _s_menus_[i]['url'],
				checked:i==0?true:false
			});
		}
	};
	new Ext.Viewport({
		layout : 'border',
		items : [ {
			region : 'north',
			border : false,
			height : 30,
			items : [
		         {
		 			xtype : 'panel',
		 			bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
		 			style: {
		                 marginBottom: '10px'
		             },
		            height : 20,
		 			items : {
		 				xtype : 'radiogroup',
		 				columns : 10,
		 				items : _items,
		 				listeners : {
		 					'change' : function(group, radio) {
		 						with(Ext.getCmp("statisticsFrame")){
		 							//destroy();
		 							setLocation("about:blank");
		 							setLocation( radio.getGroupValue());
		 						}
		 					}
		 				}
		 			}
		         }
		         ]
		
		}, {
			region : 'center',
			border : false,
			id:'statisticsFrame',
			xtype : 'iframepanel',
			defaultSrc : _items[0]['inputValue']
		} ]
	});
});