$('html').css('font-size', $(window).width()/20);
// 导航栏添加active
var href = window.location.href.split('/')[window.location.href.split('/').length-1];
$('.header .nav li a').each(function(){
    if($(this).attr('href') == href){
        $(this).addClass('active')
        if($(this).parent().hasClass('menu')){
            $(this).parent().siblings('a').addClass('active')
        }
    }
})
// 底部导航栏添加active
$('.footer .nav a').each(function(){
    if($(this).attr('href') == href){
        $(this).addClass('active')
    }
})
//加载完成
$(document).ready(function() {

    //回到顶部
	$(window).scroll(function() {
		if($(window).scrollTop() >= 500){
			$('.actGotop').fadeIn(300);
		}else{
			$('.actGotop').fadeOut(300);
		}
	});
	$('.actGotop').click(function(){
	    $('html,body').animate({scrollTop: '0px'}, 800);
    });

    // 移动端导航栏效果
    var nav_height = $('.mobile_nav').outerHeight();
    $('.mobile_nav').height('0');

    $('.nav_btn').click(function(){
        if($('.mobile_nav').height() > 0){
            $('.mobile_nav').animate({height: '0'}, 500,function(){
                $(this).hide();
                $('.menu').css('height','0').hide();

            })
        }else{
            $('.mobile_nav').show().animate({height: nav_height}, 500);
        }
    })
    $('.mobile_nav li').eq(3).click(function(){
        $('.mobile_nav').css('height', 'auto');
        $('.menu').show().animate({height: '160px'}, 500)
    })

    //移动端解决方案页面选项卡
    $('.nav_solution a').click(function(){
        $('.nav_solution a').each(function(){
            $(this).removeClass('active')
        })
        $('.plan').each(function(){
            $(this).removeClass('active')
        })
        $(this).addClass('active');
        $('.plan').eq($(this).index()).addClass('active');
    })

    //
    var iwidth = $(window).width()/(1920/706);
    $('.overshadow').height(iwidth);
    $('aside').height(iwidth);

    //联系我们页面高度
    if($('.page .nav').length > 0){
        var sHeight = $(window).height()-$('.page .nav').offset().top-$('.page .nav').outerHeight()-$('footer').height();
        $('.page .content').css('min-height',sHeight);
        $('.page .join_us').css('min-height',sHeight);
    }


    $('.nav li').eq(3).click(function() {
        $('.menu').toggle();
    });
    $('.pc_wrap .join_us li').click(function(){
        $('.pc_wrap .join_us li .join_con').hide()
        $(this).find('.join_con').show()
    })
    $('.join_con').click(function(e){e.stopPropagation();})

    var jHeight = $(window).height()-($('header').height()+$('.phone_wrap .us_wrap h2').height()+$('footer').height())
    $('.phone_wrap .join_us').css('min-height',jHeight);
    $('.phone_wrap .join_us h3').click(function(){
        $('.phone_wrap .join_us .join_con').hide()
        $(this).siblings('.join_con').toggle()

    })

    //解决方案页面背景切换
    $('.solution_tab a').click(function(){
        var last_index ;
        var _this = $(this);
        var _index = $(this).index();
        $('.solution_tab a').each(function(){
            if($(this).hasClass('active')){
                last_index = $(this).index();
            }
        })
        if(_index !== last_index){
            _this.addClass('active');
            $('.solution_tab a').eq(last_index).removeClass('active');
            $('.solution_list').children('li').eq(last_index).fadeOut();
            $('.solution_list').children('li').eq(_index).fadeIn();
        }
        var img_arr = ['url("../img/bg-one-min.png")','url("../img/bg-two-min.png")','url("../img/bg-two-min.png")','url("../img/bg-four-min.png")']
        $('.solution_wrap').css('background-image',img_arr[_index]);

        if(_index = 3){
            var map = new BMap.Map("map");
            var point = new BMap.Point(116.488392,39.996879);
            map.centerAndZoom(point, 18);
            map.addControl(new BMap.MapTypeControl());
            map.enableScrollWheelZoom(true);
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        }
    })

    // os页面视频播放
    if($('.os').length > 0){
        $(document).scroll(function() {
            if($('.os').offset().top - $(document).scrollTop() < 700){
                var $video = document.getElementById('video');
                $video.play();
            }
        });
    }

    //遮罩层
    $('.mask').click(function(){
        $('#mask').show();
    })
    $('#mask').click(function() {
        $(this).hide();
    });
    $('#mask').height($(window).height());


    $('.news_wrap .news_right').css('min-height', $('.news_wrap .news_left').outerHeight(true));
    $('.solution_list').height($('.solution_list li').eq(0).height());
    $(window).resize(function() {
        $('html').css('font-size', $(window).width()/20);
        $('#mask').height($(window).height());
        $('.news_wrap .news_right').css('min-height', $('.news_wrap .news_left').outerHeight(true));
        $('.solution_list').height($('.solution_list li').eq(0).height());
        if($(window).width() > 1024){
            $('html').css('font-size', $(window).width()/20);
            var iwidth = $(window).width()/(1920/706);
            $('.overshadow').height(iwidth);
            $('aside').height(iwidth);
        }
    });
});
