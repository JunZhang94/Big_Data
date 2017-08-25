/*
 * 
 */
Ext.ux.Spinner = Ext
		.extend(
				Ext.util.Observable,
				{
					incrementValue : 1,
					alternateIncrementValue : 5,
					triggerClass : "x-form-spinner-trigger",
					splitterClass : "x-form-spinner-splitter",
					alternateKey : Ext.EventObject.shiftKey,
					defaultValue : 0,
					accelerate : false,
					constructor : function(a) {
						Ext.ux.Spinner.superclass.constructor.call(this, a);
						Ext.apply(this, a);
						this.mimicing = false
					},
					init : function(a) {
						this.field = a;
						a.afterMethod("onRender", this.doRender, this);
						a.afterMethod("onEnable", this.doEnable, this);
						a.afterMethod("onDisable", this.doDisable, this);
						a.afterMethod("afterRender", this.doAfterRender, this);
						a.afterMethod("onResize", this.doResize, this);
						a.afterMethod("onFocus", this.doFocus, this);
						a.beforeMethod("onDestroy", this.doDestroy, this)
					},
					doRender : function(b, a) {
						var c = this.el = this.field.getEl();
						var d = this.field;
						if (!d.wrap) {
							d.wrap = this.wrap = c.wrap({
								cls : "x-form-field-wrap"
							})
						} else {
							this.wrap = d.wrap.addClass("x-form-field-wrap")
						}
						this.trigger = this.wrap.createChild({
							tag : "img",
							src : Ext.BLANK_IMAGE_URL,
							cls : "x-form-trigger " + this.triggerClass
						});
						if (!d.width) {
							this.wrap.setWidth(c.getWidth()
									+ this.trigger.getWidth())
						}
						this.splitter = this.wrap.createChild({
							tag : "div",
							cls : this.splitterClass,
							style : "width:13px; height:2px;"
						});
						this.splitter.setRight((Ext.isIE) ? 1 : 2).setTop(10)
								.show();
						this.proxy = this.trigger.createProxy("",
								this.splitter, true);
						this.proxy.addClass("x-form-spinner-proxy");
						this.proxy.setStyle("left", "0px");
						this.proxy.setSize(14, 1);
						this.proxy.hide();
						this.dd = new Ext.dd.DDProxy(this.splitter.dom.id,
								"SpinnerDrag", {
									dragElId : this.proxy.id
								});
						this.initTrigger();
						this.initSpinner()
					},
					doAfterRender : function() {
						var a;
						if (Ext.isIE
								&& this.el.getY() != (a = this.trigger.getY())) {
							this.el.position();
							this.el.setY(a)
						}
					},
					doEnable : function() {
						if (this.wrap) {
							this.disabled = false;
							this.wrap.removeClass(this.field.disabledClass)
						}
					},
					doDisable : function() {
						if (this.wrap) {
							this.disabled = true;
							this.wrap.addClass(this.field.disabledClass);
							this.el.removeClass(this.field.disabledClass)
						}
					},
					doResize : function(a, b) {
						if (typeof a == "number") {
							this.el.setWidth(a - this.trigger.getWidth())
						}
						this.wrap.setWidth(this.el.getWidth()
								+ this.trigger.getWidth())
					},
					doFocus : function() {
						if (!this.mimicing) {
							this.wrap.addClass("x-trigger-wrap-focus");
							this.mimicing = true;
							Ext.get(Ext.isIE ? document.body : document).on(
									"mousedown", this.mimicBlur, this, {
										delay : 10
									});
							this.el.on("keydown", this.checkTab, this)
						}
					},
					checkTab : function(a) {
						if (a.getKey() == a.TAB) {
							this.triggerBlur()
						}
					},
					mimicBlur : function(a) {
						if (!this.wrap.contains(a.target)
								&& this.field.validateBlur(a)) {
							this.triggerBlur()
						}
					},
					triggerBlur : function() {
						this.mimicing = false;
						Ext.get(Ext.isIE ? document.body : document).un(
								"mousedown", this.mimicBlur, this);
						this.el.un("keydown", this.checkTab, this);
						this.field.beforeBlur();
						this.wrap.removeClass("x-trigger-wrap-focus");
						this.field.onBlur.call(this.field)
					},
					initTrigger : function() {
						this.trigger.addClassOnOver("x-form-trigger-over");
						this.trigger.addClassOnClick("x-form-trigger-click")
					},
					initSpinner : function() {
						this.field.addEvents({
							spin : true,
							spinup : true,
							spindown : true
						});
						this.keyNav = new Ext.KeyNav(this.el, {
							up : function(a) {
								a.preventDefault();
								this.onSpinUp()
							},
							down : function(a) {
								a.preventDefault();
								this.onSpinDown()
							},
							pageUp : function(a) {
								a.preventDefault();
								this.onSpinUpAlternate()
							},
							pageDown : function(a) {
								a.preventDefault();
								this.onSpinDownAlternate()
							},
							scope : this
						});
						this.repeater = new Ext.util.ClickRepeater(
								this.trigger, {
									accelerate : this.accelerate
								});
						this.field.mon(this.repeater, "click",
								this.onTriggerClick, this, {
									preventDefault : true
								});
						this.field.mon(this.trigger, {
							mouseover : this.onMouseOver,
							mouseout : this.onMouseOut,
							mousemove : this.onMouseMove,
							mousedown : this.onMouseDown,
							mouseup : this.onMouseUp,
							scope : this,
							preventDefault : true
						});
						this.field.mon(this.wrap, "mousewheel",
								this.handleMouseWheel, this);
						this.dd.setXConstraint(0, 0, 10);
						this.dd.setYConstraint(1500, 1500, 10);
						this.dd.endDrag = this.endDrag.createDelegate(this);
						this.dd.startDrag = this.startDrag.createDelegate(this);
						this.dd.onDrag = this.onDrag.createDelegate(this)
					},
					onMouseOver : function() {
						if (this.disabled) {
							return
						}
						var a = this.getMiddle();
						this.tmpHoverClass = (Ext.EventObject.getPageY() < a) ? "x-form-spinner-overup"
								: "x-form-spinner-overdown";
						this.trigger.addClass(this.tmpHoverClass)
					},
					onMouseOut : function() {
						this.trigger.removeClass(this.tmpHoverClass)
					},
					onMouseMove : function() {
						if (this.disabled) {
							return
						}
						var a = this.getMiddle();
						if (((Ext.EventObject.getPageY() > a) && this.tmpHoverClass == "x-form-spinner-overup")
								|| ((Ext.EventObject.getPageY() < a) && this.tmpHoverClass == "x-form-spinner-overdown")) {
						}
					},
					onMouseDown : function() {
						if (this.disabled) {
							return
						}
						var a = this.getMiddle();
						this.tmpClickClass = (Ext.EventObject.getPageY() < a) ? "x-form-spinner-clickup"
								: "x-form-spinner-clickdown";
						this.trigger.addClass(this.tmpClickClass)
					},
					onMouseUp : function() {
						this.trigger.removeClass(this.tmpClickClass)
					},
					onTriggerClick : function() {
						if (this.disabled || this.el.dom.readOnly) {
							return
						}
						var b = this.getMiddle();
						var a = (Ext.EventObject.getPageY() < b) ? "Up"
								: "Down";
						this["onSpin" + a]()
					},
					getMiddle : function() {
						var b = this.trigger.getTop();
						var c = this.trigger.getHeight();
						var a = b + (c / 2);
						return a
					},
					isSpinnable : function() {
						if (this.disabled || this.el.dom.readOnly) {
							Ext.EventObject.preventDefault();
							return false
						}
						return true
					},
					handleMouseWheel : function(a) {
						if (this.wrap.hasClass("x-trigger-wrap-focus") == false) {
							return
						}
						var b = a.getWheelDelta();
						if (b > 0) {
							this.onSpinUp();
							a.stopEvent()
						} else {
							if (b < 0) {
								this.onSpinDown();
								a.stopEvent()
							}
						}
					},
					startDrag : function() {
						this.proxy.show();
						this._previousY = Ext.fly(this.dd.getDragEl())
								.getTop()
					},
					endDrag : function() {
						this.proxy.hide()
					},
					onDrag : function() {
						if (this.disabled) {
							return
						}
						var b = Ext.fly(this.dd.getDragEl()).getTop();
						var a = "";
						if (this._previousY > b) {
							a = "Up"
						}
						if (this._previousY < b) {
							a = "Down"
						}
						if (a != "") {
							this["onSpin" + a]()
						}
						this._previousY = b
					},
					onSpinUp : function() {
						if (this.isSpinnable() == false) {
							return
						}
						if (Ext.EventObject.shiftKey == true) {
							this.onSpinUpAlternate();
							return
						} else {
							this.spin(false, false)
						}
						this.field.fireEvent("spin", this);
						this.field.fireEvent("spinup", this)
					},
					onSpinDown : function() {
						if (this.isSpinnable() == false) {
							return
						}
						if (Ext.EventObject.shiftKey == true) {
							this.onSpinDownAlternate();
							return
						} else {
							this.spin(true, false)
						}
						this.field.fireEvent("spin", this);
						this.field.fireEvent("spindown", this)
					},
					onSpinUpAlternate : function() {
						if (this.isSpinnable() == false) {
							return
						}
						this.spin(false, true);
						this.field.fireEvent("spin", this);
						this.field.fireEvent("spinup", this)
					},
					onSpinDownAlternate : function() {
						if (this.isSpinnable() == false) {
							return
						}
						this.spin(true, true);
						this.field.fireEvent("spin", this);
						this.field.fireEvent("spindown", this)
					},
					spin : function(d, b) {
						var a = parseFloat(this.field.getValue());
						var c = (b == true) ? this.alternateIncrementValue
								: this.incrementValue;
						(d == true) ? a -= c : a += c;
						a = (isNaN(a)) ? this.defaultValue : a;
						a = this.fixBoundries(a);
						this.field.setRawValue(a)
					},
					fixBoundries : function(b) {
						var a = b;
						if (this.field.minValue != undefined
								&& a < this.field.minValue) {
							a = this.field.minValue
						}
						if (this.field.maxValue != undefined
								&& a > this.field.maxValue) {
							a = this.field.maxValue
						}
						return this.fixPrecision(a)
					},
					fixPrecision : function(b) {
						var a = isNaN(b);
						if (!this.field.allowDecimals
								|| this.field.decimalPrecision == -1 || a || !b) {
							return a ? "" : b
						}
						return parseFloat(parseFloat(b).toFixed(
								this.field.decimalPrecision))
					},
					doDestroy : function() {
						if (this.trigger) {
							this.trigger.remove()
						}
						if (this.wrap) {
							this.wrap.remove();
							delete this.field.wrap
						}
						if (this.splitter) {
							this.splitter.remove()
						}
						if (this.dd) {
							this.dd.unreg();
							this.dd = null
						}
						if (this.proxy) {
							this.proxy.remove()
						}
						if (this.repeater) {
							this.repeater.purgeListeners()
						}
						if (this.mimicing) {
							Ext.get(Ext.isIE ? document.body : document).un(
									"mousedown", this.mimicBlur, this)
						}
					}
				});
Ext.form.Spinner = Ext.ux.Spinner;
Ext.ns("Ext.ux.form");
Ext.ux.form.SpinnerField = Ext
		.extend(
				Ext.form.NumberField,
				{
					actionMode : "wrap",
					deferHeight : true,
					autoSize : Ext.emptyFn,
					onBlur : Ext.emptyFn,
					adjustSize : Ext.BoxComponent.prototype.adjustSize,
					constructor : function(c) {
						var b = Ext
								.copyTo(
										{},
										c,
										"incrementValue,alternateIncrementValue,accelerate,defaultValue,triggerClass,splitterClass");
						var d = this.spinner = new Ext.ux.Spinner(b);
						var a = c.plugins ? (Ext.isArray(c.plugins) ? c.plugins
								.push(d)
								: [ c.plugins, d ])
								: d;
						Ext.ux.form.SpinnerField.superclass.constructor.call(
								this, Ext.apply(c, {
									plugins : a
								}))
					},
					getResizeEl : function() {
						return this.wrap
					},
					getPositionEl : function() {
						return this.wrap
					},
					alignErrorIcon : function() {
						if (this.wrap) {
							this.errorIcon
									.alignTo(this.wrap, "tl-tr", [ 2, 0 ])
						}
					},
					validateBlur : function() {
						return true
					}
				});
Ext.reg("spinnerfield", Ext.ux.form.SpinnerField);
Ext.form.SpinnerField = Ext.ux.form.SpinnerField;
Ext.ns("Ext.ux.form");
Ext.ux.form.TimePickerField = function(a) {
	Ext.ux.form.TimePickerField.superclass.constructor.call(this, a)
};
Ext.extend(Ext.ux.form.TimePickerField, Ext.form.Field, {
	defaultAutoCreate : {
		tag : "div"
	},
	cls : "x-form-timepickerfield",
	hoursSpinner : null,
	minutesSpinner : null,
	secondsSpinner : null,
	spinnerCfg : {
		width : 40
	},
	spinnerFixBoundries : function(a) {
		if (a < this.field.minValue) {
			a = this.field.maxValue
		}
		if (a > this.field.maxValue) {
			a = this.field.minValue
		}
		return this.fixPrecision(a)
	},
	onRender : function(d, a) {
		Ext.ux.form.TimePickerField.superclass.onRender.call(this, d, a);
		this.rendered = false;
		this.date = new Date();
		var c = {};
		if (this.value) {
			c = this._valueSplit(this.value);
			this.date.setHours(c.h);
			this.date.setMinutes(c.m);
			this.date.setSeconds(c.s);
			delete this.value
		} else {
			c = {
				h : this.date.getHours(),
				m : this.date.getMinutes(),
				s : this.date.getSeconds()
			}
		}
		var e = Ext.DomHelper.append(this.el, {
			tag : "div"
		});
		var b = Ext.apply({}, this.spinnerCfg, {
			renderTo : e,
			readOnly : this.readOnly,
			disabled : this.disabled,
			listeners : {
				spin : {
					fn : this.onSpinnerChange,
					scope : this
				},
				valid : {
					fn : this.onSpinnerChange,
					scope : this
				},
				afterrender : {
					fn : function(f) {
						f.wrap.applyStyles("float: left")
					},
					single : true
				}
			}
		});
		this.hoursSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, b, {
			minValue : 0,
			maxValue : 23,
			cls : "first",
			value : c.h
		}));
		this.minutesSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, b, {
			minValue : 0,
			maxValue : 59,
			value : c.m
		}));
		this.secondsSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, b, {
			minValue : 0,
			maxValue : 59,
			value : c.s
		}));
		Ext.DomHelper.append(e, {
			tag : "div",
			cls : "x-form-clear-left"
		});
		this.rendered = true
	},
	_valueSplit : function(a) {
		var b = a.split(":");
		return {
			h : b.length > 0 ? b[0] : 0,
			m : b.length > 1 ? b[1] : 0,
			s : b.length > 2 ? b[2] : 0
		}
	},
	onSpinnerChange : function() {
		if (!this.rendered) {
			return
		}
		this.fireEvent("change", this, this.getRawValue())
	},
	disable : function() {
		Ext.ux.form.TimePickerField.superclass.disable.call(this);
		this.hoursSpinner.disable();
		this.minutesSpinner.disable();
		this.secondsSpinner.disable()
	},
	enable : function() {
		Ext.ux.form.TimePickerField.superclass.enable.call(this);
		this.hoursSpinner.enable();
		this.minutesSpinner.enable();
		this.secondsSpinner.enable()
	},
	setReadOnly : function(a) {
		Ext.ux.form.TimePickerField.superclass.setReadOnly.call(this, a);
		this.hoursSpinner.setReadOnly(a);
		this.minutesSpinner.setReadOnly(a);
		this.secondsSpinner.setReadOnly(a)
	},
	clearInvalid : function() {
		Ext.ux.form.TimePickerField.superclass.clearInvalid.call(this);
		this.hoursSpinner.clearInvalid();
		this.minutesSpinner.clearInvalid();
		this.secondsSpinner.clearInvalid()
	},
	getRawValue : function() {
		if (!this.hoursSpinner) {
			this.date = new Date();
			return {
				h : this.date.getHours(),
				m : this.date.getMinutes(),
				s : this.date.getSeconds()
			}
		} else {
			return {
				h : this.hoursSpinner.getValue(),
				m : this.minutesSpinner.getValue(),
				s : this.secondsSpinner.getValue()
			}
		}
	},
	setRawValue : function(a) {
		this.hoursSpinner.setValue(a.h);
		this.minutesSpinner.setValue(a.m);
		this.secondsSpinner.setValue(a.s)
	},
	isValid : function(a) {
		return this.hoursSpinner.isValid(a) && this.minutesSpinner.isValid(a)
				&& this.secondsSpinner.isValid(a)
	},
	validate : function() {
		return this.hoursSpinner.validate() && this.minutesSpinner.validate()
				&& this.secondsSpinner.validate()
	},
	getValue : function() {
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
		var a = this.getRawValue();
		return String.leftPad(a.h, 2, "0") + ":" + String.leftPad(a.m, 2, "0")
				+ ":" + String.leftPad(a.s, 2, "0")
	},
	setValue : function(a) {
		if (!this.rendered) {
			this.value = a;
			return
		}
		a = this._valueSplit(a);
		this.setRawValue(a);
		this.validate()
	}
});
Ext.form.TimePickerField = Ext.ux.form.TimePickerField;
Ext.reg("timepickerfield", Ext.form.TimePickerField);
Ext.ns("Ext.ux.form");
Ext.DateTimePicker = Ext.extend(Ext.DatePicker, {
	timeFormat : "g:i:s A",
	timeLabel : "时间",
	timeWidth : 100,
	initComponent : function() {
		Ext.DateTimePicker.superclass.initComponent.call(this);
		this.id = Ext.id()
	},
	onRender : function(b, a) {
		Ext.DateTimePicker.superclass.onRender.apply(this, arguments);
		var c = Ext.get(Ext.DomQuery.selectNode("table tbody", b.dom));
		var e = Ext.DomHelper.insertBefore(c.last(), {
			tag : "tr",
			children : [ {
				tag : "td",
				cls : "x-date-bottom",
				html : this.timeLabel,
				style : "width:30;"
			}, {
				tag : "td",
				cls : "x-date-bottom ux-timefield",
				colspan : "2"
			} ]
		}, true);
		this.tf.render(c.child("td.ux-timefield"));
		var d = this.getEl().parent("div.x-layer");
		if (d) {
			d.setStyle("height", d.getHeight() + 31)
		}
	},
	setValue : function(b) {
		var a = this.value;
		if (!this.tf) {
			this.tf = new Ext.ux.form.TimePickerField();
			this.tf.ownerCt = this
		}
		this.value = this.getDateTime(b)
	},
	getDateTime : function(c) {
		if (this.tf) {
			var b = new Date();
			var a = this.tf.getValue();
			c = Date.parseDate(c.format(this.dateFormat) + " "
					+ this.tf.getValue(), this.format)
		}
		return c
	},
	selectToday : function() {
		if (this.todayBtn && !this.todayBtn.disabled) {
			this.value = this.getDateTime(new Date());
			this.fireEvent("select", this, this.value)
		}
	}
});
Ext.reg("datetimepickerfield", Ext.DateTimePicker);
if (parseInt(Ext.version.substr(0, 1), 10) >= 1) {
	Ext.menu.DateTimeItem = Ext.DateTimePicker;
	Ext.override(Ext.menu.DateMenu, {
		initComponent : function() {
			this.on("beforeshow", this.onBeforeShow, this);
			if (this.strict = (Ext.isIE7 && Ext.isStrict)) {
				this.on("show", this.onShow, this, {
					single : true,
					delay : 20
				})
			}
			Ext.apply(this, {
				plain : true,
				showSeparator : false,
				items : this.picker = new Ext.DatePicker(Ext.apply({
					internalRender : this.strict || !Ext.isIE,
					ctCls : "x-menu-date-item"
				}, this.initialConfig))
			});
			Ext.menu.DateMenu.superclass.initComponent.call(this);
			this.relayEvents(this.picker, [ "select" ]);
			this.on("select", this.menuHide, this);
			if (this.handler) {
				this.on("select", this.handler, this.scope || this)
			}
		}
	})
} else {
	Ext.menu.DateTimeItem = function(a) {
		Ext.menu.DateTimeItem.superclass.constructor.call(this,
				new Ext.DateTimePicker(a), a);
		this.picker = this.component;
		this.addEvents("select");
		this.picker.on("render", function(b) {
			b.getEl().swallowEvent("click");
			b.container.addClass("x-menu-date-item")
		});
		this.picker.on("select", this.onSelect, this)
	};
	Ext.extend(Ext.menu.DateTimeItem, Ext.menu.DateMenu, {
		onSelect : function(b, a) {
			this.fireEvent("select", this, a, b);
			Ext.menu.DateTimeItem.superclass.handleClick.call(this)
		}
	})
}
Ext.menu.DateTimeMenu = function(a) {
	Ext.menu.DateTimeMenu.superclass.constructor.call(this, a);
	this.plain = true;
	var b = new Ext.menu.DateTimeItem(a);
	this.add(b);
	this.picker = b;
	this.relayEvents(b, [ "select" ]);
	this.on("beforeshow", function() {
		if (this.picker) {
			this.picker.hideMonthPicker(true)
		}
	}, this)
};
Ext
		.extend(
				Ext.menu.DateTimeMenu,
				Ext.menu.Menu,
				{
					cls : "x-date-menu",
					beforeDestroy : function() {
						this.picker.destroy()
					},
					hide : function(a) {
						if (this.picker.tf.innerList) {
							if ((Ext.EventObject
									.within(this.picker.tf.innerList))
									|| (Ext.get(Ext.EventObject.getTarget()) == this.picker.tf.innerList)) {
								return false
							}
						}
						if (this.el && this.isVisible()) {
							this.fireEvent("beforehide", this);
							if (this.activeItem) {
								this.activeItem.deactivate();
								this.activeItem = null
							}
							this.el.hide();
							this.hidden = true;
							this.fireEvent("hide", this)
						}
						if (a === true && this.parentMenu) {
							this.parentMenu.hide(true)
						}
					}
				});
Ext.ux.form.DateTimeField = Ext.extend(Ext.form.DateField, {
	dateFormat : "Y-m-d",
	timeFormat : "H:i:s",
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "20",
		autocomplete : "off"
	},
	initComponent : function() {
		Ext.ux.form.DateTimeField.superclass.initComponent.call(this);
		this.format = this.dateFormat + " " + this.timeFormat;
		this.afterMethod("afterRender", function() {
			this.getEl().applyStyles("top:0")
		})
	},
	getValue : function() {
		return this.parseDate(Ext.form.DateField.superclass.getValue
				.call(this))
				|| ""
	},
	onTriggerClick : function() {
		if (this.disabled) {
			return
		}
		if (this.menu == null) {
			this.menu = new Ext.menu.DateTimeMenu()
		}
		Ext.apply(this.menu.picker, {
			minDate : this.minValue,
			maxDate : this.maxValue,
			disabledDatesRE : this.ddMatch,
			disabledDatesText : this.disabledDatesText,
			disabledDays : this.disabledDays,
			disabledDaysText : this.disabledDaysText,
			format : this.format,
			timeFormat : this.timeFormat,
			dateFormat : this.dateFormat,
			showToday : this.showToday,
			minText : String.format(this.minText, this
					.formatDate(this.minValue)),
			maxText : String.format(this.maxText, this
					.formatDate(this.maxValue))
		});
		if (this.menuEvents) {
			this.menuEvents("on")
		} else {
			this.menu.on(Ext.apply({}, this.menuListeners, {
				scope : this
			}))
		}
		this.menu.picker.setValue(this.getValue() || new Date());
		this.menu.show(this.el, "tl-bl?")
	}
});
Ext.reg("datetimefield", Ext.ux.form.DateTimeField);
(function() {
	var d = Ext.lib.Ajax, g = function(j) {
		return typeof j != "undefined"
	}, h = Ext.emptyFn || function() {
	}, a = Object.prototype;
	Ext.lib.Ajax.Queue = function(j) {
		j = j ? (j.name ? j : {
			name : j
		}) : {};
		Ext.apply(this, j, {
			name : "q-default",
			priority : 5,
			FIFO : true,
			callback : null,
			scope : null,
			suspended : false,
			progressive : false
		});
		this.requests = new Array();
		this.pending = false;
		this.priority = this.priority > 9 ? 9 : (this.priority < 0 ? 0
				: this.priority)
	};
	Ext.extend(Ext.lib.Ajax.Queue, Object, {
		add : function(j) {
			var k = d.events ? d.fireEvent("beforequeue", this, j) : true;
			if (k !== false) {
				this.requests.push(j);
				this.pending = true;
				d.pendingRequests++;
				this.manager && this.manager.start()
			}
		},
		suspended : false,
		activeRequest : null,
		next : function(j) {
			var k = j ? this.requests[this.FIFO ? "first" : "last"]()
					: this.requests[this.FIFO ? "shift" : "pop"]();
			if (this.requests.length == 0) {
				this.pending = false;
				Ext.isFunction(this.callback)
						&& this.callback.call(this.scope || null, this);
				d.events && d.fireEvent("queueempty", this)
			}
			return k || null
		},
		clear : function() {
			this.suspend();
			d.pendingRequests -= this.requests.length;
			this.requests.length = 0;
			this.pending = false;
			this.resume();
			this.next()
		},
		suspend : function() {
			this.suspended = true
		},
		resume : function() {
			this.suspended = false
		},
		requestNext : function(j) {
			var k;
			this.activeRequest = null;
			if (!this.suspended && (k = this.next(j))) {
				if (k.active) {
					this.activeRequest = d.request.apply(d, k);
					d.pendingRequests--
				} else {
					return this.requestNext(j)
				}
			}
			return this.activeRequest
		}
	});
	Ext.lib.Ajax.QueueManager = function(j) {
		Ext.apply(this, j || {}, {
			quantas : 10,
			priorityQueues : new Array(new Array(), new Array(), new Array(),
					new Array(), new Array(), new Array(), new Array(),
					new Array(), new Array(), new Array()),
			queues : {}
		})
	};
	Ext.extend(Ext.lib.Ajax.QueueManager, Object, {
		quantas : 10,
		getQueue : function(j) {
			return this.queues[j]
		},
		createQueue : function(j) {
			if (!j) {
				return null
			}
			var k = new d.Queue(j);
			k.manager = this;
			this.queues[k.name] = k;
			var l = this.priorityQueues[k.priority];
			l && l.indexOf(k.name) == -1 && l.push(k.name);
			return k
		},
		removeQueue : function(j) {
			if (j && (j = this.getQueue(j.name || j))) {
				j.clear();
				this.priorityQueues[j.priority].remove(j.name);
				delete this.queues[j.name]
			}
		},
		start : function() {
			if (!this.started) {
				this.started = true;
				this.dispatch()
			}
			return this
		},
		suspendAll : function() {
			forEach(this.queues, function(j) {
				j.suspend()
			})
		},
		resumeAll : function() {
			forEach(this.queues, function(j) {
				j.resume()
			});
			this.start()
		},
		progressive : false,
		stop : function() {
			this.started = false;
			return this
		},
		dispatch : function() {
			var m = this, l = m.queues;
			var j = (d.activeRequests >= d.maxConcurrentRequests);
			while (d.pendingRequests && !j) {
				var k = function(p) {
					var o = l[p], n;
					while (o && !o.suspended && o.pending && o.requestNext()) {
						j || (j = d.activeRequests >= d.maxConcurrentRequests);
						if (j) {
							break
						}
						if (o.progressive || m.progressive) {
							break
						}
					}
					if (j) {
						return false
					}
				};
				forEach(this.priorityQueues, function(n) {
					!!n.length && forEach(n, k, this);
					j || (j = d.activeRequests >= d.maxConcurrentRequests);
					if (j) {
						return false
					}
				}, this)
			}
			if (d.pendingRequests || j) {
				this.dispatch.defer(this.quantas, this)
			} else {
				this.stop()
			}
		}
	});
	Ext
			.apply(
					d,
					{
						headers : d.headers || {},
						defaultPostHeader : d.defaultPostHeader
								|| "application/x-www-form-urlencoded; charset=UTF-8",
						defaultHeaders : d.defaultHeaders || {},
						useDefaultXhrHeader : !!d.useDefaultXhrHeader,
						defaultXhrHeader : "Ext.basex",
						conn : d.conn || {},
						SCRIPTTAG_POOL : [],
						_domRefs : [],
						onUnload : function() {
							delete d._domRefs;
							delete d.SCRIPTTAG_POOL
						},
						monitoredNode : function(s, m, q, j, r) {
							var k = null, p = (j || window).document, o = p ? p
									.getElementsByTagName("head")[0] : null;
							if (s && p && o) {
								k = s.toUpperCase() == "SCRIPT"
										&& !!d.SCRIPTTAG_POOL.length ? Ext
										.get(d.SCRIPTTAG_POOL.pop()) : null;
								if (k) {
									k.removeAllListeners()
								} else {
									k = Ext.get(p.createElement(s))
								}
								var n = Ext.getDom(k);
								n && forEach(m || {}, function(u, t) {
									u && (t in n) && n.setAttribute(t, u)
								});
								if (q
										&& (q.immediate || s.toUpperCase() == "SCRIPT")) {
									var l = (q.success || q).createDelegate(
											q.scope || null, [ q || {} ], 0);
									if (q.immediate) {
										l()
									} else {
										Ext.isIE ? k
												.on(
														"readystatechange",
														function() {
															this.dom.readyState == "loaded"
																	&& l()
														})
												: k.on("load", l)
									}
								}
								r || n.parentNode || o.appendChild(n)
							}
							d._domRefs.push(k);
							return k
						},
						poll : {},
						pollInterval : d.pollInterval || 50,
						queueManager : new d.QueueManager(),
						queueAll : false,
						activeRequests : 0,
						pendingRequests : 0,
						maxConcurrentRequests : (function() {
							var j = 6;
							if (Ext.isIE) {
								j = Ext.value(window.maxConnectionsPerServer,
										2)
							} else {
								if (Ext.isOpera) {
									j = 4
								} else {
									if (Ext.Safari) {
										j = Ext.isSafari4 ? 5 : 4
									}
								}
							}
							return j
						})(),
						forceActiveX : false,
						async : true,
						createXhrObject : function(r, s) {
							var o = {
								status : {
									isError : false
								},
								tId : r
							}, n = null;
							s || (s = {});
							try {
								s.xdomain && window.XDomainRequest
										&& (o.conn = new XDomainRequest());
								if (!g(o.conn)
										&& Ext.capabilities.hasActiveX
										&& !!Ext.value(s.forceActiveX,
												this.forceActiveX)) {
									throw ("IE7forceActiveX")
								}
								o.conn || (o.conn = new XMLHttpRequest())
							} catch (k) {
								var j = Ext.capabilities.hasActiveX ? (s.multiPart ? this.activeXMultipart
										: this.activeX)
										: null;
								if (j) {
									for ( var p = 0, m = j.length; p < m; ++p) {
										try {
											o.conn = new ActiveXObject(j[p]);
											break
										} catch (q) {
											n = (k == "IE7forceActiveX" ? q : k)
										}
									}
								}
							} finally {
								o.status.isError = !g(o.conn);
								o.status.error = n
							}
							return o
						},
						createExceptionObject : function(n, m, k, j, l) {
							return {
								tId : n,
								status : k ? -1 : 0,
								statusText : k ? "transaction aborted"
										: "communication failure",
								isAbort : k,
								isTimeout : j,
								argument : m
							}
						},
						encoder : encodeURIComponent,
						serializeForm : function() {
							var m = /select-(one|multiple)/i, j = /file|undefined|reset|button/i, k = /radio|checkbox/i, l = /submit/i;
							return function(o) {
								var p = o.elements
										|| (document.forms[o] || Ext.getDom(o)).elements, v = false, u = this.encoder, s, w, n, q, r = "", t;
								forEach(
										p,
										function(x) {
											n = x.name;
											t = x.type;
											if (!x.disabled && n) {
												if (m.test(t)) {
													forEach(
															x.options,
															function(y) {
																if (y.selected) {
																	r += String
																			.format(
																					"{0}={1}&",
																					u(n),
																					u(y.hasAttribute
																							&& y
																									.hasAttribute("value")
																							&& y
																									.getAttribute("value") !== null ? y.value
																							: y.text))
																}
															})
												} else {
													if (!j.test(t)) {
														if (!(k.test(t) && !x.checked)
																&& !(t == "submit" && v)) {
															r += u(n)
																	+ "="
																	+ u(x.value)
																	+ "&";
															v = l.test(t)
														}
													}
												}
											}
										});
								return r.substr(0, r.length - 1)
							}
						}(),
						getHttpStatus : function(l, k, j) {
							var n = {
								status : 0,
								statusText : "",
								isError : false,
								isLocal : false,
								isOK : true,
								error : null,
								isAbort : !!k,
								isTimeout : !!j
							};
							try {
								if (!l || !("status" in l)) {
									throw ("noobj")
								}
								n.status = l.status;
								n.readyState = l.readyState;
								n.isLocal = (!l.status && location.protocol == "file:")
										|| (Ext.isSafari && !g(l.status));
								n.isOK = (n.isLocal || (n.status == 304
										|| n.status == 1223 || (n.status > 199 && n.status < 300)));
								n.statusText = l.statusText || ""
							} catch (m) {
							}
							return n
						},
						handleTransactionResponse : function(n, p, l, k) {
							p = p || {};
							var m = null;
							if (!n.status.isError) {
								n.status = this.getHttpStatus(n.conn, l, k);
								m = this.createResponseObject(n, p.argument, l,
										k)
							}
							n.isPart || this.releaseObject(n);
							n.status.isError
									&& (m = Ext.apply({}, m || {}, this
											.createExceptionObject(n.tId,
													p.argument, !!l, !!k,
													n.status.error)));
							m.options = n.options;
							m.fullStatus = n.status;
							if (!this.events
									|| this.fireEvent("status:"
											+ n.status.status, n.status.status,
											n, m, p, l) !== false) {
								if (n.status.isOK && !n.status.isError) {
									if (!this.events
											|| this.fireEvent("response", n, m,
													p, l, k) !== false) {
										var j = n.isPart ? "onpart" : "success";
										Ext.isFunction(p[j])
												&& p[j]
														.call(p.scope || null,
																m)
									}
								} else {
									if (!this.events
											|| this.fireEvent("exception", n,
													m, p, l, k,
													m.fullStatus.error) !== false) {
										Ext.isFunction(p.failure)
												&& p.failure.call(p.scope
														|| null, m,
														m.fullStatus.error)
									}
								}
							}
							return m
						},
						releaseObject : function(j) {
							j && (j.conn = null);
							if (j && Ext.value(j.tId, -1) + 1) {
								this.activeRequests--;
								if (this.poll[j.tId]) {
									window.clearInterval(this.poll[j.tId]);
									delete this.poll[j.tId]
								}
								if (this.timeout[j.tId]) {
									window.clearInterval(this.timeout[j.tId]);
									delete this.timeout[j.tId]
								}
								delete this.conn[j.tId]
							}
						},
						decodeJSON : Ext.decode,
						reCtypeJSON : /(application|text)\/json/i,
						reCtypeXML : /(application|text)\/xml/i,
						createResponseObject : function(w, y, m, n) {
							var A = "content-type", p = {
								responseXML : null,
								responseText : "",
								responseStream : null,
								responseJSON : null,
								contentType : null,
								getResponseHeader : h,
								getAllResponseHeaders : h
							};
							var k = {}, l = "";
							if (m !== true) {
								try {
									p.responseJSON = w.conn.responseJSON
											|| null;
									p.responseStream = w.conn.responseStream
											|| null;
									p.contentType = w.conn.contentType || null;
									p.responseText = w.conn.responseText
								} catch (B) {
									w.status.isError = true;
									w.status.error = B
								}
								try {
									p.responseXML = w.conn.responseXML || null
								} catch (z) {
								}
								try {
									l = ("getAllResponseHeaders" in w.conn ? w.conn
											.getAllResponseHeaders()
											: null)
											|| "";
									var r;
									l
											.split("\n")
											.forEach(
													function(o) {
														(r = o.split(":"))
																&& r.first()
																&& (k[r
																		.first()
																		.trim()
																		.toLowerCase()] = (r
																		.last() || "")
																		.trim())
													})
								} catch (x) {
									w.status.isError = true;
									w.status.error = x
								} finally {
									p.contentType = p.contentType || k[A] || ""
								}
								if ((w.status.isLocal || w.proxied)
										&& typeof p.responseText == "string") {
									w.status.isOK = !w.status.isError
											&& ((w.status.status = (!!p.responseText.length) ? 200
													: 404) == 200);
									if (w.status.isOK
											&& ((!p.responseXML && (w.options.isXML || this.reCtypeXML
													.test(p.contentType))) || (p.responseXML && p.responseXML.childNodes.length === 0))) {
										var C = null;
										try {
											if (Ext.capabilities.hasActiveX) {
												C = new ActiveXObject(
														"MSXML2.DOMDocument.3.0");
												C.async = false;
												C.loadXML(p.responseText)
											} else {
												var t = null;
												try {
													t = new DOMParser();
													C = t.parseFromString(
															p.responseText,
															"application/xml")
												} catch (j) {
												} finally {
													t = null
												}
											}
										} catch (v) {
											w.status.isError = true;
											w.status.error = v
										}
										p.responseXML = C
									}
									if (p.responseXML) {
										var u = (p.responseXML.documentElement && p.responseXML.documentElement.nodeName == "parsererror")
												|| (p.responseXML.parseError || 0) !== 0
												|| p.responseXML.childNodes.length === 0;
										u
												|| (p.contentType = k[A] = p.responseXML.contentType
														|| "text/xml")
									}
								}
								if (w.options.isJSON
										|| (this.reCtypeJSON && this.reCtypeJSON
												.test(k[A] || ""))) {
									try {
										Ext.isObject(p.responseJSON)
												|| Ext.isArray(p.responseJSON)
												|| (p.responseJSON = Ext
														.isFunction(this.decodeJSON)
														&& Ext
																.isString(p.responseText) ? this
														.decodeJSON(p.responseText)
														: null)
									} catch (q) {
										w.status.isError = true;
										w.status.error = q
									}
								}
							}
							w.status.proxied = !!w.proxied;
							Ext.apply(p, {
								tId : w.tId,
								status : w.status.status,
								statusText : w.status.statusText,
								contentType : p.contentType || k[A],
								getResponseHeader : function(o) {
									return k[(o || "").trim().toLowerCase()]
								},
								getAllResponseHeaders : function() {
									return l
								},
								fullStatus : w.status,
								isPart : w.isPart || false
							});
							w.parts && !w.isPart && (p.parts = w.parts);
							g(y) && (p.argument = y);
							return p
						},
						setDefaultPostHeader : function(j) {
							this.defaultPostHeader = j || ""
						},
						setDefaultXhrHeader : function(j) {
							this.useDefaultXhrHeader = j || false
						},
						request : function(j, l, n, p, w) {
							var t = w = Ext.apply({
								async : this.async || false,
								headers : false,
								userId : null,
								password : null,
								xmlData : null,
								jsonData : null,
								queue : null,
								proxied : false,
								multiPart : false,
								xdomain : false
							}, w || {});
							var s;
							if (n.argument && n.argument.options
									&& n.argument.options.request
									&& (s = n.argument.options.request.arg)) {
								Ext.apply(t, {
									async : t.async || s.async,
									proxied : t.proxied || s.proxied,
									multiPart : t.multiPart || s.multiPart,
									xdomain : t.xdomain || s.xdomain,
									queue : t.queue || s.queue,
									onPart : t.onPart || s.onPart
								})
							}
							if (!this.events
									|| this.fireEvent("request", j, l, n, p, t) !== false) {
								if (!t.queued
										&& (t.queue || (t.queue = this.queueAll
												|| null))) {
									t.queue === true && (t.queue = {
										name : "q-default"
									});
									var r = t.queue;
									var m = r.name || r, v = this.queueManager;
									var k = v.getQueue(m) || v.createQueue(r);
									t.queue = k;
									t.queued = true;
									var u = [ j, l, n, p, t ];
									u.active = true;
									k.add(u);
									return {
										tId : this.transactionId++,
										queued : true,
										request : u,
										options : t
									}
								}
								w.onpart
										&& (n.onpart || (n.onpart = Ext
												.isFunction(w.onpart) ? w.onpart
												.createDelegate(w.scope)
												: null));
								t.headers && forEach(t.headers, function(x, q) {
									this.initHeader(q, x, false)
								}, this);
								var o;
								if (o = (this.headers ? this.headers["Content-Type"]
										|| null
										: null)) {
									delete this.headers["Content-Type"]
								}
								if (t.xmlData) {
									o || (o = "text/xml");
									j = "POST";
									p = t.xmlData
								} else {
									if (t.jsonData) {
										o
												|| (o = "application/json; charset=utf-8");
										j = "POST";
										p = (Ext.isArray(t.jsonData) || Ext
												.isObject(t.jsonData)) ? Ext
												.encode(t.jsonData)
												: t.jsonData
									}
								}
								if (p) {
									o
											|| (o = this.useDefaultHeader ? this.defaultPostHeader
													: null);
									o
											&& this.initHeader("Content-Type",
													o, false)
								}
								return this.makeRequest(t.method || j, l, n, p,
										t)
							}
							return null
						},
						getConnectionObject : function(l, j, n) {
							var p, m;
							var q = this.transactionId;
							j || (j = {});
							try {
								if (m = j.proxied) {
									p = {
										tId : q,
										status : {
											isError : false
										},
										proxied : true,
										conn : {
											el : null,
											send : function(r) {
												var s = (m.target || window).document, o = s
														.getElementsByTagName("head")[0];
												if (o && this.el) {
													o.appendChild(this.el.dom);
													this.readyState = 2
												}
											},
											abort : function() {
												this.readyState = 0;
												window[p.cbName] = undefined;
												Ext.isIE
														|| delete window[p.cbName];
												var o = Ext.getDom(this.el);
												if (this.el) {
													this.el
															.removeAllListeners();
													if (!p.debug) {
														if (Ext.isIE) {
															d.SCRIPTTAG_POOL
																	.push(this.el)
														} else {
															this.el.remove();
															if (o) {
																for ( var r in o) {
																	delete o[r]
																}
															}
														}
													}
												}
												this.el = o = null
											},
											_headers : {},
											getAllResponseHeaders : function() {
												var o = [];
												forEach(
														this._headers,
														function(s, r) {
															s
																	&& o
																			.push(r
																					+ ": "
																					+ s)
														});
												return o.join("\n")
											},
											getResponseHeader : function(o) {
												return this._headers[String(o)
														.toLowerCase()]
														|| ""
											},
											onreadystatechange : null,
											onload : null,
											readyState : 0,
											status : 0,
											responseText : null,
											responseXML : null,
											responseJSON : null
										},
										debug : m.debug,
										params : Ext.isString(j.params) ? Ext
												.urlDecode(j.params) : j.params
												|| {},
										cbName : m.callbackName
												|| "basexCallback" + q,
										cbParam : m.callbackParam || null
									};
									window[p.cbName] = p.cb = function(o) {
										o && typeof (o) == "object"
												&& (this.responseJSON = o);
										this.responseText = o || null;
										this.status = !!o ? 200 : 404;
										this.abort();
										this.readyState = 4;
										Ext
												.isFunction(this.onreadystatechange)
												&& this.onreadystatechange();
										Ext.isFunction(this.onload)
												&& this.onload()
									}.createDelegate(p.conn);
									p.conn.open = function() {
										if (p.cbParam) {
											p.params[p.cbParam] = p.cbName
										}
										var o = Ext.urlEncode(Ext.apply(Ext
												.urlDecode(n)
												|| {}, p.params,
												l.indexOf("?") > -1 ? Ext
														.urlDecode(l.split("?")
																.last())
														: false));
										p.uri = o ? l.split("?").first() + "?"
												+ o : l;
										this.el = d.monitoredNode(m.tag
												|| "script", {
											type : m.contentType
													|| "text/javascript",
											src : p.uri,
											charset : m.charset || j.charset
													|| null
										}, null, m.target, true);
										this._headers["content-type"] = this.el.dom.type;
										this.readyState = 1;
										Ext
												.isFunction(this.onreadystatechange)
												&& this.onreadystatechange()
									};
									j.async = true
								} else {
									p = this.createXhrObject(q, j)
								}
								if (p) {
									this.transactionId++
								}
							} catch (k) {
								p
										&& (p.status.isError = !!(p.status.error = k))
							} finally {
								return p
							}
						},
						makeRequest : function(s, m, q, j, k) {
							var p;
							if (p = this.getConnectionObject(m, k, j)) {
								p.options = k;
								var l = p.conn;
								try {
									if (p.status.isError) {
										throw p.status.error
									}
									d.activeRequests++;
									l.open(s.toUpperCase(), m, k.async,
											k.userId, k.password);
									("onreadystatechange" in l)
											&& (l.onreadystatechange = this.onStateChange
													.createDelegate(this, [ p,
															q, "readystate" ],
															0));
									("onload" in l)
											&& (l.onload = this.onStateChange
													.createDelegate(this, [ p,
															q, "load", 4 ], 0));
									("onprogress" in l)
											&& (l.onprogress = this.onStateChange
													.createDelegate(this, [ p,
															q, "progress" ], 0));
									if (!this.events
											|| this.fireEvent("beforesend", p,
													s, m, q, j, k) !== false) {
										if (q && q.timeout && k.async) {
											("timeout" in l)
													&& (l.timeout = q.timeout);
											("ontimeout" in l)
													&& (l.ontimeout = this.abort
															.createDelegate(
																	this,
																	[ p, q,
																			true ],
																	0));
											("ontimeout" in l)
													|| (k.async && (this.timeout[p.tId] = window
															.setInterval(
																	function() {
																		d
																				.abort(
																						p,
																						q,
																						true)
																	},
																	q.timeout)))
										}
										if (this.useDefaultXhrHeader
												&& !k.xdomain) {
											this.defaultHeaders["X-Requested-With"]
													|| this
															.initHeader(
																	"X-Requested-With",
																	this.defaultXhrHeader,
																	true)
										}
										this.setHeaders(p);
										this.conn[p.tId] = p;
										l.send(j || null)
									} else {
										this.releaseObject(p);
										return p
									}
								} catch (n) {
									p.status.isError = true;
									p.status.error = n
								}
								if (p.status.isError) {
									return Ext.apply(p, this
											.handleTransactionResponse(p, q))
								}
								k.async || this.onStateChange(p, q, "load");
								return p
							}
						},
						abort : function(k, l, j) {
							if (k) {
								k.status || (k.status = {});
								Ext.apply(k.status, {
									isAbort : !!!j,
									isTimeout : !!j,
									isError : !!j || !!k.status.isError
								});
								if (k.queued && k.request) {
									k.request.active = k.queued = false;
									this.events
											&& this.fireEvent("abort", k, l);
									return true
								} else {
									if (this.isCallInProgress(k)) {
										if (!this.events
												|| this.fireEvent(j ? "timeout"
														: "abort", k, l) !== false) {
											("abort" in k.conn)
													&& k.conn.abort();
											this.handleTransactionResponse(k,
													l, k.status.isAbort,
													k.status.isTimeout)
										}
										return true
									}
								}
							}
							return false
						},
						isCallInProgress : function(j) {
							if (j && j.conn) {
								if ("readyState" in j.conn && {
									0 : true,
									4 : true
								}[j.conn.readyState]) {
									return false
								}
								return true
							}
							return false
						},
						clearAuthenticationCache : function(j) {
							try {
								if (Ext.isIE) {
									document
											.execCommand("ClearAuthenticationCache")
								} else {
									var k;
									if (k = new XMLHttpRequest()) {
										k.open("GET", j || "/@@", true,
												"logout", "logout");
										k.send("");
										k.abort.defer(100, k)
									}
								}
							} catch (l) {
							}
						},
						initHeader : function(j, k) {
							(this.headers = this.headers || {})[j] = k
						},
						onStateChange : function(n, x, v) {
							if (!n.conn || n.status.isTimeout
									|| n.status.isError) {
								return
							}
							var k = n.conn, t = ("readyState" in k ? k.readyState
									: 0);
							if (v === "load" || t > 2) {
								var w;
								try {
									w = k.contentType
											|| k
													.getResponseHeader("Content-Type")
											|| ""
								} catch (q) {
								}
								if (w && /multipart\//i.test(w)) {
									var j = null, m = w.split('"')[1], u = "--"
											+ m;
									n.multiPart = true;
									try {
										j = k.responseText
									} catch (s) {
									}
									var l = j ? j.split(u) : null;
									if (l) {
										n.parts || (n.parts = []);
										l.shift();
										l.pop();
										forEach(
												Array.slice(l, n.parts.length),
												function(o) {
													var r = o.split("\n\n");
													var p = (r[0] ? r[0] : "")
															+ "\n";
													n.parts
															.push(this
																	.handleTransactionResponse(
																			Ext
																					.apply(
																							Ext
																									.clone(n),
																							{
																								boundary : m,
																								conn : {
																									status : 200,
																									responseText : (r[1] || "")
																											.trim(),
																									getAllResponseHeaders : function() {
																										return p
																												.split(
																														"\n")
																												.filter(
																														function(
																																y) {
																															return !!y
																														})
																												.join(
																														"\n")
																									}
																								},
																								isPart : true
																							}),
																			x))
												}, this)
									}
								}
							}
							(t === 4 || v === "load")
									&& d.handleTransactionResponse(n, x);
							this.events
									&& this.fireEvent.apply(this,
											[ "readystatechange" ].concat(Array
													.slice(arguments, 0)))
						},
						setHeaders : function(j) {
							if (j.conn && "setRequestHeader" in j.conn) {
								this.defaultHeaders
										&& forEach(this.defaultHeaders,
												function(l, k) {
													j.conn.setRequestHeader(k,
															l)
												});
								this.headers
										&& forEach(this.headers,
												function(l, k) {
													j.conn.setRequestHeader(k,
															l)
												})
							}
							this.headers = {};
							this.hasHeaders = false
						},
						resetDefaultHeaders : function() {
							delete this.defaultHeaders;
							this.defaultHeaders = {};
							this.hasDefaultHeaders = false
						},
						activeXMultipart : [ "MSXML2.XMLHTTP.6.0",
								"MSXML3.XMLHTTP" ],
						activeX : [ "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP",
								"Microsoft.XMLHTTP" ]
					});
	if (Ext.util.Observable) {
		Ext.apply(d, {
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
			onStatus : function(j, n, m, l) {
				var k = Array.slice(arguments, 1);
				j = new Array().concat(j || new Array());
				forEach(j, function(o) {
					o = parseInt(o, 10);
					if (!isNaN(o)) {
						var p = "status:" + o;
						this.events[p] || (this.events[p] = true);
						this.on.apply(this, [ p ].concat(k))
					}
				}, this)
			},
			unStatus : function(j, n, m, l) {
				var k = Array.slice(arguments, 1);
				j = new Array().concat(j || new Array());
				forEach(j, function(o) {
					o = parseInt(o, 10);
					if (!isNaN(o)) {
						var p = "status:" + o;
						this.un.apply(this, [ p ].concat(k))
					}
				}, this)
			}
		}, new Ext.util.Observable());
		Ext.hasBasex = true
	}
	Ext.stopIteration = {
		stopIter : true
	};
	Ext.applyIf(Array.prototype, {
		map : function(k, n) {
			var j = this.length;
			if (typeof k != "function") {
				throw new TypeError()
			}
			var m = new Array(j);
			for ( var l = 0; l < j; ++l) {
				l in this && (m[l] = k.call(n || this, this[l], l, this))
			}
			return m
		},
		some : function(m) {
			var n = Ext.isFunction(m) ? m : function() {
			};
			var k = 0, j = this.length, o = false;
			while (k < j && !(o = !!n(this[k++]))) {
			}
			return o
		},
		every : function(m) {
			var n = Ext.isFunction(m) ? m : function() {
			};
			var k = 0, j = this.length, o = true;
			while (k < j && (o = !!n(this[k++]))) {
			}
			return o
		},
		include : function(m, k) {
			if (!k && typeof this.indexOf == "function") {
				return this.indexOf(m) != -1
			}
			var l = false;
			try {
				this.forEach(function(o, n) {
					if (l = (k ? (o.include ? o.include(m, k) : (o === m))
							: o === m)) {
						throw Ext.stopIteration
					}
				})
			} catch (j) {
				if (j != Ext.stopIteration) {
					throw j
				}
			}
			return l
		},
		filter : function(l, k) {
			var j = new Array();
			l || (l = function(m) {
				return m
			});
			this.forEach(function(n, m) {
				l.call(k, n, m) && j.push(n)
			});
			return j
		},
		compact : function(k) {
			var j = new Array();
			this.forEach(function(l, m) {
				(l === null || l === undefined) || !(m in this)
						|| j.push(k && Ext.isArray(l) ? l.compact() : l)
			}, this);
			return j
		},
		flatten : function() {
			var j = new Array();
			this.forEach(function(k) {
				Ext.isArray(k) ? (j = j.concat(k)) : j.push(k)
			}, this);
			return j
		},
		indexOf : function(l) {
			for ( var k = 0, j = this.length; k < j; ++k) {
				if (this[k] == l) {
					return k
				}
			}
			return -1
		},
		lastIndexOf : function(k) {
			var j = this.length - 1;
			while (j > -1 && this[j] != k) {
				j--
			}
			return j
		},
		unique : function(k, l) {
			var j = new Array();
			this.forEach(function(n, m) {
				if (0 == m || (k ? j.last() != n : !j.include(n, l))) {
					j.push(n)
				}
			}, this);
			return j
		},
		grep : function(n, m, l) {
			var j = new Array();
			m || (m = function(o) {
				return o
			});
			var k = l ? m.createDelegate(l) : m;
			if (typeof n == "string") {
				n = new RegExp(n)
			}
			n instanceof RegExp && this.forEach(function(p, o) {
				n.test(p) && j.push(k(p, o))
			});
			return j
		},
		first : function(m) {
			var k = 0;
			if (m) {
				var j = this.length;
				while (k < j && !(k in this)) {
					k++
				}
			}
			return this[k]
		},
		last : function(k) {
			var j = this.length - 1;
			if (k) {
				while (j > 0 && !(j in this)) {
					j--
				}
			}
			return this[j]
		},
		clear : function() {
			this.length = 0
		},
		atRandom : function(k) {
			var j = Math.floor(Math.random() * this.length);
			return this[j] || k
		},
		clone : function(j) {
			if (!j) {
				return this.concat()
			}
			var l = this.length || 0, k = new Array(l);
			while (l--) {
				k[l] = Ext.clone(this[l], true)
			}
			return k
		},
		reduce : function(p, j) {
			var k = this.length, m = 0, n, o;
			if (!k) {
				return j || null
			}
			n = j || this.first(true);
			this.forEach(function(r, q, l) {
				o = r;
				n = p.apply(null, [ n, o, q, l ])
			});
			return n
		},
		forEach : function(k, j) {
			Array.forEach(this, k, j)
		},
		reversed : function() {
			var k = this.length || 0, j = [];
			while (k--) {
				j.push(this[k])
			}
			return j
		}
	});
	window.forEach = function(k, n, l, j) {
		l = l || k;
		if (k) {
			if (typeof n != "function") {
				throw new TypeError()
			}
			var m = Object;
			if (k instanceof Function) {
				m = Function
			} else {
				if (k.forEach instanceof Function) {
					return k.forEach(n, l)
				} else {
					if (typeof k == "string") {
						m = String
					} else {
						if (Ext.isNumber(k.length)) {
							m = Array
						}
					}
				}
			}
			return m.forEach(k, n, l, j)
		}
	};
	Ext.clone = function(k, j) {
		if (k === null || k === undefined) {
			return k
		}
		if (Ext.isFunction(k.clone)) {
			return k.clone(j)
		} else {
			if (Ext.isFunction(k.cloneNode)) {
				return k.cloneNode(j)
			}
		}
		var l = {};
		forEach(k, function(n, m, o) {
			l[m] = (n === o ? l : j ? Ext.clone(n, true) : n)
		}, k, j);
		return l
	};
	var i = Array.prototype.slice;
	var c = Array.prototype.filter;
	Ext.applyIf(Array, {
		slice : function(j) {
			return i.apply(j, i.call(arguments, 1))
		},
		filter : function(l, k) {
			var j = l && typeof l == "string" ? l.split("") : [];
			return c.call(j, k)
		},
		forEach : function(o, n, m) {
			if (typeof n != "function") {
				throw new TypeError()
			}
			for ( var k = 0, j = o.length >>> 0; k < j; ++k) {
				(k in o) && n.call(m || null, o[k], k, o)
			}
		}
	});
	Ext.applyIf(RegExp.prototype, {
		clone : function() {
			return new RegExp(this)
		}
	});
	Ext.applyIf(Date.prototype, {
		clone : function(j) {
			return j ? new Date(this.getTime()) : this
		}
	});
	Ext.applyIf(Boolean.prototype, {
		clone : function() {
			return this === true
		}
	});
	Ext.applyIf(Number.prototype, {
		times : function(m, k) {
			var l = parseInt(this, 10) || 0;
			for ( var j = 1; j <= l;) {
				m.call(k, j++)
			}
		},
		forEach : function() {
			this.times.apply(this, arguments)
		},
		clone : function() {
			return (this) + 0
		}
	});
	Ext.applyIf(String.prototype, {
		trim : function() {
			var j = /^\s+|\s+$/g;
			return function() {
				return this.replace(j, "")
			}
		}(),
		trimRight : function() {
			var j = /^|\s+$/g;
			return function() {
				return this.replace(j, "")
			}
		}(),
		trimLeft : function() {
			var j = /^\s+|$/g;
			return function() {
				return this.replace(j, "")
			}
		}(),
		clone : function() {
			return String(this) + ""
		},
		forEach : function(k, j) {
			String.forEach(this, k, j)
		}
	});
	var b = function(p, n) {
		var o = typeof p == "function" ? p : function() {
		};
		var m = o._ovl;
		if (!m) {
			m = {
				base : o
			};
			m[o.length || 0] = o;
			o = function() {
				var r = arguments.callee._ovl;
				var l = r[arguments.length] || r.base;
				return l && l != arguments.callee ? l.apply(this, arguments)
						: undefined
			}
		}
		var q = [].concat(n);
		for ( var k = 0, j = q.length; k < j; ++k) {
			m[q[k].length] = q[k]
		}
		o._ovl = m;
		return o
	};
	var e = {
		array : "[object Array]",
		object : "[object Object]",
		complex : /Object\]|Array\]/
	};
	Ext
			.applyIf(
					Ext,
					{
						overload : b(b, [ function(j) {
							return b(null, j)
						}, function(l, k, j) {
							return l[k] = b(l[k], j)
						} ]),
						isIterable : function(j) {
							if (Ext.isArray(j) || j.callee) {
								return true
							}
							if (/NodeList|HTMLCollection/.test(a.toString
									.call(j))) {
								return true
							}
							return (typeof j.nextNode != "undefined" || j.item)
									&& Ext.isNumber(j.length)
						},
						isArray : function(j) {
							return a.toString.apply(j) == "[object Array]"
						},
						isObject : function(j) {
							return !!j
									&& a.toString.apply(j) == "[object Object]"
						},
						isComplex : function(j) {
							return !!j && e.complex.test(a.toString.apply(j))
						},
						isNumber : function(j) {
							return typeof j == "number" && isFinite(j)
						},
						isBoolean : function(j) {
							return typeof j == "boolean"
						},
						isDocument : function(j) {
							return a.toString.apply(j) == "[object HTMLDocument]"
									|| (j && j.nodeType === 9)
						},
						isElement : function(j) {
							if (j) {
								var k = j.dom || j;
								return !!k.tagName
										|| (/\[object html/i).test(a.toString
												.apply(k))
							}
							return false
						},
						isEvent : function(j) {
							return a.toString.apply(j) == "[object Event]"
									|| (Ext.isObject(j)
											&& !Ext.type(j.constructor) && (window.event
											&& j.clientX && j.clientX === window.event.clientX))
						},
						isFunction : function(j) {
							return a.toString.apply(j) == "[object Function]"
						},
						isString : function(j) {
							return typeof j == "string"
						},
						isPrimitive : function(j) {
							return Ext.isString(j) || Ext.isNumber(j)
									|| Ext.isBoolean(j)
						},
						isDefined : g
					});
	Ext.ns("Ext.capabilities");
	var f = Ext.capabilities;
	Ext
			.onReady(function() {
				Ext.ns("Ext.capabilities");
				var j = Ext.capabilities;
				Ext
						.apply(
								j,
								{
									hasActiveX : g(window.ActiveXObject),
									hasXDR : function() {
										return g(window.XDomainRequest)
												|| (g(window.XMLHttpRequest) && "withCredentials" in new XMLHttpRequest())
									}(),
									hasChromeFrame : function() {
										try {
											if (g(window.ActiveXObject)
													&& !!(new ActiveXObject(
															"ChromeTab.ChromeFrame"))) {
												return true
											}
										} catch (k) {
										}
										var l = navigator.userAgent
												.toLowerCase();
										return !!(l.indexOf("chromeframe") >= 0 || l
												.indexOf("x-clock") >= 0)
									}(),
									hasFlash : (function() {
										if (g(window.ActiveXObject)) {
											try {
												new ActiveXObject(
														"ShockwaveFlash.ShockwaveFlash");
												return true
											} catch (n) {
											}
											return false
										} else {
											if (navigator.plugins) {
												for ( var k = 0, m = navigator.plugins, l = m.length; k < l; ++k) {
													if ((/flash/i)
															.test(m[k].name)) {
														return true
													}
												}
												return false
											}
										}
										return false
									})(),
									hasCookies : Ext.isIE
											&& ("dialogArguments" in window) ? false
											: !!navigator.cookieEnabled,
									hasCanvas : !!document
											.createElement("canvas").getContext,
									hasCanvasText : function() {
										return !!(this.hasCanvas && typeof document
												.createElement("canvas")
												.getContext("2d").fillText == "function")
									}(),
									hasSVG : !!(document.createElementNS && document
											.createElementNS(
													"http://www.w3.org/2000/svg",
													"svg").width),
									hasXpath : !!document.evaluate,
									hasWorkers : g(window.Worker) || j.hasGears,
									hasOffline : g(window.applicationCache),
									hasLocalStorage : g(window.localStorage),
									hasGeoLocation : g(navigator.geolocation),
									hasBasex : true,
									hasAudio : function() {
									}(),
									hasVideo : function() {
										var m = !!document
												.createElement("video").canPlayType, o = m ? document
												.createElement("video")
												: {}, n = ("canPlayType" in o) ? {
											tag : m,
											testCodec : function(q) {
												var r;
												return (r = o.canPlayType ? o
														.canPlayType(q) : "no") !== "no"
														&& r !== ""
											}
										}
												: false, p, k, l = {
											mp4 : 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
											ogg : 'video/ogg; codecs="theora, vorbis"'
										};
										if (n && n.testCodec) {
											for (k in l) {
												n[k] = n.testCodec(l[k])
											}
										}
										return n
									}(),
									hasInputAutoFocus : function() {
										return ("autofocus" in (document
												.createElement("input")))
									}(),
									hasInputPlaceHolder : function() {
										return ("placeholder" in (document
												.createElement("input")))
									}(),
									hasInputType : function(l) {
										var k = document.createElement("input");
										if (k) {
											try {
												k.setAttribute("type", l)
											} catch (m) {
											}
											return k.type !== "text"
										}
										return false
									},
									isEventSupported : function() {
										var m = {
											select : "input",
											change : "input",
											submit : "form",
											reset : "form",
											load : "img",
											error : "img",
											abort : "img"
										};
										var k = {}, n = /^on/i, l = function(q,
												p) {
											var o = Ext.getDom(p);
											return (o ? (Ext.isElement(o)
													|| Ext.isDocument(o) ? o.nodeName
													.toLowerCase()
													: p.self ? "#window" : p
															|| "#object")
													: p || "div")
													+ ":" + q
										};
										return function(s, u) {
											s = (s || "").replace(n, "");
											var t, r = false;
											var p = "on" + s;
											var o = (u ? u : m[s]) || "div";
											var q = l(s, o);
											if (q in k) {
												return k[q]
											}
											t = Ext.isString(o) ? document
													.createElement(o) : u;
											r = (!!t && (p in t));
											r
													|| (r = window.Event
															&& !!(String(s)
																	.toUpperCase() in window.Event));
											if (!r && t) {
												t.setAttribute
														&& t.setAttribute(p,
																"return;");
												r = Ext.isFunction(t[p])
											}
											k[q] = r;
											t = null;
											return r
										}
									}()
								})
			});
	Ext.EventManager.on(window, "beforeunload", d.onUnload, d, {
		single : true
	})
})();
Ext.applyIf(Function.prototype, {
	forEach : function(a, e, d, c) {
		if (a) {
			var b;
			for (b in a) {
				(!!c || a.hasOwnProperty(b)) && e.call(d || a, a[b], b, a)
			}
		}
	},
	createBuffered : function(a, c) {
		var d = this, b = new Ext.util.DelayedTask();
		return function() {
			b.delay(a, d, c, Array.slice(arguments, 0))
		}
	},
	createDelayed : function(c, d, b, a) {
		var e = (d || b) ? this.createDelegate(d, b, a) : this;
		return c ? function() {
			setTimeout(e, c)
		} : e
	},
	clone : function(a) {
		return this
	}
});