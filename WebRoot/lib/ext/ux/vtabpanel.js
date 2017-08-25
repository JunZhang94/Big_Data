 Ext.VTabPanel = Ext.extend(Ext.TabPanel, {
    initComponent : function(){
        if (this.tabPosition == 'left' || this.tabPosition == 'right') {
            this.cls = this.cls || '';
            this.cls = this.cls + ' x-tab-panel-vertical x-tab-panel-vertical-' + this.tabPosition;
            this.intendedTabPosition = this.tabPosition;
            this.verticalTabs = true;
            this.tabPosition = 'top';
          //  this.tabWidth =  30;
        }
        if (this.tabPosition == 'innerleft') {
        	this.cls = this.cls || '';
        	this.cls = 'ux-vertical-tabs ' + this.cls;
    	    if (this.textAlign && this.textAlign == 'right') {
    	    	this.cls = 'ux-vertical-tabs-alignright ' + this.cls;
    	    }
    	    this.cls = (this.tabPosition == 'innerleft' ? 'ux-vertical-tabs-left ' : 'ux-vertical-tabs-right ') + this.cls;
    	    
            this.intendedTabPosition = this.tabPosition;
            this.verticalTabs = true;
            this.tabPosition = 'top';
          //  this.tabWidth =  30;
        }
        this.frame = false;
        Ext.VTabPanel.superclass.initComponent.call(this);
        this.addEvents(
            
            'beforetabchange',
            
            'tabchange',
            
            'contextmenu'
        );
        this.setLayout(new Ext.layout.CardLayout({
            deferredRender: this.deferredRender
        }));
        if(this.tabPosition == 'top'){
            this.elements += ',header';
            this.stripTarget = 'header';
        }else {
            this.elements += ',footer';
            this.stripTarget = 'footer';
        }
        if(!this.stack){
            this.stack =  Ext.VTabPanel.AccessStack();
        }
        this.initItems();
    },
    
    afterRender : function() {
        Ext.VTabPanel.superclass.afterRender.call(this);
        if(this.autoTabs){
            this.readTabs(false);
        }
        if (this.verticalTabs) {
            this.header.setWidth(this.tabWidth);
            this.header.setHeight(this.height || this.container.getHeight());
        }
    },
  
    adjustBodyHeight : function(h) {
        if (this.verticalTabs) {
            this.header.setHeight(h + (this.tbar ? this.tbar.getHeight() : 0));
        }
        return Ext.VTabPanel.superclass.adjustBodyHeight.call(this, h);
    },
  
    getFrameWidth : function() {
        return Ext.VTabPanel.superclass.getFrameWidth.call(this) + this.verticalTabs ? 30 : 0;
    },
  
    getFrameHeight : function() {
        return Ext.VTabPanel.superclass.getFrameHeight.call(this) - (this.verticalTabs ? this.header.getHeight() : 0);
    },

    // private
    adjustBodyWidth : function(w){
        if (this.verticalTabs) {
            if (Ext.isIE6||Ext.isIE7) {
                this.bwrap.setWidth(w - 3);
            }
            return w;
        }
        if(this.header){
            this.header.setWidth(w);
        }
        if(this.footer){
            this.footer.setWidth(w);
        }
        return w;
    }
});
 Ext.reg('vtabpanel',Ext.VTabPanel);