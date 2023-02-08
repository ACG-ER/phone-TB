var focus = document.querySelector('.focus');
var ul = focus.querySelector('ul');
var ol = focus.querySelector('ol');
// 获取focus的宽度
var w = focus.offsetWidth;
// 1. 利用定时器
var index = 0;
var timer = setInterval(() => {
    index++;
    var translatex = -index * w;
    moveTransition(ul, translatex);
}, 2000);
// 2. 监听过渡完成事件transitionend
ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
        } else if (index < 0) {
            index = 2;
        }
        var translatex = -index * w; // 利用新的索引号获取宽度
        moveNoTransition(ul, translatex);
        // 3. 小圆点跟随移动，使用classList
        ol.querySelector('.current').classList.remove('current'); // 移除current类
        ol.children[index].classList.add('current'); // 给当前小圆点添加current类
    })
    // 4. 手指移动轮播图
    // 触摸元素touchstart 获取手指的初始位置
var startX = 0; // 定义手指位置
var moveX = 0; // 定义移动距离
var flag = false; // 判断是否滑动了
ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 停止定时器
        clearInterval(timer);
    })
    // 移动元素touchmove 获取移动距离
ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子：盒子原来的距离 + 移动的距离
        var translatex = -index * w + moveX;
        moveNoTransition(ul, translatex);
        e.preventDefault(); // 一定注意这个地方，否则会发生moveX基本不改变的现象
        flag = true;
    })
    // 手指离开touchend，根据手指移动的距离来判断是否移动到上一张或者下一张
ul.addEventListener('touchend', function(e) {
        // 如果滑动了，才进行如下的判断操作
        if (flag) {
            // 判断如果移动距离大于50px那么就移动到下一张或上一张
            if (Math.abs(moveX) > 50) {
                // 如果是右滑就表示滑动到上一张，moveX>0
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果是左滑就表示滑动到下一张，moveX<0
                    index++;
                }
            }
            var translatex = -index * w;
            moveTransition(ul, translatex);
        }
        // 手指离开后开启定时器
        clearInterval(timer);
        timer = setInterval(() => {
            index++;
            var translatex = -index * w;
            moveTransition(ul, translatex);
        }, 2000);
    })
    // 定义一个过渡滑动效果的函数
function moveTransition(obj, distance) {
    obj.style.transition = 'all .3s'; // 添加过渡效果，0.3s完成图片滚动
    obj.style.transform = 'translateX(' + distance + 'px)';
}
// 定义一个没有过渡滑动效果的函数
function moveNoTransition(obj, distance) {
    obj.style.transition = 'none'; // 去掉过渡效果，让ul快速跳到目标位置
    obj.style.transform = 'translateX(' + distance + 'px)';
}