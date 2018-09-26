window.onload = function () {
    var winning_data = ''; // 中奖信息
    var winning_msg = ''; // 中奖信息
    var ajs = {"data":{"typeId":4}} 

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




    // 实例可视化数据
    var chart = new CanvasJS.Chart("chartContainer", {
        // exportEnabled: true,
        // animationEnabled: true,
        // title:{
        //     text: "Car Parts Sold in Different States"
        // },
        // subtitles: [{
        //     text: "Click Legend to Hide or Unhide Data Series"
        // }], 
        axisY: {
            title: "题目序号",
            titleFontSize:12,
            // margin:
            verticalAlign: "bottom",
        },
        // toolTip: {
        //     shared: true
        // },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "通关人数",
            showInLegend: true,
            color: '#4999E9',
            // yValueFormatString: "#,##0.# Units",
            // axisYType: "secondary",
            dataPoints: [
                { label: "1",  y: 5000.5 },
                { label: "2", y: 3000 },
                { label: "3", y: 4230 },
                { label: "4",  y: 2300 },
                { label: "5",  y: 2652 }
            ]
        },
        {
            type: "column",
            name: "答对人数",
            // axisYType: "secondary",
            showInLegend: true,
            color:"#42E7CA",
            // yValueFormatString: "#,##0.# Units",
            dataPoints: [
                { label: "1", y: 210.5 },
                { label: "2", y: 135 },
                { label: "3", y: 425 },
                { label: "4", y: 130 },
                { label: "5", y: 528 }
            ]
        }]
    });
    chart.render();

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

}