$(function(){
	$("#btnUApi").click(function(){
		$.ajax({
			url:lemon.config.global.adminUrl+"/cases/updateCases",
			headers:{"Authorization":$.cookie("sessionId")},
			data:$("[name='caseForm']").serialize(),
			type:'post',
			dataType:'json',
			success:function(ret){
				if(ret!=null){
					alert(ret.message);
					if(ret.status=="1"&&ret.message=="更新成功"){
						//window.parent.location.reload();//刷新父页面
						window.location.reload();//刷新当前页面
					}else if(ret.status=="1"&&ret.message=="账号未登录"){
						location.href=lemon.config.global.rootUrl+"/login.html"
					}
				}
			}
		});
	});
	$(".btn-send").click(function(){
		$.ajax({
			url:lemon.config.global.adminUrl+"/api/apiRun",
			headers:{"Authorization":$.cookie("sessionId")},
			data:$("[name='caseForm']").serialize(),
			type:'post',
			dataType:'json',
			success:function(ret){
				if(ret.status=="1"&&ret.message=="执行成功"){
					if(ret.status=="1"&&ret.data.statusCode=="200"){
						var colorStr="rgb(0, 204, 0)"
					}else{
						var colorStr="rgb(255, 0, 0)"
					}
					$("[name='responseHeader']").html("<pre class='pre-scrollable' style='color:"+colorStr+"'>"+JSON.stringify(JSON.parse(ret.data.headers), null, 2)+"</pre>");
					$("[name='responseData']").html("<pre  class='pre-scrollable' style='color:"+colorStr+"'>"+JSON.stringify(JSON.parse(ret.data.body), null, 2)+"</pre>");

				}else if(ret.status=="1"&&ret.message=="账号未登录"){
					location.href=lemon.config.global.rootUrl+"/login.html"
				}
				else{
					alert(ret.message);
				}
			}
		});
	});
	
	$(".restit-interrun").find("div").click(function(){
		var index = $(this).index();
		$(this).css("border-bottom","2px solid #2395f1");
		$(this).css("color","#2395f1");
		$(this).siblings().css("border-bottom","");
		$(this).siblings().css("color","");
		if(index==0){
			//显示
			$(".reslist-interrun").show();
			//隐藏
			$(".testlist-interrun").hide();
			//隐藏
		//	$(".dataTest-interrun").hide();
		}else if(index==1){
			//显示
			$(".testlist-interrun").show();
			//隐藏
			$(".reslist-interrun").hide();
			//$(".dataTest-interrun").hide();
			//找到表中配置的断言规则,用于数据回显
			// var url = lemon.config.global.rootUrl+"/suite/findCaseTestRule";
			// var caseId = $("[name='caseId']").val();
			// $.post(url,{"caseId":caseId},function(ret){
			// 	if(ret.status=="1"){
			// 		if(ret.data!==null){
			// 			//数据回填到页面
			// 			$("[name='caseTestRule.expression']").val(ret.data.expression);
			// 			$("[name='caseTestRule.expected']").val(ret.data.expected);
			// 		}
			// 	}else{
			// 		alert(ret.message);
			// 	}
			// },'json');
		}else if(index==2){
			// //显示
			// $(".dataTest-interrun").show();
			// //隐藏
			// $(".testlist-interrun").hide();
			// $(".reslist-interrun").hide();	
		}
	});
	
	$("#addRule").click(function(){
		var siblingsLength = $(this).siblings().length;
		var appendIndex = siblingsLength;
	var toAddHtml = `<div class="line-interedit line-com">

						<select name="testRules[${appendIndex}].rule"   style="width:8%" >
							<option value='1' >contains</option>
							<option value='2' >notcontains</option>
							<option value='3' >jsonpathvalue</option>
							<option value='4' >jsonpathcount</option>
							<option value='5' >=</option>
							<option value='6' >!=</option>
							<option value='7' >script</option>
						</select>
						<textarea placeholder="jsonpath表达式" name="testRules[${appendIndex}].expression" value="" style="width:25%"></textarea>
						<select name="testRules[${appendIndex}].operator"  style="width:7%">
							<option value='8'>=</option>
							<option value='9'>contains</option>
							<option value='10'>notcontains</option>
							<option value='11'>!=</option>
							<option value=''>无</option>
						</select>
						<textarea placeholder="期望值" name="testRules[${appendIndex}].expected" value="" style="width:35%"></textarea>
						<i class="icon icon-delete f-l"></i>
					</div>`
		$(this).parent().append(toAddHtml);
	});
	
	//删除当前行参数
	$('.linebox-interedit').on('click','.line-interedit .icon-delete',function(){
		//$(this).parent().remove();
			//将索引重排，避免保存后端时报错
	//得到兄弟节点数
		var siblings=$(this).parent().siblings("div");
		var appendIndex=siblings.length;//兄弟的节点数--不包括他自己
		$(this).parent().remove();
		if(appendIndex==0){
			return;
		}
		i=0;
		siblings.each(function(){
			var forms=$(this).children().not("i");//排除i标签，不进行循环
			i++;
			$.each(forms,function(index,val){ //val  js对象，可以直接调用属性
				var  str=val.name;
				var str2=str.substring(0,str.indexOf('[')+1).concat(i-1).concat(str.substring(str.indexOf(']')));
				val.name=str2;
			});
		});
	});
	
	$("[name='relatedApi']").click(function(){
		var baseUrl = lemon.config.global.rootUrl;
		//获取菜单的接口
		var menuFindurl = baseUrl+"/index/findApiSelectedMenu";
		var apiId = $("[name='apiId']").val();
		var projectId = $("[name='projectId']").val();
		var data = {"apiId":apiId};
		var turn2Page = baseUrl+"/index/toIndex?projectId="+projectId+"&tab=1";
		////跳转到对应页面，并选中对应菜单
		selectMenuAndTurn2Page(menuFindurl,data,turn2Page,"测试集合");
	});
});