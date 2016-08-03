
  $(function(){
    if($('.fsbanner').length > 0){

        $('#slider').fsBanner({'trigger':'mouse'});
        $("#slider div:last").trigger('mouseover');
        $("#slider div:last").removeClass('filter');

        $('.video_wrap').height($(window).height());
        $(window).resize(function() {
            $('.video_wrap').height($(window).height());
        });
        var video = document.getElementById('myvideo');
        $('.btn_play').click(function() {
            $('.video_wrap').show();
            var myvideo = '<video src="video/20160712.mp4" autoplay controls></video>';
            $('#myvideo').append(myvideo);
        });
        $('#myvideo a').click(function() {
            $('.video_wrap').hide();
            $('#myvideo video').remove();
        });
    }
  })



// fsbanner
