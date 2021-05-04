//顶部个人中心伸展
$(".btn_stretch").click(function(){
	$(".ctrlist-top").slideToggle("slow");
})

//接口列表一级菜单的切换
$('#listInter').on('click','.menu-interlist a',function(){
	//当前一级菜单
	var $li = $(this).parent().parent();
	//二级菜单ul
	var $options = $(this).parent().siblings("ul.tmenu-interlist");
	//如果当前一级菜单是选中状态
	if($li.hasClass("active")){
		//当前一级菜单下的对应二级菜单非全部展开状态
		if(!$options.hasClass("active")){
			//没展开，则展开
			$options.addClass("active")
		}else{//当前一级菜单下的对应二级菜单已经是全部展开状态
			//已展开，那么则收起
			$options.removeClass("active");
		}
	}else{//如果当前一级菜单是未选中状态，则选中
		$li.addClass("active");
		//当前一级菜单下的对应二级菜单全部展开
		$options.addClass("active");
	}
	//所有的兄弟一级菜单移除选中
	$li.siblings().removeClass("active");
	//收起所有二级菜单
	$li.siblings().children("ul.tmenu-interlist").removeClass("active");
	//移除选中效果
	$li.siblings().children("ul.tmenu-interlist").children("li").removeClass("active");
});


//接口列表二级菜单的交互逻辑
$(".tmenu-interlist").on('click','li a',function(){
	var $currentSecondLevelMenu = $(this).parent('li');
	$currentSecondLevelMenu.addClass("active");
	$(this).parent('li').siblings().removeClass('active');
});

//接口列表一级菜单的hover效果
$('#listInter .menu-interlist a').hover(function(e){
	if(!e.target === 'A')return;
	var $handle = $(this).children('.hanmenu-interlist');
	if($handle){
		$handle.addClass('active');
	}
},function(e){
	if(!e.target === 'A')return;
	var $handle = $(this).children('.hanmenu-interlist');
	if($handle){
		$handle.removeClass('active');
	}
});

//接口列表二级菜单的hover效果
$('#listInter .tmenu-interlist a').hover(function(e){
	if(!e.target === 'A')return;
	var $handle = $(this).children('.hantmenu-interlist');
	if($handle){
		$handle.addClass('active');
	}
},function(e){
	if(!e.target === 'A')return;
	var $handle = $(this).children('.hantmenu-interlist');
	if($handle){
		$handle.removeClass('active');
	}
});
