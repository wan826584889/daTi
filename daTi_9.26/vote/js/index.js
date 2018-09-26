window.onload = function () {
var over_ticket;
var playerList = [];
// var token = "d232109269dc27c7593e6d1f341f4f1f69d8f0d59eb81b3555078ef3d481e60d";
    // 设置同步加载
    $.ajaxSetup({
        async: false
    });
    // 请求剩余票数
    $.ajax({
        url: "https://miniprogram.lingkehudong.com/adchy/getSurPlusTicketNum",
        type: "post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            token:token
        }),
        success: function (res) {
            if(res.code==200){
                over_ticket = res.data
            }
        },
        error:function (err) {
            console.error(err)
        }
    });

    // 获取选手列表
    $.ajax({
        url: "https://miniprogram.lingkehudong.com/adchy/voteEntrance",
        type: "post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({}),
        success: function (res) {
            if(res.code==200){
                init(res.data,over_ticket)
            }
        },
        error:function (err) {
            console.error(err)
        }
    });

    function init(data,ticket) {
        var endTime = data.endTime;
        var imgList = data.imgList;
        var playerList = data.playerList;
        var ticket = ticket;
        // 动态创建 banner图
        var banner_str = '';
        imgList.forEach((item,index) => {
            banner_str +=`<div class='swiper-slide'><a href=${item.visitUrl}><img src=${item.focusImgUrl} alt=""></a></div>`
        })
        $('.banner').html(banner_str)
    
        // 格式化时间
        var overplusTime=endTime-new Date().getTime();``
        var days = Math.floor(overplusTime / (1000 * 60 * 60 * 24)); // 天
        var hours = Math.floor((overplusTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // 小时
        var minutes = Math.floor((overplusTime % (1000 * 60 * 60)) / (1000 * 60)); // 分钟
        var seconds = Math.floor((overplusTime % (1000 * 60)) / 1000); // 秒
        if(days<=0 && hours<=1){
            $('.overTime').html(`少于1小时`)
        }else if(days==0){
            $('.overTime').html(`还剩${hours}小时`)
        }
        else{
            $('.overTime').html(`${days}天${hours}小时`)
        }
    
        // 动态创建投票详情
        var user_str = '';
        playerList.forEach((item,index)=>{
            user_str+=`<dl>
                    <dt><img src=${item.picUrl} /></dt>
                    <dd class="first_dd">${item.name}</dd>
                    <dd><b class="total_num">${item.likedTotal}</b>票</dd>
                    <dd class='vote'>投票</dd>
                    <span>NO.${index+1}</span>
                </dl>`
        })
        $('.user_list').html(user_str)
    
        // 投票点击事件
        var ind;
        var vote_data;
        $('body').on('click','.vote',function () {
            if (token ==undefined||token =='') {
                if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                    toke=YSHD.token
                }else{
                    if(/(LKHDAPP)/i.test(navigator.userAgent)){
                        token=window.LkhdWebView.getToken();
                    }
                }
                if(token ==undefined||token ==''){
                    gettoken_();
                }else{
                    ind = $(this).parent('dl').index();
                    vote_data = playerList[ind]
                    $('.user_name').html(vote_data.name)
                    $('.user_img').html(`<img src=${vote_data.picUrl}>`)
                    $('.ticket').html(ticket)
                    $('.mark').show();
                    if(token){
                        $('.mark input').addClass('btn').removeClass('btn_false');
                        }else{
                        $('.mark input').addClass('btn_false').removeClass('btn');
                    }
                }
            }else{
                ind = $(this).parent('dl').index();
                vote_data = playerList[ind]
                $('.user_name').html(vote_data.name)
                $('.user_img').html(`<img src=${vote_data.picUrl}>`)
                $('.ticket').html(ticket)
                $('.mark').show();
               if(token){
                   $('.mark input').addClass('btn').removeClass('btn_false');
                }else{
                   $('.mark input').addClass('btn_false').removeClass('btn');
               }
            }
           
        })
        $('body').on('click','.btn',function () {
             $.ajax({
                 url:"https://miniprogram.lingkehudong.com/adchy/userLike",
                 type: "post",
                 contentType:"application/json",
                 dataType:"json",
                 data:JSON.stringify({
                    // token:"d232109269dc27c7593e6d1f341f4f1f69d8f0d59eb81b3555078ef3d481e60d",
                    token :token,
                    data:{
                         likedUserId:vote_data.id,
                         voteNum:$('.value').html()
                    }
                 }),
                 success:function (res) {
                     if(res.code==200){
                        ticket = res.data
                        $('.ticket').html(res.data)
                        $('.two b').html(res.data)
                        $('.vote_suc').toggle()
                        $('.true_rule').toggle()
                     }else if(res.code==-1){
                         $('.true_rule').toggle()
                         $('.vote_false').toggle()
                        //  $('.true_rule').toggle()
                     }
                 }
             })
         })
    
    }
}

$('.rule').on('click',function () {
    localStorage.setItem('href','./img/guize.png')
    window.location.href = '../../jdt/index.html'
})

$('.close').on('click',function () {
    $('.mark').toggle();
})
$('.close_').on('click',function () {
    $('.mark').toggle();
    $('.vote_suc').toggle()
    $('.true_rule').toggle()
    window.location.reload()
})
$('.down').on('click',function () {
   var num =  $('.value').html()
    $('.add').css({'background':'url("./image/addButton_true.png")','background-size':'100%'})
    if(num==2){
        $(this).css({'background':'url("./image/downButton_false.png")','background-size':'100%'})
   }
    if(num>=2){
        $('.value').html(--num)
    }
})
$('.add').on('click',function () {
    var num =  $('.value').html()
    var value = $('.ticket').html()*1
    var max = value-1;
    $('.down').css({'background':'url("./image/downButton_true.png")','background-size':'100%'})
    if(num==max){
         $(this).css({'background':'url("./image/addButton_false.png")','background-size':'100%'})
    }
    if(num<value){
        $('.value').html(++num)
    }
 })

