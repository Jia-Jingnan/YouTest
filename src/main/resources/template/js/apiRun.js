//参数填写的折叠效果
$('.paramcom-interrun').on('click','.icon-arrow',function(){
	$(this).toggleClass('active');
	if($(this).hasClass('active')){
		$(this).parent().siblings().addClass('active');
	}else{
		$(this).parent().siblings().removeClass('active');
	}
});
//设置环境下拉框
$('.iptenvir-interrun').click(function(){
	$(this).toggleClass('active');
	if($(this).hasClass('active')){
		$(this).siblings().addClass('active');
	}else{
		$(this).siblings().removeClass('active');
	}
});
$(document).click(function(e){
	if(!$(e.target).closest('.iptenvir-interrun').length){
		$('.envirlist-interrun').removeClass('active');
	}
});
//添加环境列表
$('body').last().on('click','.toplist-layer .icon-add',function(){
	$('.envirlist-layer ul').last().prepend('<li>新环境<i class="icon icon-delete"></i></li>')
});
//删除环境列表
$('body').last().on('click','.envirlist-layer .icon-delete',function(){
	$(this).parent().remove();
})
//高级参数设置展示更多
$('body').on('click','.morelist-layer',function(){
	$(this).addClass('active').siblings().addClass('active');
})
//高级参数设置-添加方法的整列
$('body').on('click','.paramslist-layer ul li',function(){
	$(this).addClass('active').siblings().removeClass('active');
	var text = $('.pcAlert').last().find('.paramslist-layer ul li.active span');
	var htmlArr = [];
	$.each(text,function(i,v){
		htmlArr.push($(v).html());
	});
	var index = $(this).parents('.paramslist-layer').index();
	var length = $(this).parents('.paramslist-layer').siblings().length;
	var length2 = $('.pcAlert').last().find('.paramsdel-layer .paramslist-layer').length;
	$('.psmodexp-layer').last().html('{{ '+htmlArr.join(' | ')+' }}');
	if(index != length )return;
	if(index == 1 && length ==1 && length2 != 2 && $(this).parents('.paramscom-layer').length)return;
	$('.paramsdel-layer').last().append($('.paramslist-layer').first().clone());
})

//选择添加到集合
$('body').on('click','.sellist-addass li',function(){
	$(this).toggleClass('active').siblings().removeClass('active');
});
//添加新集合展开收起
$('body').on('click','.comtop-comdul',function(){
	$(this).toggleClass('active');
	if($(this).hasClass('active')){
		$(this).siblings().addClass('active');
	}else{
		$(this).siblings().removeClass('active');
	}
});
//确认添加新集合
$('body').on('click','.add-ass',function(){
	var ifViladate = true;
	var $form = $('.pcAlert').last().find('#addAssParams');
	ifViladate = $form.validate('submitValidate');
  	if(!ifViladate)return;
  	var html = '<li><i class="icon-file"></i>'+$('.pcAlert #addAssParams').serializeArray()[0].value+'</li>';
  	$(this).parents('.new-addass').siblings('.sellist-addass').children('ul').append(html);
})
$(function(){
	//共选择的集合
	var url = lemon.config.global.adminUrl+"/suite/listAll";
	var projectId=sessionStorage.getItem("projectId")
	let sessionId = $.cookie("sessionId");
	$.ajax({
		url:url,
		headers:{"Authorization":sessionId},
		data:{"projectId":projectId},
		type:'post',
		dataType:'json',
		success:function(ret){
			if(ret!=null){
				var suites = "";
				$.each(ret.data,function(ind,ele){
					if(ind==0){
						suites += ("<li class='active' value='"+ele.id+"'><i class='icon-file'></i>"+ele.name+"</li>");
					}else{
						suites += ("<li class='' value='"+ele.id+"'><i class='icon-file'></i>"+ele.name+"</li>");
					}
				})
				$(".sellist-addass ul").append(suites);
			}
		}
	});
	// $.post(url,{"projectId":$("[name='projectId']").val()},function(ret){
	// 	if(ret!=null){
	// 		var suites = "";
	// 		$.each(ret.data,function(ind,ele){
	// 			if(ind==0){
	// 				suites += ("<li class='active'><i class='icon-file'></i>"+ele.name+"</li>");
	// 			}else{
	// 				suites += ("<li class=''><i class='icon-file'></i>"+ele.name+"</li>");
	// 			}
	// 		})
	// 		$(".sellist-addass ul").append(suites);
	// 	}
	// },'json');
	
	//环境设置弹框
	$('.envirlist-interrun').on('click','#btnEnvirSet',function(){
		var _this = this;
		var dialog = jqueryAlert({
		    'style'   : 'pc',
		    'title'   : '环境设置',
		    'content' :  $('#envirSetLayer'),
		    'modal'   : true,
		    'contentTextAlign' : 'left',
		    'width'   : '800px',
		    'animateType' : 'linear',
		    'buttons' :{
		    }
		})
	});
	//高级参数设置弹框
	$('.paramline-interrun').on('click','.edit-interrun',function(){
		var _this = this;
		var dialog = jqueryAlert({
		    'style'   : 'pc',
		    'title'   : '高级参数设置',
		    'content' :  $('#paramSetLayer'),
		    'modal'   : true,
		    'contentTextAlign' : 'left',
		    'width'   : '1050px',
		    'animateType' : 'linear',
		    'buttons' :{
		    	'取消' : function(){
		            dialog.close(); 
		        },
		        '插入':function(){	
		        	var rule = $('.psmodexp-layer').last().html();
		        	var value = $(_this).siblings('input').val();
		        	$(_this).siblings('input').val(rule+value);
		        	dialog.close(); 
		        }
		    }
		})
	});
	
	//单击保存,添加到集合
	$('#btnSaveInter').on('click',function(){
		var _this = this;
		var dialog = jqueryAlert({
		    'style'   : 'pc',
		    'title'   : '添加到集合',
		    'content' :  $('#addAssemble'),
		    'modal'   : true,
		    'contentTextAlign' : 'left',
		    'width'   : '520px',
		    'animateType' : 'linear',
		    'buttons' :{
		    	'取消' : function(){
		            dialog.close(); 
		        },
		        '确定':function(){
		        	var $form = $('.pcAlert').last().find("[name='addSuiteForm']");
		        	ifViladate = $form.validate('submitValidate');
		        	console.info("ifViladate="+ifViladate);
		        	if(!ifViladate)return false;
		        	var suiteId = $('.pcAlert').last().find(".sellist-addass").find("li.active").val();
		        	var name = $('.pcAlert').last().find("[name='name']").val();
					var url=lemon.config.global.adminUrl+"/cases/add?name="+name+"&suiteId="+suiteId;
					var sessionId=$.cookie("sessionId");
		        	$.ajax({
						url:url,
						headers:{"Authorization":sessionId},
		        		data:$("[name='apiRunForm']").serialize(),
		        		type:'post',
		        		dataType:'json',
		        		async:false,
		        		success:function(ret){
		        			alert(ret.message);
		        			dialog.close(); 
		        		}
		        	});
		        	
		        }
		    }
		})
	});

	$('#addAssParams').validate({
	    onFocus: function() {
	      this.parent().addClass('active');
	      return false;
	    },
	    onBlur: function() {
	      var $parent = this.parent();
	      var _status = parseInt(this.attr('data-status'));
	      $parent.removeClass('active');
	      if (!_status) {
	        $parent.addClass('error');
	      }
	      return false;
	    }
  	});
	
	$(".btn-send").click(function(){
		let sessionId=$.cookie("sessionId");
		$.ajax({
			url:lemon.config.global.adminUrl+"/api/apiRun",
			headers:{"Authorization":sessionId},
			data:$("[name='apiRunForm']").serialize(),
			type:'post',
			dataType:'json',
			success:function(ret){
				var colorStr="rgb(0, 0, 255)"
				if(ret.status=="1"&&ret.data!=null){
					if(ret.status=="1"&&ret.data.statusCode=="200"){
						var colorStr="rgb(0, 204, 0)"
						}else{
						var colorStr="rgb(255, 0, 0)"
					}
					$("[name='responseHeader']").html("<pre class='pre-scrollable' style='color:"+colorStr+"'>"+JSON.stringify(JSON.parse(ret.data.headers), null, 2)+"</pre>");
					$("[name='responseBody']").html("<pre class='pre-scrollable' style='color:"+colorStr+"'>"+JSON.stringify(JSON.parse(ret.data.body), null, 2)+"</pre>");
				}else if(ret.status=="1"&&ret.message=="账号未登录"){
					location.href=lemon.config.global.rootUrl+"/login.html"
				}
			}
		});
	});
});

