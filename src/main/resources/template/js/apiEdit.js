//设置参数导航条切换
$('.comnav-interedit ul li').click(function(){
	var index = $(this).addClass('active').index();
	$(this).siblings().removeClass('active').parents('.comnav-interedit')
		   .siblings().children().eq(index).addClass('active')
		   .siblings().removeClass('active');
})
//模板预览切换
$('.ulbox-interedit').on('click','ul li',function(){
	var index = $(this).addClass('active').index();
	$(this).siblings().removeClass('active').parents('.ulbox-interedit')
		   .siblings().children().eq(index).addClass('active')
		   .siblings().removeClass('active');
});

//其他的部分的开关切换
$('.line-interedit .icon-switch').click(function(){
	$(this).toggleClass('active');
});

//添加参数
$('.linebox-interedit').on('click','.btn-com',function(){
	//如果已经是选中状态，那么就直接结束
	var text = $(this).text(); //获取当前触发事件对象的文本值
	var siblingsLength = $(this).siblings().length;
	var appendIndex = siblingsLength;
	var appendHtml = "";
	var editdingApiId = sessionStorage.getItem("apiId")
	var paramName="";
	var paramvalue="";
	if(text.indexOf("form")>=0){
		paramName="bodyParams";
		paramvalue=2
		//添加一行form参数
		
	}else if(text.indexOf("Query")>=0){
		paramName="queryParams";
		paramvalue=1
	
	}else if(text.indexOf("Header")>=0){
		paramName="headerParams";
		paramvalue=3
	}
	appendHtml += ("<div class='line-interedit line-com'>"
				+"<input type='hidden' name='"+paramName+"["+appendIndex+"].type' value='"+paramvalue+"' style='width:18%'>"
				+"<input type='hidden' name='"+paramName+"["+appendIndex+"].apiId' value='"+editdingApiId+"' style='width:18%'>"
				+"<input placeholder='参数名称' name='"+paramName+"["+appendIndex+"].name' value='' style='width:20%' type='text'>"
				+"<select name='"+paramName+"["+appendIndex+"].paramType' id='' style='width:12%'>"
				+"<option value='string'>string</option>"
				+"<option value='int'>int</option>"
				+"</select>"
				+"<textarea name='"+paramName+"["+appendIndex+"].exampleData' id='' value='' placeholder='参数示例' style='width:20%'></textarea>"
				+"<textarea name='"+paramName+"["+appendIndex+"].description' id='' value='' placeholder='备注' style='width:29%'></textarea>"
				+"<i class='icon icon-delete f-l'></i>"
				+"</div>"
		);
	$(this).parent().append(appendHtml);
})
//删除当前行参数
$('.linebox-interedit').on('click','.line-interedit .icon-delete',function(){
	//将索引重排，避免保存后端时报错
	//得到兄弟节点数
	var siblings=$(this).parent().siblings("div");
	var appendIndex=siblings.length;//兄弟的节点数--不包括他自己
	//alert(appendIndex)
	$(this).parent().remove();
	if(appendIndex==0){
		return;
	}
	i=0;
	siblings.each(function(){
		//$(this)  jquery对象--指代循环后的当前div
		//jquery对象一般使用点语法调用方法不会直接调用属性
		var forms=$(this).children().not("i");//排除i标签，不进行循环
		i++;
		$.each(forms,function(index,val){ //val  js对象，可以直接调用属性
			var  str=val.name;
			var str2=str.substring(0,str.indexOf('[')+1).concat(i-1).concat(str.substring(str.indexOf(']')));
			val.name=str2;
		});
	});
});
//添加当前行参数
$('.backdata-interedit').on('click','.line-interedit .icon-add',function(){
	var clone = $(this).parent().clone();
	$(this).parents('.boxline-interedit').append(clone);
});

//导入json弹窗导航条的切换
$('body').on('click','.pcAlert .import-nav li',function(e){
	e.stopPropagation();
	var index = $(this).index();
	$(this).addClass('active').siblings().removeClass('active');
	$(this).parent().siblings().children().children().eq(index).addClass('active').siblings().removeClass('active');
});
//导入数据列表数据的折叠
$('.backdata-interedit .icon-drop').click(function(){
	$(this).toggleClass('active');
	if($(this).hasClass('active')){
		$(this).siblings('.boxline-interedit').addClass('active');
	}else{
		$(this).siblings('.boxline-interedit').removeClass('active');
	}
});
$(function(){
	var jsonParam = sessionStorage.getItem("jsonParam");
	//console.log(!jsonParam);
	//console.log(jsonParam)
	if(!jsonParam){
		jsonParam = "{}";
	}
	var apiId = sessionStorage.getItem("apiId")
	var toAddHtml = "<div class='basicinfo-interpre reqparamsset-interedit'>"
 						+"<div class='reqplist-interedit'>"
						+"<textarea name='bodyRawParams[0].exampleData' id='' class='remark-interedit'>"+jsonParam+"</textarea>"
						+"<input name='bodyRawParams[0].type' value='4' type='hidden'/>"
						+"<input name='bodyRawParams[0].apiId' value='"+apiId+"' type='hidden'/>"
 						+"</div>"
 					+"</div>";
	//给radio绑定事件
	$("[name='pt']").click(function(){
		var value = $(this).val();
		if(value=="raw"){//点击的是raw radio
			$("#reqpBody .linebox-interedit").hide();
			$("#reqpBody .basicinfo-interpre").remove();
			$("#reqpBody .radiobox-interedit").append(toAddHtml);
		}else if(value=="form"){//点击的是form radio
			$("#reqpBody .linebox-interedit").show();
			$("#reqpBody .btn-com").show();
			$("#reqpBody .basicinfo-interpre").remove();
		}
	});
	//设置保存的固定按钮外层父元素的宽度
	//$('.comfirm-interedit').width($('.del-interedit').width());
	//返回数据设置-模板的备注填写弹框
	$('.backdata-interedit').on('click','.edit-interedit',function(){
		var _this = this;
		var dialog = jqueryAlert({
		    'style'   : 'pc',
		    'title'   : '备注',
		    'content' :  '<textarea class="dialog-text">测试<textarea>',
		    'modal'   : true,
		    'contentTextAlign' : 'left',
		    'width'   : '520px',
		    'animateType' : 'linear',
		    'buttons' :{
		        '取消' : function(){
		            dialog.close(); 
		        },
		        '提交':function(){	
		        	$(_this).siblings().val($('.dialog-text').last().val());
		        	dialog.close(); 
		        }
		    }
		})
	});
	//高级设置
	$('.backdata-interedit').on('click','.icon-set',function(){
		var _this = this;
		var dialog = jqueryAlert({
		    'style'   : 'pc',
		    'title'   : '高级设置',
		    'content' :  '<div class="line-top"></div><div class="comtit-interpre">编辑源码</i></div><textarea class="dialog-text">{"type": "object","title": "empty object","properties": {},"description": "awefwef<textarea>',
		    'modal'   : true,
		    'contentTextAlign' : 'left',
		    'width'   : '520px',
		    'animateType' : 'linear',
		    'buttons' :{
		        '取消' : function(){
		            dialog.close(); 
		        },
		        '提交':function(){	
		        	$(_this).siblings().val($('.dialog-text').last().val());
		        	dialog.close(); 
		        }
		    }
		})
	});
	//导入json
	$('.backdata-interedit').on('click','.btn-import',function(){
		var _this = this;
		var html = '<div class="import-json">';
		html += '<div class="line-top"></div>';
		html += '<ul class="import-nav clearfix">';
		html += '<li class="active">JSON</li>';
		html += '<li>JSON-SCHEMA</li>';
		html += '</ul>';
		html += '<div class="import-textbox"><div class="import-text">';
		html += '<textarea class="json active"></textarea>';
		html += '<textarea class="schema"></textarea>';
		html += '</div></div>';
		html += '<div class="line-bottom"></div>';
		html += '</div>';
		var dialog = jqueryAlert({
		    'style'   : 'pc',
		    'title'   : '导入json',
		    'content' :  html,
		    'modal'   : true,
		    'contentTextAlign' : 'left',
		    'width'   : '520px',
		    'animateType' : 'linear',
		    'buttons' :{
		        '取消' : function(){
		            dialog.close(); 
		        },
		        '提交':function(){	
		        	//dialog.close(); 
		        }
		    }
		})
	});
	// //保存按钮
	// $(".comfirm-interedit").find(".btn-com").click(function(){
		// let sessionId = $.cookie("sessionId");
		// $.ajax({
		// 	url:lemon.config.global.adminUrl+"/api/edit",
		// 	headers:{"Authorization":sessionId},
		// 	data:$("[name='apiEditForm']").serialize(),
		// 	type:'post',
		// 	dataType:'json',
		// 	success:function(ret){
		// 		if(ret!=null){
		// 			alert(ret.message);
		// 		}
		// 	}
		// });
	// });
	
	$("[name='apiParamType']").click(function(){
		if($(this).val()=="json"){
			$("#reqpBody").find("a.btn-com").hide();
			$("#reqpBody").find(".line-interedit").hide();
			$("#reqpBody").find(".reqplist-interedit").show();
		}else if($(this).val()=="form"){
			$("#reqpBody").find("a.btn-com").show();
			$("#reqpBody").find(".line-interedit").show();
			$("#reqpBody").find(".reqplist-interedit").hide();
		}
	});
	
	var backendReturnApiParamType = $("[name='backendReturnApiParamType']").val();
	if(backendReturnApiParamType=="json"){
		$("[name='apiParamType']:eq(1)").trigger("click");
	}else if(backendReturnApiParamType=="form"){
		$("[name='apiParamType']:eq(0)").trigger("click");
	}
	
});

