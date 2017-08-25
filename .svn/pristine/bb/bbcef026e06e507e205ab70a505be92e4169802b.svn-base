Ext.define("Ext.jp.tic.component.CarPlatePicker", {
    extend: Ext.form.field.Picker,
    alias: ['widget.carplatepicker'],
    requires : ["Ext.tree.Panel", "Ext.jp.tic.component.CarPlateCodeQueryComponent"],
    panel: Ext.create("Ext.jp.tic.component.CarPlateCodeQueryComponent", {
    	floating : true,
        focusOnToFront : false,
        shadow : false,
        useArrows : true,
        width: 500
    }),
    config: {
        maxPickerWidth: 800,
        maxPickerHeight: 500,
        minPickerHeight: 300
    },
    initComponent : function() {
        var self = this;
        self.callParent();
    },
    createPicker : function() {
        var self = this;
        self.picker = this.panel;
        self.picker.on({
            hide: function () {
            	self.picker.hide();              
            }                                          
        });
        self.picker.items.getAt(1).on({
        	select: function(_this, record, index) {
            	
            	var sm = this.getSelectionModel();
	    		var record = sm.getSelection();
            	
            	var names = [], values = [];
            	Ext.each(record, function (item) {
	                names.push(item.data.plateNumber);
	                values.push(item.data.plateNumber);
            	});
                
                self.setRawValue(values.join(','));/* 隐藏值*/
                self.setValue(names.join(','));/* 显示值*/
            }
        });
        return self.picker;
    },
    alignPicker : function() {
        var me = this, picker, isAbove, aboveSfx = '-above';
        if (this.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                //picker.setWidth(me.bodyEl.getWidth());
                picker.setWidth(me.bodyWidth || picker.width);
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