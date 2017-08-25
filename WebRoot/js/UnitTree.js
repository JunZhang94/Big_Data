
buildUnitTree=function(){

   //定义根节点的Loader
//   var treeloader=new Tree.TreeLoader({dataUrl:'unit.do?m=unitTree'});

   //异步加载根节点
    var rootnode=new Ext.tree.AsyncTreeNode({
        id:'',
        text:'目录树根节点',
        expandable :true
                });
    
   var treepanel = new Ext.tree.TreePanel({
                //renderTo:"tree_div",//如果使用renderTo，则不能使用setRootNode()方法，需要在TreePanel中设置root属性。
                el:'unit_tree',        //填充区域
                rootVisible:true,     //隐藏根节点
                border:true,          //边框
                animate:false,         //动画效果
                autoScroll:true,      //自动滚动
                enableDD:false,       //拖拽节点     
                checkModel: 'cascade',   //对树的级联多选  
                onlyLeafCheckable: false,//对树所有结点都可选          
                containerScroll:true,
                rootVisible : false,    
                root: rootnode,
                loader:
                    new Ext.tree.TreeLoader({
                        dataUrl:"unit.do?m=unitTree",
                        baseAttrs: { uiProvider: Ext.tree.TreeCheckNodeUI }
                    })           
            });

   //设置根节点
 //  treepanel.setRootNode(rootnode);

   //响应事件，传递node参数
       treepanel.on('beforeload',
                function(node){
                   treepanel.loader.dataUrl='unit.do?m=unitTree&parentId='+node.id;    //定义子节点的Loader   
                });
    treepanel.on('beforeexpandnode',function(node){//展开时在gird加载对应的数据数据
            buildUnitGrid(node.id);
    });
    treepanel.on('beforecollapsenode',function(node){//当点击收起来的时候在grid加载上一层的数据
            buildUnitGrid(node.parentNode.id);        
    });
     treepanel.on("check",function(node,checked){alert(node.text+" = "+checked)}); //注册"check"事件  
     treepanel.on('checkchange', function(node, checked) {  
                      //Ext.MessageBox.alert(buildUnitGrid(node.id));
                        
                    node.expand();  
                     node.attributes.checked = checked;  
                     node.eachChild(function(child) {  
                         child.ui.toggleCheck(checked);  
                         child.attributes.checked = checked;  
                        child.fireEvent('checkchange', child, checked);  
                     });
                 });  
     treepanel.on('click',function(node){//单击树的一个节点 grid显示该节点的单位信息
         gridPanel.store.proxy=new Ext.data.HttpProxy({url:"unit.do?m=viewUnit&id="+node.id});
         gridPanel.store.load();
         gridPanel.render();
     });            
       treepanel.render();           
      treepanel.getRootNode().expand();

}