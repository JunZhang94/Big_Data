/**
 * 入口文件，加载js文件
 */
require(['js/config/config.js'], function(){
    /*setTimeout(function(){
        document.getElementById('startMask').style.backgroundColor = '#326B84';
        document.getElementById('startTips').innerHTML = '<span style="font-size:60px;">开始加载配置文件....</span>';
    }, 1000);*/
    //加载easyui
    require(['easyui_zh_cn'], function(){
        //加载公共库
        require(['comm'], function(comm){
            /*setTimeout(function(){
                document.getElementById('startMask').style.backgroundColor = '#80A4B3';
                $('#startTips').html('<span style="color:#0000ff;font-size:70px;">正在载入页面内容...</span>');
            }, 2000);*/
            //设置首页渲染完成之后的回调函数
            comm.set_OnComplete(function(){
                $('#second-nav-container .easyui-accordion').css('visibility', 'visible');
                /*setTimeout(function(){
                    document.getElementById('startMask').style.backgroundColor = '#303974';
                    $('#startTips').html('<span style="color:#ffffff;font-size:80px;">:-)&nbsp;&nbsp;即将进入系统..</span>');
                    setTimeout(function(){
                        $('#startTips').fadeOut();
                        $('#startMask').hide('slow');
                    }, 1500);
                }, 2500);*/
            });
            //解析页面
            $.parser.parse();
            $('#downInfo').on('click', function(){
            	$('#win').window('open')
            });

            //一二级导航联动
            $('.first-nav').on('click', function(){
                var $this = $(this),
                    title = $this.find('div').html(),
                    target = $this.attr('title'),
                    $second_nav_container = $('#second-nav-container');
                if($second_nav_container.attr('currentTarget') !== target){
                    $second_nav_container.find('.easyui-accordion').hide();
                    $second_nav_container.find('[title="'+ target +'"]').show();
                }
                $('#second-nav-container[title="'+ target +'"]').accordion('select', title);
                //去掉上一个的高亮样式
                var $last_li = $this.parents('ul').find('.first-nav-active').removeClass('first-nav-active'),
                    last_class = $last_li.find('div').attr('class');
                $last_li.find('div').removeClass().addClass(last_class.replace('-active', ''));
                //将当前点中的导航高亮
                $this.addClass('first-nav-active');
                var new_class = $this.find('div').removeClass('first-nav-over-text').attr('class') + '-active';
                $this.find('div').removeClass().addClass(new_class);
            }).hover(//一级导航鼠标滑过样式变化
                function(){
                    if(!$(this).hasClass('first-nav-active'))
                        $(this).find('div').addClass('first-nav-over-text');
                },
                function(){
                    $(this).find('div').removeClass('first-nav-over-text');
                }
            );

            //三级导航点击事件
            $('#second-nav-container').on('click', 'p', function(){
                var $this = $(this),
                    url = $this.attr('url'),
                    type = $this.attr('type'),
                    title = $this.attr('text'),
                    $main_tab = $('#main-tab');
                if($main_tab.tabs('getTab', title) === null){
                    if(type === 'iframe'){//如果是以iframe方式打开
                        $main_tab.tabs('add', {    
                            title: title,
                            fit: true,
                            content: '<iframe src="'+ url +'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>',
                            closable: true
                        });
                    }
                }else{
                    $main_tab.tabs('select', title)
                }
            }).on('mousemove', 'p', function(){
                $(this).css({'background': '#E0ECFF', 'color': '#000000'});
            }).on('mouseout', 'p', function(){
                $(this).css({'background': '#ffffff', 'color': '#0000ff'});
            });
        });
    });
});
