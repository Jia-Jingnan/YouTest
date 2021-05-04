//测试报告弹框导航切换
$('body').on('click','.nav-testrep li',function(){
	$(this).toggleClass('active').siblings().removeClass('active');
	var index = $(this).index(); 
	$(this).parents('.nav-testrep').siblings().children().eq(index).addClass('active').siblings().removeClass('active');
});

//查看指定用例的测试报告
$(function(){
	$('.data-testass').on('click','.btn-testrep',function(){
		var caseId = $(this).parent().parent().find("[name='id']").val();
		$.ajax({
			url:lemon.config.global.adminUrl+"/testReport/findCaseRunResult",
			headers:{"Authorization":$.cookie("sessionId")},
			data:{"caseId":caseId},
			dataType:'json',
			type:'post',
			async:false,
			success:function(ret){
				if(ret.status!=1){
					return;
				}
				console.log(ret.data.responseBody)
				console.log((ret.data.responseBody!=""))
				console.log('<pre class="pre-scrollable">'+((ret.data.responseBody!="")?(JSON.stringify(JSON.parse(ret.data.responseBody), null, 2)):(null))+'</pre>')
				console.log((ret.data.responseBody!="")?(JSON.stringify(JSON.parse(ret.data.responseBody), null, 2)):(null))
				var reportDiv = '<div class="testrep-layer top-border" id="testReport">'
					+'<div class="nav-testrep">'
					+'<ul class="clearfix">'
					+'<li class="active">Request</li>'
					+'<li>Response</li>'
					+'<li>验证结果</li>'
					+'</ul>'
					+'</div>'
					+'<div class="list-testrep pre-scrollable pre-scrollable">'
					+'<div class="comdul-testrep active"  >'  //style="float:left"
					+'<ul>'
						+'<li>'
						+'<label>Url</label>'
						+'<span>'
						+'<pre class="pre-scrollable">'+ret.data.requestUrl+'</pre>'
						+'</span>'
						+'</li>'
						+'<li>'
						+'<label>Headers</label>'
						+'<span>'
						+'<pre class="pre-scrollable">'+JSON.stringify(JSON.parse(ret.data.requestHeaders), null, 2)+'</pre>'
						+'</span>'
						+'</li>'
						+'<li>'
						+'<label>Body</label>'
						+'<span>'
						+'<pre class="pre-scrollable">'+JSON.stringify(JSON.parse(ret.data.requestBody), null, 2)+'</pre>'
						+'</span>'
						+'</li>'
					+'</ul>'
					+'</div>'
					+'<div class="comdul-testrep" style="float:left">'
					+'<ul>'
						+'<li>'
						+'<label>Headers</label>'
						+'<span>'
						+'<pre class="pre-scrollable">'+JSON.stringify(JSON.parse(ret.data.responseHeaders), null, 2)+'</pre>'
						+'</span>'
						+'</li>'
						+'<li>'
						+'<label>Body</label>'
						+'<span>'
						+'<pre class="pre-scrollable">'+((ret.data.responseBody!="")?(JSON.stringify(JSON.parse(ret.data.responseBody), null, 2)):(null))+'</pre>'
						+'</span>'
						+'</li>'
					+'</ul>'
					+'</div>'
					+'<div class="comdul-testrep">'
						+'<li>'
						+'<label>验证结果</label>'
						+'<span>'
						+'<pre class="pre-scrollable">'+ret.data.passFlag+'</pre>'
						+'</span>'
						+'</li>'
					+'</div>'
					+'</div>'
					+'</div>"';
				//以弹窗形式展示报告
				var dialog = jqueryAlert({
				    'style'   : 'pc',
				    'title'   : '测试详情',
				    'content' :  reportDiv,
				    'modal'   : true,
				    'contentTextAlign' : 'left',
				    'width'   : '900px',
				    'animateType' : 'linear',
				    'buttons' :{
				    }
				})
			}
		});
		
	});
	
	//点击"开始测试"，行测试套件
	$("#starttest").click(function(){
		var suiteId =  sessionStorage.getItem("suiteId");
		var projectId = sessionStorage.getItem("projectId");
		var trs = $("table tbody tr");
		$.each(trs,function(ind,ele){
			//先清除原本的值
			$(ele).find("td:eq(1)").html("");
			$(ele).find("td:eq(3)").html("");
		});
		//后台执行套件
		$.ajax({
			url:lemon.config.global.adminUrl+"/testReport/runTest",
			headers:{"Authorization":$.cookie("sessionId")},
			data:{"suiteId":suiteId,"projectId":projectId},
			type:'post',
			dataType:'json',
			async:false,
			success:function(ret){
				//处理每一行的显示
				$.each(trs,function(ind,tr){
					//拿到每条用例的执行结果并展示
					var caseId = $(tr).find("[name='id']").val();
					if(ret!=null&&ret.status=="1"){
						$.each(ret.data,function(ind,ele){
							//根据当前tr行中的caseId去找到对应用例的执行结果
							if(caseId==ele.caseId){
								var passFlag = ele.passFlag;
								if(passFlag=="succeed"){
									$(tr).find("td:eq(1)").html("<i class=\"icon-success\"></i>");
								}else if(passFlag!=="succeed"){
									$(tr).find("td:eq(1)").html("<i class=\"icon-fail\"></i>");
								}
							}
							$(tr).find("td:eq(3)").html("<a href=\"#\" class=\"btn-testrep btn-com btn-default\">测试详情</a>");
						});
					}else{
						alert(ret.message);
					}
				});
			}
		});
			
	});
	
	$("[name='caseEditHref']").click(function(){
		var baseUrl = lemon.config.global.rootUrl;
		var menuFindurl = baseUrl+"/index/findCaseSelectedMenu";
		var caseId = $(this).parent().parent().find("[name='caseId']").val();
		var data = {"caseId":caseId};
		var apiId = $("[name='apiId']").val();
		var projectId = $("[name='projectId']").val();
		var turn2Page = baseUrl+"/case/toCaseEdit?caseId="+caseId+"&apiId="+apiId+"&projectId="+projectId;
		////跳转到对应页面，并选中对应菜单
		selectMenuAndTurn2Page(menuFindurl,data,turn2Page);
	});
	
	$("[name='apiUrlHref']").click(function(){
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
	
	
})