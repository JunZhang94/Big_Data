/******************************************
*昱辉树形下拉框
*@江源 2012 06 30
*使用时，请导入jQuery、jQuery UI、yhLibary以及改造后的z-Tree文件。
*******************************************/
(function( $, undefined ) {
	var num = 1, zIndex = 200, cacheDropDown = {}, document = window.document;

	function getSerial() {
		return num++;
	}	
	function getzIndex() {
		return zIndex--;
	}
	
	$.widget( "yhui.yhDropDown", {
		version: "1.12.1",
		options:{
			autocomplete: false,
			addSelect: true,
			checkbox: false,
			chkboxType: null,
			customContent: "请选择",
			datatype: "json",
			disable: false,
			guid: "id",
			height: false,
			hiddenId: "",
			idKey: "",
			inputWidth: false,     		//input的宽度
			json: null,
			linkage: false, 				//多选模式联动，这个参数必须设置为true。
			minLength: 1,
			noChild: false,
			pIdKey: "",
			post: "",
			postData: null,
			selectAll: false,
			selectParent: false,
			showButton: true,
			simpleData: false,
			showPath: false,
			singleParent: false, 		// 这个参数在checkbox为true时生效
			type: "post",
			url: "",
			width: false,				//下拉div的宽度
			zTreeSettings: null,
			//callback
			beforeClick: null,
			beforeCreatedTree: null,
			createdTree: null,
			dropHidden: null,
			onClick: null
		},
		
		_consts: {
			ID: {
				DROPUL: "yhDropTree_",
				DROPDIV:"yhDropDiv_",
				ALLINPUT:"dropDownSeleAll_"
			},
			CLASS: {
				DROPUL: "ztree dropTreeUl",
				DROPDIV: "dropTree",
				PARENTDIV: "yhWrapDrop",
				ALLDIV: "dropDownAll"
			},
			BTNSTRING: '<a class = "btn" href="javascript:void(0)"style="font-size:12px">' + 
							'<span class = "icon classHolder"></span>textHolder</a>'
		},

		_create: function() {
			this._initDP();
			this._bindEvent();
			this.options.disable && this.disable();
			cacheDropDown[ this._consts.ID.DROPDIV + this.serial ] = this;
		},
		
		_init: function() {
			var $con = this.dropDiv;
			if ( (this.dropUl || $con ) && this.options.height && this.options.height > 200 ) {
				$con.css( "maxHeight","none" ).height( this.options.height );	
			}
			
			if ( ( !this.options.json || !!this.options.postData ) && !!this.options.url.length ) {
				this._getData();
			} else {
				this._initTree( this.serial, this.options );
			}
			
		},
		
		_initDP: function() {
			var serial = this.serial = getSerial(),
				selectAll = ( this.options.checkbox && this.options.noChild && this.options.selectAll ) 
					? '<div class = "' + this._consts.CLASS.ALLDIV + '" ><input id = "' 
						+ this._consts.ID.ALLINPUT + serial + '" type="checkbox" /><label for="' 
						+ this._consts.ID.ALLINPUT + serial + '">全选</label></div>' 
					: '',
				self = this,
				opts = this.options;
			
			this.element.val("").removeClass("formText formUI").width( opts.inputWidth ? opts.inputWidth : 132 )
					.wrap('<div class = "' + self._consts.CLASS.PARENTDIV + '"></div>');
			
			this.parent = this.element.parent().width( this.element.width() + 18 );		
			
			this.arrow = $( '<a href="#" class = "dropClickArrow"></a>' ).appendTo( this.parent );

			if ( opts.post ) {
				this.hidden = $( '<input type = "hidden" name = "' + (opts.hiddenId ? opts.hiddenId : this.element[0].id)
								+ '" id = "' + (opts.hiddenId ? opts.hiddenId : 'yhDropHidden_' + serial)
								+ '" />' ).appendTo( this.parent );
			}

			this.disabledDiv = $('<div class = "dropDisabled"></div>').appendTo( this.parent );	
			
			this.dropDiv = $('<div id = "' + this._consts.ID.DROPDIV + serial 
								+ '" class = "' + this._consts.CLASS.DROPDIV + '"></div>')
							.width( this.element.width() + 18 ).hide();
			
			if ( !(opts.noChild && !opts.checkbox) && opts.showButton && !opts.showPath ) {
				this.buttonPanel = $( '<div class = "buttonPanel"></div>' ).appendTo( this.dropDiv );
				
				var unSelect = this._consts.BTNSTRING.replace( /classHolder/, "btnUnSelectAll" ),
					select =  this._consts.BTNSTRING.replace( /classHolder/, "btnSelectAll" )
								.replace( /textHolder/, "全选" );
				
				if ( !opts.checkbox ) {
					$( unSelect.replace( /textHolder/, "清空" ) ).appendTo( this.buttonPanel );
				}

				if ( opts.checkbox ) {
					$( select ).add( $( unSelect.replace( /textHolder/, "全不选" ) ) ).appendTo( this.buttonPanel );
				}
			}

			this.dropUl = $( '<ul id = "' + this._consts.ID.DROPUL + serial 
							+ '" class = "' + this._consts.CLASS.DROPUL + '"></ul>' ).appendTo( this.dropDiv );
	         if ( $.yhui.isIE6 ) {
				this.dropUl.width( this.element.width()+8);
			 }
			this.dropDiv.appendTo( document.body );
			
			if ( opts.url ) this.element.addClass( "dropDownLoading" ).val("   数据加载中……");
			
			this.element.data( "treeId", this._consts.ID.DROPUL  + serial );
			this.element.siblings( "input:hidden" ).data( "treeId", this._consts.ID.DROPUL + serial );
		},

		_inputFocus: function( serial ) {
			this._realHideDrop( $("div.dropTree:visible:first"), true );
			this._toggleDrop( serial );
			this.element.focus();
		},

		_bindEvent: function() {
			var that = this;
			
			this._hideDrop();

			//调整下拉框的位置
			this.element.add( this.arrow ).on("click" + this.eventNamespace, function(e){
				//计算位置
				var tempOffset = that.element.offset(),
					offset = {
						top: tempOffset.top+20,
						left: tempOffset.left
					};
				that.dropDiv.css({
					top: offset.top + "px",
					left: offset.left + "px"
				});
				//显示下拉
				that._inputFocus( that.serial );
				return false;
			});

			//窗口大小变动时隐藏下拉框
			$(window).off( "resize.yhDropDown" ).on( "resize.yhDropDown", function() {
				$( "div.dropTree" ).hide();
			});
			
			//鼠标离开时，隐藏下拉框
			this.dropDiv.on("mouseleave.yhDropDown", function() {
				that._realHideDrop( $(this), true );
			});

			//按钮的事件
			if ( this.buttonPanel ) {
				var btn = this.buttonPanel.find( "a" ),
					that = this;
				if ( btn.length === 1 ) {
					btn.eq(0).on( "click" + this.eventNamespace, function() {
						that.element[0].value = "";
						that.hidden && (that.hidden[0].value = "");
						var treeObj = $.yhGetTree("yhDropTree_" + that.serial );
						treeObj && treeObj.cancelSelectedNode();
						return false;
					});
				} else if( btn.length === 2 ) {
					this.buttonPanel.on( "click" + this.eventNamespace, "a", function() {
						var data = this.lastChild.data,
							tree = $.yhGetTree("yhDropTree_" + that.serial );
						
						if ( data === "全选" ) {
							that._selectedAll( tree, true );
						}

						if ( data === "全不选" ) {
							that._selectedAll( tree, false );
						}
						
						return false;
					});
				}
			}
		},
		
		_initTree: function( serial, opts, event ) {
			var self = this,
				settings = {
					check:{
						enable:false
					}
				,	view: {
						dblClickExpand: false
					}
				,	data:{
						simpleData:{}
					}	
				,	callback: {
						beforeClick: function( treeId, treeNode ) { 
							if ( !opts.checkbox ) {
								return self._defaultBeforeClick( treeId, treeNode, opts.selectParent, opts ); 
							} else {
								return self._checkBeforeClick( treeId, treeNode, opts.selectParent, opts );
							}
						},
						onClick: function( e, treeId, treeNode ) {
							if ( !opts.checkbox ) {
								self._defaultOnClick( e, treeId, treeNode, opts );
							}
						},
						beforeCheck: function( treeId, treeNode ) {
							if ( opts.singleParent ) {
								var tree = $.yhGetTree( treeId )
									rootNodes = tree.getNodes();
								
								function digui( treeNode ) {
									if ( treeNode.level === 0 ) {		
										for ( var i = 0, l = rootNodes.length; i < l; i ++) {
											if ( treeNode !== rootNodes[i]  ) {
												tree.checkNode( rootNodes[i], false, true, false );
											}
										}
									} else {
										treeNode = treeNode.getParentNode();
										digui( treeNode );
									}
								}							
								digui( treeNode );
							}
							
						},
						onCheck: function( e, treeId, treeNode ) {
							if ( opts.showPath && !opts.noChild ) {
								self._showPathCheck( e, treeId, treeNode, opts );
							} else {
								self._defaultOnCheck( e, treeId, treeNode, opts );
							}
						}
					}
				};	
			
			 if ( $.yhui.isIE6 || $.yhui.isIE8||(document.documentMode == 8) ) {
				settings.callback.onExpand = function() {
					var height = self.dropUl.height();
					if ( height > 200 ) {
						self.dropUl.height( 200 );
					}
				};
				settings.callback.onCollapse = function() {
					var $li = self.dropUl.find("li:last");
						height = $li.offset().top + $li.outerHeight();
					if ( height < 201 ) {
						self.dropUl.css( "height", "auto" );
					}
				};
			 };

			if ( opts.checkbox ) {
				settings.check.enable = true;
			}

			if ( !opts.checkbox ) {
				settings.view.selectedMulti = false;
			}

			if ( opts.chkboxType && ( "Y" in opts.chkboxType || "N" in opts.chkboxType ) ) {
				settings.check.chkboxType = opts.chkboxType;
			}

			if ( opts.linkage ) {
				//多选模式做准备
				settings.data.simpleData.enable = true;
				settings.check.chkboxType = { "Y": "", "N": "" };
			}
			
			if ( opts.noChild ) {
				settings.view.showIcon = false;
				settings.view.showLine = false;
			}

			if ( opts.simpleData ) {
				settings.data.simpleData.enable = true;

				if ( opts.pIdKey ) {
					settings.data.simpleData.pIdKey = opts.pIdKey;
				}

				if ( opts.idKey ) {
					settings.data.simpleData.idKey = opts.idKey;
				}
			}

			if ( opts.zTreeSettings ) {
				$.extend( true, settings, opts.zTreeSettings );
			}
			
			opts && opts.json && this._trigger( "beforeCreatedTree", event, { data: opts.json, zTreeSettings: settings } );
			
			if ( opts.noChild ) {
				var firstNode = { 
					name: opts.customContent 
				};
				opts.post && (firstNode[ opts.post ] = "");
				!opts.checkbox && $.isArray( opts.json ) && opts.json.unshift( firstNode );
			}

			$("#yhDropTree_" + serial).yhTree( settings, opts.json && opts.json[0] ? opts.json : {name:"请先选上一级", nocheck:true} );
			
			var treeObj = $.yhGetTree("yhDropTree_" + serial);
	
			if ( opts.noChild ) {
				var listNodes = treeObj.getNodes()
				,	style = {
						"display":"inline-block", 
						"width": (opts.checkbox ? ($.yhui.isIE67 ? "72%" : "80%") : ($.yhui.isIE67 ? "98%" : "100%")), 
						"overflow":"hidden",
						"font-size":"12px",
						"text-overflow":"ellipsis"
					};
				
				for ( var j = 0, len = listNodes.length; j < len; j++ ) {
					$("#" + listNodes[j].tId).children("span:first").hide().end()
						.children("a").css( style );
				}	
			}
			
			if ( this.dropDiv && this.options.width ) {
				var width = this.options.width;
				this.dropDiv.width( width );
				if ( this.options.noChild ) {
					this.dropUl.find("a").width( 
						this.options.checkbox 
							? ( $.yhui.isIE67 ? (width - 46) : (width - 30) ) 
							: width - 15
					);
				}
			}

			if ( opts.linkage ) {
				var node = treeObj.getNodeByParam( "name", "请先选上一级" );
				node && $("#" + node.tId + "_ico").hide();
			}
			
			if ( opts.selectAllSelected ) {
				this._selectedAll( treeObj, true );
			}
			
			this._trigger( "createdTree", event, treeObj );

			if ( opts.autocomplete ) {
				var source = treeObj.transformToArray( treeObj.getNodes() );
				this._autocomplete( treeObj, source );	
				
			}
		},

		_autocomplete: function( tree, source ) {
			var that = this, opts = that.options;
			$.ui.autocomplete.filter = function( array, term ) {
					var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
					return $.grep( array, function(value) {
						return matcher.test( value.name || value.label || value.value || value );
					});
				}
				
			if ( !opts.checkbox && !opts.noChild ) {
				this.element.on("keydown", function(e) {
					if ( tree.getSelectedNodes().length && (e.keyCode === $.ui.keyCode.BACKSPACE || e.keyCode === $.ui.keyCode.DELETE) ) {
						this.value.length <= 1 && tree.cancelSelectedNode();
					}
				}).autocomplete({
					source: source,
					minLength: opts.minLength,
					key: tree.setting.data.key.name,
					open: function() {
						that._realHideDrop( that.dropDiv, false );
					},
					position: {
						at: "left bottom+4"
					},
					select: function( e, ui ) {
						this.value = ui.item.name;
						opts.post && ( $(this).siblings("input:hidden")[0].value = ui.item[ opts.post ] );
						if ( ui.item[opts.guid] ) {
							var node = tree.getNodeByParam( opts.guid, ui.item[opts.guid] );
							if ( node ) {
								tree.selectNode( node );
							}
						}
						return false;
					}
				});
			}
		},
		
		_toggleDrop: function( serial ) {
			var $dropDiv = $( "#" + this._consts.ID.DROPDIV + serial );
			$dropDiv.is( ":visible" )
				? this._realHideDrop( $dropDiv, true )
				: this._showDrop( $dropDiv );
		},

		_showDrop: function( $dropDiv ) {
			$.yhui.isIE678 ? $dropDiv.fadeIn(100) : $dropDiv.slideDown(100);
						
			if ( $.yhui.isIE6 || $.yhui.isIE8||(document.documentMode == 8)) {
				var height = this.dropUl.height();
				if ( height > 200 ) {
					this.dropUl.height( 200 );
				}
			}
		},
		
		_hideDrop: function() {
			var that = this;
			//点击任意位置隐藏下拉框，到底还有没有必要呢？
			!$.yhui.namespaceEvent(document, "click", "yhDropDown") && 
			$(document).on("click.yhDropDown",function(e) {
				var $target = $( e.target )
				,	$div = $("div.dropTree:visible");
				if ( !( $target.parents("div.dropTree").length > 0 
					|| $target.parents("ul.ztree").length > 0 
					|| $target.parents("div.ui-dialog").length > 0) ) {
					that._realHideDrop( $div, true );
				}
			});
		},

		_realHideDrop: function( $div, flag ) {
			$div.is(":visible") && $div.fadeOut(50);
			
			if ( flag && $div[0] && cacheDropDown[ $div[0].id ] ) {
				var param = {
					dropDiv: cacheDropDown[ $div[0].id ].dropDiv,
					dropObj: cacheDropDown[ $div[0].id ]
				};
				cacheDropDown[ $div[0].id ]._trigger( "dropHidden", null, param );
			}	
		},
		
		_defaultBeforeClick: function( treeId, treeNode, sParent, opts ) {
			//判断是否可以选择父节点，不可以则点击展开
			var tree = $.yhGetTree(treeId);
			opts.beforeClick && opts.beforeClick.call( this, tree, treeNode );
			if ( !sParent ) {
				treeNode.isParent && tree.expandNode( treeNode, !treeNode.open, null, null, true );
				return !treeNode.isParent;
			}
		},
		
		_checkBeforeClick: function( treeId, treeNode, sParent, opts ) {
			//有复选框时，点击节点就选中，并且不让节点处于选中状态。
			var tree = $.yhGetTree(treeId);
			opts.beforeClick && opts.beforeClick.call( this, tree, treeNode );
			//!sParent && treeNode.isParent && tree.expandNode(treeNode, !treeNode.open);
			
			
			tree.checkNode( treeNode, !treeNode.checked, true, true );
			
			return false;
		},
		
		_defaultOnClick: function( e, treeId, treeNode, opts, event ) {
			var zTree = $.yhGetTree(treeId)
			,	nodes = zTree.getSelectedNodes()
			,	v = "",	p = ""
			,	that = this;
			
			v = nodes[0].name;
			if ( opts.post ) {
				p = nodes[0][opts.post];
			}
			
			that._bindData( null, v, p, treeId, opts );
			
			var ui = {
				tree: zTree,
				node: treeNode,
				dropDiv: zTree.setting.treeObj.parent()
			};
			that._trigger( "onClick", event, ui );
			that._realHideDrop( that.dropDiv, true );
		},
		
		_defaultOnCheck: function( e, treeId, treeNode, opts ) {
			var tree = $.fn.zTree.getZTreeObj( treeId )
			,	nodes = tree.getCheckedNodes(true)
			,	v = "",	p = ""
			,	that = this
			,	i = 0, l = nodes.length;
			
			for ( ; i < l; i++ ) {
				v += nodes[i].name + ",";
				if ( opts.post ) {
					p += nodes[i][opts.post] + ",";
				}
			}
			
			that._bindData( nodes, v, p, treeId, opts );
			if ( !treeNode.notTriggerClick ) {
				var yhui = {
					tree: tree,
					node: treeNode,
					dropDiv: tree.setting.treeObj.parent()
				};
				this._trigger("onClick", null, yhui);
			}
		},

		_showPathCheck: function( e, treeId, treeNode, opts ) {
			var tree = $.fn.zTree.getZTreeObj( treeId ),
				nodes = tree.getCheckedNodes(true),
				value = "",	post = "", valueArr = [], postArr = [],
				that = this,
				i = 0, l = nodes.length, 
				isParentHalf = function( node ) {
					var status = node.getParentNode().getCheckStatus();
					return status.checked && status.half;
				},
				writePath = function( node ) {
					var nameArr = [], pArr = [];
					while ( node && node.level >= 0 ) {
						nameArr.unshift( node.name ? node.name : "" );
						if ( that.options.post ) {
							pArr.unshift( node[that.options.post] ? node[that.options.post] : "" );
						}
						node = node.getParentNode();
					}
					return {
						name: nameArr.join( "/" ),
						post: pArr.join( "/" )
					};
				},
				getClosestCheckedParent = function( node ) {
					while ( !isParentHalf(node) ) {
						node = node.getParentNode();
						if ( node.level === 0 
								&& node.getCheckStatus().checked 
								&& !node.getCheckStatus().half ) return node;
					}
					return node;
					
				},
				initArray = function( path ) {
					$.inArray( path.name, valueArr ) < 0 && valueArr.push( path.name );
					if ( that.options.post ) {
						$.inArray( path.post, postArr ) < 0 && postArr.push( path.post );
					}
				};
			
			for ( ; i < l; i++ ) {
				if ( !nodes[i].isParent && nodes[i].level !== 0 ) {
					if ( isParentHalf( nodes[i] ) ) {
						initArray( writePath(nodes[i]) );
					} else {
						initArray( writePath( getClosestCheckedParent(nodes[i]) ) );
					}
				}
			}
			that.element.val( valueArr.join(",") )
			that.element.siblings( "input" ).eq(0).val( postArr.join(";") );
			
			var yhui = {
				tree: tree,
				node: treeNode,
				dropDiv: tree.setting.treeObj.parent()
			};
			that._trigger( "onClick", null, yhui );
		},
		
		_bindData: function( nodes, v, p, treeId, opts ) {
			var $textNeed = this.element,
				$postNeed = this.element.siblings("input:hidden").eq(0);
			
			if ( opts.checkbox && !nodes.length ) {
				$textNeed.val( "" );
				$postNeed.val( "" );
				return;
			}
			
			if ( v.indexOf( "," ) < 0 ) {
				$textNeed.val( v );
				p != null && $postNeed.val( p );
			} else {
				if ( v.length > 0 ) {
					v = v.substring( 0, v.length - 1 );
					$textNeed.val( v );
				}
				if ( p.length > 0 ) {
					p = p.substring( 0, p.length - 1 );
					$postNeed.val( p );
				}
			}
		},
		
		_selectedAll: function( treeObj, flag ) {
			var nodes = treeObj.transformToArray( treeObj.getNodes() ),
				i = 0, l = nodes.length;
			
			for ( ; i < l; i ++) {
				treeObj.checkNode( nodes[i], flag, null ,true );
			}
		},
		
		_getData: function() {
			var that = this;
			$.ajax({
				url: that.options.url,
				dataType: that.options.datatype,
				data: that.options.postData,
				type: that.options.type,
				success: function( backData ) {
					that.options.json = backData;
					that._initTree( that.serial, that.options );
					that.element.removeClass( "dropDownLoading" );
					if ( that.element.val() === "   数据加载中……" ) {
						that.element.val( "" );
					}	
				},
				error: function( s1, s2 ) {
					$.yhui.log( s2 );
				}
			});
		},
		
		_destroy: this.destroy,
		destroy: function() {
			this._destroy.apply( this, arguments );
		},
		
		enable: function() {
			this.option( "disable", false );
			this.element.siblings("div.dropDisabled").eq(0).hide().end().parent("div").removeClass( "wrapDivDisabled" );
		},
		
		disable: function() {
			this.option( "disable", true );
			this.element.siblings("div.dropDisabled").eq(0).show().end().parent("div").addClass( "wrapDivDisabled" );
		},
		
		getTree: function() {
			return $.yhGetTree( this.element.data( "treeId" ) );
		},
		
		singleSelect: function() {
			var selectedMulti = this.getTree().setting.view.selectedMulti;
			if ( !selectedMulti ) this.getTree().setting.view.selectedMulti = true;
			this._realHideDrop( this.element.siblings("div.dropTree") );
		}
	});

})(jQuery);