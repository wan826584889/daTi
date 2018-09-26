var _czc = _czc || [];
var msg = '';
var num = 4;
_czc.push(["_setAccount", "1274110688"]); 
_czc.push(["_trackEvent",'页面打开','独家花絮',new Date()]);//打开页面统计

$.ajax({
    url:"https://miniprogram.lingkehudong.com/adchy/queryEclusiveFlower",
    type:"post",
    contentType:"application/json",
    dataType:"json",
    data:JSON.stringify({
        "data":{
            type:2
        },
    }),
    success:function(msg){
        for(var i=0;i<msg.data.length;i++){
            var item=msg.data[i];
            var src=item.picUrl.split('?')[0]+'!img_style';
            $('.main').append(`<div class="item"><img src="`+src+`" alt=""><p><span>`+item.title+`</span></p></div>`)
        }
        click(msg);
    } 
})
function click(msg){
    for(var i=0;i<$('.item').length;i++){
        $('.item').eq(i).click(function(){
            $('.main').hide(0);
            $('.alert_toupiao').show(0);
            var index2=$(this).index();
            var item=msg.data[$(this).index()];
            var id = msg.data[$(this).index()].id;
            var src=item.picUrl.split('?')[0]+'!img_style';
            var playURL;
            $.ajax({
                url:"https://miniprogram.lingkehudong.com/adchy/queryVideoPlayInfo",
                type:"post",
                contentType:"application/json",
                dataType:"json",
                data:JSON.stringify({
                    data:item.videoId,
                }),
                success:function(msg){
                    playURL=msg.data.getPlayInfoResponse.playInfoList[0].playURL;
                    $('.video_msg').html(`
                        <div class="cha"><img src="./images/cha.png" alt=""></div>
                        <div class="video_box">
                            <video controls preload='preload' poster="`+src+`" src="`+playURL+`">您的浏览器不支持 video 标签。</video>
                        </div>
                    `);
                    $('#li_msg').html(`<li class="li_title">节目简介</li>
                        <li class="li_msg">${item.detail}</li>`)
                    
                }
            })
            $.ajax({
                url:"https://miniprogram.lingkehudong.com/adchy/queryEclusiveFlower",
                type:"post",
                contentType:"application/json",
                dataType:"json",
                data:JSON.stringify({
                    data:{
                        id:id,
                        type:2
                    }
                }),
                success:function(msg){
                    window.msg = msg;
                    console.log(msg)
                    var str = '';
                    msg.data.forEach((item,index) => {
                        if(index<=num){
                            var src=item.picUrl.split('?')[0]+'!img_style';
                            str+=`<div class="click_div"><div class="imgs"><img src="${src}" alt=""></div><div class="imgs_msg">${item.title}</div></div>`
                        }
                    });
                    $('.cont_list').html(str)
                    $('.cont_more').on('click',function () {
                        str=''
                        num=999
                        window.msg.data.forEach((item,index) => {
                            var src=item.picUrl.split('?')[0]+'!img_style';
                            str+=`<div class="click_div"><div class="imgs"><img src="${src}" alt=""></div><div class="imgs_msg">${item.title}</div></div>`
                        });
                        $('.cont_list').html(str)
                        $('.cont_more').hide()
                    })
                }
            })
        })
        
    }
}
function aa(){
    if (/(LKHDAPP)/i.test(navigator.userAgent)) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            shareForJs(2,"adchy");
        }else if (/(Android)/i.test(navigator.userAgent)) { 
            window.LkhdWebView.shareForJs(2,"adchy");
        }
    }
}

// click_div点击
$('.cont_list').on('click','.click_div',function () {
    // 获取
    var str = '';
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/adchy/queryEclusiveFlower",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            data:{
                type:2,
                id:msg.data[$(this).index()].id
            }
        }),
        success:function(msg){
            window.msg = msg;
            msg.data.forEach((item,index) => {
                if(index <= num){
                    var src=item.picUrl.split('?')[0]+'!img_style';
                    str+=`<div class="click_div"><div class="imgs"><img src="${src}" alt=""></div><div class="imgs_msg">${item.title}</div></div>`
                }
            });
            $('.cont_list').html(str)
        }
    })
    var url = msg.data[$(this).index()].picUrl.split('?')[0]+'!img_style';
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/adchy/queryVideoPlayInfo",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            data:msg.data[$(this).index()].videoId,
        }),
        success:function(msg){
            playURL=msg.data.getPlayInfoResponse.playInfoList[0].playURL;
            $('.video_box').html(`<video controls preload="preload" poster="${url}" src="${playURL}">您的浏览器不支持 video 标签。</video>`);
        }
    })
})
window.onload=function () {
    var ind = localStorage.getItem('ind');
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/adchy/queryEclusiveFlower",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            "data":{
                type:2
            },
        }),
        success:function(msg){
            openType(msg.data[ind])
        } 
    })
}
if(JSON.parse(localStorage.getItem('openType'))){
    $('.alert_toupiao').show();
    $('.main').hide();
    
}
function openType(data) {
    var src=data.picUrl.split('?')[0]+'!img_style';
    var id = data.id;
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/adchy/queryVideoPlayInfo",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            data:data.videoId,
        }),
        success:function(msg){
            playURL=msg.data.getPlayInfoResponse.playInfoList[0].playURL;
            $('.video_msg').html(`
                <div class="cha"><img src="./images/cha.png" alt=""></div>
                <div class="video_box">
                    <video controls preload='preload' poster="`+src+`" src="`+playURL+`">您的浏览器不支持 video 标签。</video>
                </div>
            `);
            $('#li_msg').html(`<li class="li_title">节目简介</li>
                <li class="li_msg">${data.detail}</li>`)
            $('.cha img').click(function(){
                $('video').get(0).pause();              
            })
        }
    })
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/adchy/queryEclusiveFlower",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            data:{
                type:2,
                id:id
            }
        }),
        success:function(msg){
            window.msg = msg;
            var str = '';
            msg.data.forEach((item,index) => {
                if(index<=num){
                    var src=item.picUrl.split('?')[0]+'!img_style';
                    str+=`<div class="click_div"><div class="imgs"><img src="${src}" alt=""></div><div class="imgs_msg">${item.title}</div></div>`
                }
            });
            $('.cont_list').html(str)
            $('.cont_more').on('click',function () {
                str=''
                num=999
                window.msg.data.forEach((item,index) => {
                    var src=item.picUrl.split('?')[0]+'!img_style';
                    str+=`<div class="click_div"><div class="imgs"><img src="${src}" alt=""></div><div class="imgs_msg">${item.title}</div></div>`
                });
                $('.cont_list').html(str)
                $('.cont_more').hide()
            })
            
        }
    })
}
$('.video_msg').on('click','.cha',function () {
    $('.alert_toupiao').hide(0);
    $('.main').show(0);
    $('video').get(0).pause();       
})
$('.alert_toupiao').on('click','.click_div',function () {
    $('.li_msg').html(window.msg.data[$(this).index()].detail)
})
