/**
 * Created by leakl on 2015-06-09.
 */

//全站下拉式菜单  用于记录查询

$(function(){
    $('#js-navList').on('click','li',function(){
        var o = $(this);
        if(o.hasClass('js-item')){
            o.addClass('hover');
            setTimeout(function(){
                o.removeClass('hover');
                $('#js-navView').show();
                $('#js-navList').hide();
                $('body').css({'background-color':'#eee'})
                $('#js-navList li').removeClass('active');
                var val = o.find('.js-title').html();
                var userId = o.attr('userId');
                $('#js-navView .js-value').html(val).attr('userId',userId);
                $('#js-navContent').show();
            },300)
        }else{
            $('#js-navView').show();
            $('#js-navList').hide();
            $('#js-navContent').show();
            $('body').css({'background-color':'#eee'})
        }

    })
})

function showNavList(){
    var userId = $('#js-navView .js-value').attr('userId');
    $('#js-navList li[userId='+userId+']').addClass('active');
    $('#js-navView').hide();
    $('#js-navList').show();
    $('#js-navContent').hide();
    $('body').css({'background-color':'#fff'})
}

//tag切换
$(document).on('click','.js-tag .item ',function(){
    var o  = $(this),index = o.index();;
    o.addClass('active').siblings().removeClass('active');
    var tagContent = o.parents('.baoGaoList').find('.js-tagContent');
    tagContent.hide().eq(index).show();

})

//手风琴
$(document).on('click','.js-accordion .js-acc-header ',function(){
    $(this).toggleClass('show');
    $(this).next().toggleClass('show');
})

// 代煎配送手风琴
// 
$(document).on('click','.peisong-btn ',function(){
    $(this).parents('.daiJian-config').toggleClass('show');
    $(this).parents('.daiJian-config').next().toggleClass('show');
})