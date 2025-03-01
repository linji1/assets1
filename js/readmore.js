$(function(){
	var widHeight = $(window).height();
	var artHeight = $('.text').height();
	if(artHeight>(widHeight*2)){
		$('.text').height(widHeight*2-285).css({'overflow':'hidden'});
		var article_show = true;
		$('.read_more_btn').on('click',bindRead_more);
	}else{
		article_show = true;
		$('.readall_box').hide().addClass('readall_box_nobg');
	}
	function bindRead_more(){
		if(!article_show){
			$('.text').height(widHeight*2).css({'overflow':'hidden'});
			$('.readall_box').show().removeClass('readall_box_nobg');
			article_show = true;
		}else{
			$('.text').height("").css({'overflow':'hidden'});
			$('.readall_box').show().addClass('readall_box_nobg');
			$('.readall_box').hide().addClass('readall_box_nobg');
			article_show = false;
		}
	}
})