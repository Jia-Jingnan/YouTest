
//接口数据分组处理
function interDataPaging(data,page){
	if(data.length <= page){
		return [data];
	}
	var arr,listArr = [];
	for(var i=0;i < data.length;i++){
		if(i % page == 0){
			arr  && listArr.push(arr);
			arr = [];
		}
		arr.push(data[i]);
	}
	listArr.push(arr);
	return listArr;
}

function showApi(apiId){
	// var baseUrl = lemon.config.global.rootUrl;
	// var menuFindurl = baseUrl+"/index/findApiSelectedMenu?apiId="+id;
	// var data = {"apiId":id};
	// var turn2Page = baseUrl+"/api/toApiView?apiId="+id;
	// //跳转到对应页面，并选中对应菜单
	// selectMenuAndTurn2Page(menuFindurl,data,turn2Page);
	sessionStorage.setItem("apiId",apiId)
}

//分页数据html生成
function pagingDataBuild(pagedata){
	var status = 1;
	var html = '';
	var baseUrl = lemon.config.global.rootUrl;
	for(var i=0;i<pagedata.length;i++){
		html += '<li><ul class="clearfix">';

		html += '<li><a href="apiView.html" onclick="showApi('+pagedata[i].id+')">'+pagedata[i].name+'</a></li>';

		html += '<li><i class="icon-badge">'+pagedata[i].method.toUpperCase()+'</i>'+pagedata[i].url+'</li>';
		html += '<li>'+pagedata[i].classificationName+'</li>';
		html += '</li>';
		html += '<li>';
		html += '<i class="icon-circle '+(status == 1 ? 'active' : '')+'"></i>'+(status == 1 ? '已完成' : '未完成');
		html += '</li>';
		html += '</ul></li>';
	}
	return html;
}

//分页数据显示
/*
	pagedata:分页的数据
	pageNum:每页显示多少条数据
 */
function pagingDataShow(pagedata,pageNum){
	
	var interDataGroup = interDataPaging(pagedata,pageNum);
	//分页
	$('#pagination').pagination({
	    totalData: pagedata.length,
	    showData: pageNum,
	    coping: true,
	    jump: true,
	    callback:function(api){
	    	$('#interData>ul').html(pagingDataBuild(interDataGroup[api.getCurrent()-1]));
	    }
	});
	//加载数据
	
		$('#interData>ul').html(pagingDataBuild(interDataGroup[0]));
	
	
}


$(function(){
	var projectId =sessionStorage.getItem("projectId")
	let sessionId=$.cookie("sessionId");
	var apiClassificationId =sessionStorage.getItem("apiClassificationId")
	var listUrl = "";
	var classnamestr="";
	var classdDescription="";
	//获取数据接口
	if(projectId!=""){
		listUrl = lemon.config.global.adminUrl+"/api/showApiListByProject?projectId="+projectId;
		
	}
	 if(apiClassificationId!=''&&apiClassificationId!=null){
		listUrl = lemon.config.global.adminUrl+"/api/showApiListByClassificationId?apiClassificationId="+apiClassificationId;
	}
	$.ajax({
		headers:{"Authorization":sessionId},//将sessionId存放到头部信息中 key要与后端定义头部信息一致
		url:listUrl,
		//data:"projectId="+projectId,
		type:"GET",
		success:function(ret){
			if(projectId!=""){
				classnamestr="全部"
				classdDescription="全部接口"
				
			}
			if(apiClassificationId!=''&&apiClassificationId!=null&&ret.data.length>0){
				classnamestr=ret.data[0].classificationName
				classdDescription=ret.data[0].classificationDescription
			}else if(ret.data.length==0){
				$.ajax({
					headers:{"Authorization":sessionId},
					url:lemon.config.global.adminUrl+"/apiClassification/"+apiClassificationId,
					type:"GET",
					success:function(ret2){
						if(ret2.status=="1"&&ret2.data!=null){
							$(".desctit-interlist span").text(ret2.data.name+"接口共(0)个");
							$(".input-com").val(ret2.data.description);
						}
						else if(ret2.status=="1"&&ret2.message=="账号未登录"){
							location.href=lemon.config.global.rootUrl+"/login.html"
						}
					}
				});
			}
			//统计有多少个接口并赋值.desctit-interlist span
		$(".desctit-interlist span").text(classnamestr+"接口共("+ret.data.length+")个");
		$(".input-com").val(classdDescription);
		if(ret!=null&&ret.data.length>0){
			//分页显示数据
			pagingDataShow(ret.data,5);
		}else if(ret!=null&&ret.data.length==0){
			$(".datatxt-interlist ul").text("暂无数据");
		}
		else if(ret.status=="1"&&ret.message=="账号未登录"){
				location.href=lemon.config.global.rootUrl+"/login.html"
			}
		}
	});
	//接口列表分类下拉框显示隐藏
	$('#interData').on('click','.icon-droparr',function(){
		$(this).siblings('.dropcom-interlist').toggleClass('active');
		if($(this).siblings('.dropcom-interlist').hasClass('active')){
			$(this).addClass('active');
			return;
		}
		$(this).removeClass('active');
	});

	//接口列表状态下拉框显示隐藏
	$('#interDataTit').on('click','.icon-filter',function(){
		$(this).siblings().toggleClass('active');
		if($(this).siblings().hasClass('active')){
			$(this).addClass('active');
			return;
		}
		$(this).removeClass('active');
	});

	//添加接口的弹窗
	$('.btn-addinter').click(function(){
		var projectId =sessionStorage.getItem("projectId")
		let sessionId=$.cookie("sessionId");
		var url = lemon.config.global.adminUrl+"/apiClassification/findAll";
		//准备分类下拉框数据
		//$.post(url,{"projectId":1},function(ret){
			$.ajax({
				headers:{"Authorization":sessionId},//将sessionId存放到头部信息中 key要与后端定义头部信息一致
				url:url,
				data:"projectId="+projectId,
				type:"post",
				success:function(ret){
			if(ret.status=="1"&&ret.data.length!=0){
				var options = "";
				$.each(ret.data,function(ind,ele){
					options+=("<option value='"+ele.id+"'>"+ele.name+"</option>");
				});
				$("[name='apiClassificationId']").html();
				$("[name='apiClassificationId']").html(options);
			}else if(ret.status=="1"&&ret.message=="账号未登录"){
				location.href=lemon.config.global.rootUrl+"/login.html"
				//alert(ret.msg);
			}else if ( ret.data.length==0) {
					alert("无接口分类信息，请先添加接口分类信息！")
					return ;
			}
			var dialog = jqueryAlert({
			    'style'   : 'pc',
			    'title'   : '添加接口',
			    'content' :  $('#addForm'), //$("#alert-blockquote")
			    'modal'   : true,
			    'contentTextAlign' : 'left',
			    'width'   : '520px',
			    'animateType' : 'linear',
			    'buttons' :{
			        '取消' : function(){
			            dialog.close(); 
			        },
			        '提交':function(){	
			        	var ifViladate = true;
						var $form = $('.pcAlert').last().find('#addForm');
					
			        	ifViladate = $form.validate('submitValidate');
					  	if(!ifViladate)return;
			        	$.ajax({
							url:lemon.config.global.adminUrl+"/api/addApi",
							headers:{"Authorization":sessionId},
			        		data:$form.serialize(),
			        		type:'post',
			        		dataType:'json',
			        		async:false,
			        		success:function(ret){
			        			if(ret.status=="1"&&ret.message=="新增成功"){
			        				dialog.close();
			        				window.location.reload();
			        			}else if(ret.status=="1"&&ret.message=="账号未登录"){
									location.href=lemon.config.global.rootUrl+"/login.html"
			        				//alert(ret.msg);
			        			}
			        		}
			        	}); 
			        	
			        }
			    }
			})
		}});
	});

	$(document).click(function(e){
		if(!$(e.target).closest('#interData ul li li').length){
			$('.dropcom-interlist').removeClass('active').siblings('.icon-droparr').removeClass('active');
		}
		if(!$(e.target).closest('#interDataTit ul li').length){
			$('.statustit-interlist').removeClass('active').siblings('.icon-filter').removeClass('active');
		}
	});


	$('#addForm').validate({
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
	
	$("#suiteLink").click(function(){
		var rootUrl = lemon.config.global.rootUrl;
		var to = rootUrl+"/suite/findAll";
		window.location.href = to;
	});
});
