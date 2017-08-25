/*!
 * 
 */
/**
 * @class Ext.ux.Spinner
 * @extends Ext.util.Observable
 * Creates a Spinner control utilized by Ext.ux.form.SpinnerField
 */
Ext.ux.Spinner = Ext.extend(Ext.util.Observable, {
    incrementValue: 1,
    alternateIncrementValue: 5,
    triggerClass: 'x-form-spinner-trigger',
    splitterClass: 'x-form-spinner-splitter',
    alternateKey: Ext.EventObject.shiftKey,
    defaultValue: 0,
    accelerate: false,

    constructor: function(config){
        Ext.ux.Spinner.superclass.constructor.call(this, config);
        Ext.apply(this, config);
        this.mimicing = false;
    },

    init: function(field){
        this.field = field;

        field.afterMethod('onRender', this.doRender, this);
        field.afterMethod('onEnable', this.doEnable, this);
        field.afterMethod('onDisable', this.doDisable, this);
        field.afterMethod('afterRender', this.doAfterRender, this);
        field.afterMethod('onResize', this.doResize, this);
        field.afterMethod('onFocus', this.doFocus, this);
        field.beforeMethod('onDestroy', this.doDestroy, this);
    },

    doRender: function(ct, position){
        var el = this.el = this.field.getEl();
        var f = this.field;

        if (!f.wrap) {
            f.wrap = this.wrap = el.wrap({
                cls: "x-form-field-wrap"
            });
        }
        else {
            this.wrap = f.wrap.addClass('x-form-field-wrap');
        }

        this.trigger = this.wrap.createChild({
            tag: "img",
            src: Ext.BLANK_IMAGE_URL,
            cls: "x-form-trigger " + this.triggerClass
        });

        if (!f.width) {
            this.wrap.setWidth(el.getWidth() + this.trigger.getWidth());
        }

        this.splitter = this.wrap.createChild({
            tag: 'div',
            cls: this.splitterClass,
            style: 'width:13px; height:2px;'
        });
        this.splitter.setRight((Ext.isIE) ? 1 : 2).setTop(10).show();

        this.proxy = this.trigger.createProxy('', this.splitter, true);
        this.proxy.addClass("x-form-spinner-proxy");
        this.proxy.setStyle('left', '0px');
        this.proxy.setSize(14, 1);
        this.proxy.hide();
        this.dd = new Ext.dd.DDProxy(this.splitter.dom.id, "SpinnerDrag", {
            dragElId: this.proxy.id
        });

        this.initTrigger();
        this.initSpinner();
    },

    doAfterRender: function(){
        var y;
        if (Ext.isIE && this.el.getY() != (y = this.trigger.getY())) {
            this.el.position();
            this.el.setY(y);
        }
    },

    doEnable: function(){
        if (this.wrap) {
            this.disabled = false;
            this.wrap.removeClass(this.field.disabledClass);
        }
    },

    doDisable: function(){
        if (this.wrap) {
	        this.disabled = true;
            this.wrap.addClass(this.field.disabledClass);
            this.el.removeClass(this.field.disabledClass);
        }
    },

    doResize: function(w, h){
        if (typeof w == 'number') {
            this.el.setWidth(w - this.trigger.getWidth());
        }
        this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth());
    },

    doFocus: function(){
        if (!this.mimicing) {
            this.wrap.addClass('x-trigger-wrap-focus');
            this.mimicing = true;
            Ext.get(Ext.isIE ? document.body : document).on("mousedown", this.mimicBlur, this, {
                delay: 10
            });
            this.el.on('keydown', this.checkTab, this);
        }
    },

    // private
    checkTab: function(e){
        if (e.getKey() == e.TAB) {
            this.triggerBlur();
        }
    },

    // private
    mimicBlur: function(e){
        if (!this.wrap.contains(e.target) && this.field.validateBlur(e)) {
            this.triggerBlur();
        }
    },

    // private
    triggerBlur: function(){
        this.mimicing = false;
        Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        this.el.un("keydown", this.checkTab, this);
        this.field.beforeBlur();
        this.wrap.removeClass('x-trigger-wrap-focus');
        this.field.onBlur.call(this.field);
    },

    initTrigger: function(){
        this.trigger.addClassOnOver('x-form-trigger-over');
        this.trigger.addClassOnClick('x-form-trigger-click');
    },

    initSpinner: function(){
        this.field.addEvents({
            'spin': true,
            'spinup': true,
            'spindown': true
        });

        this.keyNav = new Ext.KeyNav(this.el, {
            "up": function(e){
                e.preventDefault();
                this.onSpinUp();
            },

            "down": function(e){
                e.preventDefault();
                this.onSpinDown();
            },

            "pageUp": function(e){
                e.preventDefault();
                this.onSpinUpAlternate();
            },

            "pageDown": function(e){
                e.preventDefault();
                this.onSpinDownAlternate();
            },

            scope: this
        });

        this.repeater = new Ext.util.ClickRepeater(this.trigger, {
            accelerate: this.accelerate
        });
        this.field.mon(this.repeater, "click", this.onTriggerClick, this, {
            preventDefault: true
        });

        this.field.mon(this.trigger, {
            mouseover: this.onMouseOver,
            mouseout: this.onMouseOut,
            mousemove: this.onMouseMove,
            mousedown: this.onMouseDown,
            mouseup: this.onMouseUp,
            scope: this,
            preventDefault: true
        });

        this.field.mon(this.wrap, "mousewheel", this.handleMouseWheel, this);

        this.dd.setXConstraint(0, 0, 10)
        this.dd.setYConstraint(1500, 1500, 10);
        this.dd.endDrag = this.endDrag.createDelegate(this);
        this.dd.startDrag = this.startDrag.createDelegate(this);
        this.dd.onDrag = this.onDrag.createDelegate(this);
    },

    onMouseOver: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        this.tmpHoverClass = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-overup' : 'x-form-spinner-overdown';
        this.trigger.addClass(this.tmpHoverClass);
    },

    //private
    onMouseOut: function(){
        this.trigger.removeClass(this.tmpHoverClass);
    },

    //private
    onMouseMove: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        if (((Ext.EventObject.getPageY() > middle) && this.tmpHoverClass == "x-form-spinner-overup") ||
        ((Ext.EventObject.getPageY() < middle) && this.tmpHoverClass == "x-form-spinner-overdown")) {
        }
    },

    //private
    onMouseDown: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        this.tmpClickClass = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-clickup' : 'x-form-spinner-clickdown';
        this.trigger.addClass(this.tmpClickClass);
    },

    //private
    onMouseUp: function(){
        this.trigger.removeClass(this.tmpClickClass);
    },

    //private
    onTriggerClick: function(){
        if (this.disabled || this.el.dom.readOnly) {
            return;
        }
        var middle = this.getMiddle();
        var ud = (Ext.EventObject.getPageY() < middle) ? 'Up' : 'Down';
        this['onSpin' + ud]();
    },

    //private
    getMiddle: function(){
        var t = this.trigger.getTop();
        var h = this.trigger.getHeight();
        var middle = t + (h / 2);
        return middle;
    },

    //private
    //checks if control is allowed to spin
    isSpinnable: function(){
        if (this.disabled || this.el.dom.readOnly) {
            Ext.EventObject.preventDefault(); //prevent scrolling when disabled/readonly
            return false;
        }
        return true;
    },

    handleMouseWheel: function(e){
        //disable scrolling when not focused
        if (this.wrap.hasClass('x-trigger-wrap-focus') == false) {
            return;
        }

        var delta = e.getWheelDelta();
        if (delta > 0) {
            this.onSpinUp();
            e.stopEvent();
        }
        else
            if (delta < 0) {
                this.onSpinDown();
                e.stopEvent();
            }
    },

    //private
    startDrag: function(){
        this.proxy.show();
        this._previousY = Ext.fly(this.dd.getDragEl()).getTop();
    },

    //private
    endDrag: function(){
        this.proxy.hide();
    },

    //private
    onDrag: function(){
        if (this.disabled) {
            return;
        }
        var y = Ext.fly(this.dd.getDragEl()).getTop();
        var ud = '';

        if (this._previousY > y) {
            ud = 'Up';
        } //up
        if (this._previousY < y) {
            ud = 'Down';
        } //down
        if (ud != '') {
            this['onSpin' + ud]();
        }

        this._previousY = y;
    },

    //private
    onSpinUp: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        if (Ext.EventObject.shiftKey == true) {
            this.onSpinUpAlternate();
            return;
        }
        else {
            this.spin(false, false);
        }
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spinup", this);
    },

    //private
    onSpinDown: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        if (Ext.EventObject.shiftKey == true) {
            this.onSpinDownAlternate();
            return;
        }
        else {
            this.spin(true, false);
        }
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spindown", this);
    },

    //private
    onSpinUpAlternate: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        this.spin(false, true);
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spinup", this);
    },

    //private
    onSpinDownAlternate: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        this.spin(true, true);
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spindown", this);
    },

    spin: function(down, alternate){
        var v = parseFloat(this.field.getValue());
        var incr = (alternate == true) ? this.alternateIncrementValue : this.incrementValue;
        (down == true) ? v -= incr : v += incr;

        v = (isNaN(v)) ? this.defaultValue : v;
        v = this.fixBoundries(v);
        this.field.setRawValue(v);
    },

    fixBoundries: function(value){
        var v = value;

        if (this.field.minValue != undefined && v < this.field.minValue) {
            v = this.field.minValue;
        }
        if (this.field.maxValue != undefined && v > this.field.maxValue) {
            v = this.field.maxValue;
        }

        return this.fixPrecision(v);
    },

    // private
    fixPrecision: function(value){
        var nan = isNaN(value);
        if (!this.field.allowDecimals || this.field.decimalPrecision == -1 || nan || !value) {
            return nan ? '' : value;
        }
        return parseFloat(parseFloat(value).toFixed(this.field.decimalPrecision));
    },

    doDestroy: function(){
        if (this.trigger) {
            this.trigger.remove();
        }
        if (this.wrap) {
            this.wrap.remove();
            delete this.field.wrap;
        }

        if (this.splitter) {
            this.splitter.remove();
        }

        if (this.dd) {
            this.dd.unreg();
            this.dd = null;
        }

        if (this.proxy) {
            this.proxy.remove();
        }

        if (this.repeater) {
            this.repeater.purgeListeners();
        }
        if (this.mimicing){
            Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        }
    }
});

//backwards compat
Ext.form.Spinner = Ext.ux.Spinner;Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.SpinnerField
 * @extends Ext.form.NumberField
 * Creates a field utilizing Ext.ux.Spinner
 * @xtype spinnerfield
 */
Ext.ux.form.SpinnerField = Ext.extend(Ext.form.NumberField, {
    actionMode: 'wrap',
    deferHeight: true,
    autoSize: Ext.emptyFn,
    onBlur: Ext.emptyFn,
    adjustSize: Ext.BoxComponent.prototype.adjustSize,

	constructor: function(config) {
		var spinnerConfig = Ext.copyTo({}, config, 'incrementValue,alternateIncrementValue,accelerate,defaultValue,triggerClass,splitterClass');

		var spl = this.spinner = new Ext.ux.Spinner(spinnerConfig);

		var plugins = config.plugins
			? (Ext.isArray(config.plugins)
				? config.plugins.push(spl)
				: [config.plugins, spl])
			: spl;

		Ext.ux.form.SpinnerField.superclass.constructor.call(this, Ext.apply(config, {plugins: plugins}));
	},

    // private
    getResizeEl: function(){
        return this.wrap;
    },

    // private
    getPositionEl: function(){
        return this.wrap;
    },

    // private
    alignErrorIcon: function(){
        if (this.wrap) {
            this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
        }
    },

    validateBlur: function(){
        return true;
    }
});

Ext.reg('spinnerfield', Ext.ux.form.SpinnerField);

//backwards compat
Ext.form.SpinnerField = Ext.ux.form.SpinnerField;
Ext.ns('Ext.ux.form');
Ext.ux.form.TimePickerField = function(config){
    Ext.ux.form.TimePickerField.superclass.constructor.call(this, config);
};
Ext.extend(Ext.ux.form.TimePickerField, Ext.form.Field, {
    defaultAutoCreate: {
        tag: 'div'
    },
    cls: 'x-form-timepickerfield',
    hoursSpinner: null,
    minutesSpinner: null,
    secondsSpinner: null,
    spinnerCfg: {
        width: 40
    },
    spinnerFixBoundries: function(value){
        if (value < this.field.minValue) {
            value = this.field.maxValue;
        }
        if (value > this.field.maxValue) {
            value = this.field.minValue;
        }
        return this.fixPrecision(value);
    },
    onRender: function(ct, position){
        Ext.ux.form.TimePickerField.superclass.onRender.call(this, ct, position);
        this.rendered = false;
        this.date = new Date();
        var values = {};
        if (this.value) {
            values = this._valueSplit(this.value);
            this.date.setHours(values.h);
            this.date.setMinutes(values.m);
            this.date.setSeconds(values.s);
            delete this.value;
        }
        else {
            values = {
                h: this.date.getHours(),
                m: this.date.getMinutes(),
                s: this.date.getSeconds()
            };
        }
        var spinnerWrap = Ext.DomHelper.append(this.el, {
            tag: 'div'
        });
        var cfg = Ext.apply({}, this.spinnerCfg, {
            renderTo: spinnerWrap,
            readOnly: this.readOnly,
            disabled: this.disabled,
            listeners: {
                spin: {
                    fn: this.onSpinnerChange,
                    scope: this
                },
                valid: {
                    fn: this.onSpinnerChange,
                    scope: this
                },
                afterrender: {
                    fn: function(spinner){
                        spinner.wrap.applyStyles('float: left');
                    },
                    single: true
                }
            }
        });
        this.hoursSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, cfg, {
            minValue: 0,
            maxValue: 23,
            cls: 'first',
            value: values.h
        }));
        this.minutesSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, cfg, {
            minValue: 0,
            maxValue: 59,
            value: values.m
        }));
        this.secondsSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, cfg, {
            minValue: 0,
            maxValue: 59,
            value: values.s
        }));
        Ext.DomHelper.append(spinnerWrap, {
            tag: 'div',
            cls: 'x-form-clear-left'
        });
        this.rendered = true;
    },
    _valueSplit: function(v){
        var split = v.split(':');
        return {
            h: split.length > 0 ? split[0] : 0,
            m: split.length > 1 ? split[1] : 0,
            s: split.length > 2 ? split[2] : 0
        };
    },
    onSpinnerChange: function(){
        if (!this.rendered) {
            return;
        }
        this.fireEvent('change', this, this.getRawValue());
    },
    disable: function(){
        Ext.ux.form.TimePickerField.superclass.disable.call(this);
        this.hoursSpinner.disable();
        this.minutesSpinner.disable();
        this.secondsSpinner.disable();
    },
    enable: function(){
        Ext.ux.form.TimePickerField.superclass.enable.call(this);
        this.hoursSpinner.enable();
        this.minutesSpinner.enable();
        this.secondsSpinner.enable();
    },
    setReadOnly: function(r){
        Ext.ux.form.TimePickerField.superclass.setReadOnly.call(this, r);
        this.hoursSpinner.setReadOnly(r);
        this.minutesSpinner.setReadOnly(r);
        this.secondsSpinner.setReadOnly(r);
    },
    clearInvalid: function(){
        Ext.ux.form.TimePickerField.superclass.clearInvalid.call(this);
        this.hoursSpinner.clearInvalid();
        this.minutesSpinner.clearInvalid();
        this.secondsSpinner.clearInvalid();
    },
    getRawValue: function(){
        if (!this.hoursSpinner) {
            this.date = new Date();
            return {
                h: this.date.getHours(),
                m: this.date.getMinutes(),
                s: this.date.getSeconds()
            };
        }
        else {
            return {
                h: this.hoursSpinner.getValue(),
                m: this.minutesSpinner.getValue(),
                s: this.secondsSpinner.getValue()
            };
        }
    },
    setRawValue: function(v){
        this.hoursSpinner.setValue(v.h);
        this.minutesSpinner.setValue(v.m);
        this.secondsSpinner.setValue(v.s);
    },
    isValid: function(preventMark){
        return this.hoursSpinner.isValid(preventMark) &&
        this.minutesSpinner.isValid(preventMark) &&
        this.secondsSpinner.isValid(preventMark);
    },
    validate: function(){
        return this.hoursSpinner.validate() &&
        this.minutesSpinner.validate() &&
        this.secondsSpinner.validate();
    },
    getValue: function(){
    	//验证时分秒是否格式正确，如果不正确则恢复至当前时间
		if(this.hoursSpinner&&!this.hoursSpinner.validate()){
			this.hoursSpinner.setRawValue((new Date()).getHours())
		};
		if(this.minutesSpinner&&!this.minutesSpinner.validate()){
			this.minutesSpinner.setRawValue((new Date()).getMinutes())
		};
		if(this.secondsSpinner&&!this.secondsSpinner.validate()){
			this.secondsSpinner.setRawValue((new Date()).getSeconds())
		};
        var v = this.getRawValue();
        return String.leftPad(v.h, 2, '0') + ':' +
        String.leftPad(v.m, 2, '0') +
        ':' +
        String.leftPad(v.s, 2, '0');
    },
    setValue: function(value){
        if (!this.rendered) {
            this.value = value;
            return;
        }
        value = this._valueSplit(value);
        this.setRawValue(value);
        this.validate();
    }
});

Ext.form.TimePickerField = Ext.ux.form.TimePickerField;
Ext.reg('timepickerfield', Ext.form.TimePickerField);
Ext.ns('Ext.ux.form');
Ext.DateTimePicker = Ext.extend(Ext.DatePicker, {
    timeFormat: 'g:i:s A',
    timeLabel: '时间',
    timeWidth: 100,
    initComponent: function(){
        Ext.DateTimePicker.superclass.initComponent.call(this);
        this.id = Ext.id();
    },
    onRender: function(container, position){
        Ext.DateTimePicker.superclass.onRender.apply(this, arguments);
        var table = Ext.get(Ext.DomQuery.selectNode('table tbody', container.dom));
        var tfEl = Ext.DomHelper.insertBefore(table.last(), {
            tag: 'tr',
            children: [{
                tag: 'td',
                cls: 'x-date-bottom',
                html: this.timeLabel,
                style: 'width:30;'
            }, {
                tag: 'td',
                cls: 'x-date-bottom ux-timefield',
                colspan: '2'
            }]
        }, true);
        this.tf.render(table.child('td.ux-timefield'));
        var p = this.getEl().parent('div.x-layer');
        if (p) {
        		p.setStyle("height", p.getHeight() + 31);
        }
    },
    setValue: function(value){
        var old = this.value;
        if (!this.tf) {
            this.tf = new Ext.ux.form.TimePickerField();
            this.tf.ownerCt = this;
        }
        this.value = this.getDateTime(value);
    },
    getDateTime: function(value){
        if (this.tf) {
            var dt = new Date();
            var timeval = this.tf.getValue();
            value = Date.parseDate(value.format(this.dateFormat) + ' ' + this.tf.getValue(), this.format);
        }
        return value;
    },
    selectToday: function(){
        if (this.todayBtn && !this.todayBtn.disabled) {
            this.value = this.getDateTime(new Date());
            this.fireEvent("select", this, this.value);
        }
    }
});
Ext.reg('datetimepickerfield', Ext.DateTimePicker);
if (parseInt(Ext.version.substr(0, 1), 10) >= 1) {
    Ext.menu.DateTimeItem = Ext.DateTimePicker;
    Ext.override(Ext.menu.DateMenu, {
        initComponent: function(){
            this.on('beforeshow', this.onBeforeShow, this);
            if (this.strict = (Ext.isIE7 && Ext.isStrict)) {
                this.on('show', this.onShow, this, {
                    single: true,
                    delay: 20
                });
            }
            Ext.apply(this, {
                plain: true,
                showSeparator: false,
                items: this.picker = new Ext.DatePicker(Ext.apply({
                    internalRender: this.strict || !Ext.isIE,
                    ctCls: 'x-menu-date-item'
                }, this.initialConfig))
            });
            Ext.menu.DateMenu.superclass.initComponent.call(this);
            this.relayEvents(this.picker, ["select"]);
            this.on('select', this.menuHide, this);
            if (this.handler) {
                this.on('select', this.handler, this.scope || this);
            }
        }
    });
}
else {
    Ext.menu.DateTimeItem = function(config){
        Ext.menu.DateTimeItem.superclass.constructor.call(this, new Ext.DateTimePicker(config), config);
        this.picker = this.component;
        this.addEvents('select');
        
        this.picker.on("render", function(picker){
            picker.getEl().swallowEvent("click");
            picker.container.addClass("x-menu-date-item");
        });
        
        this.picker.on("select", this.onSelect, this);
    };
    
    Ext.extend(Ext.menu.DateTimeItem, Ext.menu.DateMenu, {
        onSelect: function(picker, date){
            this.fireEvent("select", this, date, picker);
            Ext.menu.DateTimeItem.superclass.handleClick.call(this);
        }
    });
}

Ext.menu.DateTimeMenu = function(config){
    Ext.menu.DateTimeMenu.superclass.constructor.call(this, config);
    this.plain = true;
    var di = new Ext.menu.DateTimeItem(config);
    this.add(di);
    this.picker = di;
    this.relayEvents(di, ["select"]);
    
    this.on('beforeshow', function(){
        if (this.picker) {
            this.picker.hideMonthPicker(true);
        }
    }, this);
};
Ext.extend(Ext.menu.DateTimeMenu, Ext.menu.Menu, {
    cls: 'x-date-menu',
    beforeDestroy: function(){
        this.picker.destroy();
    },
    hide: function(deep){
        if (this.picker.tf.innerList) {
            if ((Ext.EventObject.within(this.picker.tf.innerList)) || (Ext.get(Ext.EventObject.getTarget()) == this.picker.tf.innerList)) 
                return false;
        }
        if (this.el && this.isVisible()) {
            this.fireEvent("beforehide", this);
            if (this.activeItem) {
                this.activeItem.deactivate();
                this.activeItem = null;
            }
            this.el.hide();
            this.hidden = true;
            this.fireEvent("hide", this);
        }
        if (deep === true && this.parentMenu) {
            this.parentMenu.hide(true);
        }
    }
});

Ext.ux.form.DateTimeField = Ext.extend(Ext.form.DateField, {
    dateFormat: 'Y-m-d',
    timeFormat: 'H:i:s',
    defaultAutoCreate: {
        tag: "input",
        type: "text",
        size: "20",
        autocomplete: "off"
    },
    initComponent: function(){
        Ext.ux.form.DateTimeField.superclass.initComponent.call(this);
        this.format = this.dateFormat + ' ' + this.timeFormat;
        this.afterMethod('afterRender', function(){
            this.getEl().applyStyles('top:0');
        });
    },
    getValue: function(){
        return this.parseDate(Ext.form.DateField.superclass.getValue.call(this)) || '';
    },
    onTriggerClick: function(){
        if (this.disabled) {
            return;
        }
        if (this.menu == null) {
            this.menu = new Ext.menu.DateTimeMenu();
        }
        Ext.apply(this.menu.picker, {
            minDate: this.minValue,
            maxDate: this.maxValue,
            disabledDatesRE: this.ddMatch,
            disabledDatesText: this.disabledDatesText,
            disabledDays: this.disabledDays,
            disabledDaysText: this.disabledDaysText,
            format: this.format,
            timeFormat: this.timeFormat,
            dateFormat: this.dateFormat,
            showToday: this.showToday,
            minText: String.format(this.minText, this.formatDate(this.minValue)),
            maxText: String.format(this.maxText, this.formatDate(this.maxValue))
        });
        if (this.menuEvents) {
            this.menuEvents('on');
        }
        else {
            this.menu.on(Ext.apply({}, this.menuListeners, {
                scope: this
            }));
        }
        this.menu.picker.setValue(this.getValue() || new Date());
        this.menu.show(this.el, "tl-bl?");
    }
});
Ext.reg('datetimefield', Ext.ux.form.DateTimeField);
/* global Ext */
/**
 * @version 4.2
 * ***********************************************************************************
 *
 * Ext.lib.Ajax enhancements:
 * - adds EventManager Support to Ext.lib.Ajax (if Ext.util.Observable is present in the stack)
 * - adds Synchronous Ajax Support ( options.async =false )
 * - Permits IE to Access Local File Systems using IE's older ActiveX interface via the forceActiveX property
 * - Pluggable Form encoder (encodeURIComponent is still the default encoder)
 * - Corrects the Content-Type Headers for posting JSON (application/json) and XML (text/xml)
 *   data payloads and sets only one value (per RFC)
 * - Adds fullStatus:{ isLocal, proxied, isOK, isError, isTimeout, isAbort, error, status, statusText} object
 *   to the existing Response Object.
 * - Adds standard HTTP Auth cache support to every request (XHR userId, password config options)
 * - options.method prevails over any method derived by the lib.Ajax stack (DELETE, PUT, HEAD etc).
 * - Adds named-Priority-Queuing for Ajax Requests
 * - adds Script=Tag support for foreign-domains (proxied:true) with configurable callbacks.
 * - Adds final features for $JIT support.
 *
 * - Adds Browser capabilities object reporting on presence of:
 *      Ext.capabilities.isEventSupported('resize'[, forElement]) to determine if the browser supports a specific event.
 *      SVG, Canvas, Flash, Cookies, XPath, Audio(HTML5), ChromeFrame (IE)
 *      if(Ext.capabilities.hasFlash){ ... }
 * - Adds Ext.overload supported for parameter-based overloading of Function and class methods.
 * - Adds Ext.clone functions for any datatype.
 * - Adds Array prototype features: first, last, clone, forEach, atRandom, include, flatten, compact, unique, filter, map
 * - Connection/response object members : getAllResponseHeaders, getResponseHeader are now functions.
 * - Adds Array.slice support for other browsers (Gecko already supports it)
 *    @example:  Array.slice( someArray, 2 )
 * - Adds Ext[isFunction, isObject, isDocument, isElement, isEvent]  methods.
 * - Adds multiPart Response handling (via onpart callbacks and/or parts Array of response Object)
 * - Adds parsed contentType to response objects
 * - Adds Xdomain request support for modern browsers
 *
 * ***********************************************************************************
 * @author Doug Hendricks. doug[always-At]theactivegroup.com 
 * @copyright 2007-2010, Active Group, Inc. All rights reserved.
 * ***********************************************************************************
 *
 * @license <a href="http://www.gnu.org/licenses/gpl.html">GPL 3.0</a>
 *
 * Commercial use is prohibited without a Developer License, see:
 * http://licensing.theactivegroup.com.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see < http://www.gnu.org/licenses/gpl.html>.
 *
 * Donations are welcomed: http://donate.theactivegroup.com
 *
 */
 
(function() {
    var A = Ext.lib.Ajax,
        defined = function(test){return typeof test != 'undefined';},
        emptyFn = Ext.emptyFn || function(){},
        OP = Object.prototype;
        
        
    Ext.lib.Ajax.Queue = function(config) {

        config = config ? (config.name ? config : { name : config }) : {};
        Ext.apply(this, config, {
            name : 'q-default',
            priority : 5,
            FIFO : true, // false implies LIFO
            callback : null, // optional callback when queue is emptied
            scope : null, // scope of callback
            suspended : false,
            progressive : false // if true, one queue item is dispatched per poll interval
         });
        this.requests = new Array();
        this.pending = false;
        // assert/resolve to 0-9
        this.priority = this.priority > 9 ? 9 : (this.priority < 0 ? 0 : this.priority);
    };

    Ext.extend(Ext.lib.Ajax.Queue, Object, {
       /**
        * Adds Ext.lib.Ajax.request arguments to queue
        * @param {Array} request An array of request method arguments.
        *
        */
        add : function(req) {

            var permit = A.events ? A.fireEvent('beforequeue', this, req) : true;
            if (permit !== false) {
                this.requests.push(req);
                this.pending = true;
                A.pendingRequests++;
                this.manager && this.manager.start();
            }
        },

       /**
        * @property {Boolean} suspended Indicate the suspense state of the queue.
        */
        suspended : false,
        /**
         * @property {Object} activeRequest A reference to current/last active request.
         */
        activeRequest : null,

       /**
        * Selects the next item on the queue stack
        * @param {Boolean} peek If true, the queue item is returned but not removed from the stack.
        * @ default false
        */
        next : function(peek) {
            var req = peek ?
                this.requests[this.FIFO ? 'first' : 'last']()
               :this.requests[this.FIFO ? 'shift' : 'pop']();

            if (this.requests.length == 0) {
                // queue emptied callback
                this.pending = false;
                Ext.isFunction(this.callback) && this.callback.call(this.scope || null, this);
                A.events && A.fireEvent('queueempty', this);
            }
            return req || null;
        },

        /**
        * clear the queue of any remaining (pending) requests
        */
        clear : function() {
            this.suspend();
            A.pendingRequests -= this.requests.length;
            this.requests.length = 0;
            this.pending = false;
            this.resume();
            this.next(); //force the empty callback/event

        },

        /**
        * Suspend queue further queue dispatches of any remaining (pending) requests until the {@link #Ext.ux.ModuleManager-resume} method is called.
        */
        suspend : function() {
            this.suspended = true;
        },

        /** Resume from a suspended state */
        resume : function() {
            this.suspended = false;
        },

        /**
        * Dispatches the next queue item and initiates a Ext.lib.Ajax request on the result.
        * @param {Boolean} peek If true, the queue item is returned but not removed from the stack.
        * @return activeRequest
        */
        requestNext : function(peek) {
            var req;
            this.activeRequest = null;
            if (!this.suspended && (req = this.next(peek))) {
                if(req.active){  //was it aborted
                    this.activeRequest = A.request.apply(A,req);
                    A.pendingRequests--;
                } else {
                    return this.requestNext(peek);
                }
            }
            return this.activeRequest;
        }
    });

    Ext.lib.Ajax.QueueManager = function(config) {

        Ext.apply(this, config || {}, {
                    quantas : 10, // adjustable milliseconds deferred dispatch value
                    
                    // array (0-9) of prioritized queues:
                    priorityQueues : new Array(
                        new Array(), 
                        new Array(),
                        new Array(), 
                        new Array(), 
                        new Array(), 
                        new Array(),
                        new Array(), 
                        new Array(), 
                        new Array(), 
                        new Array()
                     ), // iterable
                                                                                    
                    queues : {}
                });
    };

    Ext.extend(Ext.lib.Ajax.QueueManager, Object, {
       /**
        * @cfg {Integer} quantas Adjustable milliseconds deferred dispatch timer interval
        */
        quantas : 10,

       /** Return a named queue reference
        * param {String} name The name of the desired queue.
        * @return Ext.lib.Ajax.Queue
        */
        getQueue : function(name) {
            return this.queues[name];
        },
        
        createQueue : function(config) {
            if (!config) {return null;}

            var q = new A.Queue(config);
            q.manager = this;
            this.queues[q.name] = q;

            var pqa = this.priorityQueues[q.priority];
            pqa && pqa.indexOf(q.name) == -1 && pqa.push(q.name);
            return q;
        },
       /** Remove a Queue by passed name or Queue Object reference
        * @param {String/Ext.lib.Ajax.Queue} queue
        */
        removeQueue : function(q) {
            if (q && (q = this.getQueue(q.name || q))) {
                q.clear(); // purge any pending requests
                this.priorityQueues[q.priority].remove(q.name);
                delete this.queues[q.name];
            }
        },

        /** @private */
        start : function() {
            if (!this.started) {
                this.started = true;
                this.dispatch();
            }
            return this;
        },

        /** Suspends all defined queues */
        suspendAll : function() {
            forEach(this.queues, function(Q) { Q.suspend(); });
        },

        /** Resumes all suspended queues */
        resumeAll : function() {
            forEach(this.queues, function(Q) { Q.resume();  });
            this.start();
        },

        /**
         * @cfg (Boolean) progressive Default Dispatch mode for all defined queues<p>
         * a false value will exhaust a priority queue until empty during dispatch (sequential) <p>
         * true to dispatch a single request from each priority queue until all queues exhausted.<p>This
         * option may be set on the Queue itself as well.
         * @default false
         */
        progressive : false,

        stop : function() {
            this.started = false;
            return this;
        },

        /** private
         * main Request dispatch loop. This keeps the maximum allowed number of
         * requests going at any one time (based on defined queue priority and
         * dispatch mode (see progressive).
         */

        dispatch   : function(){
            var qm = this, qmq = qm.queues;
            var quit=(A.activeRequests >= A.maxConcurrentRequests);
            while(A.pendingRequests && !quit){

               var disp = function(qName) {
                    var q = qmq[qName], AR;

                    while (q && !q.suspended && q.pending && q.requestNext()) {

                        quit || (quit = A.activeRequests >= A.maxConcurrentRequests);
                        if(quit)break;

                        // progressive, take the first one off each queue only
                        if (q.progressive || qm.progressive) { break;}

                     }
                     // keep going?
                     if(quit)return false;
                };

                forEach(this.priorityQueues, function(pqueue) {
                    // pqueue == array of queue names
                    !!pqueue.length && forEach(pqueue , disp, this);
                    quit || (quit = A.activeRequests >= A.maxConcurrentRequests);
                    if(quit)return false;
                }, this);

            }

            if(A.pendingRequests || quit){
                this.dispatch.defer(this.quantas, this);
            } else{
                this.stop();
            }
        }
    });

    Ext.apply(A, {

        headers           : A.headers || {},
        defaultPostHeader : A.defaultPostHeader || 'application/x-www-form-urlencoded; charset=UTF-8',
        defaultHeaders    : A.defaultHeaders || {},
        useDefaultXhrHeader  : !!A.useDefaultXhrHeader,
        defaultXhrHeader  : 'Ext.basex',
        conn              : A.conn || {},
        //Reusable script tag pool for IE.
        SCRIPTTAG_POOL    : [],
        _domRefs          : [],        
        onUnload          : function(){
           delete A._domRefs;
           delete A.SCRIPTTAG_POOL;
        },
        
        /**
	     * private -- <script and link> tag support
	     */
	    monitoredNode : function(tag, attributes, callback, context, deferred) {
	        
	        var node = null, doc = (context || window).document,
	            head = doc ? doc.getElementsByTagName("head")[0] : null;
	        
	        if (tag && doc && head) {
	            node = tag.toUpperCase() == 'SCRIPT' && !!A.SCRIPTTAG_POOL.length ? Ext.get(A.SCRIPTTAG_POOL.pop()) : null;
	            if(node){
	                node.removeAllListeners();
	            }else{
	                node = Ext.get(doc.createElement(tag));
	            }
	            var ndom = Ext.getDom(node);
	            
	            ndom && forEach(attributes || {}, function(value, attrib) {
	                value && (attrib in ndom) && ndom.setAttribute(attrib, value);
	            });
	            
	            if (callback && (callback.immediate || tag.toUpperCase() == 'SCRIPT')) {
	                var cb = (callback.success || callback).createDelegate(callback.scope || null, [callback||{}], 0);
	                if(callback.immediate){
                        cb();   
                    } else {
                    
	                    Ext.isIE ? node.on('readystatechange', function(){
	                    
		                    this.dom.readyState == 'loaded' && cb();    
		                }) : node.on("load", cb);
                    }
	            }
	            deferred || ndom.parentNode || head.appendChild(ndom);
	        }
	        A._domRefs.push(node);
	        return node;
	    },
        
        poll              : {},

        pollInterval      : A.pollInterval || 50,

        queueManager      : new A.QueueManager(),

        // If true (or queue config object) ALL requests are queued
        queueAll : false,

        // the Current number of active Ajax requests.
        activeRequests : 0,

        // the Current number of pending Queued requests.
        pendingRequests : 0,

        /**
         * @property maxConcurrentRequests
         * Specify the maximum allowed during concurrent Queued browser (XHR) requests to consider during queued operation
         * Note:   IE8 increases this limit to 6
         */
        maxConcurrentRequests : (function(){
            
           var mc = 6;
           if(Ext.isIE){ 
               mc = Ext.value(window.maxConnectionsPerServer, 2);
           }else if(Ext.isOpera){
               mc = 4;
           }else if(Ext.Safari){
               mc  = Ext.isSafari4 ? 5 : 4;
           }
           return mc;
        })(),

        /** set True as needed, to coerce IE to use older ActiveX interface
         */
        forceActiveX : false,

        /**
         *  Global default may be toggled at any time
         */
        async : true,

        /** private */
        createXhrObject : function(transactionId, options) {
            var obj = {
                status : {
                    isError : false
                },
                
                tId   : transactionId
            }, 
            ecode = null;
            
            options || (options = {});
            try {
                options.xdomain && window.XDomainRequest && (obj.conn =  new XDomainRequest());
                
                if (!defined(obj.conn) && 
                   Ext.capabilities.hasActiveX && 
                     !!Ext.value(options.forceActiveX, this.forceActiveX)) {
                    throw ("IE7forceActiveX");
                }
                obj.conn || (obj.conn = new XMLHttpRequest());
                
            } catch (eo) {
                var actX = Ext.capabilities.hasActiveX ?
                    ( options.multiPart ? this.activeXMultipart : this.activeX ) : null ;
                    
                if(actX){
	                for (var i = 0, l = actX.length; i < l; ++i) {
	                    try {
	                        obj.conn = new ActiveXObject(actX[i]);
	                        break;
	                    } catch (e) {ecode = (eo == "IE7forceActiveX"? e: eo);}
	                }
                }
            } finally {
                obj.status.isError = !defined(obj.conn);
                obj.status.error=  ecode;
            }
            return obj;

        },
                
        createExceptionObject: function (tId, callbackArg, isAbort, isTimeout, errObj) {          
            return {
                tId        : tId,
                status     : isAbort ? -1 : 0,
                statusText : isAbort ? 'transaction aborted' : 'communication failure',
                    isAbort: isAbort,
                  isTimeout: isTimeout,
                  argument : callbackArg
            };
        },  

        /* Replaceable Form encoder */

        encoder : encodeURIComponent,

        serializeForm : function(){ 
            var reSelect = /select-(one|multiple)/i,
                reInput = /file|undefined|reset|button/i,
                reChecks = /radio|checkbox/i,
                reSubmit = /submit/i;
        
	        return function(form) {
	            var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements,
	                        hasSubmit = false,
	                        encoder = this.encoder,
	                        element,
	                        options,
	                        name,
	                        val,
	                        data = '',
	                        type;
	            forEach(fElements, function(element) {
	                name = element.name;
	                type = element.type;
	                if (!element.disabled && name){
	                    if(reSelect.test(type)){
	                        forEach(element.options, function(opt) {
	                            if (opt.selected) {
	                                data += String.format("{0}={1}&",
	                                     encoder(name),
	                                     encoder(
                                           opt.hasAttribute && opt.hasAttribute('value') &&
                                              opt.getAttribute('value') !== null ? opt.value : opt.text
                                             )
                                       );
	                            }
	                        });
	                    } else if(!reInput.test(type)) {
	                        if(!(reChecks.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)){
	                            data += encoder(name) + '=' + encoder(element.value) + '&';
	                            hasSubmit = reSubmit.test(type);
	                        }
	                    }
	                }
	            });
	            return data.substr(0, data.length - 1);
            };
        }(),

        /** private */
        getHttpStatus : function(reqObj, isAbort, isTimeout) {

            var statObj = {
                status : 0,
                statusText : '',
                isError : false,
                isLocal : false,
                isOK : true,
                error : null,
                isAbort : !!isAbort,
                isTimeout : !!isTimeout
            };

            try {
                if (!reqObj || !('status' in reqObj)) { throw ('noobj'); }
                statObj.status = reqObj.status;
                statObj.readyState = reqObj.readyState;
                statObj.isLocal = (!reqObj.status && location.protocol == "file:")
                        || (Ext.isSafari && !defined(reqObj.status));

                statObj.isOK = (statObj.isLocal || (statObj.status == 304
                        || statObj.status == 1223 || (statObj.status > 199 && statObj.status < 300)));

                statObj.statusText = reqObj.statusText || '';
            } catch (e) {
            } // status may not avail/valid yet, called too early, or status not support by the transport

            return statObj;

        },
        /**
         * @private
         */
        handleTransactionResponse : function(o, callback, isAbort, isTimeout) {

            callback = callback || {};
            var responseObject = null;
            
            if (!o.status.isError) {
                o.status = this.getHttpStatus(o.conn, isAbort, isTimeout);
                /*
                 * create and enhance the response with proper status and XMLDOM
                 * if necessary
                 */
                responseObject = this.createResponseObject(o, callback.argument, isAbort, isTimeout);
            }
            o.isPart || this.releaseObject(o);

            /*
             * checked again in case exception was raised - ActiveX was
             * disabled during XML-DOM creation? And mixin everything the
             * XHR object had to offer as well
             */
            o.status.isError && (responseObject = Ext.apply({}, responseObject || {},
                this.createExceptionObject(o.tId, callback.argument, !!isAbort, !!isTimeout, o.status.error)));

            responseObject.options = o.options;
            responseObject.fullStatus = o.status;

            if (!this.events
                    || this.fireEvent('status:' + o.status.status,
                            o.status.status, o, responseObject, callback,
                            isAbort) !== false) {

                if (o.status.isOK && !o.status.isError) {
                    if (!this.events
                            || this.fireEvent('response', o, responseObject,
                                    callback, isAbort, isTimeout) !== false) {
                        
                        var cb = o.isPart? 'onpart':'success';
                        
                        Ext.isFunction(callback[cb]) && 
                            callback[cb].call(callback.scope || null,responseObject);
                        
                    }
                } else {
                    if (!this.events
                            || this.fireEvent('exception', o, responseObject,
                                    callback, isAbort, isTimeout, responseObject.fullStatus.error) !== false) {
                        Ext.isFunction(callback.failure) &&
                            callback.failure.call(callback.scope || null, responseObject, responseObject.fullStatus.error);
                        
                    }
                }
            }

            return responseObject; 

        },
        /**
         * @private
         * Release the allocated XHR object and reset any timers
         */
        releaseObject:function(o){
            
            o && (o.conn = null);
            if(o && Ext.value(o.tId,-1)+1){
                this.activeRequests--;
	            if(this.poll[o.tId]){
	                window.clearInterval(this.poll[o.tId]);
	                delete this.poll[o.tId];
	            }
	            if(this.timeout[o.tId]){
	                window.clearInterval(this.timeout[o.tId]);
		            delete this.timeout[o.tId];
	            }
                delete this.conn[o.tId];
            }
            
        },

        /**
         *  replace with a custom JSON decoder/validator if required
         */
        decodeJSON : Ext.decode,

        /**
         * @cfg reCtypeJSON
         * regexp test pattern applied to incoming response Content-Type header
         * to identify a potential JSON response. The default pattern handles
         * either text/json or application/json
         */
        reCtypeJSON : /(application|text)\/json/i,
        
        /**
         * @cfg reCtypeXML
         * regexp test pattern applied to incoming response Content-Type header
         * to identify a potential JSON response. The default pattern handles
         * either text/json or application/json
         */
        reCtypeXML : /(application|text)\/xml/i,
        
         /** private */
        createResponseObject : function(o, callbackArg, isAbort, isTimeout) {
            var CTYPE = 'content-type', 
                obj = {
	                responseXML : null,
	                responseText : '',
	                responseStream : null,
	                responseJSON : null,
	                contentType : null,
	                getResponseHeader : emptyFn,
	                getAllResponseHeaders : emptyFn
	            };

            var headerObj = {}, headerStr = '';

            if (isAbort !== true) {
                try { // to catch bad encoding problems here
                    obj.responseJSON = o.conn.responseJSON || null;
                    obj.responseStream = o.conn.responseStream || null;
                    obj.contentType = o.conn.contentType || null;
                    obj.responseText = o.conn.responseText;
                } catch (e) {
                    o.status.isError = true;
                    o.status.error = e;
                }

                try {
                    obj.responseXML = o.conn.responseXML || null;
                } catch (ex) {
                }

                try {
                    headerStr = ('getAllResponseHeaders' in o.conn ? o.conn.getAllResponseHeaders() : null ) || '';
                    var s;
                    headerStr.split('\n').forEach( function(sHeader){
                        (s = sHeader.split(':')) && s.first() && 
	                        (headerObj[s.first().trim().toLowerCase()] = (s.last()||'').trim());
                    });
	                
                } catch (ex1) {
                    o.status.isError = true; // trigger future exception callback
                    o.status.error = ex1;
                }
                finally{ obj.contentType = obj.contentType || headerObj[CTYPE] || ''; }

                if ((o.status.isLocal || o.proxied)
                        && typeof obj.responseText == 'string') {

                    o.status.isOK = !o.status.isError
                            && ((o.status.status = (!!obj.responseText.length)
                                    ? 200 : 404) == 200);

                    if (o.status.isOK
                            && 
                             ( (!obj.responseXML && ( o.options.isXML || this.reCtypeXML.test(obj.contentType )))
                             || (obj.responseXML && obj.responseXML.childNodes.length === 0) )
                        ) {

                        var xdoc = null;
                        try { // ActiveX may be disabled
                            if (Ext.capabilities.hasActiveX) {
                                xdoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
                                xdoc.async = false;
                                xdoc.loadXML(obj.responseText);
                            } else {
                                var domParser = null;
                                try { // Opera 9 will fail parsing non-XML content, so trap here.
                                    domParser = new DOMParser();
                                    xdoc = domParser.parseFromString(obj.responseText,'application\/xml');
                                } catch (exP) {
                                } finally {
                                    domParser = null;
                                }
                            }
                        } catch (exd) {
                            o.status.isError = true;
                            o.status.error = exd;
                        }
                        obj.responseXML = xdoc;
                    }
                    if (obj.responseXML) {
                        var parseBad = (obj.responseXML.documentElement && obj.responseXML.documentElement.nodeName == 'parsererror')
                                || (obj.responseXML.parseError || 0) !== 0
                                || obj.responseXML.childNodes.length === 0;
                        parseBad || 
                            (obj.contentType = headerObj[CTYPE] = obj.responseXML.contentType || 'text\/xml');
                    }
                }

                if (o.options.isJSON || (this.reCtypeJSON && this.reCtypeJSON.test(headerObj[CTYPE] || ""))) {
                    try {
                        Ext.isObject(obj.responseJSON) || Ext.isArray(obj.responseJSON) || 
                            (obj.responseJSON = Ext.isFunction( this.decodeJSON ) && 
                               Ext.isString(obj.responseText)
                                ? this.decodeJSON(obj.responseText)
                                : null);
                    } catch (exJSON) {
                        o.status.isError = true; // trigger future exception callback
                        o.status.error = exJSON;
                    }
                }

            } // isAbort?
            o.status.proxied = !!o.proxied;

            Ext.apply(obj, {
                        tId     : o.tId,
                        status  : o.status.status,
                        statusText : o.status.statusText,
                        contentType : obj.contentType || headerObj[CTYPE],
                        getResponseHeader : function(header){return headerObj[(header||'').trim().toLowerCase()];},
                        getAllResponseHeaders : function(){return headerStr;},
                        fullStatus : o.status,
                        isPart : o.isPart || false
                    });
               
            o.parts && !o.isPart && (obj.parts = o.parts);
            defined(callbackArg) && (obj.argument = callbackArg);
            return obj;
        },


        setDefaultPostHeader : function(contentType) {
            this.defaultPostHeader = contentType||'';
        },

        /**
         * Toggle use of the DefaultXhrHeader ('Ext.basex')
         */
        setDefaultXhrHeader : function(bool) {
            this.useDefaultXhrHeader = bool || false;
        },

        request : function(method, uri, cb, data, options) {

            var O = options = Ext.apply({
                        async : this.async || false,
                        headers : false,
                        userId : null,
                        password : null,
                        xmlData : null,
                        jsonData : null,
                        queue : null,
                        proxied : false,
                        multiPart : false,
                        xdomain  : false
                    }, options || {});
                    
                    //Seek out nested config options
                    var _to;
                    if( cb.argument && 
                         cb.argument.options &&
                          cb.argument.options.request &&
                          (_to = cb.argument.options.request.arg) ){
                            
                         Ext.apply(O,{
                           async : O.async || _to.async,
                           proxied : O.proxied || _to.proxied,
                           multiPart : O.multiPart || _to.multiPart,
                           xdomain : O.xdomain ||_to.xdomain,
                           queue   : O.queue ||_to.queue,
                           onPart  : O.onPart ||_to.onPart
                         }); 
                     }
            
            if (!this.events
                    || this.fireEvent('request', method, uri, cb, data, O) !== false) {

                // Named priority queues
                if (!O.queued && (O.queue || (O.queue = this.queueAll || null)) ) {

                    O.queue === true && (O.queue = {name:'q-default'});
                    var oq = O.queue;
                    var qname = oq.name || oq , qm = this.queueManager;

                    var q = qm.getQueue(qname) || qm.createQueue(oq);
                    O.queue = q;
                    O.queued = true;

                    var req = [method, uri, cb, data, O];
                    req.active = true;
                    q.add(req);

                    return {
                        tId : this.transactionId++,
                        queued : true,
                        request : req,
                        options : O
                    };
                }
                
                options.onpart && (cb.onpart || 
                 (cb.onpart = Ext.isFunction(options.onpart) ? 
                    options.onpart.createDelegate(options.scope): null));
                    
                O.headers && forEach(O.headers, 
                    function(value, key) { this.initHeader(key, value, false); },this);

                var cType;
                // The Content-Type specified on options.headers always has priority over 
                // a calculated value.
                if (cType = (this.headers ? this.headers['Content-Type'] || null : null)) {
                    // remove to ensure only ONE is passed later.(per RFC)
                    delete this.headers['Content-Type'];
                }
                if (O.xmlData) {
                    cType || (cType = 'text/xml');
                    method = 'POST';
                    data = O.xmlData;
                } else if (O.jsonData) {
                    cType || (cType = 'application/json; charset=utf-8');
                    method = 'POST';
                    data = (Ext.isArray(O.jsonData) || Ext.isObject(O.jsonData)) ? 
                        Ext.encode(O.jsonData) : O.jsonData;
                }
                if (data) {
                    cType || (cType = this.useDefaultHeader ? this.defaultPostHeader : null);
                    cType && this.initHeader('Content-Type', cType, false);
                }

                // options.method prevails over any derived method.
                return this.makeRequest(O.method || method, uri, cb, data, O);
            }
            return null;

        },


        /** private */
        getConnectionObject : function(uri, options, data) {
            var o, f;
            var tId = this.transactionId;
            options || (options = {});
            try {
                if (f = options.proxied) { /* JSONP scriptTag Support */
                    
                    o = {
                        tId : tId,
                        status : {isError : false},
                        proxied : true,
                        // synthesize an XHR object
                        conn : {
                            el : null,
                            send : function(data) {
                                var doc = (f.target || window).document,
                                head = doc.getElementsByTagName("head")[0];
                                if (head && this.el) {
                                    head.appendChild(this.el.dom);
                                    this.readyState = 2;
                                }
                            },
                            abort : function() {
                                this.readyState = 0;
                                window[o.cbName] = undefined;
		                        //IE dislikes this
		                        Ext.isIE || delete window[o.cbName];
                                
		                        var d = Ext.getDom(this.el);
		                        
                                if(this.el){
                                  this.el.removeAllListeners();  
                                  if(!o.debug){
                                    if(Ext.isIE){
                                        //Script Tags are re-usable in IE
                                        A.SCRIPTTAG_POOL.push(this.el);
                                    }else{
	                                    this.el.remove();
	                                    //Other Browsers will not GBG-collect these tags, so help them along
	                                    if(d ){
	                                        for(var prop in d) {delete d[prop];}
	                                    }
                                    }
                                  }
                                }
		                        this.el = d = null;
                            },
                            _headers : {},
                            getAllResponseHeaders : function(){
                                var out=[];
                                forEach(this._headers,function(value, name){
                                   value && out.push(name + ': '+value);
                                });
                                return out.join('\n');
                                
                                },
                            getResponseHeader : function(header){ 
                                return this._headers[String(header).toLowerCase()] || ''; 
                               },
                            onreadystatechange : null,
                            onload : null,
                            readyState : 0,
                            status : 0,
                            responseText : null,
                            responseXML : null,
                            responseJSON : null
                        },
                        debug : f.debug,
                        params : Ext.isString(options.params) ?  Ext.urlDecode(options.params) : options.params || {},
                        cbName : f.callbackName || 'basexCallback' + tId,
                        cbParam : f.callbackParam || null
                    };

                    window[o.cbName] = o.cb = function(content) {

                        content && typeof(content)=='object' && (this.responseJSON = content);
                        this.responseText = content || null;
                        this.status = !!content ? 200 : 404;
                        this.abort();
                        this.readyState = 4;
                        Ext.isFunction(this.onreadystatechange) && this.onreadystatechange();
                        Ext.isFunction(this.onload) && this.onload();
                        
                    }.createDelegate(o.conn);

                    o.conn.open = function() {

                        if (o.cbParam) {
                            o.params[o.cbParam] = o.cbName;
                        }
                        
                        //apply any new params to any already supplied by the uri and postData
                        var params = Ext.urlEncode(
                            Ext.apply(
                                Ext.urlDecode(data) || {},  //decode any postData
                                o.params,
                                uri.indexOf("?") > -1 ? Ext.urlDecode(uri.split('?').last()): false
                            )) ;
                        
                        o.uri = params ? uri.split('?').first() + '?' + params : uri;

                        this.el = A.monitoredNode(
                                f.tag || 'script', 
                                {
                                    type : f.contentType || "text/javascript",
                                    src : o.uri,
                                    charset : f.charset || options.charset || null
                                },
                                null,
                                f.target, 
                                true); //defer head insertion until send method
                        
                        this._headers['content-type'] = this.el.dom.type;        
                        this.readyState = 1; // show CallInProgress
                        Ext.isFunction(this.onreadystatechange) && this.onreadystatechange();

                    };
                    options.async = true; // force timeout support
                    
                } else {
                    o = this.createXhrObject(tId, options);
                }
                if (o) {
                    this.transactionId++;
                }
            } catch (ex3) { 
                o && (o.status.isError = !!(o.status.error = ex3));
            } finally {
                return o;
            }
        },
        
        /** private */
        makeRequest : function(method, uri, callback, postData, options) {

            var o;
            if (o = this.getConnectionObject(uri, options, postData)) {
                o.options = options;
                var r = o.conn;
                
                try {
                    if(o.status.isError){ throw o.status.error; };
                    
                    A.activeRequests++;
                    r.open(method.toUpperCase(), uri, options.async, options.userId, options.password);
                    
                    
                    ('onreadystatechange' in r) && 
                        (r.onreadystatechange = this.onStateChange.createDelegate(this, [o, callback, 'readystate'], 0));
                    
                    ('onload' in r) &&
                        (r.onload = this.onStateChange.createDelegate(this, [o, callback, 'load', 4], 0));
                        
                    ('onprogress' in r) &&
                        (r.onprogress = this.onStateChange.createDelegate(this, [o, callback, 'progress'], 0));
                    
                    
	                if (!this.events
                            || this.fireEvent('beforesend', o, method, uri, callback, postData, options) !== false) {
                                
                        //IE8/other? evolving timeout callback support
	                    if(callback && callback.timeout  && options.async){
	                        ('timeout' in r) && (r.timeout = callback.timeout);
	                        ('ontimeout' in r) && 
	                           (r.ontimeout = this.abort.createDelegate(this, [o, callback, true], 0));
	                        ('ontimeout' in r) ||
	                           // Timers for syncro calls won't work here, as it's a blocking call
	                           (options.async && (this.timeout[o.tId] = window.setInterval(
	                                function() {A.abort(o, callback, true);
	                            }, callback.timeout)));
	                    }
                        
                        if (this.useDefaultXhrHeader && !options.xdomain) {
	                        this.defaultHeaders['X-Requested-With'] ||
	                            this.initHeader('X-Requested-With', this.defaultXhrHeader, true);
	                    }
	                    this.setHeaders(o);
                                        
                        this.conn[o.tId] = o;
                        r.send(postData || null);
                    }else{
                        this.releaseObject(o);
                        return o;
                    }
                } catch (exr) {
                    o.status.isError = true;
                    o.status.error = exr;
                }
                if(o.status.isError ) {
                    return Ext.apply(o, this.handleTransactionResponse(o, callback));
                }
                options.async || this.onStateChange(o, callback, 'load'); 
                return o;
            }
        },


        abort : function(o, callback, isTimeout) {
        	
        	if(o){
        		o.status || (o.status={});
        		Ext.apply(o.status,{
	                isAbort : !!!isTimeout,
	                isTimeout : !!isTimeout,
	                isError  : !!isTimeout || !!o.status.isError
	              }); 
	            if (o.queued && o.request) {
	                o.request.active = o.queued = false;
	                this.events && this.fireEvent('abort', o, callback);
	                return true;
	            } else if ( this.isCallInProgress(o)) {
	                
	                if (!this.events || this.fireEvent(isTimeout ? 'timeout' : 'abort', o, callback)!== false){
	                    ('abort' in o.conn) && o.conn.abort();
	                    this.handleTransactionResponse(o, callback, o.status.isAbort, o.status.isTimeout);
	                }
	                return true;
	            } 
        	}
            return false;
        },
        
        isCallInProgress : function(o) {
            // if there is a connection and readyState is supported, and not 0 or 4
            if( o && o.conn ){
                if('readyState' in o.conn && {0:true,4:true}[o.conn.readyState]){
                    return false;
                }
                return true;
            }
            return false;
        },

        /**
         * Clears the Browser authentication Cache
         * @param {String} url {optional) reset url for non-IE browsers
         * @return void
         */
        clearAuthenticationCache : function(url) {

            try {

                if (Ext.isIE) {
                    // IE clear HTTP Authentication, (but ALL realms though)
                    document.execCommand("ClearAuthenticationCache");
                } else {
                    // create an xmlhttp object
                    var xmlhttp;
                    if (xmlhttp = new XMLHttpRequest()) {
                        // prepare invalid credentials
                        xmlhttp.open("GET", url || '/@@', true, "logout", "logout");
                        // send the request to the server
                        xmlhttp.send("");
                        // abort the request
                        xmlhttp.abort.defer(100, xmlhttp);
                    }
                }
            } catch (e) {} // There was an error
           
        },

        // private
        initHeader : function(label, value) {
            (this.headers = this.headers || {})[label] = value;
        },
          
        /** @private 
         * General readyStateChange multiPart handler 
         */
        onStateChange : function(o, callback, mode) {
            
            if(!o.conn || o.status.isTimeout || o.status.isError){ return; }
            
            var C = o.conn, readyState = ('readyState' in C ? C.readyState : 0);
            if(mode === 'load' || readyState > 2){
                var ct;
                try{ct = C.contentType || C.getResponseHeader('Content-Type') || '';}
                catch(exRs){ }
                
                if(ct && /multipart\//i.test(ct)){
                    var r = null, boundary = ct.split('"')[1], kb = '--' + boundary;
                    o.multiPart = true;
                    try{r = C.responseText;}catch(ers){}
                     
                    var p = r ? r.split(kb) : null;
                        
                    if(p){
                         o.parts || (o.parts = []);
	                     p.shift();
	                     p.pop();
	                    
	                     forEach( 
                           Array.slice(p, o.parts.length), //skip parts already parsed 
		                      function(newPart){
		                        var content = newPart.split('\n\n');
		                        var H = (content[0] ? content[0] : '') + '\n';
		                        o.parts.push(this.handleTransactionResponse(
		                          Ext.apply(
                                    Ext.clone(o),{
		                            boundary : boundary,
		                                conn : {  //synthetic conn structure for each part
		                                    status : 200,
		                                    responseText : (content[1]||'').trim(),
		                           getAllResponseHeaders : function(){
		                                        return H.split('\n').filter(
		                                            function(value){return !!value;}).join('\n');
		                                    }
		                                },
		                                isPart : true
		                          }), callback));
		                  },this);
                    }
                    
                }
            }
            (readyState === 4 || mode === 'load') && A.handleTransactionResponse(o, callback);
            this.events && this.fireEvent.apply(this, ['readystatechange'].concat(Array.slice(arguments, 0)));
        },
        
        setHeaders:function(o){

            //Some XDomain implementations (IE8) do not support setting headers
            if(o.conn && 'setRequestHeader' in o.conn){
	            this.defaultHeaders &&
		            forEach(this.defaultHeaders, function(value, key){ o.conn.setRequestHeader(key, value);});
	
	            this.headers &&
		            forEach(this.headers, function(value, key){o.conn.setRequestHeader(key, value);});
            }
            this.headers = {};
            this.hasHeaders = false;

        },

        resetDefaultHeaders:function() {
            delete this.defaultHeaders;
            this.defaultHeaders = {};
            this.hasDefaultHeaders = false;
        },
        
        //These are only current versions of ActiveX XHR that support multipart responses
        activeXMultipart : [
        'MSXML2.XMLHTTP.6.0',
        'MSXML3.XMLHTTP' 
        ],
        
        activeX:[
        'MSXML2.XMLHTTP.3.0',
        'MSXML2.XMLHTTP',
        'Microsoft.XMLHTTP'
        ]

    });
    
    if (Ext.util.Observable) {

        Ext.apply(A, {

            events : {
                request : true,
                beforesend : true,
                response : true,
                exception : true,
                abort : true,
                timeout : true,
                readystatechange : true,
                beforequeue : true,
                queue : true,
                queueempty : true
            },

            /**
             * onStatus define eventListeners for a single (or array) of
             * HTTP status codes.
             */

            onStatus : function(status, fn, scope, options) {
                var args = Array.slice(arguments, 1);
                status = new Array().concat(status || new Array());
                forEach(status, function(statusCode) {
                            statusCode = parseInt(statusCode, 10);
                            if (!isNaN(statusCode)) {
                                var ev = 'status:' + statusCode;
                                this.events[ev] || (this.events[ev] = true);
                                this.on.apply(this, [ev].concat(args));
                            }
                        }, this);
            },
            
            /**
             * unStatus unSet eventListeners for a single (or array) of
             * HTTP status codes.
             */

            unStatus : function(status, fn, scope, options) {
                var args = Array.slice(arguments, 1);
                status = new Array().concat(status || new Array());
                forEach(status, function(statusCode) {
                            statusCode = parseInt(statusCode, 10);
                            if (!isNaN(statusCode)) {
                                var ev = 'status:' + statusCode;
                                this.un.apply(this, [ev].concat(args));
                            }
                        }, this);
            }

        }, new Ext.util.Observable());

        Ext.hasBasex = true;
    }
        
    // Array, object iteration and clone support
    Ext.stopIteration = { stopIter : true };

    Ext.applyIf(Array.prototype, {

        /*
         * Fix for IE, Opera < 9.5, which does not seem to include the map
         * function on Array's
         */
        map : function(fun, scope) {
            var len = this.length;
            if (typeof fun != "function") {
                throw new TypeError();
            }
            var res = new Array(len);

            for (var i = 0; i < len; ++i) {
                i in this &&
                    (res[i] = fun.call(scope || this, this[i], i, this));
            }
            return res;
        },
        
        /**
         * Return true of the passed Function test true of ANY array elememt.
         * (added for IE)
         */
        some  : function(fn){
          var f= Ext.isFunction(fn) ? fn : function(){};
          var i=0, l=this.length, test=false;
          while(i<l && !(test=!!f(this[i++]))){}
          return test;
        },
        
        /**
         * Return true of the passed Function test true of ALL array elememts.
         * (added for IE)
         */
        every  : function(fn){
          var f= Ext.isFunction(fn) ? fn : function(){};
          var i=0, l=this.length, test=true;
          while(i<l && (test=!!f(this[i++]))){}
          return test;
        },

        include : function(value, deep) { // Boolean: is value present
                                            // in Array
            // use native indexOf if available
            if (!deep && typeof this.indexOf == 'function') {
                return this.indexOf(value) != -1;
            }
            var found = false;
            try {
                this.forEach(function(item, index) {
                    if (found = (deep
                            ? (item.include
                                    ? item.include(value, deep)
                                    : (item === value))
                            : item === value)) {
                        throw Ext.stopIteration;
                    }
                });
            } catch (exc) {
                if (exc != Ext.stopIteration) {
                    throw exc;
                }
            }
            return found;
        },
        // Using iterFn, traverse the array, push the current element
        // value onto the
        // result if the iterFn returns true
        filter : function(iterFn, scope) {
            var a = new Array();
            iterFn || (iterFn = function(value) {
                return value;
            });
            this.forEach(function(value, index) {
                iterFn.call(scope, value, index) && a.push(value);
            });
            return a;
        },

        compact : function(deep) { // Remove null, undefined array
                                    // elements
            var a = new Array();
            this.forEach(function(v, i) {
                (v === null || v === undefined) || !(i in this) || a.push(deep && Ext.isArray(v) ? v.compact() : v);
            }, this);
            return a;
        },

        flatten : function() { // flatten: [1,2,3,[4,5,6]] ->
                                // [1,2,3,4,5,6]
            var a = new Array();
            this.forEach(function(v) {
                Ext.isArray(v) ? (a = a.concat(v)) : a.push(v);
            }, this);
            return a;
        },
        
        indexOf : function(o){
	       for (var i = 0, len = this.length; i < len; ++i){
	           if(this[i] == o) return i;
	       }
	       return -1;
	    },

        
        lastIndexOf : function(val){
            var i= this.length-1;
            while(i>-1 && this[i] != val){i--;}
            return i;
        },

        unique : function(sorted /* sort optimization */, exact) { // unique:
                                                                    // [1,3,3,4,4,5]
                                                                    // ->
                                                                    // [1,3,4,5]
            var a = new Array();
            this.forEach(function(value, index) {
                if (0 == index
                        || (sorted ? a.last() != value : !a.include(value, exact))) {
                    a.push(value);
                }
            }, this);
            return a;
        },
        
        // search array values based on regExpression pattern returning
        // test (and optionally execute function(value,index) on test
        // before returned)
        grep : function(rePattern, iterFn, scope) {
            var a = new Array();
            iterFn || (iterFn = function(value) {
                return value;
            });
            var fn = scope ? iterFn.createDelegate(scope) : iterFn;

            if (typeof rePattern == 'string') {
                rePattern = new RegExp(rePattern);
            }
            rePattern instanceof RegExp && 
             this.forEach(function(value, index) {
                rePattern.test(value) && a.push(fn(value, index));
            });
            return a;
        },
        /**
         * Return the first Array element
         * @argument asDefined True to return the first defined element
         */
        first : function(asDefined) {
            var i =0;
            if(asDefined){
                var l = this.length;
                //get the first defined Array element value
                while(i<l && !(i in this )){i++;}
            }
            return this[i];
        },
        /**
         * Return the last Array element
         * @argument asDefined True to return the last defined element
         */
        last : function(asDefined) {
            var i = this.length - 1;
            if(asDefined){
                //get the first defined Array element value
                while(i > 0 && !(i in this )){i--;}
            }
            return this[i];
        },

        clear : function() {
            this.length = 0;
        },

        // return an array element selected at random
        atRandom : function(defValue) {
            var r = Math.floor(Math.random() * this.length);
            return this[r] || defValue;
        },

        clone : function(deep) {
            if (!deep) {return this.concat();}

            var length = this.length || 0, t = new Array(length);
            while (length--) {
                t[length] = Ext.clone(this[length], true);
            }
            return t;

        },
        
        reduce : function(block, initialValue) {
		    var l = this.length, i=0, previous, current;
		    if(!l){
               return initialValue || null;
            }
		    //get initialValue or the first defined Array element value
		    previous = initialValue || this.first(true);
		
		    this.forEach(function(val, idx, arr) {
		        current = val;
		        previous = block.apply(null, [previous, current, idx, arr]);
		    });
		
		    return previous;
		},
        
         /*
         * Array forEach Iteration based on previous work by: Dean Edwards
         * (http://dean.edwards.name/weblog/2006/07/enum/) Gecko already
         * supports forEach for Arrays : see
         * http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/forEach
         */
        forEach : function( block, scope) {
            Array.forEach(this, block, scope);
        },
        
        reversed : function(){
	        var length = this.length || 0, t = [];
	        while (length--) {
	            t.push(this[length]);
	        }
	        return t;   
	    }   

    });


    // globally resolve forEach enumeration
    window.forEach = function(object, block, context, deep) {
        context = context || object;
        if (object) {
            if (typeof block != "function") {
                throw new TypeError();
            }
            var resolve = Object;
            if (object instanceof Function) {
                // functions have a "length" property
                resolve = Function;
            
            } else if (object.forEach instanceof Function) {
                // the object implements a custom forEach method so use that
                return object.forEach(block, context);
               
            } else if (typeof object == "string") {
                // the object is a string
                resolve = String;
                
            } else if (Ext.isNumber(object.length)) {
                // the object is array-like
                resolve = Array;
            } 
            return resolve.forEach(object, block, context, deep);
        }
    }; 

    /**
     * 
     * Primary clone Function
     */
    Ext.clone = function(obj, deep) {
        if (obj === null || obj === undefined) {return obj;}
        
        if (Ext.isFunction(obj.clone)) { 
            return obj.clone(deep);
        }
        else if(Ext.isFunction(obj.cloneNode)){
            return obj.cloneNode(deep);
        }
        var o={};
        forEach(obj, function(value, name, objAll){
            o[name] = (value === objAll ? // reference to itself?
                o : deep ? Ext.clone(value, true) : value); 
        }, obj, deep);
        return o;
    };
   
    var slice = Array.prototype.slice;
    var filter = Array.prototype.filter;
    Ext.applyIf(Array,{
        // Permits: Array.slice(arguments, 1); // mozilla already supports this
        slice: function(obj) {
            return slice.apply(obj, slice.call(arguments, 1));
            },
        //String filter iteration
        filter: function(obj, fn){
            var t = obj && typeof obj == 'string' ? obj.split('') : [];
            return filter.call(t, fn);
        },
         /*
         * Array forEach Iteration based on previous work by: Dean Edwards
         * (http://dean.edwards.name/weblog/2006/07/enum/) Gecko already
         * supports forEach for Arrays : see
         * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/forEach
         */
        forEach : function( collection, block, scope) {

            if (typeof block != "function") {
                throw new TypeError();
            }
            for (var i = 0, l = collection.length >>> 0; i < l; ++i) {
               (i in collection) && block.call(scope || null, collection[i], i, collection);
            }
          }
    });
    
    //Add clone function to primitive prototypes
    
    Ext.applyIf(RegExp.prototype,{
        clone : function() {
            return new RegExp(this);
        }        
    });

    Ext.applyIf(Date.prototype, {
        clone  : function(deep){
            return deep? new Date(this.getTime()) : this ;
        }
    });

    Ext.applyIf(Boolean.prototype, {
        clone : function(){
           return this === true; 
        }
    }); 
    
    Ext.applyIf(Number.prototype, {
        times  : function(block, context){
            var total = parseInt(this,10) || 0;
            for (var i=1; i <= total; ){
               block.call(context, i++);
            }
        },
        forEach : function(){
           this.times.apply(this, arguments);
        },
        
        clone : function(){
           return (this)+ 0; 
        }
    });

    // character enumeration
    Ext.applyIf(String.prototype, {
        
        trim : function() {
            var re = /^\s+|\s+$/g;
            return function() {
                return this.replace(re, "");
            };
        }(),
        
        trimRight : function() {
            var re = /^|\s+$/g;
            return function() {
                return this.replace(re, "");
            };
        }(),
        
        trimLeft : function() {
            var re = /^\s+|$/g;
            return function() {
                return this.replace(re, "");
            };
        }(),

        clone : function() { return String(this)+''; },
        
        forEach : function(block, context){
            String.forEach(this, block,context);
        }

    });

    
    var overload = function(pfn, fn ){

           var f = typeof pfn == 'function' ? pfn : function(){};

           var ov = f._ovl; //call signature hash
           if(!ov){
               ov = { base: f};
               ov[f.length|| 0] = f;

               f= function(){  //the proxy stub
                  var o = arguments.callee._ovl;
                  var fn = o[arguments.length] || o.base;
                  //recursion safety
                  return fn && fn != arguments.callee ? fn.apply(this,arguments): undefined;
               };
           }
           var fnA = [].concat(fn);
           for(var i=0,l=fnA.length; i<l; ++i){
             //ensures no duplicate call signatures, but last in rules!
             ov[fnA[i].length] = fnA[i];
           }
           f._ovl= ov;
           return f;

       };
    var objTypes = {
        array : '[object Array]',
        object : '[object Object]',
        complex : /Object\]|Array\]/
    };
    
    Ext.applyIf(Ext,{
        overload : overload( overload,
           [
             function(fn){ return overload(null, fn);},
             function(obj, mname, fn){
                 return obj[mname] = overload(obj[mname],fn);}
          ]),
          
        isIterable : function(e){
            if (Ext.isArray(e) || e.callee) { return true; } 
		    if (/NodeList|HTMLCollection/.test(OP.toString.call(e))) { return true; } 
		    return (typeof e.nextNode != 'undefined' || e.item) && Ext.isNumber(e.length); 
        },

        isArray : function(obj){
           return OP.toString.apply(obj) == '[object Array]';
        },

        isObject:function(obj){
            return !!obj && OP.toString.apply(obj) == '[object Object]';
        },
        
        isComplex : function(obj){
           return !!obj && objTypes.complex.test(OP.toString.apply(obj));
        },
        
        isNumber: function(obj){
            return typeof obj == 'number' && isFinite(obj);
        },
        
        isBoolean: function(obj){
            return typeof obj == 'boolean';
        },

        isDocument : function(obj){
            return OP.toString.apply(obj) == '[object HTMLDocument]' || (obj && obj.nodeType === 9);
        },

        isElement : function(obj){
            if(obj){
                var o = obj.dom || obj; 
                return !!o.tagName || (/\[object html/i).test(OP.toString.apply(o)); 
            }
            return false;
        },

        isEvent : function(obj){
            return OP.toString.apply(obj) == '[object Event]' || (Ext.isObject(obj) && !Ext.type(obj.constructor) && (window.event && obj.clientX && obj.clientX === window.event.clientX));
        },

        isFunction: function(obj){
            return OP.toString.apply(obj) == '[object Function]';
        },

        isString : function(obj){
            return typeof obj == 'string';
        },
        
        isPrimitive : function(v){
            return Ext.isString(v) || Ext.isNumber(v) || Ext.isBoolean(v);
        },
        
        isDefined: defined
        
    });
     /**
      * @class Ext
      * @singleton
      * @constructor
      * @description Ext Adapter extensions
      */
    Ext.ns('Ext.capabilities');
    var caps = Ext.capabilities;   
    Ext.onReady(function(){
	    /**
	     * @class Ext.capabilities
	     * @singleton
	     * @version 4.2
	     * @donate <a target="tag_donate" href="http://donate.theactivegroup.com"><img border="0" src="http://www.paypal.com/en_US/i/btn/x-click-butcc-donate.gif" border="0" alt="Make a donation to support ongoing development"></a>
	     * @license <a href="http://www.gnu.org/licenses/gpl.html">GPL 3.0</a> 
	     * @author Doug Hendricks. Forum ID: <a href="http://extjs.com/forum/member.php?u=8730">hendricd</a> 
	     * @copyright 2007-2010, Active Group, Inc. All rights reserved.
	     * @desc Describes Detected Browser capabilities.
	     */
	    Ext.ns('Ext.capabilities');
	    var caps = Ext.capabilities;
	    Ext.apply(caps , {
            /**
             * @property {Boolean} hasActiveX True if the Browser support (and is enabled) ActiveX.
             */
            hasActiveX : defined(window.ActiveXObject),
            
            /**
             * @property {Boolean} hasXDR True if the Browser has native Cross-Domain Ajax request support.
             */
            hasXDR  : function(){
                return defined(window.XDomainRequest) || (defined(window.XMLHttpRequest) && 'withCredentials' in new XMLHttpRequest());
            }(),
            
            /**
             * @property {Boolean} hasChromeFrame true, if the Google ChromeFrame plugin is install on IE
             */
            hasChromeFrame : function(){
                try{
                  if(defined(window.ActiveXObject) && !!(new ActiveXObject("ChromeTab.ChromeFrame")))return true;
                }catch(ef){}
                var a = navigator.userAgent.toLowerCase();
                return !!(a.indexOf("chromeframe")>=0 || a.indexOf("x-clock")>=0 );  
                
            }(),
            
            /**
             * @property {Boolean} hasFlash True if the Flash Browser plugin is installed.
             */
            hasFlash : (function(){
                //Check for ActiveX first because some versions of IE support navigator.plugins, just not the same as other browsers
                if(defined(window.ActiveXObject)){
                    try{
                        //try to create a flash instance
                        new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        return true;
                    }catch(e){};
                    //If the try-catch fails, return false
                    return false;
                }else if(navigator.plugins){
                    //Loop through all the plugins
                    for(var i=0, P=navigator.plugins,length = P.length; i < length; ++i){
                        //test to see if any plugin names contain the word flash, if so it must support it - return true
                        if((/flash/i).test(P[i].name)){
                            return true;
                        }
                    }
                    //return false if no plugins match
                    return false;
                }
                //Return false if ActiveX and nagivator.plugins are not supported
                return false;
                })(),
            
            /**
             * @property {Boolean} hasCookies True if the browser cookies are enabled/supported.
             * On IE, ModalDialog windows will issue a security risk warning to the user during this check, so assert 
             * to false. (Cookie implementations on IE's [Modeless|Modal]Dialogs are not supported as 
             * they run in a seperate ActiveX browser context)
             */
            hasCookies : Ext.isIE && ('dialogArguments' in window) ? false : !!navigator.cookieEnabled ,
                        
            /**
             * @property {Boolean} hasCanvas True if the browser has canvas Element support.
             */
            hasCanvas  : !!document.createElement("canvas").getContext,
            
            /**
             * @property {Boolean} hasCanvasText True if the browser has canvas Element Text support.
             */
            hasCanvasText : function(){
                return !!(this.hasCanvas && typeof document.createElement('canvas').getContext('2d').fillText == 'function');
            }(),
            
            /**
             * @property {Boolean} hasSVG True if the browser has SVG support.
             */
            hasSVG     : !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').width),
            
            /**
             * @property {Boolean} hasXpath True if the browser has Xpath query support.
             */
            hasXpath   : !!document.evaluate,
            
            /**
             * @property {Boolean} hasWorkers True if the browser has support for threaded Workers.
             */
            hasWorkers  : defined(window.Worker) || caps.hasGears,
            
            /**
             * @property {Boolean} hasOffline True if the browser has offline support. 
             */
            hasOffline : defined(window.applicationCache),
            
            /**
             * @property {Boolean} hasLocalStorage True if the browser has Local Storage support. 
             */
            hasLocalStorage : defined(window.localStorage),
            
            /**
             * Basic HTML5 geolocation services support test 
             * @property {Boolean} hasGeoLocation
             */
            hasGeoLocation : defined(navigator.geolocation),
            
            hasBasex   : true,
            
            /**
             * 
             * @property {Boolean/Object} hasAudio
             * @desc Basic HTML5 Element support for the &lt;audio> tag and/or Audio object.
             * @example
 If the browser has &lt;audio> tag or Audio object support,<br />the property contains a mime-type map of standard audio formats.
       {
        mp3   : false,  //mp3
        ogg   : false,  //Ogg Vorbis
        wav   : true,   //wav 
        basic : false,  //au, snd
        aif   : false,  //aif, aifc, aiff
        tag  : true,    //is audio HTML element supported?
        object : true,  //is the window.Audio Object supported
        <b>testMime</b> : function()
        }
        
The included <b>testMime</b> function permits selective mime-type testing as well for custom audio formats:
        if(Ext.capabilities.hasAudio &&
             Ext.capabilities.hasAudio.testMime('audio/ogg') ){
                alert ('Vorbis playback is supported');
          }
         */
            hasAudio   : function(){
                //修复在ie9中引起manageiframe会异常的发出新的请求，暂时去掉
//               var aTag = !!document.createElement('audio').canPlayType,
//                    aAudio = ('Audio' in window && window.Audio) ? new Audio('') : {},
//	                 caps = aTag || ('canPlayType' in aAudio) ? 
//                        { tag   : aTag, 
//                         object : ('play' in aAudio),
//                         
//                         /*
//                          * Test for a specific audio mime-type
//                          */
//                         testMime : function(mime){
//                             var M; return (M = aAudio.canPlayType ? aAudio.canPlayType(mime): 'no') !== 'no' && M !== '';
//                           }
//                         } : false,
//                    mime,
//                    chk,
//                    mimes = {
//                            mp3   : 'audio/mpeg', //mp3
//                            ogg   : 'audio/ogg',  //Ogg Vorbis
//                            wav   : 'audio/x-wav', //wav 
//                            basic : 'audio/basic', //au, snd
//                            aif   : 'audio/x-aiff' //aif, aifc, aiff
//                        };
//                    
//                    if(caps && caps.testMime){
//                       for (chk in mimes){ 
//	                        caps[chk] = caps.testMime(mimes[chk]);
//	                    }
//                    }                     
//                    return caps;
            }(),
            
            /**
             *  
             * @property {Boolean/Object} hasVideo
             * @desc Basic HTML5 Element support for the &lt;video> tag.
             * @example
 If the browser has &lt;video> tag support, the property contains a codec map of supported video formats.
       {
        mp4  : false,
        ogg  : true,
        testCodec : function()
        }
The testCodec function permits selective codec support testing:
        if(Ext.capabilities.hasVideo &&
             Ext.capabilities.hasVideo.testCodec("avc1.42E01E, mp4a.40.2") ){
                alert ('Apple Video decoder is supported');
          }
           */
            hasVideo  : function(){
                   var vTag = !!document.createElement('video').canPlayType, 
                    vVideo = vTag ? document.createElement('video') : {},
                    caps = ('canPlayType' in vVideo) ? 
                      {     tag : vTag,
                      /*
                       * Test for a specific video and codec (eg: 'video/ogg; codecs="theora, vorbis"' ) 
                       */
                      testCodec : function(codec){
                         var C; return (C = vVideo.canPlayType ? vVideo.canPlayType(codec): 'no') !== 'no' && C !== '';   
                         }
                      } : false,
                    codec,
                    chk,
                    codecs = {
                            mp4 : 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', //mp4 (Apple: patented licensed codec)
                            ogg : 'video/ogg; codecs="theora, vorbis"'          //ogg Vorbis codec
                        };
                    
                   if(caps && caps.testCodec){
                       for (chk in codecs){ 
                            caps[chk] = caps.testCodec(codecs[chk]);
                        }
                    }                     
                   return caps;
            }(),
            
             /**
             * @desc Basic HTML5 Input Element support for autofocus. 
             * @return {Boolean} 
             */
            hasInputAutoFocus : function(){
                return ('autofocus' in (document.createElement('input')));
            }(),
            
            /**
             * @desc Basic HTML5 Input Element support for placeholder 
             * @return {Boolean}
             */
            hasInputPlaceHolder : function(){
                return ('placeholder' in (document.createElement('input')));
            }(),
            
            /**
             * 
             * @param {String) type The input type to test for.
             * @return {Boolean} 
             * @desc Does the HTML5 enabled browser support extended input types
             * @example Typical input type tests:
             * search, number, range, color, tel, url, email, date, month, week, tine, datetime, datetime-local
             */
            hasInputType : function(type){
              var el = document.createElement("input");
              if(el){
                 try{ el.setAttribute("type", type);}catch(e){};
                 return el.type !== 'text';
              }
              return false;
            },
            
            /**
	         * 
	         * @param {String} type The eventName (without the 'on' prefix)
	         * @param {HTMLElement/Object/String} testEl (optional) A specific HTMLElement/Object to test against, otherwise a tagName to test against.
	         * based on the passed eventName is used, or DIV as default. (window and document objects are supported)
	         * @return {Boolean} True if the passed object supports the named event.
             * @desc Determines whether a specified DOMEvent is supported by a given HTMLElement or Object.
             * @example Does the &lt;script> tag support the load event?
   Ext.capabilities.isEventSupported('load', document.createElement('script')); 
	         */  
	        isEventSupported : function(){
	            var TAGNAMES = {
	              'select':'input',
                  'change':'input',
	              'submit':'form',
                  'reset':'form',
                  'load':'img',
	              'error':'img',
                  'abort':'img'
	            };
	            //Cached results
	            var cache = {},
                    onPrefix = /^on/i,
	                //Get a tokenized string of the form nodeName:type
	                getKey = function(type, el){
	                    var tEl = Ext.getDom(el);
		                return (tEl ?
	                           (Ext.isElement(tEl) || Ext.isDocument(tEl) ?
	                                tEl.nodeName.toLowerCase() :
	                                    el.self ? '#window' : el || '#object')
	                       : el || 'div') + ':' + type;
	                };
	
	            return function (evName, testEl) {
                  evName = (evName || '').replace(onPrefix,'');
                  var el, isSupported = false;
                  var eventName = 'on' + evName;
                  var tag = (testEl ? testEl : TAGNAMES[evName]) || 'div';
	              var key = getKey(evName, tag);
                  
	              if(key in cache){
	                //Use a previously cached result if available
	                return cache[key];
	              }
	              
	              el = Ext.isString(tag) ? document.createElement(tag): testEl;
	              isSupported = (!!el && (eventName in el));
	              
	              isSupported || (isSupported = window.Event && !!(String(evName).toUpperCase() in window.Event));
                  
	              if (!isSupported && el) {
	                el.setAttribute && el.setAttribute(eventName, 'return;');
	                isSupported = Ext.isFunction(el[eventName]);
	              }
	              //save the cached result for future tests
	              cache[key] = isSupported;
	              el = null;
	              return isSupported;
	            };
	
	        }()
        });
   });
   Ext.EventManager.on(window,   "beforeunload",  A.onUnload ,A,{single:true});
})();

 // enumerate custom class properties (not prototypes unless protos==true)
 // usually only called by the global forEach function
 Ext.applyIf(Function.prototype, {
   forEach : function( object, block, context, protos) {
       if(object){
        var key;
         for (key in object) {
            (!!protos || object.hasOwnProperty(key)) &&
               block.call(context||object, object[key], key, object);
        }
      }
    },
    
    // Credit: @Animal -- the_bagbournes@btinternet.com
    createBuffered: function(buffer, scope){
        var method = this, task = new Ext.util.DelayedTask();
        return function(){
            task.delay(buffer, method, scope, Array.slice(arguments,0));
        };
    },
    
    /**
     * Credit: @Animal -- the_bagbournes@btinternet.com
     * Creates a delegate (callback) which, when called, executes after a specific delay.
     * Optionally, a replacement (or additional) argument list may be specified.
     * @param {Number} delay The number of milliseconds to defer execution by whenever called.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) used by the function at execution time.
     * @param {Array} args (optional) Override arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position.
     * @return {Function} A function which, when called, executes the original function after the specified delay.
     */
    createDelayed: function(delay, scope, args, appendArgs){
        var method = (scope || args) ? this.createDelegate(scope, args, appendArgs) : this;
        return delay ? function() {
            setTimeout(method, delay);
        } : method;
    },


    clone : function(deep){ return this;}
  }); 