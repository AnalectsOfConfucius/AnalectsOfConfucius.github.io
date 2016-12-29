/**
 * 
panel：<ul>分页页码id
total：总页
pageSize：每页条数
currentPage：当前页
callFun：查询方法
 */
	function paginationFun(panel,total,pageSize,currentPage,callFun){
		var tb = [];
		var pageCount = 0;
		tb[tb.length] = "<div class='pagination'>";
		if(total && total>0){
			pageCount = parseInt(total/pageSize);//总页数
			var num = total%pageSize;
			if(num>0){
				pageCount = pageCount+1;
			}
			currentPage = currentPage ? parseInt(currentPage) : 1;
//			tb[tb.length] = "<li><a href='javascript:"+callFun+"(1)'>首页</a></li>";
			if(currentPage<=1){
				tb[tb.length] = "<a class='prev'>上一页</a>";
			}else{
				tb[tb.length] = "<a class='prev' href='javascript:"+callFun+"("+(currentPage-1)+")'>上一页</a>";
			}
			var active = "";
			if(pageCount<=5){
				for (var i = 1; i <= pageCount; i++) {
					if(currentPage==i){
						active = "current";
					}else{
						active = "";
					}
					tb[tb.length] = "<a class='"+active+"' href='javascript:"+callFun+"("+(i)+")'>"+(i)+"</a>";
				}
			}else if((pageCount-currentPage+1)>5){
				tb[tb.length] = "<a class='current' href='javascript:"+callFun+"("+currentPage+")'>"+currentPage+"</a>";
				for (var i = 1; i < 4; i++) {
					tb[tb.length] = "<a href='javascript:"+callFun+"("+(currentPage+i)+")'>"+(currentPage+i)+"</a>";
				}
				tb[tb.length] = "<span class='pagination-break'>...</span>";
				tb[tb.length] = "<a href='javascript:"+callFun+"("+pageCount+")'>"+pageCount+"</a>";
			}else{
				var snum = pageCount-4;
				for (var i = snum; i <= pageCount; i++) {
					if(currentPage==i){
						active = "current";
					}else{
						active = "";
					}
					tb[tb.length] = "<a class='"+active+"' href='javascript:"+callFun+"("+(i)+")'>"+(i)+"</a>";
				}
			}
			if(currentPage>=pageCount){
				tb[tb.length] = "<a class='next'>下一页</a>";
			}else{
				tb[tb.length] = "<a class='next' href='javascript:"+callFun+"("+(currentPage+1)+")'>下一页</a>";
			}
//			tb[tb.length] = "<a href='javascript:"+callFun+"("+pageCount+")'>尾页</a>";
		}else{
//			tb[tb.length] = "<li><a>首页</a></li>";
//			tb[tb.length] = "<li><a class='prev'>上一页</a></li>";
//			tb[tb.length] = "<li><a class='next'>下一页</a></li>";
//			tb[tb.length] = "<li><a>尾页</a></li>";
		}
		tb[tb.length] = "</div>";
		panel.html(tb.join(""));
		panel.parent().find(".allPage").text(pageCount);
	}
	/**
	 * JSON对象转String
	 * 
	 * @param o
	 * @returns {String}
	 */
	function JsonToStr(obj) {
		if (obj == null) {
			return '""';
		}
		switch (typeof (obj)) {
			default:
			case 'number':
			case 'string':
				return '"' + obj + '"';
			case 'object': {
				if (obj instanceof Array) {
					var strArr = [];
					var len = obj.length;
					for ( var i = 0; i < len; i++) {
						strArr.push(JsonToStr(obj[i]));
					}
					return '[' + strArr.join(',') + ']';
				} else {
					var arr = [];
					for ( var i in obj) {
						arr.push('"' + i + '":' + JsonToStr(obj[i]));
					}
					return "{" + arr.join(',') + "}";
				}
			}
		}
		return '""';
	}
/**
 * null,undefind转""
 * @param v
 * @returns {String}
 */
function nullToStr(v){
	if(!v && v!=0){
		v = "";
	}
	return v;
}
/**
 * 上传图片
 */
function loadimg(num,panel){
	var n = $("#"+panel).find(".loadimgdiv img").length;
	
	$("#"+panel).parent().find(".upload").eq(n).trigger("click");
}
/**
 * 上传图片
 */
function previewImage(file,num,panel,mw,mh) {
	var MAXWIDTH = mw;
	var MAXHEIGHT = mh;
	var div = document.getElementById(panel);
	var n = $("#"+panel).find(".loadimgdiv img").length;
	if (n >= num) {
//		showwin_msg("系统提示","最多上传"+num+"张");
		return;
	}
	if (file.files && file.files[0]) {
		
		$("#"+panel).find(".addimg").before('<div class="loadimgdiv"><img ><br><a onclick="delimg(this,'+num+',\''+panel+'\')">删除</a></div>');
		var img = $(".loadimgdiv").eq(n).find("img");
		img[0].onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img[0].offsetWidth, img[0].offsetHeight);
            img.width(rect.width);
    		img.height(rect.height);
//          img.style.marginLeft = rect.left+'px';
//          img.style.marginTop = rect.top+'px';
        }
		
		var reader = new FileReader();
		reader.onload = function(evt) {
			img.attr("src",evt.target.result);
		}
		reader.readAsDataURL(file.files[0]);
		
		$(file).after('<input type="file" name="file" onchange="previewImage(this,'+num+',\''+panel+'\','+mw+','+mh+')" class="upload" style="display:none;"/>');
	} else {
		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		file.select();
		var src = document.selection.createRange().text;
		div.innerHTML = '<img id="imghead">';
		var img = document.getElementById('imghead');
		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth,
				img.offsetHeight);
		status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
		div.innerHTML = "<div id='divhead' style='width:" + rect.width
				+ "px;height:" + rect.height + "px;margin-top:" + rect.top
				+ "px;margin-left:" + rect.left + "px;" + sFilter + src
				+ "\"'></div>";
	}
}
/**
 * 上传图片
 */
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
/**
 * 删除图片
 */
function delimg(ob,num,panel){
	var n = $("#"+panel+" .loadimgdiv").index($(ob).parent());
	$(ob).parent().remove();
	$("#"+panel).parent().find(".upload").eq(n).remove();
	var len = $("#"+panel).parent().find(".upload").length;
	if(len<=0){
		$("#preview").parent().append('<input type="file" onchange="previewImage(this,'+num+')" class="upload hiden"/>');
	}
}
/**
 * 图片预览
 * @param imgob
 */
function viewimg(src){
	var ob = document.getElementById("imgWin");
	if(ob){
		$(ob).find("img").attr("src",src);
		$(ob).show();
	}else{
		var divId = "imgWin";
		var tb = []
		tb[tb.length] = '<div class="tcbg" onclick="javascript:$(\'#imgWin\').hide();"></div>';
		tb[tb.length] = '<div class="tcxx" style="">';
		tb[tb.length] = '<img alt="" src="'+src+'" width="100%">';
		tb[tb.length] = '</div>';
		var content = tb.join("");
		var mesW = document.createElement("div");
		mesW.id = divId;
		mesW.className = divId;
		mesW.innerHTML = content;
		document.body.appendChild(mesW);
	}
	var maxw = $(window).width()*0.9;
	var maxh = $(window).height()*0.9;
	
	var img = new Image();
	img.src = $("#imgWin").find("img").attr("src");
	var w = img.width;
	var h = img.height;
	var rect = clacImgZoomParam(maxw,maxh,w,h);
	var timg = $("#imgWin").find("img");
	timg.width(rect.width);
	timg.height(rect.height);
	var t = -(rect.height/2);
	var l = -(rect.width/2);
	$("#imgWin").find(".tcxx").css({'width':rect.width,'height':rect.height,'margin-left':l,'margin-top':t});
}
/**
 * checkbox单选
 */
function checkFun(ob,inpt){
	ob.find("input[type='checkbox']").bind("click",function(){
		ob.find("input[name='"+inpt+"']").val(0);
		var ch = $(this).is(':checked');
		$(this).parent().find("input[name='"+inpt+"']").val(1);
		if(ch){
			ob.find("input[type='checkbox']").val(0);
			$(this).val("1");
			var v = 1;
			var check = ob.find("input[type='checkbox']:checked");
			if(check.length>1){
				check.each(function(i){
					var v1 = $(this).val();
					if(v!=v1){
						$(this).attr("checked",false);
					}
				});
			}
		}else{
			$(this).val("0");
			$(this).parent().find("input[name='"+inpt+"']").val(0);
		}
	});
}
/**
 * 删除图片
 * @param ob
 */
function imgdel(ob,url){
	//单选
	ob.find(".delete").bind("click",function(){
		var id = $(this).attr("data-val");
		var imgUrl = $(this).attr("data-url");
		var panel = $(this).parent();
		$.ajax({
        	url:url,
        	data:{'id':id,'imgUrl':imgUrl},
        	type:'POST',
        	cache:false,
        	async:false,
        	dataType:'json',
        	success:function(data) {
        		if (data.isError === "1") {
                    $.messager.alert("信息", data.msg, "info");
                } else {
                	panel.remove();
                }
        	},
        	error : function() {
        		$.messager.alert("信息", "系统错误，请联系系统管理员", "info");
        	}
		});
	});
}
/**
 * 跳转页面
 * @param url
 */
function goToPage(url){
	window.location.href = url;
}
/**
* 从 file 域获取 本地图片 url
*/
function getFileUrl(sourceId) {
	var url;
	if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
		url = document.getElementById(sourceId).value;
	} else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
		url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
	} else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
		url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
	}
	return url;
}

/**
* 将本地图片 显示到浏览器上
*/
function preImg(sourceId, targetId, mw, mh) {
	var url = getFileUrl(sourceId);
	var imgPre = document.getElementById(targetId);
//	imgPre.onload = function(){
//		var rect = clacImgZoomParam(mw, mh, imgPre.offsetWidth, imgPre.offsetHeight);
//		imgPre.width = rect.width;
//		imgPre.height = rect.height;
//	}
	imgPre.src = url;
	$('#'+sourceId).parent().find("input[name='picFlag']").val("1");
}

//内容省略
function substr(w,cls){
    var num = w/8;
    var len = cls.length;
    for (var i = 0; i < len; i++) {
        var text = cls.eq(i);
        var str = text.html();
        if(str.length > num ){
            text.html(str.substring(0,num )+"...");
        }
    }
}
 //删除 
        function delFun(id) {
            wxm.dialog({
                type : 'confirm',
                message : "确定是否删除？",
               
            });
        }
     