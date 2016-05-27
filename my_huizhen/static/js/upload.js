/**
 * Created by nick on 2016/5/5.
 */
//上传头像
var tpic =null,timout= 0,upLoadingPicStatic;
function upload (obj,type) {
    tpic = setInterval(function(){
        if(obj.files.length){
            clearInterval(tpic);
            _fun();
        }
        if(timout>=20){
            clearInterval(tpic);
            $Y.tips('获取不到图片');
            return false
        }
        timout++;
    },500);

    function _fun(){
        timout = 0;
        if (obj.files.length === 0) return;
        var dom_id = 'd'+parseInt((Math.random()*100000));
        var html = '<li class="list-img-li" id="'+dom_id+'">' +
            '<div class="loading animated infinite rotate"><i class="iconfont icon-loading"></i></div>' +
            '<img  src="/Public/Mobile/img/grey.gif" width="50" height="50"/>' +
            '<a class="btn-remove-pic" href="javascript:;" onclick="$(\'#'+dom_id+'\').remove();"></a>' +
            '<input type="hidden" name="img[]" />' +
            '</li>';
        var li = $('#'+dom_id);
        $(obj).closest('li').before(html);
        upLoadingPicStatic = false;
        $('#myUpload').ajaxForm({
            dataType:'json',
            success: function(rst) {
                var li = $('#'+dom_id);
                if(rst.code !=40000){
                    // 处理其他情况
                    $Y.tips(rst.msg,2000);
                    li.find('.loading').remove();
                }else{
                    // 上传成功

                    li.find('img').attr({'src':rst.thumb_url,'data-src':rst.thumb_url});
                    li.find('[name="img[]"]').val(rst.thumb_url);
                    upLoadingPicStatic = true;
                    li.find('.loading').remove();
                    $('#uploadBtn ').val('');
                    //上传图片保存数据库
                    if(type ==2){
                        saveImage(rst.thumb_url);

                        li.find('a').attr('onclick','removeImg(this,\''+rst.thumb_url+'\')')
                    }
                }

            }
            ,error:function(){
                var li = $('#'+dom_id);
                $Y.tips('图片上传失败,请删除重新上传');
                li.remove();
                $('#uploadBtn ').val('')

            }
        });
        $('#myUpload').submit()

    }
}


//看大图
var imgs =[];
$(function(){

    $(document).on('click','[data-src]',function(){
        if(is_weixin()){
            imgs =[];
            var index = 0;
            var me_src = $(this).attr('data-src');
            $('[data-src]').each(function(i){
                var src = $(this).attr('data-src');
                if(me_src == src){
                    index = i;
                    me_src =me_src.replace('../',window.location.origin+'/');
                }
                src =src.replace('../',window.location.origin+'/');
                imgs.push(src);
            })

            wx.previewImage({
                current: me_src, // 当前显示图片的http链接
                urls: imgs // 需要预览的图片http链接列表
            });
        }
    })
})

function saveImage(path){
    var data = {};
    data.order_id = order_id;
    data.image_url = path;
    $.ajax({
        type: "POST",
        url: "/Mobile/Order/saveImage",
        data: data,
        dataType:'json',
        success: function(msg){
            if(msg.code==40000){
                return msg.id;
            }
        }
    });
}