/**
 * 公共模块，提供公用方法等
 */
define(function(){
    function set_OnComplete(fn) {
        $.parser.onComplete = fn;
    }

    function jsonFilter(data){
        //判断参数值是否为对象
        if(!$.isPlainObject(data)){
            $.messager.alert('提示', '参数错误');
            return null;
        }
        if(data.result === 'SUCCESS'){
            return data.data;
        }
        $.messager.alert('提示', data.message);
        return null;
    }

    function data_transform(data){
        var transform_data = jsonFilter(data);
        return transform_data !== null ? transform_data : $.parseJSON('{"total":0,"rows":[]}');
    }

    function init_Grid(id, options){
        var setting = {
            url: 'url',
            title: '标题',
            pagination:true,
            border: false,
            fit: true,
            rownumbers:true,
            singleSelect:true,
            columns:[[]],
            loadFilter: data_transform
        };

        $.extend(setting, options);

        return $('#' + id).datagrid(setting);
    }

    return {
        /*定义解析页面之后的回调函数*/
        set_OnComplete: set_OnComplete,
        jsonFilter: jsonFilter,
        data_transform: data_transform,
        init_Grid: init_Grid
    }
});