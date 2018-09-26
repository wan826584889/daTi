window.onload = function () {  
    // var token ='2cf0fc83c3f9f1b4f3b22d89be630851bdfd5e6bcc45788734606c420caec716';
    // var token = 'd232109269dc27c7593e6d1f341f4f1f69d8f0d59eb81b3555078ef3d481e60d';
    $('.tab_top ul').on('click','li',function(){
        var ind = $(this).index();
        $(this).addClass('active').siblings().removeClass('active')
        $('.table_list').find('table').eq(ind).show().siblings().hide();
    })

    var Allbonus = [];
    // 获取token
        // 请求奖金期数
    $.ajax({
        url: "https://miniprogram.lingkehudong.com/adchy/getDivideBonusList",
        contentType:"application/json",
        dataType:"json",
        type: "post",
        data:JSON.stringify({
        }),
        success: function (res) {
            Allbonus = res.data
            var str = '';
            res.data.forEach((item,index) => {
                str+=`<tr class="title"><td>第 ${item.index} 期</td><td>${item.totalBonus}元</td><td>${item.passUserTotal}人</td><td><span class="bonusBtn">详情</span></td></tr>`
            });
            $('#first_table').append(str)
        }
    });


    $.ajax({
        url: "https://miniprogram.lingkehudong.com/adchy/queryGameSituation",
        contentType:"application/json",
        dataType:"json",
        type: "post",
        data:JSON.stringify({
            token:token
        }),
        success: function (res) {
            init(res.data)
        }
    });

    function init(data) {
        console.log(data)
        if(data.headImg){
            $('#user').append(`<img src=${data.headImg} />`)
        }else{
            $('#user').append(`<img src='./images/user.png'/>`)
        }
        if(data.headImg){
            $('.user_top').css({'background':'url('+data.headImg+')','background-size':'100%',"background-position":"center center"})
        }else{
            $('.user_top').css({'background':'url(./images/default.png)','background-size':'100%',"background-position":"center center"})
        }
        $('.fhkNum').html(data.fhkNum)
        $('.bonus').html(data.bonus)
        $('.defeatNum').html(data.defeatNum)
        $('.rightAnswerNum').html(data.rightAnswerNum)
        $('.totalAnswerNum').html(data.totalAnswerNum)
        $('.userName').html(data.userName)
    }

    // 奖金按钮跳转
    $('.bonus_btn').on('click',function () {
        console.log(this)
    })

    // 复活卡按钮跳转
    $('.fhk_btn').on('click',function () {
        window.location.href = './html/fhkHTML.html'
    })

    // 复活卡获取按钮
    $('.btn').on('click',function () {
        // event.stopPropagation()
        $('.wrap').toggle()
    })
    $('.wrap').on('click',function () {
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

    // 奖金获取按钮
    $('.bonus_btn').on('click',function(){
        window.location.href = './html/bonus.html'
    })

    // 每期奖金详情
    $('body').on('click','.bonusBtn',function () {
        var ind = $(this).parents('.title').index();
        sessionStorage.setItem('seriesQuestionId',Allbonus[--ind].seriesQuestionId)
        window.location.href = './html/allBonus.html'
    })

    // 获取比赛排名
    $.ajax({
        url: "https://miniprogram.lingkehudong.com/adchy/queryAdchyCompetitionRank",
        contentType:"application/json",
        dataType:"json",
        type: "post",
        data:JSON.stringify({
            token:token
        }),
        success: function (res) {
            var currentUserId = res.data.currentUserId?res.data.currentUserId:null;
            console.log(res.data.adchyOtherUserCompetitionRankVo)
                var str = '';
                var one = '';
                if(res.data.currentUserId!=0){
                    res.data.adchyOtherUserCompetitionRankVo.forEach((item,index) => {
                        var imgs = item.headImg?item.headImg:'./images/user.png'
                        var user_name = item.userName?item.userName:item.phone;
                        if(user_name.length>=10){
                            user_name=user_name[0]+user_name[1]+user_name[2]+'***'+user_name[user_name.length-2]+user_name[user_name.length-1]
                        }
                        if(item.userId==res.data.currentUserId){
                            one+=`<tr class="title one"><td>${++index}</td><td>${user_name}</td><td>${item.totalAnswerNum}</td><td>${item.rightAnswerNum}</td><td>${item.rightPersent*100}%</td></tr>`
                        }else{
                            str+=`<tr class="title"><td>${++index}</td><td>${user_name}</td><td>${item.totalAnswerNum}</td><td>${item.rightAnswerNum}</td><td>${item.rightPersent*100}%</td></tr>`
                        }
                    });
                    $('#second_table').append(one)
                    $('#second_table').append(str)
                }else{
                    res.data.adchyOtherUserCompetitionRankVo.forEach((item,index) => {
                    var imgs = item.headImg?item.headImg:'../images/user.png'
                    var user_name = item.userName?item.userName:item.phone;
                    if(user_name.length>=10){
                        user_name=user_name[0]+user_name[1]+user_name[2]+'***'+user_name[user_name.length-2]+user_name[user_name.length-1]
                    }
                        str+=`<tr class="title"><td>${++index}</td><td>${user_name}</td><td>${item.totalAnswerNum}</td><td>${item.rightAnswerNum}</td><td>90%</td></tr>`
                    });
                    $('#second_table').append(str)
                }
        }
    });
}