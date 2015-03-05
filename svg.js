(function(){
    'use strict';

    var initCircle = document.getElementById('initCircle');
    var finalCircle = document.getElementById('finalCircle');
    var aPath = document.getElementById('animationPath');

    var touchFingers; //缓存touches队列

    //初始圆坐标
    var x0 = parseInt(initCircle.getAttribute('cx'));
    var y0 = parseInt(initCircle.getAttribute('cy'));
    var r0 = parseInt(initCircle.getAttribute('r'));

    //最终圆坐标
    var x1;
    var y1;
    var r1 = parseInt(finalCircle.getAttribute('r'));

    //setter
    Element.prototype._setter = function (options) {
        var attr;
        for(attr in options){
            if(options.hasOwnProperty(attr)){
                this.setAttribute(attr, options[attr]);
            }
        }
    };

    var updateF = function updateTouches(event) {
        touchFingers = event.touches[0];
    };


    var renderThing = function () {

        x1 = touchFingers.clientX;
        y1 = touchFingers.clientY;

        //二次贝赛尔曲线参考点
        var pX = x0 - ((x0 - x1) / 2);
        var pY = y0 - ((y0 - y1) / 2);

        //勾股x,y
        var _gX = Math.abs(x0 - x1);
        var _gY = Math.abs(y0 - y1);

        //勾股定理斜线长度长
        var longL = Math.sqrt(_gX * _gX + _gY * _gY);

        var sinX = _gY / longL;
        var cosX = _gX / longL;

        //四个点的路径构建
        var fourPoints = [
            'M',
            x0 + r0 * sinX,
            y0 + r0 * cosX,
            'Q',
            pX,
            pY,
            x1 + r1 * sinX,
            y1 + r1 * cosX,
            'L',
            x1 - r1 * sinX,
            y1 - r1 * cosX,
            'Q',
            pX,
            pY,
            x0 - r0 * sinX,
            y0 - r0 * cosX,
            'Z'
        ];

        finalCircle._setter({
            cx: x1,
            cy: y1
        });

        //设置路径
        aPath._setter({
            d: fourPoints.join(' ')
        });

    };

    document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        touchFingers = e.touches[0];
    });

    document.addEventListener('touchmove', function (e) {
        e.preventDefault(); //屏蔽掉默认的滚动行为
        updateF(e);
        renderThing();
    });


}());