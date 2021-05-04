//选择测试环境展开收起
$('.seltit-testass').click(function(){
	$(this).toggleClass('active');
	if($(this).hasClass('active')){
		$(this).siblings().addClass('active');
	}else{
		$(this).siblings().removeClass('active');
	}
})

//测试报告弹框导航切换
$('body').on('click','.nav-testrep li',function(){
	$(this).toggleClass('active').siblings().removeClass('active');
	var index = $(this).index(); 
	$(this).parents('.nav-testrep').siblings().children().eq(index).addClass('active').siblings().removeClass('active');
});

$(function(){
	//添加接口的弹窗
	$('.data-testass').on('click','.btn-testrep',function(){
		var dialog = jqueryAlert({
		    'style'   : 'pc',
		    'title'   : '测试报告',
		    'content' :  $('#testReport'),
		    'modal'   : true,
		    'contentTextAlign' : 'left',
		    'width'   : '900px',
		    'animateType' : 'linear',
		    'buttons' :{
		    }
		})
	});
})