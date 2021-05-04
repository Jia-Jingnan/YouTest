(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = { 
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 此处不可空白",
                    "alertTextCheckboxMultiple": "* 请选择一个项目",
                    "alertTextCheckboxe": "* 您必须钩选此栏",
                    "alertTextDateRange": "* 日期范围不可空白"
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "containToday": { 
                    "func": function(field, rules, i, options){
                    	var d = new Date();
                		var nowDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                		//转换时间格式
                		var now = new Date(nowDate.replace(/-/g,"/"));
                		//获取页面查询时间
                		var inputDate = field.val();
                		var input = new Date(inputDate.replace(/-/g,"/"));
                        return (input >= now) ? true : false;
                    },
                    "alertText": "* 日期晚于今天(含今天)"
                },
                "today": { 
                    "func": function(field, rules, i, options){
                    	var d = new Date();
                		var nowDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                		//转换时间格式
                		var now = new Date(nowDate.replace(/-/g,"/"));
                		//获取页面查询时间
                		var inputDate = field.val();
                		var input = new Date(inputDate.replace(/-/g,"/"));
                        return (input === now) ? true : false;
                    },
                    "alertText": "* 日期必须为当前日期(今天)"
                },
                "depositMoney": { 
                    "func": function(field, rules, i, options){
                		var result = true;
                    	var choose = $("[name='isReservation']").val();
                		if(choose=="1"){
                			var value = field.val();
                			if(value==null||value==""){
                				//返回前告诉验证框架必须要填入数据
                        		rules.push('required');
                				result = false;
                			}
                		}
                        return result;
                    },
                    "alertText": "【预定课程】情况下，必须填写：定金金额"
                },
                "depositTime": { 
                	"func": function(field, rules, i, options){
                		var result = true;
                		var choose = $("[name='isReservation']").val();
                		if(choose=="1"){
                			var value = field.val();
                			if(value==null||value==""){
                				//返回前告诉验证框架必须要填入数据
                				rules.push('required');
                				result = false;
                			}
                		}
                		return result;
                	},
                	"alertText": "【定金预定课程】情况下，必须填写：定金支付时间"
                },
                "signUp": {
                	"func": function(field, rules, i, options){
                		var result = true;
                    	var choose = $("[name='isReservation']").val();
                		if(choose=="2"){
                			var value = field.val();
                			if(value==null||value==""){
                				//返回前告诉验证框架必须要填入数据
                        		rules.push('required');
                				result = false;
                			}
                		}
                        return result;
                    },
                    "alertText": "【现在报名学习】情况下，必须选择：缴费类型"
                },
                "fullpaymentRestrict": {
                	"func": function(field, rules, i, options){
                		var result = true;
                		var paymentType = $("[name='paymentType']").val();
                		if(paymentType=="1"){
                			var value = field.val();
                			if(value==null||value==""){
                				//返回前告诉验证框架必须要填入数据
                				rules.push('required');
                				result = false;
                			}
                		}
                		return result;
                	},
                	"alertText": "【全款】情况下，请填写金额"
                },
                "divideRestrict": {
                	"func": function(field, rules, i, options){
                		var result = true;
                		var paymentType = $("[name='paymentType']").val();
                		if(paymentType=="2"){
                			var value = field.val();
                			if(value==null||value==""){
                				//返回前告诉验证框架必须要填入数据
                				rules.push('required');
                				result = false;
                			}
                		}
                		return result;
                	},
                	"alertText": "【分期】情况下，此项不可为空"
                },
                "paymentTimeRestrict": {
                	"func": function(field, rules, i, options){
                		var result = true;
                		var paymentType = $("[name='paymentType']").val();
                		if(paymentType!==""){
                			var value = field.val();
                			if(value==null||value==""){
                				//返回前告诉验证框架必须要填入数据
                				rules.push('required');
                				result = false;
                			}
                		}
                		return result;
                	},
                	"alertText": "请填写支付时间"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* 无效的 ",
                    "alertText2": " 日期范围"
                },
                "dataRange":{
                	"func":function(field,rules,i,options){
                		var toId = field.attr("id");
                		var fromId = "";
                		if(toId.indexOf("To")!=-1){
                			fromId = toId.substring(0,toId.indexOf("To"))+"From";
                		}
                		if(toId.indexOf("Max")!=-1){
                			fromId = toId.substring(0,toId.indexOf("Max"))+"Min";
                		}
                		var fromVal = $("#"+fromId).val();
                		var toVal = $("#"+toId).val();
                		if(isNaN(fromVal)){return false};
                		if(isNaN(toVal)){return false};
                		fromVal = String.prototype.parseToNumber(fromVal);
                		toVal = String.prototype.parseToNumber(toVal);
                		if(toVal>fromVal){
                			return true;
                		}else{
                			return false;
                		}
                	},
                	"alertText":"* 无效的取值范围"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* 无效的 ",
                    "alertText2": " 时间范围"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* 最少",
                    "alertText2": "个字符"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* 最多",
                    "alertText2": "个字符"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* 座机号码，手机号码必须填一项"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* 最小值为 "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* 最大值为 "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* 日期必需早于 "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* 日期必需晚于 "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* 最多选取 ",
                    "alertText2": " 个项目"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* 请选择 ",
                    "alertText2": " 个项目"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* 请输入与上面相同的密码"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* 无效的信用卡号码"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                    "alertText": "* 无效的电话号码"
                },
                "phones": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^(([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?(,(?!$)|$))+$/,
                    "alertText": "* 无效的电话号码"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "* 邮件地址无效"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* 不是有效的整数"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* 无效的数字"
                },
                "nanNumber": {
                	// Number, including positive, negative, and floating decimal. credit: orefalo
                	"regex": /[^0-9]/,
                	"alertText": "* 不能都为数字"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* 无效的日期，格式必需为 YYYY-MM-DD"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* 无效的 IP 地址"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    /*"alertText": "* Invalid URL"*/
                    "alertText": "* 无效的Url"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* 只能填数字"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* 只接受英文字母大小写"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* 不接受特殊字符，必须是由数字或字母组成"
                },
                "userNameVali": {
                    "regex": /^(?!_)[_0-9a-zA-Z]+$/,
                    "alertText": "* 只能输入字母、数字、下划线，不能首输入下划线"
                },
                "ajaxCheckUserNameRepeat": { 
                	  'url': "/ninmeng/mvc/api/user/ajaxCheckUserNameRepeat.json", /* 验证程序地址 */ 
                	  'extraData': '', /* 额外参数 */ 
                	  'alertText': '邮箱已被注册'
                	}, 
            	"ajaxCheckNickNameRepeat": { 
            		'url': "/ninmeng/mvc/api/user/ajaxCheckNickNameRepeat.json", /* 验证程序地址 */ 
            		'extraData': '', /* 额外参数 */ 
            		'alertText': '昵称已被注册',
            	}, 
            	"ajaxCheckPerRegImgCode": {
            		"url":"/etrade/mvc/basic/account/api/media/checkPersonRegisterImgCode.json",
            		"alertText":"图形码输入错误",
            	},
            	"ajaxCheckOrgRegImgCode": {
            		"url":"/etrade/mvc/basic/account/api/media/checkEnterpriseRegisterImgCode.json",
            		"alertText":"图形码输入错误",
            	},
            	// --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* 此名称已被其他人使用",
                    "alertTextLoad": "* 正在确认名称是否有其他人使用，请稍等。"
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 此帐号名称可以使用",
                    "alertText": "* 此名称已被其他人使用",
                   
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* 此名称可以使用",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 此名称已被其他人使用",
                    // speaks by itself
                    "alertTextLoad": "* 正在确认名称是否有其他人使用，请稍等。"
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "* 此名称已被其他人使用",
	                    // speaks by itself
	                    "alertTextLoad": "* 正在确认名称是否有其他人使用，请稍等。"
	                },
                "validate2fields": {
                    "alertText": "* 请输入 HELLO"
                },
	            //tls warning:homegrown not fielded 
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* 无效的日期格式"
                },
                //tls warning:homegrown not fielded 
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* 无效的日期或时间格式",
                    "alertText2": "可接受的格式： ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM 或 ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            },
	            //客户基础数据管理验证正则
	            "notSpecialCharacters":{
	            	 "regex":/^[\u4E00-\u9FA5a-zA-Z0-9_]+$/,
	            	 "alertText": "*不能输入特殊字符"
	            },
	            "notSpecialChars":{
	            	 "regex":/^[\u4E00-\u9FA5a-zA-Z0-9_、 ]+$/,
	            	 "alertText": "*不能输入特殊字符"
	            },
	            "delayDate": {
                    "regex": /^\+?[1-9][0-9]*$/,
                    "alertText": "*非零的正整数"
                },
                "debtlimted": {
                    "regex": /^([1-9][\d]{0,7}|0)?$/,
                    "alertText": "*欠款额度请输入整数"
                },
                "telePhone": {
//                    "regex": /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
                    "regex": /^([0-9]{3,4}-)?[0-9]{7,8}$/,
                    "alertText": "*固定电话格式不对如：XXXX-XXXXXXXX"
                },
                "mobilePhone": {
                    "regex": /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                    "alertText": "*手机号码格式不对"
                },
                "cardid": {
                	"regex": /(^\d{15}$)|(^\d{17}(\d|x|X)$)/,
                	"alertText": "*身份证号格式错误"
                },
                
                "delayNumber": {
                    "regex": /^\d+(\.\d+)?$/,
                    "alertText": "*非负数字,保留小数点后两位"
                    },
                
                "systemDecimal": {
                	"regex": /^[0-9]+(.[0-9]{1,2})?$/,
                	"alertText": "*非负数字,保留小数点后两位"
                },
                
                "licenseId": {
                    "regex": /(^\d{15}$)|(^\d{17}(\d|x|X)$)/,
                    "alertText": "*驾驶证号格式错误"
                    },
                "fax": {
                	"regex": /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
                	"alertText": "*传真号码格式错误"
                },
                "qq": {
                	"regex": /^[1-9]{1}[0-9]{4,10}$/,
                	"alertText": "*QQ号最多11位数字(开头非0)"
                },
                "postalcode": {
                	"regex": /^[1-9]\d{5}$/,
                	"alertText": "*邮编必须为6位数字(开头非0)"
                },
                "length": {
                	"regex": "none",
                	"alertText": "* 请输入",
                	"alertText1": "个长度的字符"
                },
                "contacts": {
                	"regex": /^([\u4E00-\u9FA5]+([·\s][\u4E00-\u9FA5]+)*)|([\a-zA-Z]+([·\s][a-zA-Z]+)*)$/,
                	"alertText": "* 姓名中存在非法字符"
                },
                //座机的三到四位区号
                "tele_district_code": {
                	"regex": /^\d{3,4}$/,
                	"alertText": "* 请填写一个3到4位的区号"
                },
                //座机区号后的八位号码
                "tele_number_after_district_code": {
                	"regex": /^\d{6,8}$/,
                	"alertText": "* 请填写一个6-8位长度的号码"
                },
                //组织机构代码
                "orgCode": {
                	"regex": /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}$/,
                	"alertText": "* 编号格式为：8位数字或字母-1位数字或字母,例：12345678-8."
                },
                //企业营业执照编号
                "business_registration_code": {
                	"regex": /^\d{15}$/,
                	"alertText": "* 请填写一个由数字组成，长度为15的编号"
                },
                //道路运输从业资格证
                "transportation_licence_code": {
                	"regex": /^\d{19}$/,
                	"alertText": "* 请填写一个由数字组成，长度为19的编号"
                },
                //道路运输证编号
                "Road_transport_certificate_code": {
                	"regex": /^\d{12}$/,
                	"alertText": "* 请填写一个由数字组成，长度为12的编号"
                },
                "past_date": {
                	"func": function(field, rules, i, options){
                    	var d = new Date();
                		var nowDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                		//转换时间格式
                		var now = new Date(nowDate.replace(/-/g,"/"));
                		//获取页面查询时间
                		var inputDate = field.val();
                		var input = new Date(inputDate.replace(/-/g,"/"));
                        return (input < now) ? true : false;
                    },
                	"alertText": "* 日期必须早于当前日期"
                },
                "future_date": {
                	"func": function(field, rules, i, options){
                		//获取页面查询时间
                		var inputDate = field.val();
                		if(!inputDate){
                			return true;
                		}
                    	var d = new Date();
                		var nowDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                		//转换时间格式
                		var now = new Date(nowDate.replace(/-/g,"/"));
                		var input = new Date(inputDate.replace(/-/g,"/"));
                        return input > now;
                    },
                	"alertText": "* 日期必须晚于当前日期"
                },
                
                //密码必须是字母和数字同时有，支持下划线
                "enterp_username":{
                	"regex":"^[a-zA-Z]+\\w+$",
                	"alertText":"* 用户名必须以字母开头，只能包含字母、数字和下划线"
                },
                "enterp_name":{
                	"regex":"^([a-zA-Z]|[\u4e00-\u9fa5]{0,})+$",
                	"alertText":"* 企业名只能是字母或中文或者两者的组合(不支持特殊字符)"
                },
                //密码必须是字母和数字同时有，支持下划线
                "password":{
                	"regex":"^[A-Za-z0-9]{6,20}$",
                	"alertText":"* 密码只能是6-20位字母或者数字"
                },
              //整数或者精度为两位的小数，(0-999999.99)
                "price":{
                	"regex":"^[0-9]+\.{0,1}[0-9]{0,2}$",
                	"alertText":"* 价格必须是大于零的整数或者小数(精度为两位)"
                },
                //整数或者精度为4位的小数，(0-999999.9999)
                "priceWithPrecision4":{
                	"regex":"^[0-9]+\.{0,1}[0-9]{0,4}$",
                	"alertText":"* 价格必须是大于零的整数或者小数(精度为四位)"
                },
                "load":{
                	"regex":"^[0-9]+\.{0,1}[0-9]{0,2}$",
                	"alertText":"* 载重必须是大于零的整数或者小数(精度为两位)"
                },
                "excludeChinese":{
                	"regex":"^[^\u4e00-\u9fa5]*$",
                	"alertText":"* 不能含有中文字符"
                },
                "maxEditorLength":{
                	"func":function(field,rules,i,options){
                		return parseInt(field.val()) > 2000?false:true;
                	},
                	"alertText":"* 最大长度为2000"
                },
                //驾龄
                "driverAge":{
                	"regex":/^[1-9]{1}[0-9]{0,1}$/,
                	"alertText":"驾龄是不大于2位的整数"
                },
                "isOpenDist": { //是否为实地认证开通地区
                    "func": function(field, rules, i, options){
                    	var addrCode = $(field).val();
                    	var len =  $('.btn-con [addrcode="'+addrCode+'"]').length;
                        return len > 0 ? true : false;
                    },
                    "alertText": "* 未开通区域不接受实地认证，请等待开通"
                },
                //整数或者小数，(0-999999.99)
                "numberLimit2":{
                	"regex":"^[0-9]+\.{0,1}[0-9]{0,2}$",
                	"alertText":"* 必须是大于零的整数或者小数(精度为两位)"
                },
                //整数或者小数，(0-999999.9)
                "numberLimit1":{
                	"regex":"^[0-9]+\.{0,1}[0-9]{0,1}$",
                	"alertText":"* 必须是大于零的整数或者小数(精度为一位)"
                },
                "numberLimit4":{
                	"regex":"^[0-9]+\.{0,1}[0-9]{0,4}$",
                	"alertText":"* 必须是大于零的整数或者小数(精度为四位)"
                },
                "numberLimit64":{
                	"regex":"^((0)|([1-9]\\d{0,5})|(\\d{1,6}\\.\\d{1,4}))$",
                	"alertText":"* 整数部分最多6位，小数部分最多4位"
                },
                "numberLimit82":{
                	"regex":"^((0)|([1-9]\\d{0,7})|(\\d{1,8}\\.\\d{1,2}))$",
                	"alertText":"* 整数部分最多8位，小数部分最多2位"
                },
                "contactorName":{
                	"regex": "^(([\u4e00-\u9fa5]+)|([A-Za-z]+))$",
                	"alertText": "* 联系人姓名只能是字母或者汉字"
                },
                "lineName":{
                	"regex":"^[\u4E00-\u9FA5a-zA-Z_]+[\u4E00-\u9FA5a-zA-Z0-9_]*$",
                	"alertText": "* 线路名称要以中文、字母或者下划线开头，不能包含特殊字符，不能全部是数字"
                },
               //座机号码最多由20个数字组成
                "phoneNumber":{
                	 "regex": /^[0-9]{0,20}$/,                    
                	"alertText":"座机号码最多由20个数字组成"                			
                }
            };
            /**
             * 自定义长度
             */
            function length(field, rules, i, options){
        		var len = field.val().length;
        		var length = rules[i+1].split('_')[1];
        		if(len != length){
        			var rule = options.allrules.length;
        			return rule.alertText + length + rule.alertText1;
        		}
            };
            window["length_20"] = length;
                    
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);
