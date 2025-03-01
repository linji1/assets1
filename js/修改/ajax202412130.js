$.fn._serialize = function () {
        var da = this.serializeArray();
        var $elrc = $('input[type=checkbox]', this);
        $.each($elrc, function() {
                if ($("input[name='" + this.name + "']:checked").length == 0) {
                    da.push({name: this.name, value:0});
				} 
        });  
		return jQuery.param(da);
}

function ckradd(e,f){
  var val=$("#"+e+"pcontent").val();
  if(val.length<5 || val.length>999999999999999){
	errmsg("评论内容必须在5-999999999999999字之间！");
   $("#"+e+"pcontent").focus();
   return false;  	  
  }
  var code=$("#pcode").val();
  if (f=='1'&&code==''){	
      errmsg("请正确输入右侧答案！");$("#pcode").focus();return false; 
 } 
 return true
} 

function errmsg(s,el){ 
   if(!arguments[1]) el = "";
   $(el+'#errmsg').show().text(s).fadeOut(2000);
}
function myalert(str){
    layer.open({
    content: str
    ,btn: '确定'
    });
}  
function mymsg(str){
    layer.open({
    content: str
    ,skin: 'msg'
    ,time: 2 //2秒后自动关闭
  });
}
 
function StopButton(id,s){
	$("#"+id).attr("disabled",true);　
	$("#"+id).text("提交("+s+")");
	if(--s>0){
		 setTimeout("StopButton('"+id+"',"+s+")",1000);
	}
	if(s<=0){
		$("#"+id).text(' 提 交 ');
	    $("#"+id).removeAttr("disabled");
	} 
} 
function addpl(id,f){	
	var ck = ckradd('',f);
	if (ck ===false)
	{
		return ck;
	}
	 //var npname = $("#pname").val(),npurl = $("#purl").val(),nplog = $("#plog").val(),pmail = $("#pmail").val(),nscode=$("#pcode").val();
	 var pldata = $("#formpl").serialize();
	 //console.log(pldata);
	 StopButton('add',9);
	 $.post("./app/class/ajax.php?act=addpl&id="+id, pldata , function(data) {	 
     if(data.result == '200')
	 {	
		 pldata += "&r="+encodeURIComponent(window.location.href);
		 $.post("./app/class/ajax.php?act=pltz&d=addpl&id="+id,pldata);
		 $(".comment_list").append(data.message);$("#pcontent").val('');$("#pcode").val('');reloadcode();
		 errmsg('');	 	 
	 }else{
	     errmsg(data.message);$("#pcode").val('');reloadcode();$("#pcode").focus();
	 }											 
	},'json');		
}
function repl(pid,cid,pmail){
	var ore = $('#Ctext-'+pid).find('.re span').text();
	var x = 1;
	if (ore == ""){x=0;}
    var rebox = '<div class="rebox"><textarea required="required" placeholder="请输入回复内容..." name="rlog" rows="3" id="rlog" class="input_narrow relog">'+ore+'</textarea> <button name="re" id="re" class="btn" onclick="plsave('+cid+','+pid+','+x+',\''+pmail+'\')"> 回 复 </button> <button onclick="capl()" class="btn"> 取 消 </button></div>';
	$('.rebox').remove();
	$('#Ctext-'+pid).append(rebox);
}
function capl(){
	$('.rebox').remove();
}
function plsave(id,pid,x,pmail){	
	var rlog = $("#rlog").val();
	if(rlog==''){
		$("#rlog").focus();
		return false;
	}
	$.post("./app/class/ajax.php?act=plsave&id=" + pid + "&cid=" + id, {
		rcontent: rlog
	}, function(data) {
        capl();
		if (data.result == '200') {
			if(x==1){
				$('#Ctext-'+pid).find('.re span').text(rlog);
			}else{
				$('#Ctext-'+pid).append('<p class="re"><strong style="color:#C00">回复</strong>：<span>'+rlog+'</span></p>');
			}
			$.post("./app/class/ajax.php?act=pltz&d=plsave&id="+pid,{rcontent:rlog,pmail:pmail,r:window.location.href});			 
		} else {
			myalert(data.message);
		}
	}, 'json');}

function ckpass(id){	
	var ps= $("#password").val();
	if (ps!=''){
	$.post("./app/class/ajax.php?act=ckpass&id="+id, {ps:ps}, function(data) {if(data.result=='200'){ $("#article .text").html(data.message)}else{myalert(data.message);}},'json');}else{
	$("#password").focus();
	}	
}

function DotRoll(elm) {
    $("body,html").animate({ scrollTop: $(elm).offset().top }, 500);
}

function reloadcode(){$('#codeimg').attr('src','./app/class/codes.php?t='+Math.random());}

$(document).ready(function () {

$('.textPost').on("click",function(e){	
   window.location.href = $(this).data('url');
});

$('#menu_toggle').on("click",function(e){
   e.preventDefault();
   $('#menu').toggleClass('close');
   $('.collapse').slideToggle();
});

$('#pcontent').on("focus",function(e){    
   $('#pl_other').fadeIn();   
});
 
/*$(window).resize(function(){
	 var w = $(window).width();
	 if(w>650) {$('#nav').show();}else{
       $('#menu').removeClass('close');
	   $('.collapse').hide();
	 } 
});
*/
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面的URL，并去掉子域名部分
    var currentUrl = new URL(window.location.href);
    var baseUrl = currentUrl.protocol + "//" + currentUrl.hostname.split('.').slice(-2).join('.') + currentUrl.pathname + currentUrl.search + currentUrl.hash;
    console.log("基础URL:", baseUrl);

    /**
     * 高亮显示活动的链接
     * @param {NodeList} links - 一个包含要检查的链接的HTMLCollection或NodeList
     */
    function highlightActiveLink(links) {
        Array.from(links).some(function(link) {
            try {
                // 获取链接的URL，并解析它
                var linkHref = new URL(link.href);
                // 去掉子域名部分
                var baseLinkHref = linkHref.protocol + "//" + linkHref.hostname.split('.').slice(-2).join('.') + linkHref.pathname + linkHref.search + linkHref.hash;
                console.log("基础链接URL:", baseLinkHref);

                // 检查链接的URL是否与当前页面的基础URL完全匹配
                if (baseLinkHref === baseUrl) {
                    console.log("找到匹配的链接:", baseLinkHref);
                    // 如果找到匹配的链接，添加'on'类并退出循环
                    link.classList.add("on");
                    return true; // 找到匹配后退出.some()循环
                } else {
                    console.log("未找到匹配的链接:", baseLinkHref);
                }
            } catch (error) {
                // 如果href属性无效，捕获错误
                console.error("无效的href属性: ", link.href);
            }
            return false;
        });
    }

    // 定义要检查的链接的选择器
    var selectors = ['#nav li a', '.layout-footer .bottom_nav a', '.dropdown-content a'];
    selectors.forEach(function(selector) {
        console.log("正在检查选择器:", selector);
        // 对每个选择器调用highlightActiveLink函数
        highlightActiveLink(document.querySelectorAll(selector));
    });
});

})