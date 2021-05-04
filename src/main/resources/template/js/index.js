$(function() {
	// 高度计算
	function calcHeight() {
		var pageHeight = document.body.clientHeight
		var rightIframe = pageHeight - 185;
		$(".rightIframe").height(rightIframe);
		$(".left-interlist").height(rightIframe);
	}
	calcHeight();
	window.onresize = function() {
		calcHeight();
	}

	// 添加分类的弹窗
	$('#addfl').click(
			function() {
				var dialog = jqueryAlert({
					'style' : 'pc',
					'title' : '添加分类',
					'content' : $('#addClassification'), // $("#alert-blockquote")
					'modal' : true,
					'contentTextAlign' : 'left',
					'width' : '520px',
					'animateType' : 'linear',
					'buttons' : {
						'取消' : function() {
							dialog.close();
						},
						'提交' : function() {
							let projectId=sessionStorage.getItem("projectId");
							// var projectId = $("[name='projectId']").val();
							var ifViladate = true;
							var $form = $('.pcAlert').last().find('#addClassification');
							
							ifViladate = $form.validate('submitValidate');
							if (!ifViladate)
								return;
							//console.log($('#addClassification').serialize())
							$.ajax({
								headers:{"Authorization":$.cookie("sessionId")},
								url : lemon.config.global.adminUrl
										+ "/apiClassification/"
										+ projectId,
								data : $form.serialize(),
								type : 'post',
								dataType : 'json',
								async : false,
								success : function(ret) {
									if(ret.status=="1"&&ret.message=="新增成功"){
										dialog.close();
										window.location.reload();
									}else if(ret.status=="1"&&ret.message=="账号未登录"){
										location.href=lemon.config.global.rootUrl+"/login.html"
									}else{
										dialog.close();
										alert("添加失败！")
									}
								}
							});

						}
					}
				})
				// }

			});
	
	//添加集合的弹窗
	$('#addjh').click(
			function() {
				var dialog = jqueryAlert({
					'style' : 'pc',
					'title' : '添加集合',
					'content' : $('#addSuite'), // $("#alert-blockquote")
					'modal' : true,
					'contentTextAlign' : 'left',
					'width' : '520px',
					'animateType' : 'linear',
					'buttons' : {
						'取消' : function() {
							dialog.close();
						},
						'提交' : function() {
							var projectId =sessionStorage.getItem("projectId");
							var ifViladate = true;
							var $form = $('.pcAlert').last().find('#addSuite');
							ifViladate = $form.validate('submitValidate');
							if (!ifViladate)
								return;
							$.ajax({
								headers:{"Authorization":$.cookie("sessionId")},
								url : lemon.config.global.adminUrl
										+ "/suite/add",
								data : $form.serialize()+"&projectId="+projectId,
								type : 'post',
								dataType : 'json',
								async : false,
								success : function(ret) {
									if(ret.status==1&&ret.data!="账号未登录"){
										dialog.close();
										window.location.reload();
									}else if(ret.status==1&&ret.data!="账号未登录"){
										location.href=lemon.config.global.rootUrl+"/login.html"
									}else{
										dialog.close();
										alert("添加失败！")
									}
								}
							});

						}
					}
				})
			});

			
	

});
