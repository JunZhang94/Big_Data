/**
 * 图片放大组件
 */
var qsoft = {
	version : 0.35,
	isIE : document.all ? true : false,
	prefx : 'qsoft',
	__id : 0,
	nextId : function() {
		return this.prefx + this.__id++;
	}
};

qsoft.PopBigImage = function(origImage, dx, dy, mx, my, localFileSize) {

	// var type = typeof (origImage);
	// if (type.toLowerCase() == "string")
	// this.oim = document.getElementById(origImage);
	// else{
	this._document = origImage.ownerDocument;
	this.oim = origImage;
	// }

	if (typeof (this.oim.pbi) != "undefined")
		return this.oim.pbi;

	this.id = qsoft.nextId();
	this.oim.__maskid = this.id;
	this.oim.style.cursor = "crosshair";

	this.ow = this.oim.width;
	this.oh = this.oim.height;

	this.detaX = (typeof (dx) == "undefined") ? 30 : dx;
	this.detaY = (typeof (dy) == "undefined") ? 0 : dy;

	var getPos = function(o) // for chrome
	{
		var x = 0, y = 0;
		do {
			x += o.offsetLeft;
			y += o.offsetTop;
		} while ((o = o.offsetParent));
		return {
			left : x,
			top : y
		};
	};

	this.getPosition = function(o) {
		return this._document.documentElement.getBoundingClientRect && o.getBoundingClientRect() || getPos(o);
	};

	this.getMaskPostion = function() {
		var rect = this.getPosition(this.oim);
		this.ol = rect.left + this.detaX + this.ow - (qsoft.isIE ? 2 : 0);
		this.ot = rect.top + this.detaY - (qsoft.isIE ? 2 : 0);
	};
	this.getMaskPostion();

	this.src = this.oim.src;

	this.getImageSize = function(img) {
		var _this = this;
		// 如果加载本地文件
		if (localFileSize) {
			_this.w = localFileSize.width;
			_this.h = localFileSize.height;
		} else {
			var im = new Image();
			im.onreadystatechange = function() {
				_this.w = im.width;
				_this.h = im.height;
				im = null;
				delete im;
			};
			im.src = img.src;
		}
	};

	this.getImageSize(this.oim);
	this.maskX = (typeof (mx) == "undefined") ? this.ow : mx;
	this.maskY = (typeof (my) == "undefined") ? this.oh : my;
	if (this.maskX < 1)
		this.maskX = Math.ceil(this.w * this.maskX);
	else if (this.maskX < 10)
		this.maskX = Math.ceil(this.ow * this.maskX);
	if (this.maskY < 1)
		this.maskY = Math.ceil(this.h * this.maskY);
	else if (this.maskY < 10)
		this.maskY = Math.ceil(this.oh * this.maskY);
	this.maskX = this.maskX < this.ow ? this.ow : this.maskX;
	this.maskY = this.maskY < this.oh ? this.oh : this.maskY;
	this.maskX = this.maskX > this.w ? this.w : this.maskX;
	this.maskY = this.maskY > this.h ? this.h : this.maskY;

	var qObj = this;
	this.createMask = function() {
		if (typeof this.mask == "undefined") {
			this.mask = this._document.getElementById("qsoft.PopBigImgage_mask");
			this.layer = this._document.getElementById("qsoft.PopBigImgage_layer");
			if (!this.mask) {
				this.mask = this._document.createElement("div");
				this.mask.id = "qsoft.PopBigImgage_mask";

				this.layer = this._document.createElement("iframe");
				this.layer.id = "qsoft.PopBigImgage_layer";

				this._document.body.appendChild(this.mask);
				this._document.body.appendChild(this.layer);
			}

			// this.mask.id = this.oim.__maskid + "_mask";

			this.mask.style.backgroundImage = "url(" + this.src + ")";
			this.mask.style.backgroundRepeat = "no-repeat";
			this.mask.style.zIndex = 99999;
			this.setSharedAttributes(this.mask);

			this.layer.style.zIndex = 99990;
			this.layer.src = "about:blank";
			this.setSharedAttributes(this.layer);
		}
	};
	//Departed 
	this.createDoubleMask = function() {
		if (typeof this.mask == "undefined") {
			this.mask = this._document.getElementById("qsoft.PopBigImgage_mask");
			this.layer = this._document.getElementById("qsoft.PopBigImgage_layer");
			/* 因套牌车需要放大两图片，故将下面的判断去掉 */
			// if(!this.mask){
			this.mask = this._document.createElement("div");
			this.mask.id = "qsoft.PopBigImgage_mask";

			this.layer = this._document.createElement("iframe");
			this.layer.id = "qsoft.PopBigImgage_layer";

			this._document.body.appendChild(this.mask);
			this._document.body.appendChild(this.layer);
			// }

			this.mask.style.backgroundImage = "url(" + this.src + ")";
			this.mask.style.backgroundRepeat = "no-repeat";
			this.mask.style.zIndex = 99999;
			this.setSharedAttributes(this.mask);

			this.layer.style.zIndex = 99990;
			this.layer.src = "about:blank";
			this.setSharedAttributes(this.layer);
		}
	};
	
	this.createMaskByIndex = function(index) {
		if (typeof this.mask == "undefined") {
			this.mask = this._document.getElementById("qsoft.PopBigImgage_mask"+index);
			this.layer = this._document.getElementById("qsoft.PopBigImgage_layer"+index);
			if (!this.mask) {
				this.mask = this._document.createElement("div");
				this.mask.id = "qsoft.PopBigImgage_mask"+index;

				this.layer = this._document.createElement("iframe");
				this.layer.id = "qsoft.PopBigImgage_layer"+index;

				this._document.body.appendChild(this.mask);
				this._document.body.appendChild(this.layer);
			}

			// this.mask.id = this.oim.__maskid + "_mask";
			this.mask.style.backgroundImage = "url(" + this.src + ")";
			this.mask.style.backgroundRepeat = "no-repeat";
			this.mask.style.zIndex = 99999;
			this.setSharedAttributes(this.mask);

			this.layer.style.zIndex = 99990;
			this.layer.src = "about:blank";
			this.setSharedAttributes(this.layer);
		}
	};

	this.regEvent = function() {
		this.oim.onmousemove = function() {
			qObj.resetMaskPosition();
			var e = arguments[0] || qObj._document.parentWindow.event;
			var ct = e.target || e.srcElement;
			var sz = qObj.getPosition(ct);
			var ox = qsoft.isIE ? e.offsetX : (e.pageX - sz.left);
			var oy = qsoft.isIE ? e.offsetY : (e.pageY - sz.top);
			var x = Math.ceil(ox * qObj.w / qObj.ow) - qObj.maskX / 2;
			var y = Math.ceil(oy * qObj.h / qObj.oh) - qObj.maskY / 2;

			if (x < 0)
				x = 0;
			if (y < 0)
				y = 0;
			var maxx = Math.ceil((qObj.w - qObj.maskX));
			var maxy = Math.ceil((qObj.h - qObj.maskY));
			if (x > maxx)
				x = maxx;
			if (y > maxy)
				y = maxy;
			qObj.mask.style.backgroundPosition = -x + "px " + -y + "px";
		};

		this.oim.onmouseout = function() {
			qObj.mask.style.display = "none";
			qObj.layer ? qObj.layer.style.display = "none" : null;
		};

		this.oim.onmouseover = function() {
			qObj.mask.style.display = "block";
			qObj.layer ? qObj.layer.style.display = "block" : null;
		};

	};

	// 同一个页面需要放大多张图片方法
	//Departed 
	this.amplifyDouble = function() {
		this.createDoubleMask();
		this.regEvent();
		this.refresh();
	};

	// 一个页面仅需放大一张图片方法
	this.render = function() {
		this.createMask();
		this.regEvent();
		this.refresh();
	};

	this.renderByIndex = function(index) {
		this.createMaskByIndex(index);
		this.regEvent();
		this.refresh();
	};
	this.setSharedAttributes = function(obj) {
		obj.style.position = "absolute";
		obj.style.width = this.maskX + "px";
		obj.style.height = this.maskY + "px";
		obj.style.left = this.ol + "px";
		obj.style.top = this.ot + "px";
		obj.style.display = "none";
	};
	this.resetMaskPosition = function() {
		this.getMaskPostion();
		this.mask.style.left = qObj.ol + "px";
		this.mask.style.top = qObj.ot + "px";
		if (this.layer) {
			this.layer.style.left = qObj.ol + "px";
			this.layer.style.top = qObj.ot + "px";
		}

	};
	this.refresh = function() {
		this.mask.style.backgroundImage = "url(" + this.oim.src + ")";
	};
};

qsoft.PopBigImage.create = function(origImage, dx, dy, mx, my, bflag) {
	var q = new qsoft.PopBigImage(origImage, dx, dy, mx, my);
	q.render();
	if (bflag)
		q.mask.style.display = "block";
	return q;
};

Ext.reg('pictureShowBox', Ext.jp.tic.main.PictureShowBox);