var USERROLEGRIDPANEL_DATA_URL = "./roleAction/query/roles.mvc";
var UserRoleGridPanel_COMBOBOX_URL = "./roleAction/tree.mvc?userId=1&userRoleId=-1";

var rowEditing = Ext.create('Ext.grid.plugin.RowEditing',{
	//viewConfig: { loadMask: false },
    clicksToMoveEditor: 1,
    autoCancel: false,
    saveBtnText: "确定",
    cancelBtnText: "取消",
    listeners: {
    	validateedit: function (editor, e) {
    		
    		Ext.defer(function () {
	    		var sm = e.grid.getSelectionModel();
	    		var record = sm.getSelection()[0].data;
    			record.ids = record.actions;
    			
	    		if (!record.roleId) {
	    			record.action = "add";
	    			remoteRequest("./roleAction/add/role.mvc", record, e.grid);
	    		} else {
	    			record.action = "edit";
	    			e.record.commit(); 
		  			remoteRequest("./roleAction/edit/role.mvc", record, e.grid);
	    		}
    		}, 200);
    	},
    	canceledit: function (editor, e) {
    		var sm = e.grid.getSelectionModel();
    		var record = sm.getSelection()[0].data;
    		if (!record.roleId) {
    			e.grid.store.remove(sm.getSelection());
    		}
    	}
    }
});

var remoteRequest = function (url, params, grid) {
	Ext.Ajax.request({  
	    url: url,  
	    method: 'POST',  
	    timeout: 30000,  
	    params: params,
	    success: function(response , options){ 
	        var result = Ext.decode(response.responseText);
	        if (!result) {
	        	var win = new Jinpeng.widget.MessageWindow();
	        	win.msg = "操作失败，请重试！\r\n" + ((result.message) ? result.message : '');
	        	win.show();
	        }else{
	        	var win = new Jinpeng.widget.MessageWindow();
	        	win.msg = "修改成功";
	        	win.show();
	        }
	    	if (params.action == "remove") {
	    	} else if (params.action == "add") {
    			grid.getStore().reload();
	    	} else if (params.action == "edit") {
	    	} 
	    },  
	    failure: function(response, options){  
	    	var win = new Jinpeng.widget.MessageWindow();
			win.msg = "数据加载出现错误，请检查你的网络和服务器或是尝试刷新页面！";
			win.show();
	    }  
	});
}

Ext.define('Ext.jp.tic.role.UserRoleGridPanel', {
    extend: 'Ext.grid.Panel',
    requireds: [ "Ext.grid.plugin.RowEditing", "Ext.ux.ComboboxTree" ],
    uses: [
        'Ext.data.ArrayStore'
    ],
    
    flex: 1,
    autoHeight: true,
    minSize: 300,
    maxSize: 600,
    height: 200,
    
    store: Ext.create('Ext.data.ArrayStore', {
    	pageSize: 50,
        remoteSort: true,
        autoLoad: true,
		fields: [
			{name: 'roleId', type: 'number'},
         	{name: 'roleCode',  type: 'text'},
         	{name: 'roleName', type: 'text'},
         	{name: 'createDate', type: 'text', dateFormat: 'n/j/Y'},
         	'createUser', 'actions'
      	],
        proxy: {
            type: 'ajax',
            method: "POST",
            timeout: 30000,
            url: USERROLEGRIDPANEL_DATA_URL,
            /*extraParams: {a: 1, b: 2},*/
            limitParam: "pageSize",
            reader: {
            	type: "json"
            },
            simpleSortMode: true
        }
  	}),
    stripeRows: true,
    columnLines: true,
    columns: [{
    	id       :'roleCode',
        text   : '权限代码',
        flex: 1,
        sortable : true,
        dataIndex: 'roleCode',
        editor: {
        	allowBlank: false
        }
	}, {
		id       :'roleName',
        text   : '权限名称',
        flex: 1,
        sortable : true,
        dataIndex: 'roleName',
        editor: {
        	allowBlank: false
        }
    }, {
		id       :'createDate',
        text   : '创建日期',
        flex: 1,
        sortable : true,
        dataIndex: 'createDate'
    }, {
		id       :'createUser',
        text   : '创建用户',
        flex: 1,
        sortable : true,
        dataIndex: 'createUser'
    }, {
        id: 'actions',
        text   : '权限',
        flex: 1,
        dataIndex: 'actions',
        editor: Ext.create("Ext.ux.ComboboxTree", {
        	xtype: "comboboxtree",
        	//allowBlank: false,
        	allowBlank: true,
        	id: 'comboboxtree',
        	anchor: '100%',
        	maxPickerHeight: 260,
        	width: 200,
            store: Ext.create('Ext.data.TreeStore', {
		        proxy: {
		            type: 'ajax',
		            url: UserRoleGridPanel_COMBOBOX_URL
		        },
		        root: {
		        	id: 0,
		            expanded: true
		        }
		    })
        })
    }],

    initComponent: function(){
    	Ext.apply(this, {
    		tbar: [{
	    		text: " 添 加 ",
		    	handler: function () {
		    		rowEditing.cancelEdit();
		            var r = {
		            	roleId: null,
		                roleCode: '权限代号',
		                roleName: '权限名称',
		                createUser: "admin"
		            };
		            this.store.insert(0, r);    
		    		rowEditing.startEdit(0, 0);
		    	}, 
		    	scope: this
		    }, "|", {
		    	text: " 修 改 ",
		    	handler: function() {
	                var sm = this.getSelectionModel();
	                rowEditing.cancelEdit();
	                
	                var i = this.store.indexOf(sm.getSelection()[0]);
	                rowEditing.startEdit(sm.getSelection()[0], 0);
	            },
	            scope: this
		    }, "|", {
		    	text: " 删 除 ",
		    	itemId: 'removeData',
		    	handler: function() {
	                rowEditing.cancelEdit();
	                var sm = this.getSelectionModel();
	                this.store.remove(sm.getSelection());
	                if (this.store.getCount() > 0) {
	                    sm.select(0);
	                }
	                
	                remoteRequest("./roleAction/remove/role.mvc", {action: "remove", roleId: sm.getSelection()[0].data.roleId}, this);
	            },
	            scope: this
		    }]
    	});
        this.callParent(arguments);
        
        Ext.getCmp("comboboxtree").on("expand", function (field) {
        	_this = this;
	        var sm = _this.getSelectionModel();
	        field.store.proxy.url = "./roleAction/tree.mvc?userRoleId=" + sm.getSelection()[0].data.roleId;
	        field.store.reload();
        }, this);
    },
    plugins: [rowEditing],
    listeners: {
        'selectionchange': function(view, records) {
            this.down('#removeData').setDisabled(!records.length);
        }
    }
});
