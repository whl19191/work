$('html').css('font-size', $(window).width()/20);
var ua=navigator.userAgent.toLowerCase();
var wx=ua.indexOf("micromessenger")>-1;
var wb=ua.indexOf("weibo")>-1;
var ad=ua.indexOf("android")>-1;
var ios=ua.indexOf("iphone")>-1;
if(!ad && !ios ){
    if($('.overshadow #video').length>0){
        $('.overshadow #video').attr('src','video/20160701.mp4')
    }else if($('.glasses #video').length > 0){
        $('.glasses #video').attr('src','video/20160727.mp4')
    }
    //公司动态新闻加载 ---pc 分页
    if($('.news_left').length > 0){
        $.getJSON("data.json",function(data,status){
            var con = 0;
            var $length = true;
            $.each(data,function(i){
                var $li =
                    '<li><a href="'+data[i].href+'" class="clearfix"><img src="img/'+data[i].url+'"><div class="media-body"><h2>'+data[i].title+'</h2><p>'+data[i].content+'<span>全文 》</span></p><span>'+data[i].date+'</span></div></a></li>';

                if($length){
                    $('.news_left').append($li);
                    con++;
                }
            })
            var show_per_page = 4;
            var number_of_items = data.length;
            var number_of_pages = Math.ceil(number_of_items/show_per_page);

            //隐藏域默认值
            $('#current_page').val(0);
            $('#show_per_page').val(show_per_page);

            var navigation_html = '<a class="previous_link" href="javascript:previous();">上一页</a>';
            var current_link = 0;
            while(number_of_pages > current_link){
                navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
                current_link++;
            }
            navigation_html += '<a class="next_link" href="javascript:next();">下一页</a>';
            $('#page_navigation').html(navigation_html);
            $('#page_navigation .page_link:first').addClass('active_page');
            $('#content').children().css('display', 'none');
            $('#content').children().slice(0, show_per_page).css('display', 'block');
        })
    }
}else{
    //移动端加载
    if($('.news_list').length > 0){
        if($('.news_list li').length < 9){
            $.getJSON("data.json",function(data,status){
                var con = 0;
                var $length = true;
                $.each(data,function(i){
                    var $li =
                        '<li><a href="'+data[i].href+'"><p>'+data[i].title+'</p><span>'+data[i].time+'</span></a></li>';
                    if($length){
                        $('.news_list').append($li);
                        con++;
                    }
                    if($('.news_list li').length%9 == 0  ){
                        $length = false;
                    }
                })
            })
        }
    }
}
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

//上一页
function previous(){
    new_page = parseInt($('#current_page').val()) - 1;
    if($('.active_page').prev('.page_link').length==true){
        go_to_page(new_page);
    }
}
//下一页
function next(){
    new_page = parseInt($('#current_page').val()) + 1;
    if($('.active_page').next('.page_link').length==true){
        go_to_page(new_page);
    }
}
//跳转某一页
function go_to_page(page_num){
    var show_per_page = parseInt($('#show_per_page').val());
    start_from = page_num * show_per_page;
    end_on = start_from + show_per_page;
    $('#content').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
    $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
    $('#current_page').val(page_num);
}
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

//公司动态列表加载

    $('.more').click(function(){
        if($('.news_list li').length >= 9){
            $.getJSON("data.json",function(data,status){
                var con = $('.news_list li').length;
                var $length = true;
                if(data.length == $('.news_list li').length){
                    $('.more').html('没有更新文章了!');
                }else{
                    $.each(data,function(i){
                        if($length){
                            var $li =
                                '<li><a href="'+data[con].href+'"><p>'+data[con].title+'</p><span>'+data[con].time+'</span></a></li>';
                            $('.news_list').append($li);
                            con++;
                        }
                        if($('.news_list li').length%9 == 0  ){
                            $length = false;
                        }
                    })
                }
            })
        }
    })



    $('.nav li').eq(3).click(function() {
        $('.menu').toggle();
    });
    $('.pc_wrap .join_us li').click(function(){
        $(this).find('.join_con').toggle();
        $(this).siblings('li').find('.join_con').hide();
        // $('.pc_wrap .join_us li .join_con').hide();
    })
    $('.join_con').click(function(e){e.stopPropagation();})

    var jHeight = $(window).height()-($('header').height()+$('.phone_wrap .us_wrap h2').height()+$('footer').height())
    $('.phone_wrap .join_us').css('min-height',jHeight);
    $('.phone_wrap .join_us li').click(function(){
        $(this).find('.join_con').toggle();
        $('.phone_wrap .join_us li .join_con').each(function(){
            if($(this).css('display') == 'block'){
                $(this).siblings('h3').find('img').css('transform','rotate(90deg)')
            }else{
                $(this).siblings('h3').find('img').css('transform','rotate(0deg)')
            }
        })
        $(this).siblings('li').find('.join_con').hide();
        $(this).siblings('li').find('img').css('transform','rotate(0deg)')
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
    if(!ad && !ios){
        if($('.os').length > 0){
            $(document).scroll(function() {
                if($('.os').offset().top - $(document).scrollTop() < 700){
                    var $video = document.getElementById('video');
                    $video.play();
                }
            });
        }
    }

    //遮罩层
    $('.mask').click(function(){
        $('#mask').show();
    })
    $('#mask').click(function() {
        $(this).hide();
    });
    $('#mask').height($(window).height());

    $('.news_list').css('min-height',$(window).height()-$('.dynamics_wrap h2').height()-$('footer').height()-$('header').height()-$('.more').height());
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
