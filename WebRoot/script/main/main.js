
/*Ext.Loader.setConfig({
    enabled: true,
    paths: {
		"Ext.ux": "./script/framework/plugin/ux",
		"Ext.app": "./script/framework/plugin/app",
		"Ext.jp.tic.component": "./script/framework/component",
		"Ext.jp.tic.main": "./script/main",
		"Ext.jp.tic.search": "./script/search",
		"Ext.jp.tic.stat": "./script/stat",
		"Ext.jp.tic.batch": "./script/batch",
		"Ext.jp.tic.desktop": "./script/desktop",
		"Ext.jp.tic.datacenter": "./script/datacenter",
		"Ext.jp.tic.register": "./script/register",
		"Ext.jp.tic.alarm": "./script/alarm",
		"Ext.jp.tic.stat": "./script/stat",
		"Ext.jp.tic.role": "./script/role"
	}
});

Ext.require([
    "Ext.jp.tic.component.SystemTree"
]);*/

Ext.onReady(function () {
	//Ext.BLANK_IMAGE_URL = "res/jslib/ext4/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "side";

	var main = new Ext.jp.tic.main.MainViewport();
	
	var divBox = Ext.select("div[class*=systemMenu] div");
	divBox.on("mouseover", function () {
		if (this.className != "menuVisited") {
			this.className = "menuHover";
		}
	}).on("mouseout", function () {
		if (this.className != "menuVisited") {
			this.className = "menuActive";
		}
	}).on("click", function () {
		Ext.each(Ext.query("div[class*=systemMenu] div"), function () {
			if (this.className != "menuActive") {
				this.className = "menuActive";
				Ext.fly(this).query("span")[0].className = "viewIcon1 menuPosition";
			}
		});
		this.className = "menuVisited";
		Ext.fly(this).query("span")[0].className = "checked1 menuPosition";
		main.onAddTabItem(this.id, this.innerText || this.textContent, "viewIcon1", this.getAttribute("url"), this.getAttribute("type"));
	});
});