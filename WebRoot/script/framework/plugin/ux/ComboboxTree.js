Ext.define("Ext.ux.ComboboxTree", {
    extend: Ext.form.field.Picker,
    alias: ['widget.comboboxtree'],
    requires : ["Ext.tree.Panel"],
    store:{},
    tree: {},
    config: {
        maxPickerWidth: 200,
        maxPickerHeight: 200,
        minPickerHeight: 100
    },
    initComponent : function() {
        var self = this;
        Ext.apply(self, {
            fieldLabel : self.fieldLabel,
            labelWidth : self.labelWidth    
        });
        self.callParent();
        this.tree= new Ext.tree.Panel({
            rootVisible: false,
            width: self.maxPickerWidth,
            height:self.maxPickerHeight,
            autoScroll : true,
            floating : true,
            focusOnToFront : false,
            shadow : false,
            useArrows : true,
            store : this.store,
            rootVisible : false,
            listeners:{ }
        });
        
    },
    createPicker : function() {
        var self = this;
        self.picker = this.tree;
        self.picker.on({
            checkchange: function(node, checked) {
            	
            	if (checked == true) {
			    	node.checked = checked;
				    //获得父节点
				    var pNode = node.parentNode;
				  	//当checked == true通过循环将所有父节点选中
				    for (; pNode != null; pNode = pNode.parentNode) {
				    	pNode.set("checked", true);
				    }
			    }
				
				//当该节点有子节点时，将所有子节点选中删除 //  && !checked
			    if (!node.get("leaf")) {
			      	node.cascade(function(node){
			     		node.set('checked', checked);
			    	});
				}
					
                var records = self.picker.getView().getChecked(), names = [], values = [];
                
                Ext.Array.each(records, function(rec) {
                	if (self.displayMode == "text") {
	                    names.push(rec.get('text'));/*rec.get('text')*/
                	} else {
	                    names.push(rec.get('id'));/*rec.get('text')*/
                	}
                    values.push(rec.get('id'));
                });
                var name = names.join(',').replace("Root,", "");
                name = name.replace("Root", "");
                self.setRawValue(values.join(','));/* 隐藏值*/
                self.setValue(name);/* 显示值*/
                self.hideValue = values.join(',');
            },
            hide: function () {
            	var records = self.picker.getView().getChecked();
            	Ext.Array.each(records, function(record) {  
                    record.set('checked', false);       
                });
                self.picker.collapseAll();
            	self.picker.hide();                 /*[目前单选,该批次代码、tree的itemclick事件去掉则多选]*/
            }                                          
        });
        return self.picker;
    },
    alignPicker : function() {
        var me = this, picker, isAbove, aboveSfx = '-above';
        if (this.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                picker.setWidth(me.bodyWidth || me.bodyEl.getWidth());
            }
            if (picker.isFloating()) {
                picker.alignTo(me.inputEl, me.pickerOffset);/* ->tl*/
                isAbove = picker.el.getY() < me.inputEl.getY();
                me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls+ aboveSfx);
                picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
            }
        }
    }
});