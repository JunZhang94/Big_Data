Ext.ns("Jinpeng.ux");

Ext.ux.OrgComboBoxTree = Ext.extend(Ext.form.ComboBox, {
	callback : Ext.emptyFn,
	store : new Ext.data.SimpleStore({
		fields : [],
		data : [ [] ]
	}),
	/**
	 *Jinpeng.ChannelTreePanel.nodeType
	 */
	dataType : Jinpeng.ChannelTreePanel.nodeType.DOMAIN,
	editable : this.editable || false,
	mode : "local",
	emptyText : this.emptyText || "\u8bf7\u9009\u62e9",
	allowBlank : this.allowBlank || true,
	triggerAction : "all",
	displayField : 'dname',
	valueField : 'dtype',
	maxHeigth : 300,
	anchor : "95%",
	tpl : "<tpl for='.'><div style='height:200px'><div id='tree'></div></div></tpl>",
	selectedClass : "",
	onSelect : Ext.emptyFn,
	rootText : this.rootText || "root",
	treeUrl : this.treeUrl,
	tree : null,
	lazyInit:false,
	initComponent : function() {
		var _action = this.dataType=='control'?"onlyOrgTreeMap":"orgTreeMountMap";
		this.tree = new Ext.tree.TreePanel({
			height : 500,
			scope : this,
			autoScroll : true,
			split : true,
			//width : 200,
			root : new Ext.tree.AsyncTreeNode({
				expanded : true,
				id : "-1",
				text : this.rootText
			}),
			loader : new Jinpeng.widget.JsonTreeLoader({
				url : rootpath + '/systemOrg/'+_action+'.mvc'
			}),
			rootVisible : false
		});
		var c = this;
		var getAlertMessage = function(code){
			if(Jinpeng.ChannelTreePanel.nodeType.DOMAIN ==code){
				return "请选择组织节点！";
			}
			if(Jinpeng.ChannelTreePanel.nodeType.DIRECTION ==code){
				return "请选择方向节点！";
			}
			if("domain" ==code){
				return "不能选择级联节点！";
			}
			if("noaccess" ==code){
				return "您无权选择该节点，请重新选择!";
			}
		};
		/**
		 * 点击选中节点并回调传值
		 */
		this.tree.on("click", function(node, e) {
			/*if(c.dataType != node.attributes['type']){
				return;
			}*/
			var index  = 0;
			if (node.attributes['coding'] != null) {
				index = node.attributes['coding'].indexOf("@");
			}
			if (index > 0 && index < node.attributes['coding'].length - 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg =getAlertMessage("domain");
				win.show();
				return;
			}
			if (node.attributes['allowSelected'] != 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = getAlertMessage("noaccess");
				win.show();
				return;
			}
			if (node.id != null && node.id != "") {
				if (node.id != "-1") {
					c.setValue(c.trimStr(node.text));
					if(node.attributes['type'] == Jinpeng.ChannelTreePanel.nodeType.DIRECTION){
						var pNode = node.parentNode;
						c.callback.call(c, node.id, node.text, node.attributes.coding, node.attributes.orgType,node.parentNode.attributes.id, pNode.attributes.longitude,pNode.attributes.latitude);
					}else{
						c.callback.call(c, node.id, node.text, node.attributes.coding, node.attributes.orgType,node.parentNode.attributes.id);
					}
					c.collapse();
				} else {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = getAlertMessage("noaccess");
					win.show();
				}
			}
		});
		this.on("expand", function() {
			var node = null;
			
			if(this._value){
				node = this.tree.root.findChild( "coding", this._value, true ) ;
			}else{
				node = this.tree.root.findChild( "text", this.getValue(), true ) ;
			}
			
			if(node){
				this.tree.selectPath(node.getPath());
			}
			
		});
		Ext.ux.OrgComboBoxTree.superclass.initComponent.call(this);
	},
	trimStr : function(str){   
	    str = str.replace(/^(\s|\u00A0)+/,'');   
	    for(var i=str.length-1; i>=0; i--){   
	        if(/\S/.test(str.charAt(i))){   
	            str = str.substring(0, i+1);   
	            break;   
	        }   
	    }   
	    return str;   
	},
	// 覆盖父类方法，使得可以点击树的加号减号进行收缩
	onViewClick : function(index, scrollIntoView) {
	},
	initList : function(){
		Ext.ux.OrgComboBoxTree.superclass.initList.call(this);
		this.tree.render("tree");
		// 以为是异步加载 所以要等到树加载完才 展开 第一层
		var root = this.tree.root;
		var runner = new Ext.util.TaskRunner();
		var expandTask = {
			run : function() {
				if (root.loaded) {
					root.firstChild.expand();
					runner.stop(expandTask);
				}
			},
			interval : 200
		};
		runner.start(expandTask);
	}
	
});
/**
 * 去除top置顶的树下拉框组件，主要用于页面查询
 */
Ext.ux.TOrgComboBoxTree = Ext.extend(Ext.form.ComboBox, {
	callback : Ext.emptyFn,
	store : new Ext.data.SimpleStore({
		fields : [],
		data : [ [] ]
	}),
	/**
	 *Jinpeng.ChannelTreePanel.nodeType
	 */
	dataType : Jinpeng.ChannelTreePanel.nodeType.DOMAIN,
	editable : this.editable || false,
	mode : "local",
	emptyText : this.emptyText || "\u8bf7\u9009\u62e9",
	allowBlank : this.allowBlank || true,
	triggerAction : "all",
	displayField : 'dname',
	valueField : 'dtype',
	maxHeigth : 120,
	anchor : "95%",
	tpl : "<tpl for='.'><div style='height:200px'><div id='tree'></div></div></tpl>",
	selectedClass : "",
	onSelect : Ext.emptyFn,
	rootText : this.rootText || "root",
	treeUrl : this.treeUrl,
	tree : null,
	lazyInit:false,
	initComponent : function() {
		var _action = this.dataType==Jinpeng.ChannelTreePanel.nodeType.DOMAIN?"onlyOrgTreeMap":"orgTreeMap";
		this.tree = new Ext.tree.TreePanel({
			height : 200,
			scope : this,
			autoScroll : true,
			split : true,
			root : new Ext.tree.AsyncTreeNode({
				expanded : true,
				id : "-1",
				text : this.rootText
			}),
			loader : new Jinpeng.widget.JsonTreeLoader({
				url : rootpath + '/client/system/'+_action+'.action'
			}),
			rootVisible : false
		});
		var c = this;
		var getAlertMessage = function(code){
			if(Jinpeng.ChannelTreePanel.nodeType.DOMAIN ==code){
				return "请选择组织节点！";
			}
			if(Jinpeng.ChannelTreePanel.nodeType.DIRECTION ==code){
				return "请选择方向节点！";
			}
			if("domain" ==code){
				return "不能选择级联节点！";
			}
			if("noaccess" ==code){
				return "您无权选择该节点，请重新选择!";
			}
		};
		/**
		 * 点击选中节点并回调传值
		 */
		this.tree.on("click", function(node, e) {
//			alert(node.parentNode.attributes['longitude']);
//			alert(node.parentNode.attributes['latitude']);
			if(c.dataType != node.attributes['type']){
				return;
			}
			var index = node.attributes['coding'].indexOf("@");
			if (index > 0 && index < node.attributes['coding'].length - 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = getAlertMessage("domain");
				win.show();
				return;
			}
			if (node.attributes['allowSelected'] != 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = getAlertMessage("noaccess");
				win.show();
				return;
			}
			if (node.id != null && node.id != "") {
				if (node.id != "-1") {
					c.setValue(node.text);
					if(node.attributes['type'] == Jinpeng.ChannelTreePanel.nodeType.DIRECTION){
						var pNode = node.parentNode;
						c.callback.call(c, node.id, node.text, node.attributes.coding, node.attributes.orgType, pNode.attributes.longitude,pNode.attributes.latitude);
					}else{
						c.callback.call(c, node.id, node.text, node.attributes.coding, node.attributes.orgType);
					}
					c.collapse();
				} else {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = getAlertMessage("noaccess");
					win.show();
				}
			}
		});
		this.on("expand", function() {
			var node = this.tree.root.findChild( "text", this.getValue(), true ) ;
			if(node){
				this.tree.selectPath(node.getPath());
			}
			
		});
		Ext.ux.TOrgComboBoxTree.superclass.initComponent.call(this);
	},
	// 覆盖父类方法，使得可以点击树的加号减号进行收缩
	onViewClick : function(index, scrollIntoView) {
	},
	initList : function(){
		Ext.ux.TOrgComboBoxTree.superclass.initList.call(this);
		this.tree.render("tree");
		// 以为是异步加载 所以要等到树加载完才 展开 第一层
		var root = this.tree.root;
		var runner = new Ext.util.TaskRunner();
		var expandTask = {
			run : function() {
				if (root.loaded) {
					root.firstChild.expand();
					runner.stop(expandTask);
				}
			},
			interval : 200
		};
		runner.start(expandTask);
	}
	
});
Ext.reg("orgcombotree", Ext.ux.OrgComboBoxTree);
Ext.reg("torgcombotree", Ext.ux.TOrgComboBoxTree);
