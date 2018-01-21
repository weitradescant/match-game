/*
 * 创建一个包含所有卡片的数组    有 open show match
 */
 
function start() {
	var allcardhtml = new Array(16);
	var allcard = new Array(17);
	var open = new Array();
	var $card = $(".card");
	for (i = 0; i < 16; i++) {
		allcardhtml[i] = $card.eq(i).html();
	};
	shuffle(allcardhtml);
	for (i = 0; i < 16; i++) {
		$card.eq(i).html(allcardhtml[i]);
		allcard[i+1] = $card.eq(i);
	};                                         //洗牌 完成
	$card.each(function() {
		$(this).on("click",function() {       //不匹配要等1S  allcard.forEach不行
			$(this).addClass("open show");    //可以重复点击同一个按钮
			open.push($(this));
			if (open.length === 2) {
				open[0].removeClass("open show");
				open[1].removeClass("open show");
				if (open[0].html() == open[1].html()) {
					open[0].addClass("match");
					open[1].addClass("match");
				};
				open = [];
			}
		})
	})
}
/*
function match(qwe) {
	var open = new Array(2);
	qwe.on("click",function() {
		qwe.addClass("open show");
		open.push(qwe);
		if (open.length === 2) {
			open[0].removeClass("open show");
			open[1].removeClass("open show");
			if (open[0] == open[1]) {
				open[0].addClass("match");
				open[1].addClass("match");
			};
			open = [];
		};
	};
}

*/




/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
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






$(function(){
	start();
	/*var $card = $(".card");
	$card.addClass("match");*/
});
