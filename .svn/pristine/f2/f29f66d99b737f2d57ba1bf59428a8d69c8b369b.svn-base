/**
 * 基于jquery的AjaxRequest
 * @author ouyang zhiming
 */
AjaxRequest = function () {
    return {
        serializeForm2:function (form) {
            var namevalues = {};

            function add(name, value) {
                if (namevalues[name]) {
                    if ($.isArray(namevalues[name])) {
                        namevalues[name].push(value);
                    } else {
                        namevalues[name] = [namevalues[name]];
                        namevalues[name].push(value);
                    }
                } else {
                    namevalues[name] = value;
                }
            }

            var items = $(form).find('input,select,textarea');

            $.each(items,function () {
                add(this.name,this.value);
            });

            return namevalues;
        },
        /**
         * 将form表单元素的值序列化成对象
         * @param form
         * @return {Object}
         */
        serializeForm:function (form) {
            var arrayValue = $(form).serializeArray();
            var json = {};
            $.each(arrayValue, function () {
                var item = this;
                if (json[item["id"]]) {
                    json[item["name"]] = json[item["name"]] + "," + item["value"];
                }
                else {
                    json[item["name"]] = item["value"];
                }
            });
            return json;
        },
        /**
         * 初始化下拉列表
         * id      列表框ID
         * url     请求路径
         * params  参数对象，如：{a: 'test', b: 2}
         */
        initSelect:function (selId, url, params) {
            var sel = document.getElementById(selId);
            if (sel == null || typeof (sel) == "undefined") {
                alert("此下拉列表对象不存在！");
                return;
            }

            $.ajax({
                type:'POST',
                url:url,
                data:params,
                success:function (jsonData, textStatus) {
                    if (jsonData == null)
                        return;
                    for (var i = 0; i < jsonData.length; i++) {
                        var option = new Option();
                        option.text = jsonData[i].text;
                        option.value = jsonData[i].value;
                        sel.add(option);
                    }
                },
                error:function () {
                    alert("请求失败!");
                    return;
                }
            })
        },

        /***
         * 增加回调函数
         */
        initSelectFn:function (selId, url, params, fn) {
            var sel = document.getElementById(selId);
            if (sel == null || typeof (sel) == "undefined") {
                alert("此下拉列表对象不存在！");
                return;
            }

            $.ajax({
                type:'POST',
                url:url,
                data:params,
                success:function (jsonData, textStatus) {
                    if (jsonData == null)
                        return;
                    for (var i = 0; i < jsonData.length; i++) {
                        var option = new Option();
                        option.text = jsonData[i].text;
                        option.value = jsonData[i].value;
                        sel.add(option);
                    }
                    fn.call(this, jsonData);
                },
                error:function () {
                    alert("请求失败!");
                    return;
                }
            })

        },

        /**
         * 初始化表单
         * formId      表单ID
         * url         请求路径
         * params      参数对象，如：{a: 'test', b: 2}
         * flag        是否显示加载进度条 true显示，false为不显示
         * fn          加载表单完成后回调函数
         */
        initForm:function (formId, url, params, flag, fn) {
            if (flag == true && typeof (WaitBar) != "undefined")
                WaitBar.show();
            var form = document.getElementById(formId);
            if (form == null || typeof (form) == "undefined") {
                alert("此表单对象不存在！");
                return;
            }
            $.ajax({
                type:'POST',
                url:url,
                data:params,
                success:function (jsonData, textStatus) {
                    /**判断返回的是对象，还是对象列表*/
                    if (jsonData[0] != undefined) {
                        jsonData = jsonData[0];
                    }

                    if (jsonData == null)
                        return;
                    var count = form.elements.length;
                    for (var i = 0; i < count; i++) {
                        with (form.elements[i]) {
                            if (form.elements[i] == null || getAttribute("type") == null)
                                continue;
                            var cId = getAttribute("id");

                            var lId = cId.substring(0, 1).toLowerCase()
                                + cId.substring(1); //将首字母转为小写

                            switch (type) {
                                case "text":
                                case "textarea":
                                case "hidden":
                                case "password":
                                    var reg = "jsonData." + cId;
                                    var lreg = "jsonData." + lId;
                                    temp = eval(reg) || eval(lreg);
                                    if (temp == null) {
                                        value = "";
                                        break;
                                    }
                                    value = temp.toString().trim();
                                    if (value.length >= 21) {
                                        if (/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1]) ([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d\.[0-9]{1,3}$/
                                            .test(value)) {
                                            value = value.substring(0, 19);
                                        }
                                    }
                                    break;
                                case "select-one":
                                    var reg = "jsonData." + cId;
                                    var lreg = "jsonData." + lId;
                                    value = eval(reg) || eval(lreg) || 0;
                                    break;
                                case "checkbox":
                                    var reg = "jsonData." + cId;
                                    var lreg = "jsonData." + lId;
                                    value = eval(reg) || eval(lreg) || 0;
                                    if (value == 0)
                                        checked = false;
                                    else
                                        checked = true;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    if (typeof(fn) == 'function') {
                        fn.call(this, jsonData);
                    }
                    if (flag == true && typeof (WaitBar) != "undefined")
                        WaitBar.hide();

                },
                error:function () {
                    if (flag == true && typeof (WaitBar) != "undefined")
                        WaitBar.hide();
                    alert("请求失败!");
                    return;
                }
            })

        },

        /**
         * 异步请求
         * el      表单ID
         * url     请求路径
         * params  参数对象，如：{a: 'test', b: 2}
         * fn      回调函数
         * isAuto 自动弹出提示框
         */
        doRequest:function (el, url, params, fn, isAuto) {
            var param = {};
            params = $(params).length > 0 ? params : null;

            if (el != "" && el != null) {
                if ($("#" + el))
                    param = this.serializeForm($("#" + el));
            }

            param = $.extend({}, param, params);

            $.ajax({
                type:'POST',
                url:url,
                data:param,
                success:function (data, textStatus) {
                    if (typeof(fn) == 'function') {
                        fn.call(this, data);
                    }
                },
                error:function () {
                    if (typeof (WaitBar) != "undefined")
                        if (!isAuto)WaitBar.hide();
                    alert("请求失败!");
                    return;
                },
                beforeSend:function () {
                    if (isAuto)WaitBar.show(null, 'top');
                },
                complete:function () {
                    if (isAuto && typeof (WaitBar) != "undefined")WaitBar.hide();
                }
            })
        },
        /**
         * 同步请求
         * el      表单ID
         * url     请求路径
         * params  参数对象，如：{a: 'test', b: 2}
         * fn      回调函数
         * isAuto 自动弹出提示框
         */
        doRequestAsync:function (el, url, params, fn, isAuto) {
            var param = {};
            params = $(params).length > 0 ? params : null;
            if ($("#" + el))
                param = this.serializeForm($("#" + el));

            param = $.extend({}, param, params);

            if (isAuto)WaitBar.show(null, 'top');
            $.ajax({
                type:'POST',
                url:url,
                async:false,
                data:param,
                success:function (data, textStatus) {
                    if (typeof(fn) == 'function') {
                        fn.call(this, data);
                    }
                },
                error:function () {
                    if (typeof (WaitBar) != "undefined")
                        if (!isAuto)WaitBar.hide();
                    alert("请求失败!");
                    return;
                }
            })
            if (isAuto && typeof (WaitBar) != "undefined")WaitBar.hide();
        }
    }
}();