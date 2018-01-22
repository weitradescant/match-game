/*
 * 创建一个包含所有卡片的数组    有 open show match
 */
 var t = 0; //全局变量
 var set_timer;
 var moves = 0;
 var star = 3;
 function reset() {  
 	t = 0;
 	clearInterval(set_timer);
 	moves = 0;
 	$(".moves").html(moves);
 	set_timer = setInterval(timer,1000);
	var $card = $(".card");	
	var allcardhtml = new Array(16);
	$(".card").removeClass("open show match lock");  //reset时去除所有样式
	for (i = 0; i < 16; i++) {
		allcardhtml[i] = $card.eq(i).html();
	};
	shuffle(allcardhtml);
	for (i = 0; i < 16; i++) {
		$card.eq(i).html(allcardhtml[i]);
	}; 
	start();	
}

function start() {	
	var open = [];
	var match = [];
	var $card = $(".card");	
	$(".deck").on("click",".card",function() {
		if (! $(this).hasClass("lock") & ! $(this).hasClass("match")
			& ! $(this).hasClass("open")) {  //lock实现1S判定时间内其他卡片无法点击 match实现匹配的卡无法点击
			$(this).addClass("open show");//翻牌功能				
			open.push($(this));
		} else {
			return;
		}		
		if (open.length === 2) {
			$card.addClass("lock");//
			moves++;                      //累加步数
			$(".moves").html(moves);      //计算步数
			if ($(".fa-star").eq(2).hasClass("fa-star") & moves === 15) {
				down(2);
			};
			if ($(".fa-star").eq(1).hasClass("fa-star") & moves === 20) {
				down(1);
			};
			setTimeout(function(){					//1S计时匹配
				open[0].removeClass("open show");
				open[1].removeClass("open show");
				if (open[0].html() === open[1].html()) {  //match
					open[0].addClass("match");
					open[1].addClass("match");
					match.push.apply(match,open);
				};
				open = [];
				$card.removeClass("lock");
				if (match.length === 16) {
					win();
				}
			},1000)     //计时功能 				
		}
	})
}

function down(num) {   //降星函数
	$(".fa-star").eq(num).removeClass("fa-star").addClass("fa-star-o");
}

function win() {
	alert("恭喜你赢得胜利，你总共花费了" + $(".moves").html() + "步数，花费了" + t + "秒时间，你获得的评级为" + $(".fa-star").length + "颗星！");
	clearInterval(set_timer);
}

function timer() {
	t+=1;
	if ($(".fa-star").eq(2).hasClass("fa-star") & t === 30) {
		down(2);
	};
	if ($(".fa-star").eq(1).hasClass("fa-star") & t === 45) {
		down(1);
	};
	$(".time").html(t + "秒");
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

$(function(){
	reset();
});


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */