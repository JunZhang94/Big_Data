/********************创建一个属性动态配置的窗口*********************************************************/
/**
 * config：
rootOrg:int 
根节点开始机构代号 比如 1，根节点从1开始，如果为空的化从session中得到。
treedepth：int 
机构树的深度 为1的化就显示当前机构，不显示下一级机构，为0的化显示所有的机构
checkModel:Boolean   
复选框模式： 为true的时候表示是复选框模式，默认不带复选框
oneCheckModel:Boolean  
单选模式：true的时候只选一个，默认多选模式。
viewUserGroup:Boolean  
显示用户客户组，默认不显示。
viewCarGroup:Boolean  
显示车队用户组，默认不显示。
selectType：模式：‘机构客户车队’，‘000’
选择的时候只选择客户组或者之选择车队或者机构。
如：只选机构‘100’，只选客户‘010’ ，只选车队‘001’，全选‘111’ 客户和车队‘011’,默认‘111’,
*callbackFunction 回调函数 用于向外传递值 
*/
var treeConfigWindow;
function creatTreeConfigWindow(config)
{   if(!config.rootOrg)config.rootOrg=0;
    if(!config.treedepth)config.treedepth=0;
    if(!config.checkModel)config.checkModel=false;
    if(!config.oneCheckModel)config.oneCheckModel=false;
    if(!config.viewUserGroup)config.viewUserGroup=false;
    if(!config.viewCarGroup)config.viewCarGroup=false;  
    if(!config.selectType)config.selectType='111';
    //js单例模式的应用 只允许一个窗口的存在
    if(treeConfigWindow){           
            treeConfigWindow.show();
            return;
            }  
            
    var Tree = Ext.tree;
    var orghasloadNodeHashTable=new Hashtable();
    var userhasloadNodeHashTable=new Hashtable();
    var carhasloadNodeHashTable=new Hashtable();
    var tree = new Tree.TreePanel({ 
         autoScroll:true,   
         region: 'center', 
         height:'100%',
         animate:false,
         border :false,
         buttons :[
         {
          text:'确定',
          handler:function(){   
            var node=new Array();
                node=ObjForReturnInButton();
            try{
                if(!node[0].text){} 
            }catch(e){
                alertMsg("请选择节点");
                return;
            }           
            
            config.callbackFunction(node);
            treeConfigWindow.hide();
            }
          }
          ]
          });
    var root;       
    //如果输入了机构代号，那么直接指定根节点
    if(config.rootOrg!=0){
        publicInterfaceManage.getOrgMsgNOde(config.rootOrg,function(value){         
            if(value!=null){
                //当选择了复选框模式的时候
                if(config.checkModel) {
                    root = new Tree.TreeNode({ 
                    id:value.n_jgdh,     
                    expanded:true,  
                    checked:false, 
                    attributes:[isDept=true,isKHZ=false,isCD=false],    
                    text: value.c_jgmc,  
                    icon:"../../../theme/default/images/tree/icondept.gif" 
                        }); 
                        //当选择了显示机构的时候或者树的深度选了1的时候，这里显示本机构和本机构下一级机构
                        if(config.treedepth!=1){
                            publicInterfaceManage.getJgxxList(value.n_jgdh,function(va){                                                
                            for(var i=0;i<va.length;i=i+1){ 
                                 apendOrgNodeWithCheckBox(root,va[i]);                                              
                                }
                            });
                        }
                            publicInterfaceManage.getGroupByOrgCode(value.n_jgdh,function(khzVal){                      
                                for(var i=0;i<khzVal.length;i++){   
                                    //当需要显示客户，并且客户组类型为客户的时候                             
                                    if(config.viewUserGroup==true&&khzVal[i].n_khzlx==1){
                                        apendUserNodeWithCheckBox(root,khzVal[i]);                                  
                                        }
                                        //当需要显示车队，并且客户组类型为车队的时候
                                        if(config.viewCarGroup==true&&khzVal[i].n_khzlx==2){
                                            apendCarNodeWithCheckBox(root,khzVal[i]);                                           
                                        }
                                    }
                                })  
                        //不带复选框     
                    }else{
                        root = new Tree.TreeNode({ 
                        id:value.n_jgdh,     
                        expanded:true,                          
                        text: value.c_jgmc,  
                        attributes:[isDept=true,isKHZ=false,isCD=false],  
                        icon:"../../../theme/default/images/tree/icondept.gif" 
                        }); 
                        //当选择了显示机构的时候或者树的深度选了1的时候，这里显示本机构和本机构下一级机构
                        if(config.treedepth!=1){
                            publicInterfaceManage.getJgxxList(value.n_jgdh,function(va1){
                            for(var i=0;i<va1.length;i=i+1){  
                                apendOrgNodeWithoutCheckBox(root,va1[i]);                   
                                }
                            });
                        }
                        publicInterfaceManage.getGroupByOrgCode(value.n_jgdh,function(khzVal){                      
                                for(var i=0;i<khzVal.length;i++){   
                                    //当需要显示客户，并且客户组类型为客户的时候                             
                                    if(config.viewUserGroup==true&&khzVal[i].n_khzlx==1){
                                        apendUserNodeWithoutCheckBox(root,khzVal[i]);                                       
                                        }
                                        //当需要显示车队，并且客户组类型为车队的时候
                                        if(config.viewCarGroup==true&&khzVal[i].n_khzlx==2){
                                            apendCarNodeWithoutCheckBox(root,khzVal[i]);
                                        }
                                    }
                                })      
                    }
                tree.setRootNode(root);
                _init();
                }       
        });
    }
    else{       
        //将当前的机构设置为树的根节点
        publicInterfaceManage.getTreeRootNode(function(value){
            if(value!=null){                
                //当选择了复选框模式的时候
                if(config.checkModel) {
                    root = new Tree.TreeNode({ 
                    id:value.n_jgdh,     
                    expanded:true,  
                    checked:false, 
                    attributes:[isDept=true,isKHZ=false,isCD=false],    
                    text: value.c_jgmc,  
                    icon:"../../../theme/default/images/tree/icondept.gif" 
                        }); 
                        //当选择了显示机构的时候或者树的深度选了1的时候，这里显示本机构和本机构下一级机构                      
                        if(config.treedepth!=1){
                            publicInterfaceManage.getJgxxList(value.n_jgdh,function(va2){                               
                            for(var i=0;i<va2.length;i=i+1){ 
                                apendOrgNodeWithCheckBox(root,va2[i]);                                              
                                }
                            });
                        }
                        publicInterfaceManage.getGroupByOrgCode(value.n_jgdh,function(khzVal){                      
                                for(var i=0;i<khzVal.length;i++){   
                                    //当需要显示客户，并且客户组类型为客户的时候                             
                                    if(config.viewUserGroup==true&&khzVal[i].n_khzlx==1){
                                        apendUserNodeWithCheckBox(root,khzVal[i]);                                      
                                        }
                                        //当需要显示车队，并且客户组类型为车队的时候
                                        if(config.viewCarGroup==true&&khzVal[i].n_khzlx==2){
                                            apendCarNodeWithCheckBox(root,khzVal[i]);
                                        }
                                    }
                                })      
                    //当不带复选框的时候
                    }else{
                        root = new Tree.TreeNode({ 
                        id:value.n_jgdh,     
                        expanded:true,                          
                        text: value.c_jgmc,  
                        attributes:[isDept=true,isKHZ=false,isCD=false],  
                        icon:"../../../theme/default/images/tree/icondept.gif" 
                        }); 
                        //当选择了显示机构的时候或者树的深度选了1的时候，这里显示本机构和本机构下一级机构
                        if(config.treedepth!=1){
                            publicInterfaceManage.getJgxxList(value.n_jgdh,function(va3){
                            for(var i=0;i<va3.length;i=i+1){
                                apendOrgNodeWithoutCheckBox(root,va3[i]);  
                                }
                            });
                        }
                        publicInterfaceManage.getGroupByOrgCode(value.n_jgdh,function(khzVal){                      
                                for(var i=0;i<khzVal.length;i++){   
                                    //当需要显示客户，并且客户组类型为客户的时候                             
                                    if(config.viewUserGroup==true&&khzVal[i].n_khzlx==1){
                                        apendUserNodeWithoutCheckBox(root,khzVal[i]);
                                        }
                                        //当需要显示车队，并且客户组类型为车队的时候
                                        if(config.viewCarGroup==true&&khzVal[i].n_khzlx==2){
                                            apendCarNodeWithoutCheckBox(root,khzVal[i])
                                        }
                                    }
                                })          
                    }
                    //hashtable中添加root节点
                    if(!orghasloadNodeHashTable.contains(root.id)){                     
                        orghasloadNodeHashTable.add(root.id,root); 
                     }
                tree.setRootNode(root);
                _init();
                }
        });
    }

    function _init(){       
        tree.on("dblclick",apendNodeAfterClick);
        tree.on('checkchange', function(node, checked) { 
            checkChangeAction(node, checked);
        })
    treeConfigWindow=new Ext.Window({
                    title: '单位选择',
                    layout: 'border',
                    closable:true,
                    width:300,
                    height:400,
                    border:false,
                    plain:true,
                    closeAction:'hide',
                    items: [ tree ]
                });
     treeConfigWindow.show();
    }
    //------------------------------------------------------------------------
    
    //添加一个带复选框的机构节点
    function apendOrgNodeWithCheckBox(node,Val_Org){
        if(!orghasloadNodeHashTable.contains(Val_Org.n_jgdh)){              
            var newnode = new Tree.TreeNode({ 
                id:Val_Org.n_jgdh,   
                expanded:true,
                checked:false, 
                attributes:[isDept=true,isKHZ=false,isCD=false], 
                text:Val_Org.c_jgmc,  
                icon:"../../../theme/default/images/tree/icondept.gif" 
                });
            node.appendChild(newnode);  
            orghasloadNodeHashTable.add(newnode.id,newnode); 
            }
    }
    //添加一个不带复选框的机构节点
    function apendOrgNodeWithoutCheckBox(node,Val_Org){
        if(!orghasloadNodeHashTable.contains(Val_Org.n_jgdh)){
            var newnode = new Tree.TreeNode({ 
                id:Val_Org.n_jgdh,   
                expanded:true,              
                attributes:[isDept=true,isKHZ=false,isCD=false], 
                text:Val_Org.c_jgmc,  
                icon:"../../../theme/default/images/tree/icondept.gif" 
                });
            node.appendChild(newnode);  
            orghasloadNodeHashTable.add(newnode.id,newnode); 
        }
    }
    
    //添加一个带复选框的客户节点
    function apendUserNodeWithCheckBox(node,Val_khz){
        if(!userhasloadNodeHashTable.contains(Val_khz.n_khzdh)){
            var newnode=new Tree.TreeNode({
                id:Val_khz.n_khzdh,
                expanded:true,
                checked:false, 
                attributes:[isDept=false,isKHZ=true,isCD=false], 
                text:Val_khz.c_khzxm,
                icon:"../../../theme/default/images/tree/kehu.gif"
                });
            node.appendChild(newnode);
            userhasloadNodeHashTable.add(newnode.id,newnode);
        }
    }
    //添加一个不带复选框的客户节点
    function apendUserNodeWithoutCheckBox(node,Val_khz){
        if(!userhasloadNodeHashTable.contains(Val_khz.n_khzdh)){
            var newnode=new Tree.TreeNode({
                id:Val_khz.n_khzdh,
                expanded:true,          
                attributes:[isDept=false,isKHZ=true,isCD=false], 
                text:Val_khz.c_khzxm,
                icon:"../../../theme/default/images/tree/kehu.gif"
                });
            node.appendChild(newnode);
            userhasloadNodeHashTable.add(newnode.id,newnode);
            }
    }
    //添加一个带复选框的车队节点
    function apendCarNodeWithCheckBox(node,Val_khz){
        if(!carhasloadNodeHashTable.contains(Val_khz.n_khzdh)){
            var newnode=new Tree.TreeNode({
                id:Val_khz.n_khzdh,
                expanded:true,
                checked:false, 
                attributes:[isDept=false,isKHZ=false,isCD=true], 
                text:Val_khz.c_khzxm,
                icon:"../../../theme/default/images/tree/chedui.gif"
                });
            node.appendChild(newnode);
            carhasloadNodeHashTable.add(newnode.id,newnode);
            }
    }
    //添加一个不带复选框的车队节点
    function apendCarNodeWithoutCheckBox(node,Val_khz){
        if(!carhasloadNodeHashTable.contains(Val_khz.n_khzdh)){
            var newnode=new Tree.TreeNode({
                id:Val_khz.n_khzdh,
                expanded:true,          
                attributes:[isDept=false,isKHZ=false,isCD=true], 
                text:Val_khz.c_khzxm,
                icon:"../../../theme/default/images/tree/chedui.gif"
                });
            node.appendChild(newnode);
            carhasloadNodeHashTable.add(newnode.id,newnode);
            }
    }
    
    //树节点点击拓展事件
    function apendNodeAfterClick(node){     
        if(config.checkModel)node.getUI().checkbox.checked=false;       
        //当点击的节点不为机构的时候，直接拓展节点      
        if(!node.attributes.attributes[0]){
            publicInterfaceManage.getGroupForFarther(node.id,function(khzVal){                      
                for(var i=0;i<khzVal.length;i++){   
                //当需要显示客户，并且客户组类型为客户的时候                             
                if(config.viewUserGroup==true&&khzVal[i].n_khzlx==1){
                    if(config.checkModel){
                        apendUserNodeWithCheckBox(node,khzVal[i]);
                    }
                    else{
                        apendUserNodeWithoutCheckBox(node,khzVal[i]);
                    }                                   
                   }
                 //当需要显示车队，并且客户组类型为车队的时候
                 if(config.viewCarGroup==true&&khzVal[i].n_khzlx==2){
                    if(config.checkModel){
                            apendCarNodeWithCheckBox(node,khzVal[i]);
                        }
                    else    apendCarNodeWithoutCheckBox(node,khzVal[i]);                                    
                    }
                  }
            })  
        }
        //当节点类型为机构的时候
        else{
            //当treedepth=1的时候，只显示本机构，不显示下级机构
            if(config.treedepth==1)return;
            //当点击节点的深度和treedepth差一的时候，不显示当前节点的下一级机构
            if(config.treedepth==(node.getDepth()+1))return;
            publicInterfaceManage.getJgxxList(node.id,function(va1){
                for(var i=0;i<va1.length;i=i+1){ 
                    if(config.checkModel){
                        apendOrgNodeWithCheckBox(root,va1[i]);  
                    }else 
                        apendOrgNodeWithoutCheckBox(root,va1[i]);   
                 }
               publicInterfaceManage.getGroupByOrgCode(node.id,function(khzVal){                        
                    for(var i=0;i<khzVal.length;i++){   
                    //当需要显示客户，并且客户组类型为客户的时候                             
                    if(config.viewUserGroup==true&&khzVal[i].n_khzlx==1){
                        if(config.checkModel)
                            apendUserNodeWithCheckBox(node,khzVal[i]);
                        else
                            apendUserNodeWithoutCheckBox(node,khzVal[i]);                                   
                    }
                    //当需要显示车队，并且客户组类型为车队的时候
                    if(config.viewCarGroup==true&&khzVal[i].n_khzlx==2){
                        if(config.checkModel)
                            apendCarNodeWithCheckBox(node,khzVal[i]);
                        else
                            apendCarNodeWithoutCheckBox(node,khzVal[i]);
                        }
                    }
                  })             
             });
        }
    }
    //节点复选框改变事件
    function checkChangeAction(node, checked){
        //当节点处于被选中状态的时候
        if(node.getUI().checkbox.checked==true){
            //单选模式的时候
            if(config.oneCheckModel){
                clearChildNodeChecked(root);
                root.getUI().checkbox.checked=false;
                //当只选择机构且节点类型为机构的时候
                if(config.selectType.substring(0,1)==1&&node.attributes.attributes[0]){
                    node.getUI().checkbox.checked=true;
                    return;
                }
                //当只选择机构且节点类型为客户的时候
                if(config.selectType.substring(1,2)==1&&node.attributes.attributes[1]){
                    node.getUI().checkbox.checked=true;
                    return;
                }
                //当只选择机构且节点类型为车队的时候
                if(config.selectType.substring(2,3)==1&&node.attributes.attributes[2]){
                    node.getUI().checkbox.checked=true;
                    return;
                }
            }
            //当不属于单选模式的时候
            else{
                //当节点类型为机构的时候
                if(node.attributes.attributes[0]){
                    //当机构为可选类型的时候，选中此节点，否则不予选中
                    if(config.selectType.substring(0,1)==1){
                        node.getUI().checkbox.checked=true;
                    }else{
                        node.getUI().checkbox.checked=false;
                    }
                    //选中子节点
                    mackChildNodesChecked(node);    
                }
                //当节点类型为客户的时候
                if(node.attributes.attributes[1]){
                    //当客户为可选类型的时候，选中此节点，否则不予选中
                    if(config.selectType.substring(1,2)==1){
                        node.getUI().checkbox.checked=true;
                    }else{
                        node.getUI().checkbox.checked=false;
                    }
                    //选中子节点
                    mackChildNodesChecked(node);
                }
                //当节点类型为车队的时候
                if(node.attributes.attributes[2]){
                    //当车队为可选类型的时候，选中此节点，否则不予选中
                    if(config.selectType.substring(2,3)==1){
                        node.getUI().checkbox.checked=true;
                    }else{
                        node.getUI().checkbox.checked=false;
                    }
                    //选中子节点
                    mackChildNodesChecked(node);
                }
            }
        }
        //当节点被取消选中的时候
        else{
            node.getUI().checkbox.checked=false;
            clearChildNodeChecked(node);
        }
    }
    //清空所有复选框
    function clearChildNodeChecked(node){
        if(node.childNodes.length!=0){
            for(var i=0;i<node.childNodes.length;i++){
                node.childNodes[i].getUI().checkbox.checked=false;
                clearChildNodeChecked(node.childNodes[i]);
            }
        }
    }
    //根据条件选中所有子节点
    function mackChildNodesChecked(node){
        for(var i=0;i<node.childNodes.length;i++){
            //当子节点为机构的时候直接选中
            if(config.selectType.substring(0,1)==1&&node.childNodes[i].attributes.attributes[0]){
                node.childNodes[i].getUI().checkbox.checked=true;
            }
            //当子节点为客户并且可以选择客户的时候，客户也被选中
            if(config.selectType.substring(1,2)==1&&node.childNodes[i].attributes.attributes[1]){
                node.childNodes[i].getUI().checkbox.checked=true;
            }
            //当子节点为车队并且可以选择车队的时候，车队也被选中
            if(config.selectType.substring(2,3)==1&&node.childNodes[i].attributes.attributes[2]){
                node.childNodes[i].getUI().checkbox.checked=true;
            }
        }           
    }
    //单击确定以后的事件
    function ObjForReturnInButton(){
        var returnArr=new Array();
        //当不为复选框模式的时候
        if(!config.checkModel){         
            var selectNode=traversalNodeHashTable();            
            returnArr.push(selectNode);         
        }
        else{
            for(var x in orghasloadNodeHashTable._hash)
             {          
                if(orghasloadNodeHashTable._hash[x].getUI().checkbox.checked==true)                 
                    returnArr.push(orghasloadNodeHashTable._hash[x]);
             }
             for(var x in userhasloadNodeHashTable._hash)
             {
                if(userhasloadNodeHashTable._hash[x].getUI().checkbox.checked==true) 
                    returnArr.push(userhasloadNodeHashTable._hash[x]);
             }
             for(var x in carhasloadNodeHashTable._hash)
             {
                if(carhasloadNodeHashTable._hash[x].getUI().checkbox.checked==true) 
                    returnArr.push(carhasloadNodeHashTable._hash[x]);
             }      
        }   
        return returnArr;
    }   
    //通过hashTable 的方式遍历所有的树节点
    function traversalNodeHashTable(){          
         for(var x in orghasloadNodeHashTable._hash)
         {          
            if(orghasloadNodeHashTable._hash[x].isSelected()) 
                return orghasloadNodeHashTable._hash[x];
         }
         for(var x in userhasloadNodeHashTable._hash)
         {
            if(userhasloadNodeHashTable._hash[x].isSelected()) 
                return userhasloadNodeHashTable._hash[x];
         }
         for(var x in carhasloadNodeHashTable._hash)
         {
            if(carhasloadNodeHashTable._hash[x].isSelected()) 
                return carhasloadNodeHashTable._hash[x];
         }       
    }   
}