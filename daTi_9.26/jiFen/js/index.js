window.onload = function () {
    var winning_data = ''; // 中奖信息
    var winning_msg = ''; // 中奖信息
    var imgs_swiper=[]; // 轮播图数据
    var imgs_vote = ''; // 投票通道图
    var imgs_ad=[]; // 上广告数据
    var title_ad = []; // 上广告信息
    var imgs_ad_two=[]; // 下广告数据
    var title_ad_two = []; // 下广告信息
    var ajs = {"data":{"typeId":4}} 
    // var token = 'd232109269dc27c7593e6d1f341f4f1f69d8f0d59eb81b3555078ef3d481e60d';
    // 请求中奖信息
    $.ajax({
        url: "https://miniprogram.lingkehudong.com/spe/lkhd/scrollbar/list",
        type: "POST",
        dataType: "json",
        contentType:"application/json",
        data:JSON.stringify(ajs),
        success: function (res) {
            if(res.code==200){
                winning_data=res.data
                reset()
            }else{
                winning_data = '数据跑丢了,请刷新'
                reset()
            }
        },
        error:function(err){
            console.log(err)
        }
    })
    function reset() {
        winning_data.forEach((item,index)=>{
            winning_msg+=`<span>${item.content}</span>`;
        });
        $('.scroll').html(winning_msg)
        //滚动动画
        var num = $('body').width();
        var size = -Math.floor($('.user_msg span').last().offset().left);
        function goLeft() {
            //size是根据你给的尺寸，可变的
            if (num == size) {
                num = $('body').width();
            }
            num--;
            $(".scroll").css({
                left: num
            })
        }
        //设置滚动速度
        var timer = setInterval(goLeft, 10);
    }

    // 请求花絮数据
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/adchy/queryEclusiveFlower",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            "data":{
                type:0
            },
        }),
        success:function(msg){
            var msg_length = 2;
            for(var i=0;i<msg_length;i++){
                var item=msg.data[i];
                var src=item.picUrl.split('?')[0]+'!img_style';
                $('.titbits_cont').append(`
                    <div class="item">
                        <img src="`+src+`" alt="">
                        <p><span>`+item.title+`</span></p>
                    </div>
                `)

            }
        } 
    })
    // 请求节目内容数据
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
            var msg_length = 2;
            for(var i=0;i<msg_length;i++){
                var item=msg.data[i];
                var src=item.picUrl.split('?')[0]+'!img_style';
                $('.program_cont').append(`
                    <div class="item">
                        <img src="`+src+`" alt="">
                        <p><span>`+item.title+`</span></p>
                    </div>
                `)

            }
        } 
    })
    // 请求节目预告数据
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/adchy/queryEclusiveFlower",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            "data":{
                type:1
            },
        }),
        success:function(msg){
            var msg_length = 2;
            for(var i=0;i<msg_length;i++){
                var item=msg.data[i];
                var src=item.picUrl.split('?')[0]+'!img_style';
                $('.act_cont').append(`
                    <div class="item">
                        <img src="`+src+`" alt="">
                        <p><span>`+item.title+`</span></p>
                    </div>
                `)

            }
        } 
    })

    $('.titbits_cont').on('click','.item',function (event) {
        localStorage.setItem('ind',$(this).index())
        localStorage.setItem('openType',true)
        window.location.href = '../fenCai/index.html';
        event.stopPropagation();
    })
    $('.program_cont').on('click','.item',function (event) {
        localStorage.setItem('ind',$(this).index())
        localStorage.setItem('openType',true)
        window.location.href = '../program/index.html';
        event.stopPropagation();
    })
    $('.act_cont').on('click','.item',function (event) {
        localStorage.setItem('ind',$(this).index())
        localStorage.setItem('openType',true)
        window.location.href = '../act/index.html';
        event.stopPropagation();
    })
    // 请求轮播图/广告图/投票图 数据
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/adchy/queryFocusImg",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            "data":{
            },
        }),
        success:function(msg){
            msg.data.forEach((item,index)=>{
                if(item.type==0){
                    imgs_swiper.push(item)
                }else if(item.type==1){
                    imgs_ad.push(item)
                    title_ad.push(item.introduce)
                }else if(item.type==2){
                    imgs_vote = item.focusImgUrl
                }else if(item.type==4){
                    imgs_ad_two.push(item)
                    title_ad_two.push(item.introduce)
                }
            })
            imgs()
        } 
    })

    $('.more').on('click',function () {
        localStorage.setItem('openType',false)
    })

    // 轮播/广告 渲染
    function imgs() {
        var imgs_dom = '';
        imgs_swiper.forEach((item,index)=>{
            imgs_dom+=`<div class='swiper-slide'><img src=${item.focusImgUrl} alt=""></div>`
        })
        $('.banner').on('click','.swiper-slide',function (event) {
            event.stopPropagation();
            localStorage.setItem('href',imgs_swiper[$(this).index()].visitUrl)
            window.location.href = '../jdt/index.html'
        })
        $('.banner_imgList').html(imgs_dom)

        var imgsAd_dom = ''
        var ad_Msg = ''
        imgs_ad.forEach((item,index)=>{
            imgsAd_dom+=`<div class='swiper-slide'><a href=${item.visitUrl?item.visitUrl:'javascript:;'}><img src=${item.focusImgUrl} alt=""></a></div>`
            ad_Msg=item.introduce;
        })
        $('.ad_imgList').html(imgsAd_dom)
        $('.ad_Msg').html(ad_Msg)

        // 下广告数据
        var imgsAd_dom_two = ''
        var ad_Msg_two = ''
        imgs_ad_two.forEach((item,index)=>{
            imgsAd_dom_two+=`<div class='swiper-slide'><a href=${item.visitUrl?item.visitUrl:'javascript:;'}><img src=${item.focusImgUrl} alt=""></a></div>`
            ad_Msg_two=item.introduce;
        })
        $('.ad_two_imgList').html(imgsAd_dom_two)
        $('.ad_two_Msg').html(ad_Msg_two)
        
        // 判断实例化Swiper
        if($('.banner .swiper-slide').length>1){
            new Swiper('.banner',{
                autoplay:{
                    delay: 5000
                },
                loop:true,
            })
        }

        // 判断实例化Swiper
        if($('.ad_swiper .swiper-slide').length>1){
            $('.ad_swiper').append(`<div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>`)
            var myAD_swiper = new Swiper('.ad_swiper',{
                autoplay:{
                    delay: 5000
                },
                loop:true,
                watchSlidesProgress : true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
            title_ad.unshift(title_ad[title_ad.length-1])
            title_ad = title_ad.splice(0,title_ad.length-1)
            $('.ad_Msg').html(title_ad[1])
            myAD_swiper.on('slideChangeTransitionEnd', function () {
                var ad_ind = myAD_swiper.activeIndex%title_ad.length
                // console.log(title_ad[ad_ind],title_ad)
                $('.ad_Msg').html(title_ad[ad_ind])
            })
        }

        // 判断下广告
        if($('.ad_two_swiper .swiper-slide').length>1){
            $('.ad_two_swiper').append(`<div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>`)
            var myAD_two_swiper = new Swiper('.ad_two_swiper',{
                autoplay:{
                    delay: 5000
                },
                loop:true,
                watchSlidesProgress : true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
            title_ad_two.unshift(title_ad_two[title_ad_two.length-1])
            title_ad_two = title_ad_two.splice(0,title_ad_two.length-1)
            $('.ad_two_Msg').html(title_ad_two[1])
            myAD_two_swiper.on('slideChangeTransitionEnd', function () {
                var ad_two_ind=myAD_two_swiper.activeIndex%title_ad_two.length;
                $('.ad_two_Msg').html(title_ad_two[ad_two_ind])
            })
        }


        $('.imgs_vote').append(`<img src=${imgs_vote}></img>`)

    }


    // 获取答题卡数据
    $.ajax({
        url:"https://miniprogram.lingkehudong.com/payment/getmypropslist",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            data:5, // 5 是复活卡
            token:token
        }),
        success:function(msg){
            if(msg.data){
                $('.revive_msg b').html(msg.data[0].number)
            }else{
                $('.revive_msg b').html(0)
            }
        } 
    })

    // 投票通道跳转
    $('.imgs_vote').on('click',function(event){
        event.stopPropagation();
        window.location.href = '../vote/index.html'
    })

    // 战况跳转
    $('.answer_situation').on('click',function (event) {
        event.stopPropagation();
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
                window.location.href = '../Answer/index.html'
            }
        }else{
            window.location.href = '../Answer/index.html'
        }
    })

   
    $('.revive_res').on('click',function () {
        $('.wrap').toggle();
    })

    $('.wrap').on('click',function (event) {
        event.stopPropagation();
        $('.wrap').toggle()
    })

    $('.yq').on('click',function () {
        window.location.href = '../dtyq/yqjs.html'
    })

    // 调用app端
    $('.shop').on('click',function () {
        share();//购买
    })

    function share(){
        if (/(LKHDAPP)/i.test(navigator.userAgent)) {
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                shop();
            }else if (/(Android)/i.test(navigator.userAgent)) { 
                window.LkhdWebView.shop();
            }
        }
    }
}
