/**
 * 基于jQuery对象级的工具类
 */
//定义命名空间
var yh = $.extend({}, yh);
(function ($) {
    /*************************************************基础封装开始************F*********************************/
    /**
     * base对象封装了基础的方法
     * 比如表单序列化、生成弹窗等
     * @type {Object}
     */
    yh.base = {
        /**
         * 将form表单元素的值序列化成对象
         * @param form  需要序列化的表单
         * @return {Object} json对象
         */
        serializeForm: function (form) {
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
         * 获取当前日期和时间
         * @return {Date}  当前日期对象
         */
        now: function (fmt) {
            return new Date();
        },
        /**
         * 获取指多少天前后的日期
         * @param date  日期对象，如2012-08-27
         * @param day   相差的天数,如-7天,代表7天前,+7天，代表7天后
         * @return {Date}  运算后的日期
         */
        getDay: function (date, day) {
            if (!date || !day)
                return null;
            var changeType = day.substring(0, 1), numOfDay = parseInt(day.substring(1)), newDay = new Date();
            if (changeType === "+") {
                newDay = new Date(date.getTime() + numOfDay * 24 * 60 * 60 * 1000);
            }
            if (changeType === "-") {
                newDay = new Date(date.getTime() - numOfDay * 24 * 60 * 60 * 1000);
            }
            return newDay;
        },
        /**
         * 加载日期时间组件
         * @param target  日期输对框对象
         * @param date    默认显示的日期
         * @param options 日期框的设置项,没特殊要求可不必填
         */
        loadDateTime: function (target, date, options, depth, type) {
            $(target).attr("readonly", "readonly");
            var defaults = {};
            var opts = $.extend(depth || true, {}, defaults, options);
            if (type == "date") {
                $(target).datepicker(opts).datepicker("setDate", date || "");
            }
            else {
                $(target).datetimepicker(opts).datetimepicker("setDate", date || "");
            }
        },
        /**
         * 加载My97DatePicker日期控制
         * @param {Object} target
         * @param {Object} date
         * @param {Object} options
         * @param {Object} depth
         */
        loadDateTime97: function (target, date, options, dateFmt, disabled, depth) {
            var defaults = {
                readOnly: true,
                dateFmt: dateFmt
            };
            var opts = $.extend(depth || true, {}, defaults, options);
            //格式化日期
            $(target).addClass("Wdate").bind("click", function () {
                WdatePicker(opts);
            });

            $(target).attr("disabled", disabled).val(date || "");

        },
        /**
         * 格式化日期
         * @param {Object} date
         * @param {Object} fmt
         */
        formatDate: function (date, fmt) {
            var dateFormat = new DateFormat();
            return dateFormat.format(date, fmt);
        },
        /**
         * 格式化日期(适用于my97)
         * @param {Object} date
         * @param {Object} fmt
         */
        formatMy97Date: function (date, fmt) {
            var y = date.y, M = date.M, d = date.d, H = date.H, m = date.m, s = date.s, datetime = new Date(y, M - 1, d, H, m, s);
            return yh.base.formatDate(datetime, fmt);
        },
        /**
         * 日期字典转换
         * @param {Object} fmt
         */
        dateFmtConvert: function (fmt) {
            switch (fmt) {
                case 1:
                    return dateFmt = "yyyy-MM-dd HH:mm:ss";
                    break;
                case 2:
                    return dateFmt = "yyyy-MM-dd HH:mm";
                    break;
                case 3:
                    return dateFmt = "yyyy-MM-dd HH";
                    break;
                case 4:
                    return dateFmt = "yyyy-MM-dd";
                    break;
                case 5:
                    return dateFmt = "yyyy-MM";
                    break;
                case 6:
                    return dateFmt = "yyyy-MM-dd";
                    break;
                case 7:
                    return dateFmt = "yyyy-MM-ww";
                    break;
                default :
                    return "";
            }
        },
        /**
         * 根据给定日期，输出星期几
         * @param {Object} y
         * @param {Object} m
         * @param {Object} d
         */
        getWeek: function (y, m, d) {
            var _int = parseInt, c = _int(y / 100);
            y = y.toString().substring(2, 4);
            y = _int(y, 10);
            if (m === 1 || m === 2) {
                m += 12;
                y--;
            }

            var w = y + _int(y / 4) + _int(c / 4) - 2 * c + _int(26 * (m + 1) / 10) + d - 1;
            w = w % 7;

            return w >= 0 ? w : w + 7;
        },
        /**
         * 加载联动日期
         * @param {Object} target
         * @param {Object} date
         * @param {Object} options
         * @param {Object} depth
         */
        loadMutilDate: function (target, date, options, depth) {
            $(target).attr("readonly", "readonly");
            var defaults = {
                format: "yy-mm-dd",
                maxDate: "+5d"
            };
            var opts = $.extend(depth || true, {}, defaults, options);
            $(target).yhDatePicker(opts).datepicker("setDate", date || "");
        },
        /**
         * 创建iframe loading效果
         * @param url           iframe里加载页面的url
         * @return {Object}    返回iframe的弹窗对象
         */
        iframeLoading: function (url) {
            var $iframe = $("<iframe id='openIframe' name='openIframe' frameborder='no'></iframe>").css({
                height: "100%",
                width: "100%"
            }).attr("src", url);

            //当iframe内容加载完成，则去掉loading遮罩
            $iframe.load(function () {
                $(this).siblings("div").fadeOut(200).remove();
                $(this).off("load");
            });

            var $maskDiv = $("<div></div>").css({
                "position": "absolute",
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "z-index": "400",
                "background": "url(" + ctx + "/base/skins/skinBlue/images/tabsLoading.gif) no-repeat center center #f7fdff"
            });

            return $maskDiv.append($iframe);
        },

        /**
         * window方式找开窗口
         * @param url           url页面
         * @param options      窗口设置选择
         * @param openWindow   窗口的id
         * @return {Object}
         */
        openWindow: function (url, options, openWindow, depth, open, data) {
            var win, $iframeLoading, $subDataForm;

            if (data) {
                $subDataForm = $("<form id='subDataForm' method='post' action='' target='openIframe' onsubmit='return false;'></form>");
                for (var i in data) {
                    $("<input type='hidden'>").attr({"id": i, "name": i, "value": data[i]})
                        .appendTo($subDataForm);
                }
                $iframeLoading = yh.base.iframeLoading("");
            } else {
                $iframeLoading = yh.base.iframeLoading(url);
            }

            var defaults = {
                autoOpen: true,
                show: "fade",
                hide: "fade",
                modal: true,
                resizable: false,
                showTaskBar: false,
                position: ["center", "center"],
                width: 850,
                height: 530,
                dragHelper: true,
                close: function (e) {
                    var $iframe = $(this).find("iframe");
                    if ($iframe)
                        $iframe.remove();
                    $(this).yhWindow("destroy").remove();
                },
                open: function (e, ui) {
                    $(this).append($iframeLoading);
                    if (data) {
                        $(this).append($subDataForm.attr("action", url));
                        document.getElementById("subDataForm").submit();
                    }
                }
            };
            var opts = $.extend(depth || true, {}, defaults, options);
            if (open)
                win = yh.base.WindowOpen(url, options.width || "", options.height || "", options.title || "窗口");
            else
                win = $("<div id = '" + (openWindow || "openWindow") + "'></div>").appendTo(document.body).yhWindow(opts);
            return win;
        },
        /**
         * 弹窗
         * @param url         弹窗内容的url
         * @param options     弹窗设置选项
         * @param openDialog  弹窗的ID
         * @return {Object}
         */
        openDialog: function (url, options, openDialog, depth) {
            var $iframeLoading = yh.base.iframeLoading(url);

            var defaults = {
                autoOpen: true,
                show: "fade",
                hide: "fade",
                modal: true,
                resizable: false,
                width: 850,
                height: 530,
                close: function (e) {
                    $(this).dialog("destroy").remove();
                },
                open: function (e, ui) {
                    $(this).css({
                        "padding": 0,
                        "margin": 0
                    }).empty().append($iframeLoading);
                }
            };
            var opts = $.extend(depth || true, {}, defaults, options);
            return $("<div id = '" + (openDialog || "openDialog") + "'></div>").appendTo(document.body).dialog(opts);
        },
        /**
         * Alert提示框
         * @param msg 提示文字
         * @param fn  回调方法，如确定之后需要操作的内容
         * @param type 弹窗类型,confirm,alert,error
         */
        openAlert: function (msg, fn, type) {
            type = type ? type : "confirm";
            switch (type) {
                case "confirm":
                    $.yhDialogTip.confirm(msg, fn);
                    break;
                case "alert":
                    $.yhDialogTip.alert(msg, fn);
                    break;
                case "error":
                    $.yhDialogTip.error(msg, fn);
                    break;
            }
        },
        WindowOpen: function (url, width, height, name) {
            var left, top, _width, _height;
            _width = width || window.screen.availWidth;
            _height = height || window.screen.availHeight;
            left = (window.screen.availWidth - _width) / 2;
            top = (window.screen.availHeight - _height) / 2;
            var newWindown = window.open(url, "_blank", "top=" + top + ",left=" + left + ",width=" + _width + ",height=" + _height + ",location=no,resizable=yes,scrollbars=yes");
            newWindown.resizeTo(screen.availWidth, screen.availHeight);
            //给新窗口命名
            if ($(name).length > 0)
                newWindown.name = name;
            //返回当前窗口
            return newWindown;
        },
        /**
         * 工具条
         * @param target   目标DIV
         * @param items    工具条参数选项
         */
        toolbars: function (target, options, customDom) {
            var defItems = [
                {
                    type: "button",
                    text: "查询",
                    bodyStyle: "search",
                    handler: function () {
                        doSearch();
                    }
                },
                "-",
                {
                    type: "button",
                    text: "新增",
                    bodyStyle: "new",
                    handler: function () {
                        doAddOrEdit("add");
                    }
                },
                "-",
                {
                    type: "button",
                    text: "查看详情",
                    bodyStyle: "edit",
                    handler: function () {
                        doAddOrEdit("detail");
                    }
                },
                "-",
                {
                    type: "button",
                    text: "删除",
                    bodyStyle: "delete",
                    handler: function () {
                        doDelete();
                    }
                }
            ];

            var toolbar = new Toolbar({
                renderTo: target || "toolbar",
                items: options || defItems,
                customDom: customDom
            });
            toolbar.render();
            return toolbar;
        },
        /**
         * 初始化Tabs
         * @param target
         */
        tabs: function (target, options, depth) {
            var defaults = {
                heightStyle: "fill",
                create: function (e) {
                    $(this).parent().css("overflow", "hidden");
                }
            };

            var opts = $.extend(depth || true, {}, defaults, options);
            $(target).tabs(opts);
        },
        /**
         * 初始化按钮条
         * @param target
         * @param options
         * @return {Object}
         */
        button: function (target, options, depth) {
            var defaults = {
                items: [
                    {
                        type: "submit",
                        onClick: function (e, btnHolder, btnObj) {
                            doSave();
                        }
                    },
                    {
                        type: "reset",
                        onClick: function (e, btnHolder, btnObj) {
                            doReset();
                        }
                    }
                ]
            };
            var opts = $.extend(depth || true, {}, defaults, options);
            return $(target).yhButton(opts);
        },
        /**
         * 回填表单
         * 该方法比较复杂，里面定义了多个内部方法
         * @param target
         * @param data
         * @param delay  延迟时间，默认为0.3秒
         */
        form: function (target, data, delay) {
            //设置超时0.3秒，避免取不控件对象
            setTimeout(function () {
                initForm(target, data);
            }, delay || 100);

            function initForm(target, data) {
                /**********************************************初始化表单元素开始***************************************/
                var $form = $(target), $yhUiDropDown = $form.find("input:yhui-yhDropDown"), $yhUiDate = $form.find("input[class*='hasDatepicker']");
                for (var name in data) {
                    var val = $.trim(data[name]);
                    var dropdowns = setDropDown(name, val); //设置下拉框回填
                    //如果已经找到下拉框，则跳出循环，否则向下匹配单选框、复选框
                    if (dropdowns.length)
                        continue;
                    var datetimepicker = setDate(name, val); //回填时间控件
                    if (datetimepicker.length)
                        continue;
                    var checks = setChecked(name, val); //设置单选框、复选框值回填
                    //如果没有打到单选框、知复选框，则查找匹配的文本输入框等
                    if (!checks.length) {
                        $form.find("input[name=\"" + name + "\"]").val(val);
                        $form.find("textarea[name=\"" + name + "\"]").val(val);
                        $form.find("select[name=\"" + name + "\"]").val(val);
                    }
                }

                //设置时间回填
                function setDate(name, val) {
                    var rr = [];
                    $yhUiDate.each(function () {
                        var $date = $(this);
                        var elId = $date.attr("id");
                        if (name == elId) {
                            rr.push(name);
                            $date.datetimepicker("setDate", val);
                        }
                    });
                    return rr;
                }

                //下拉框值回填
                function setDropDown(name, val) {
                    var rr = [];
                    if (val == null || val == "") {
                        rr.push(name);
                        return rr;
                    }
                    $yhUiDropDown.each(function () {
                        var $input = $(this); //下拉输入框
                        var elId = $input.attr("id");
                        var hiddenId = $input.siblings("input:hidden").attr("id"); //获取下载输入框对应的Id域
                        //如果传入的值与控制的输入框相等，则直接跳过
                        if (name == elId) {
                            rr.push(name);
                            return rr;
                        }
                        //如果回填值对象与下拉对象匹配，则执行
                        if (name == hiddenId) {
                            rr.push(name);
                            var tree = $input.yhDropDown("getTree"); //获取下拉树
                            if (!tree)
                                return;
                            var id = $input.yhDropDown("option", "post"); //获取下拉树设置选项的post属性
                            var checkbox = $input.yhDropDown("option", "checkbox");
                            var vals = val.split(",");

                            for (var i = 0; i < vals.length; i++) {
                                var node = tree.getNodeByParam(id, vals[i]); //根据值获取节点,默认按id查找
                                if (!node)
                                    continue;
                                //如果有复选框，则使用checkNode,否则使用selectNode
                                if (checkbox) {
                                    node.notTriggerClick = true;
                                    tree.checkNode(node, true, true, true); //选中节点
                                    node.notTriggerClick = false;
                                }
                                else {
                                    tree.selectNode(node); //选中节点
                                    $input.val(node.name); //设置对应的输入框的文本值
                                    $("#" + name).val(node[id]); //设置输入框对应的隐藏值
                                }
                                //tree.expandNode(node, true, true, true); //展开节点
                            }
                        }
                    });
                    return rr;
                }

                //设置单选框、复选框值回填
                function setChecked(name, val) {
                    var rr = $form.find("input[name=\"" + name + "\"][type=radio], input[name=\"" + name + "\"][type=checkbox]");

                    $.fn.prop ? rr.prop("checked", false) : rr.attr("checked", false);
                    rr.each(function () {
                        var f = $(this);
                        if (f.val() == val) {
                            $.fn.prop ? f.prop("checked", true) : f.attr("checked", true);
                        }
                    });
                    return rr;
                }

                /**********************************************初始化表单元素结束***************************************/
            }
        },
        /**
         * 验证表单
         * @param {Object} form  需要验证的表单ID
         */
        validate: function (form) {
            return $(form).yhFormField("validate");
        },
        emptyValid: function (field, rules, i, options) {
            if (field.val() === "请选择") {
                return "请选择";
            }
        }

    };
    /*************************************************基础封装结束*********************************************/
    /*************************************************昱辉UI开始**********************************************/
    yh.ui = {
        /*
         * 初始化布局
         * @param options    布局所需要的参数，额外添加layout属性
         * @param searchForm   查询表单
         * @param datagrid     数据表格
         * @param validateItems 验证字段和验证规则
         * @param optionsValidate  yhFormField的设置选项
         * @return {Object}
         */
        layout: function (options, searchForm, datagrid, validateItems, optionsValidate, depth) {
            var defaults = {
                north: {
                    size: 62, //north布局的高度
                    spacing_open: 6, //布局伸缩的分隔条
                    spacing_closed: 6, //布局伸缩的分隔条
                    resizable: false
                },
                center: {
                    onresize: function () {
                        $(datagrid || "#datagrid").datagrid("resize");
                    }
                }
            };

            var opts = $.extend(true, {}, defaults, options);
            var yhLayout = $.yhLayout(options && options.layout || "upDown", opts);

            var defaultsValidate = {
                tipPosition: "bottom",
                initValidate: validateItems ||
                    []
            };
            var optsValidate = $.extend(depth || true, {}, defaultsValidate, optionsValidate);

            $(searchForm || "#searchForm").yhFormField(optsValidate);
            return yhLayout;
        },

        /**
         * 列表查询,包含了查询表单序列化
         * @param form     查询表单
         * @param datagrid 数据列表
         * @param options  数据列表参数选项
         * @param dfJson   初始json,打开页面自动查询时可以传入
         */
        doSearch: function (form, datagrid, options, tree,dfJson) {alert("doSearch");
            var defaults = {
                queryParams: dfJson ? dfJson : yh.base.serializeForm(form || "#searchForm")
            };
            var opts = $.extend(true, {}, defaults, options);
            yh.easyui.datagrid(datagrid || "#datagrid", opts,"",tree);
        },
        /**
         * 新增
         * @param url
         * @param options
         * @param mode
         * @return {Object}
         */
        doAdd: function (url, options, mode, depth, open) {
            var defaults = {
                title: "--新建"
            };
            if (options && options.title) {
                options.title = options.title + defaults.title;
            }
            var opts = $.extend(depth || true, {}, defaults, options);
            return yh.base.openWindow(url, opts, "", "", open);
        },
        /**
         * 修改、查看数据
         * @param {Object} mode
         * @param {Object} url
         * @param {Object} options
         * @param {Object} datagrid
         */
        doEdit: function (datagrid, url, options, mode, passValue, depth, rowData, open) {
            var defaults = {
                title: "--编辑"
            };

            if (mode == "detail")
                defaults.title = "--查看详情";

            if (options && options.title) {
                options.title = options.title + defaults.title;
            }
            var opts = $.extend(depth || true, {}, defaults, options);

            //如果传入rowData参数，则说明是双击查看详情
            if ($(rowData).length > 0) {
                setValue(rowData);
            }
            else {
                var rows = $(datagrid).datagrid("getChecked");
                if (rows.length == 1) {
                    if (passValue) {
                        setValue(rows[0]);
                    }
                }
                else {
                    yh.base.openAlert("请选择一条记录修改或查看！", "", "alert");
                    return;
                }
            }
            yh.base.openWindow(url, opts, "", "", open);
        },
        /**
         * 施工单位
         * @param {Object} url
         * @param {Object} options
         
        doSearchUnitData: function (url, options, unitIds) {
            var $this = this;
            var defaults = {
                title: '--施工单位'
            };
            if (options && options.title) {
                options.title = options.title + defaults.title;
            }
            setValue(unitIds);//页面传参
            var opts = $.extend(defaults, options);
            return yh.base.openWindow(url, opts);
        },*/
        /**
         * 处理部门
         * @param {Object} url
         * @param {Object} options
         
        doSearchDeptData: function (url, options, unitIds) {
            var $this = this;
            var defaults = {
                title: '--处理部门'
            };
            if (options && options.title) {
                options.title = options.title + defaults.title;
            }
            setValue(unitIds);//页面传参
            var opts = $.extend(defaults, options);
            return yh.base.openWindow(url, opts);
        },*/
        /**
         * 服务类别
         * @param {Object} url
         * @param {Object} options
         
        doSearchServData: function (url, options, servIds) {
            var $this = this;
            var defaults = {
                title: '--服务类别'
            };
            if (options && options.title) {
                options.title = options.title + defaults.title;
            }

            setValue(servIds);//页面传参
            var opts = $.extend(defaults, options);
            return yh.base.openWindow(url, opts);
        },*/
        /**
         * 首责部门
         * @param {Object} url
         * @param {Object} options
         
        doSearchMainDepart: function (url, options, mainDepartId) {
            var $this = this;
            var defaults = {
                title: '--首责部门'
            };
            if (options && options.title) {
                options.title = options.title + defaults.title;
            }

            setValue(mainDepartId);//页面传参
            var opts = $.extend(defaults, options);
            return yh.base.openWindow(url, opts);
        },*/
        /**
         * 一级部门部门
         * @param {Object} url
         * @param {Object} options
         
        doSearchFirstDepart: function (url, options, firstDepartId) {
            var $this = this;
            var defaults = {
                title: ''
            };
            if (options && options.title) {
                options.title = options.title + defaults.title;
            }

            setValue(firstDepartId);//页面传参
            var opts = $.extend(defaults, options);
            return yh.base.openWindow(url, opts);
        },*/
        /**
         * 二级部门
         * @param {Object} url
         * @param {Object} options
         
        doSearchSecondDepart: function (url, options, secondDepartId) {
            var $this = this;
            var defaults = {
                title: '--二级部门'
            };
            if (options && options.title) {
                options.title = options.title + defaults.title;
            }

            setValue(secondDepartId);//页面传参
            var opts = $.extend(defaults, options);
            return yh.base.openWindow(url, opts);
        },*/
        /**
         * 删除数据
         * @param datagrid
         * @param url
         * @param options
         * @param fn
         * @param param
         */
        doDelete: function (datagrid, url, options, fn, param, depth) {
            //获取选择的记录
            var rows = $(datagrid).datagrid("getChecked");

            //设置删除确认的默认回调方法
            fn = fn ? fn : function () {
                $(datagrid).datagrid("reload");
            };

            var defaults = {
                idField: "id",
                idType: "string",
                fkField: "",
                fkType: "string"
            };

            var opts = $.extend(depth || true, {}, defaults, options);

            //定义数组存放主键
            var ids = [], fks = [];
            //如果选择了记录
            if (rows.length > 0) {

                var idField = opts.idField, fkField = opts.fkField;

                for (var i = 0; i < rows.length; i++) {
                    //主键值拼接
                    if (opts.idType == "string") {
                        ids.push("\'" + rows[i][idField] + "\'");
                    }
                    else {
                        ids.push(rows[i][idField]);
                    }

                    //如果设置了关联字段，则继续关联字段值拼接
                    if (fkField == "" || fkField == null)
                        continue;
                    if (opts.fkType == "string") {
                        fks.push("\'" + rows[i][fkField] + "\'");
                    }
                    else {
                        fks.push(rows[i][fkField]);
                    }
                }

                //异步请求传参
                var defParams = {
                    ids: ids.join(","),
                    fks: fks.join(",")
                };

                //如果外部传入参数，则合并
                var params = $.extend(depth || true, {}, defParams, param);

                //请求后台，删除数据
                AjaxRequest.doRequest("", url, params, function (backData) {
                    //获取删除成功标志
                    var result = backData.result;
                    if (result == 1 || result == "1") {
                        yh.base.openAlert("删除成功!", fn, "confirm");
                    }
                    else {
                        yh.base.openAlert("删除失败!", "", "alert");
                    }
                });
            }
            else {
                yh.base.openAlert("请选择至少一条记录删除！", "", "alert");
            }
        },
        /**
         * 保存数据
         * @param {Object} form
         * @param {Object} url
         * @param {Object} param
         */
        doSave: function (form, url, param, fn) {
            AjaxRequest.doRequest(form, url, param, function (backData) {
                var result = backData.result;
                if (result == 1 || result == "1") {
                    yh.base.openAlert("保存成功!", fn);
                }
                else {
                    yh.base.openAlert("保存失败!", "", "error");
                }
            });
        },
        /**
         * 保存数据-过滤避免重复提示
         * @param {Object} form
         * @param {Object} url
         * @param {Object} param
         */
        doSaveCheck: function (form, url, param, fn) {
            AjaxRequest.doRequest(form, url, param, function (backData) {
                var result = backData.result;
                if (result == 1 || result == "1") {
                    yh.base.openAlert("保存成功!", fn);
                }
                else {
                    yh.base.openAlert("保存失败,数据已经配置过，不能重复配置!", "", "error");
                }
            });
        },
        /**
         * 重置表单
         * @param target
         */
        doReset: function (target) {
            var $form = $(target), $yhUiDropDown = $form.find("input:yhui-yhDropDown"), $yhUiDate = $form.find("input[class*='hasDatepicker']");
            $("input,select,textarea", target).each(function () {
                var t = this.type, tag = this.tagName.toLowerCase();
                if (t == "text" || t == "hidden" || t == "password" ||
                    tag == "textarea") {
                    this.value = "";
                }
                else {
                    if (t == "file") {
                        var node = $(this);
                        node.after(node.clone().val(""));
                        node.remove();
                    }
                    else {
                        if (t == "checkbox" || t == "radio") {
                            this.checked = false;
                        }
                        else {
                            if (tag == "select") {
                                this.selectedIndex = -1;
                            }
                        }
                    }
                }
            });
            $yhUiDropDown.each(function () {
                var $input = $(this); //下拉输入框
                var tree = $input.yhDropDown("getTree"); //获取下拉树
                //清空多选状态
                tree.checkAllNodes(false);
                //清空下拉树状态
                var nodes = tree.getSelectedNodes();
                for (var i = 0; i < nodes.length; i++) {
                    tree.cancelSelectedNode(nodes[i]);
                }
            });
            //清空时间状态
            $yhUiDate.each(function () {
                var $date = $(this);
                $date.datetimepicker("setDate", "");
            });
        },
        /**
         * 重置表单（指定某一个或多个表单元素）
         * @param target
         */
        doResetElement: function (target, data) {
            var $form = $(target), $yhUiDropDown = $form.find("input:yhui-yhDropDown"), $yhUiDate = $form.find("input[class*='hasDatepicker']");
            for (var name in data) {
                var dropdowns = setDropDown(name); //设置下拉框回填
                //如果已经找到下拉框，则跳出循环，否则向下匹配单选框、复选框
                if (dropdowns.length)
                    continue;
                var datetimepicker = setDate(name); //回填时间控件
                if (datetimepicker.length)
                    continue;
                var checks = setChecked(name); //设置单选框、复选框值回填
                //如果没有打到单选框、知复选框，则查找匹配的文本输入框等
                if (!checks.length) {
                    $form.find("input[name=\"" + name + "\"]").val('');
                    $form.find("textarea[name=\"" + name + "\"]").val('');
                    $form.find("select[name=\"" + name + "\"]").val('');
                }
            }
            //设置时间回填
            function setDate(name) {
                var rr = [];
                $yhUiDate.each(function () {
                    var $date = $(this);
                    var elId = $date.attr("id");
                    if (name == elId) {
                        rr.push(name);
                        $date.datetimepicker("setDate", '');
                    }
                });
                return rr;
            }

            //下拉框值回填
            function setDropDown(name) {
                var rr = [];
                $yhUiDropDown.each(function () {
                    var $input = $(this); //下拉输入框
                    var hiddenId = $input.siblings("input:hidden").attr("id");
                    if (name == hiddenId) {
                        var tree = $input.yhDropDown("getTree"); //获取下拉树
                        //清空多选状态
                        tree.checkAllNodes(false);
                        //清空下拉树状态
                        var nodes = tree.getSelectedNodes();
                        for (var i = 0; i < nodes.length; i++) {
                            tree.cancelSelectedNode(nodes[i]);
                        }
                    }
                });
                return rr;
            }

            //设置单选框、复选框值回填
            function setChecked(name) {
                var rr = $form.find("input[name=\"" + name + "\"][type=radio], input[name=\"" + name + "\"][type=checkbox]");
                $.fn.prop ? rr.prop("checked", false) : rr.attr("checked", false);
                return rr;
            }
        },
        /**
         * 解锁记录
         * @param {Object} target
         * @param {Object} url
         * @param {Object} options
         */
        doUnlockUser: function (datagrid, url, options, fn, param, depth) {
            //获取选择的记录
            var rows = $(datagrid).datagrid("getChecked");

            //设置解锁确认的默认回调方法
            fn = fn ? fn : function () {
                $(datagrid).datagrid("reload");
            };

            var defaults = {
                idField: "id",
                idType: "string"
            };

            var opts = $.extend(depth || true, {}, defaults, options);

            //定义数组存放主键
            var ids = [], fks = [];
            //如果选择了记录
            if (rows.length > 0) {

                var idField = opts.idField;
                for (var i = 0; i < rows.length; i++) {
                    //主键值拼接
                    if (opts.idType == "string") {
                        ids.push("\'" + rows[i][idField] + "\'");
                    }
                    else {
                        ids.push(rows[i][idField]);
                    }
                }

                //异步请求传参
                var defParams = {
                    ids: ids.join(",")
                };

                //如果外部传入参数，则合并
                var params = $.extend(depth || true, {}, defParams, param);

                //请求后台，解锁数据
                AjaxRequest.doRequest("", url, params, function (backData) {
                    //获取解锁成功标志
                    var result = backData;
                    if (result == 1 || result == "1") {
                        yh.base.openAlert("解锁成功!", fn, "confirm");
                    }
                    else {
                        yh.base.openAlert("解锁失败!", "", "alert");
                    }
                });
            }
            else {
                yh.base.openAlert("请选择至少一条记录解锁！", "", "alert");
            }
        },
        
        /**
         * 删除记录
         * @param {Object} target
         * @param {Object} url
         * @param {Object} options
         */
        doDeleteFile: function (datagrid, url, options, fn, param, depth) {
            //获取选择的记录
            var rows = $(datagrid).datagrid("getChecked");

            //设置删除确认的默认回调方法
            fn = fn ? fn : function () {
                $(datagrid).datagrid("reload");
            };

            var defaults = {
                idField: "id",
                idType: "string"
            };

            var opts = $.extend(depth || true, {}, defaults, options);

            //定义数组存放主键
            var ids = [], fks = [];
            //如果选择了记录
            if (rows.length > 0) {

                var idField = opts.idField;
                for (var i = 0; i < rows.length; i++) {
                    //主键值拼接
                    if (opts.idType == "string") {
                        ids.push("\'" + rows[i][idField] + "\'");
                    }
                    else {
                        ids.push(rows[i][idField]);
                    }
                }

                //异步请求传参
                var defParams = {
                    ids: ids.join(",")
                };

                //如果外部传入参数，则合并
                var params = $.extend(depth || true, {}, defParams, param);

                //请求后台，删除数据
                AjaxRequest.doRequest("", url, params, function (backData) {
                    //获取解锁成功标志
                    var result = backData;
                    if (result == 1 || result == "1") {
                    	
                        yh.base.openAlert("删除成功!", fn, "confirm");
                    }
                    else {
                    alert(result);
                        yh.base.openAlert("删除失败!", "", "alert");
                    }
                });
            }
            else {
                yh.base.openAlert("请选择至少一条记录删除！", "", "alert");
            }
        },
        /**
         * 下拉数据字典
         * @param target
         * @param hiddenId
         * @param dic
         * @param options
         * @param zIndex
         */
        loadDicItem: function (target, hiddenId, dic, options, zIndex, depth) {
            //请求参数
            var params = {
                enumcode: dic
            };

            //默认参数
            var defaults = {
                zIndex: zIndex || "",
                hiddenId: hiddenId || "hiddenId",
                //url:ctx + "/commons/common!getEnum.action",
                //postData:params,
                checkbox: true,
                noChild: true,
                selectAll: true,
                post: "id"
            };

            if ($.yhui.isIE67) {
                defaults.width = 150;
                defaults.height = 100;
            }

            var opts = $.extend(depth || true, {}, defaults, options);
            //$(target).yhDropDown(opts);
            AjaxRequest.doRequest("", ctx + "/commons/common!getEnum.action", params, function (backData) {
                opts.json = backData;
                $(target).yhDropDown(opts);
            });

        },
        /**
         * 加载多个数据字典
         * @param items
         * @param options
         */
        loadMutilDicItem: function (items, options, depth) {
            var defaults = {
                checkbox: true,
                noChild: true,
                selectAll: true,
                post: "id"
            };

            if ($.yhui.isIE67) {
                defaults.width = 150;
                defaults.height = 100;
            }

            var opts = $.extend(depth || true, {}, defaults, options);

            //将数据字典编码以,拼接成字符串
            var dics = [];
            for (var i = 0; i < items.length; i++) {
                dics.push(items[i].dic);
            }

            //请求参数
            var params = {
                enumcodes: dics.join(",")
            };

            AjaxRequest.doRequest("", ctx + "/commons/common!getEnums.action", params, function (backData) {
                for (var i = 0; i < items.length; i++) {
                    var itemOpts = opts;
                    if (items[i].options) {
                        itemOpts = $.extend(depth || true, {}, opts, items[i].options);
                    }
                    //分别设置下拉制件的参数
                    itemOpts.zIndex = items[i].zIndex;
                    itemOpts.hiddenId = items[i].hiddenId;
                    itemOpts.json = backData[items[i].dic];

                    $(items[i].target).yhDropDown(itemOpts);
                }
            });
        },
        /**
         * 加载下拉树
         * @param target
         * @param hiddenId
         * @param url
         * @param param
         * @param options
         * @param zIndex
         */
        loadDropTree: function (target, hiddenId, url, param, options, zIndex, depth) {
            var defaults = {
                zIndex: zIndex || "",
                hiddenId: hiddenId || "hiddenId",
                selectParent: true,
                json: "",
                checkbox: true,
                post: "id",
                autocomplete: true,
                createdTree: function (e, tree) {
                    tree.expandNode(tree.getNodes()[0], true);
                }
            };

            if ($.yhui.isIE67) {
                defaults.width = 150;
                defaults.height = 200;
            }

            var opts = $.extend(depth || true, {}, defaults, options);
            if (url.length > 0) {
                AjaxRequest.doRequest("", url, param, function (backData) {
                    opts.json = backData;
                    $(target).yhDropDown(opts);
                });
            }
            else {
                $(target).yhDropDown(opts);
            }

        },
        /**
         * 加载业务
         * @param target
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadBusiness: function (target, hiddenId, param, options, zIndex, depth) {
            var defaults = {
                zIndex: zIndex || "",
                hiddenId: hiddenId || "hiddenId",
                json: "",
                checkbox: true,
                noChild: true,
                selectAll: true,
                post: "id",
                createdTree: function (e, tree) {
                    tree.expandNode(tree.getNodes()[0], true);
                }
            };
            var opts = $.extend(depth || true, {}, defaults, options);

            AjaxRequest.doRequest("", ctx + "/commons/common!getBusiness.action", param, function (backData) {
                opts.json = backData;
                $(target).yhDropDown(opts);
            });

        },
        /**
         * 加载督办人员信息
         * @param target
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadSuperviseOrg: function (target, hiddenId, param, options, zIndex) {
            yh.ui.loadDropTree(target, hiddenId, ctx + "/superviseorder/superviseOrder!getSuperviseOrg.action", param, options, zIndex);
        },
         loadSuperviseQueryOrg: function (target, hiddenId, param, options, zIndex) {
            yh.ui.loadDropTree(target, hiddenId, ctx + "/superviseorder/superviseOrder!getSuperviseQueryOrg.action", param, options, zIndex);
        },
        /**
         * 加载机构树
         * @param target
         * @param url
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadOrgTree: function (target, hiddenId, url, param, options, zIndex, depth) {
            var defaults = {
                zIndex: zIndex || "",
                hiddenId: hiddenId || "hiddenId",
                selectParent: true,
                json: "",
                checkbox: true,
                post: "id",
                showPath: true,
                createdTree: function (e, tree) {
                    //  tree.expandNode(tree.getNodes()[0], true);
                    if (tree.getNodes()[0].CORP_CODE == undefined || tree.getNodes()[0].CORP_CODE == '') {
                        $(target).val(tree.getNodes()[0].name);
                        $('#' + hiddenId).val(tree.getNodes()[0].id);
                        $('#cityId').val('440');
                        $('#orgLevel').val('2');
                    }
                    else {
                        if (param && param.flag == 'true') {
                            $(target).val(tree.getNodes()[0].name);
                            $('#' + hiddenId).val(tree.getNodes()[0].id);
                            $('#cityId').val(tree.getNodes()[0].CORP_CODE);
                            $('#substId').val(tree.getNodes()[0].SUBST_CODE);
                            $('#branchId').val(tree.getNodes()[0].BRANCH_CODE);
                            $('#orgLevel').val(tree.getNodes()[0].ORG_LEVEL);
                        }
                    }

                },
                onClick: function (e, tree) {
                    if (tree.node.CORP_CODE != undefined) {
                        $('#cityId').val(tree.node.CORP_CODE);
                    }
                    else {
                        $('#cityId').val('440');
                    }
                    if (tree.node.SUBST_CODE != undefined) {
                        $('#substId').val(tree.node.SUBST_CODE);
                    }
                    else {
                        $('#substId').val("");
                    }
                    if (tree.node.BRANCH_CODE != undefined) {
                        $('#branchId').val(tree.node.BRANCH_CODE);
                    }
                    else {
                        $('#branchId').val("");
                    }
                    $('#orgLevel').val(tree.node.ORG_LEVEL);
                }
            };

            if ($.yhui.isIE67) {
                defaults.width = 150;
                defaults.height = 200;
            }

            var opts = $.extend(depth || true, {}, defaults, options);
            AjaxRequest.doRequest("", url, param, function (backData) {
                opts.json = backData;
                $(target).yhDropDown(opts);
            });
        },
        /**
         * 加载申告地市
         * @param target
         * @param hiddenId
         * @param dic
         * @param options
         * @param zIndex
         */
        loadCityTree: function (target, hiddenId, url, dic, options, zIndex, depth) {
            //请求参数
            var params = {
                enumcode: dic
            };

            //默认参数
            var defaults = {
                zIndex: zIndex || "",
                hiddenId: hiddenId || "hiddenId",
                url: url,
                postData: params,
                checkbox: true,
                noChild: true,
                selectAll: true,
                post: "id",
                createdTree: function (e, tree) {
                    $(target).val(tree.getNodes()[1].name);
                    $('#' + hiddenId).val(tree.getNodes()[1].id);
                },
                onClick: function (e, tree) {
                    if (tree.node.id != undefined) {
                        $('#cityId').val(tree.node.id);
                    }
                }
            };

            if ($.yhui.isIE67) {
                defaults.width = 150;
                defaults.height = 100;
            }

            var opts = $.extend(depth || true, {}, defaults, options);
            $(target).yhDropDown(opts);
        },
        /**
         * 加载产品树
         * @param target
         * @param url
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadProduce: function (target, hiddenId, url, param, options, zIndex) {
            if(url == "null"){
                yh.ui.loadDropTree(target, hiddenId, "", param, options, zIndex);
            }else{
                yh.ui.loadDropTree(target, hiddenId, url || ctx + "/commons/common!getProduce4Drop.action", param, options, zIndex);
            }
        },
        /**
         * 加载督办下拉产品树
         * @param target
         * @param url
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadSuperviseProduce: function (target, hiddenId, url, param, options, zIndex) {
            if(url == "null"){
                yh.ui.loadDropTree(target, hiddenId, ctx + "/commons/common!getSuperviseProduce.action", param, options, zIndex);
            }
        },
        /**
         * 加载KPI下拉树
         * @param target
         * @param url
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadSuperviseKpi: function (target, hiddenId, url, param, options, zIndex) {
            if(url == "null"){
                yh.ui.loadDropTree(target, hiddenId, ctx + "/commons/common!getSuperviseKpi.action", param, options, zIndex);
            }
        },
         /**
         * 加载产品经理下拉树
         * @param target
         * @param url
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadSuperviseStaffPM: function (target, hiddenId, url, param, options, zIndex) {
            if(url == "null"){
                yh.ui.loadDropTree(target, hiddenId, ctx + "/commons/common!getSuperviseStaffPM.action", param, options, zIndex);
            }
        },
        /**
         * 数据字典（静态加载）
         * @param target
         * @param hiddenId
         * @param dic
         * @param options
         * @param zIndex
         */
        loadDefaultDicItem: function (target, hiddenId, backData, options, zIndex, depth) {
            //默认参数
            var defaults = {
                zIndex: zIndex || "",
                hiddenId: hiddenId || "hiddenId",
                json: backData,
                checkbox: true,
                noChild: true,
                selectAll: true,
                post: "id"
            };

            if ($.yhui.isIE67) {
                defaults.width = 150;
                defaults.height = 100;
            }

            var opts = $.extend(depth || true, {}, defaults, options);
            $(target).yhDropDown(opts);
        },
        /**********************************系统、系统环节、环节状态  联动***********************************************/
        /**
         * 加载系统
         * @param target
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadSystem: function (target, hiddenId, dic, nodeUrl, options, zIndex, depth) {
            //请求参数
            var params = {
                enumcode: dic
            };

            //默认参数
            var defaults = {
                zIndex: zIndex || "",
                hiddenId: hiddenId || "hiddenId",
                url: ctx + "/commons/common!getEnum.action",
                postData: params,
                checkbox: true,
                noChild: true,
                selectAll: true,
                post: "id",
                onClick: function (e, tree) {
                    var param = {
                        systemId: tree.node.id,
                        systemName: tree.node.name,
                        pageFlag: 'linkTime'

                    };
                    yh.ui.loadNode('#stepName', 'stepId', nodeUrl, param, options, zIndex);
                    $('#stepName').val('');
                    $('#stepId').val('');
                    $('#linkTypeName').val('');
                    $('#linkTypeId').val('');
                }
            };

            if ($.yhui.isIE67) {
                defaults.width = 150;
                defaults.height = 100;
            }

            var opts = $.extend(depth || true, {}, defaults, options);
            $(target).yhDropDown(opts);
        },
        /**
         * 加载系统环节
         * @param target
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadNode: function (target, hiddenId, url, param, options, zIndex, depth) {
            AjaxRequest.doRequest('', url, param, function (backData) {
                //默认参数
                var defaults = {
                    zIndex: zIndex || "",
                    hiddenId: hiddenId || "hiddenId",
                    json: backData,
                    checkbox: true,
                    noChild: true,
                    selectAll: true,
                    post: "id",
                    onClick: function (e, tree) {
                        if (param.systemName == "CRM" || param.systemName == "服务开通系统") {
                            if (tree.node.nodeLevel == '1') {
                                yh.ui.loadNodeState('#nodeStateName', 'nodeStateId', "PM_NODESTATE", null, 1700);
                            }
                            else {
                                yh.ui.loadNodeState('#nodeStateName', 'nodeStateId', "PM_SMALLNODESTATE", null, 1700);
                            }
                        }
                    }
                };
                if ($.yhui.isIE67) {
                    defaults.width = 150;
                    defaults.height = 100;
                }

                var opts = $.extend(depth || true, {}, defaults, options);
                $(target).yhDropDown(opts);

            });
        },
        /**
         * 加载监测类型
         * @param target
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadNodeType: function (target, hiddenId, dic, nodeUrl, options, zIndex, depth) {
            //请求参数
            var params = {
                enumcode: dic
            };

            //默认参数
            var defaults = {
                zIndex: zIndex || "",
                hiddenId: hiddenId || "hiddenId",
                url: ctx + "/commons/common!getEnum.action",
                postData: params,
                checkbox: true,
                noChild: true,
                selectAll: true,
                post: "id",
                onClick: function (e, tree) {
                    var systemId = $('#systemId').val();
                    var systemName = $('#systemName').val();
                    if (systemId == '') {
                        alert("请先选择系统！");
                        $('#linkTypeName').val('');
                        $('#linkTypeId').val('');
                        return false;
                    }
                    var param = {
                        systemId: systemId,
                        systemName: systemName,
                        nodeTypeId: tree.node.id,
                        nodeTypeName: tree.node.name,
                        pageFlag: 'linkTime'

                    };
                    $('#stepName').val('');
                    $('#stepId').val('');
                    yh.ui.loadNode('#stepName', 'stepId', nodeUrl, param, options, zIndex);
                }
            };

            if ($.yhui.isIE67) {
                defaults.width = 150;
                defaults.height = 100;
            }

            var opts = $.extend(depth || true, {}, defaults, options);
            $(target).yhDropDown(opts);
        },
        /**
         * 加载环节状态
         * @param target
         * @param hiddenId
         * @param param
         * @param options
         * @param zIndex
         */
        loadNodeState: function (target, hiddenId, dic, options, zIndex, depth) {
            //请求参数
            var params = {
                enumcode: dic
            };
            AjaxRequest.doRequest('', ctx + "/commons/common!getEnum.action", params, function (backData) {
                //默认参数
                var defaults = {
                    zIndex: zIndex || "",
                    hiddenId: hiddenId || "hiddenId",
                    json: backData,
                    checkbox: true,
                    noChild: true,
                    selectAll: true,
                    post: "id"
                };

                if ($.yhui.isIE67) {
                    defaults.width = 150;
                    defaults.height = 100;
                }

                var opts = $.extend(depth || true, {}, defaults, options);
                $(target).yhDropDown(opts);
            });
        }

    };
    /*************************************************昱辉UI结束**********************************************/
    /*************************************************EasyUI开始**********************************************/
    /**Object对象转换成字符串*/
    function obj2str(o){ 
	var r = []; 
	if(typeof o == "object"){ 
	if(!o.sort){ 
	for(var i in o) 
	r.push(i+":'"+obj2str(o[i])+"'"); 
	if(!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){ 
	r.push("toString:"+o.toString.toString()); 
	} 
	r="{"+r.join()+"}"
	}else{ 
	for(var i =0;i<o.length;i++) 
	r.push(obj2str(o[i])) 
	r="["+r.join()+"]"
	} 
	return r; 
	} 
	return o.toString(); 
	}
    
    
    yh.easyui = {

        /**
         * 创建datagrid
         * @param {Object} target
         * @param {Object} options
         */
        datagrid: function (target, options, depth, tree) {
            var defaults = {
                fitColumns: true,
                singleSelect: true,
                rownumbers: true,
                checkOnSelect: false,
                selectOnCheck: false,
                pagination: true,
                pageSize: 20,
                pageList: [20, 40, 60, 80, 100, 200]
            };
            var opts = $.extend(defaults, options), p;
            if (tree) {
                $(target).treegrid(opts).treegrid("keyCtr");
                p = $(target).treegrid("getPager");
            } else {
               if(opts.selectTag == 1){
             //   console.info('button select');
                var  queryParam = obj2str(opts.queryParams);
                opts.queryParams = '';
                $(target).datagrid(opts).datagrid('load',eval("(" + queryParam + ")")).datagrid("keyCtr");
                p = $(target).datagrid("getPager");
               }else{
             //   console.info('page select');
                $(target).datagrid(opts).datagrid("keyCtr");
                p = $(target).datagrid("getPager");
               }
            } 
            //设置分页控件
            $(p).pagination({
                pageNumber: 1, //当前页，默认1
                showPageList: true, //是否显示选择记录数下拉框 ,默认true
                beforePageText: "第", //页数文本框前显示的汉字
                afterPageText: "页    共 {pages} 页",
                displayMsg: "当前显示第 {from} - {to} 条记录   共 {total} 条记录",
                showRefresh: false //不显示刷新按钮，默认true
            });
        }
    };
    /*************************************************easyui扩展***********************************************/
    /**
     * 上下键控制datagrid选择数据
     */
    $.extend($.fn.datagrid.methods, {
        keyCtr: function (jq) {
            return jq.each(function () {
                var grid = $(this);
                grid.datagrid("getPanel").panel("panel").attr("tabindex", 1).bind("keydown", function (e) {
                    switch (e.keyCode) {
                        case 38: // up
                            var selected = grid.datagrid("getSelected");
                            if (selected) {
                                var index = grid.datagrid("getRowIndex", selected);
                                grid.datagrid("selectRow", index - 1);
                            }
                            else {
                                var rows = grid.datagrid("getRows");
                                grid.datagrid('selectRow', rows.length - 1);
                            }
                            break;
                        case 40: // down
                            var selected = grid.datagrid("getSelected");
                            if (selected) {
                                var index = grid.datagrid("getRowIndex", selected);
                                grid.datagrid("selectRow", index + 1);
                            }
                            else {
                                grid.datagrid("selectRow", 0);
                            }
                            break;
                    }
                });
            });
        }
    });

    /**
     * datagrid 默认选中复选框
     * @param {Object} jq
     */
    $.extend($.fn.datagrid.methods, {
        checkRecord: function (jq, ids) {
            return jq.each(function () {
                var grid = $(this);
                for (var i = 0; i < ids.length; i++) {
                    var index = grid.datagrid('getRowIndex', ids[i]);
                    grid.datagrid('checkRow', index);
                }
            });
        }
    });

    /**
     * 扩展表格列对齐属性
     * 增加自定义一个列字段属性:headalign
     * 原始align属性针对数据有效, headalign针对列名有效
     */
    $.extend($.fn.datagrid.defaults, {
        onLoadSuccess: function () {
            var target = $(this);
            var opts = $.data(this, "datagrid").options;
            var panel = $(this).datagrid("getPanel");
            //获取列
            var fields = $(this).datagrid('getColumnFields', false);
            //datagrid头部 table 的第一个tr 的td们，即columns的集合
            var headerTds = panel.find(".datagrid-view2 .datagrid-header .datagrid-header-inner table tr:first-child").children();
            //重新设置列表头的对齐方式
            headerTds.each(function (i, obj) {
                var col = target.datagrid('getColumnOption', fields[i]);
                if (!col.hidden && !col.checkbox) {
                    var headalign = col.headalign || col.align || 'left';
                    $("div:first-child", obj).css("text-align", headalign);
                }
            })
        }
    });

    /*************************************************EasyUI结束**********************************************/
})(jQuery);
