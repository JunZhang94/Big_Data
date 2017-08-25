/**
 * js路径配置
 */
require.config({
    //基目录
    baseUrl:'webLib',
    paths: {
        //jquery核心库路径
        jquery:'jquery/jquery-1.11.2',
        //easyui核心库路径
        easyui:'jquery-easyui-1.4.1/jquery.easyui.min',
        //easyui中文包
        easyui_zh_cn:'jquery-easyui-1.4.1/locale/easyui-lang-zh_CN',
        comm: '../js/comm/comm'
    },
    shim: {
        'easyui': {
            //依赖脚本
            deps: ['jquery']
        },
        'easyui_zh_cn': {
            //依赖脚本
            deps: ['easyui']
        }
    },
    waitSeconds: 0
});