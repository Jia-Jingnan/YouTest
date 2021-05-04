//添加项目的弹窗
	$('.btn-addinter2').click(function(){
		var dialog = jqueryAlert({
			'style'   : 'pc',
			'title'   : '添加项目',
			'content' :  $('#addForm2'), //$("#alert-blockquote")
			'modal'   : true,
			'contentTextAlign' : 'left',
			'width'   : '620px',
			
			'animateType' : 'linear',
			'buttons' :{
				'取消' : function(){
					dialog.close();
				},
				'提交':function(){
					var ifViladate = true;
					var $form = $('.pcAlert').last().find('#addForm2');
					console.log($('.pcAlert'))
							console.log($('.pcAlert').last())
							console.log($form)
					ifViladate = $form.validate('submitValidate');
					if(!ifViladate) return;
					$.ajax({
						url:youtest.config.global.adminUrl+"/project/add",
						headers:{"Authorization":$.cookie("sessionId")},
						data:$form.serialize(),//讲前端输入的参数用&&拼接
						type:'post',
						dataType:'json',
						async:false,  //同步请求
						success:function(ret){
							if(ret.status=="1"){
								dialog.close();//关闭模态框
								window.location.reload();//刷新页面
							}else if(ret.status=="2"){
								alert(ret.message);
							}
						}
					});

				}
			}
		})
	});