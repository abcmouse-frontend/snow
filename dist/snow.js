/**
 * Snow snow 
 * @version Version v0.0.1
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Snow = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /*
     * @fileoverview Util.ts
     * @author alawnxu <alawnxu@tencent.com>
     * @date 2020-01-06 11:44:08
     * @version 1.0.0
     */
    var _this = undefined;
    /**
     * 获取随机数
     * @param {Number} min
     * @param {Number} max
     */
    function randomArbitrary(min, max) {
        var maxNum = Math.max(min, max);
        var minNum = Math.min(min, max);
        return Math.random() * (maxNum - minNum) + minNum;
    }
    /**
     * 判断是否为一个window对象
     * @param obj
     */
    var isWindow = function (obj) { return obj !== null && obj === obj.window; };
    /**
     * 判断是否为一个纯碎的对象
     * @param obj
     */
    var isPlainObject = function (obj) {
        return typeof obj === 'object' && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
    };
    /**
     * 深拷贝和浅拷贝
     * @author alawnxu
     * @date 2019-08-18 23:45:29
     * @see {$.extend}
     */
    /* tslint:disable */
    var extend = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var options;
        var name;
        var src;
        var copy;
        var copyIsArray;
        var clone;
        var target = params[0] || {};
        var i = 1;
        var length = params.length;
        var deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = params[i] || {};
            i++;
        }
        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }
        if (i === length) {
            target = _this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = params[i]) != null) {
                for (name in options) {
                    copy = options[name];
                    if (name === '__proto__' || target === copy) {
                        continue;
                    }
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        src = target[name];
                        if (copyIsArray && !Array.isArray(src)) {
                            clone = [];
                        }
                        else if (!copyIsArray && !isPlainObject(src)) {
                            clone = {};
                        }
                        else {
                            clone = src;
                        }
                        copyIsArray = false;
                        target[name] = extend(deep, clone, copy);
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    var Snowflake = /** @class */ (function () {
        function Snowflake(_a) {
            var canvasWidth = _a.canvasWidth, canvasHeight = _a.canvasHeight, speedX = _a.speedX, speedY = _a.speedY, size = _a.size, opacity = _a.opacity, draw = _a.draw;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.maxSpeedX = Math.max(speedX.max, speedX.min);
            this.minSpeedX = Math.min(speedX.max, speedX.min);
            this.maxSpeedY = Math.max(speedY.max, speedY.min);
            this.minSpeedY = Math.min(speedY.max, speedY.min);
            this.maxSize = Math.max(size.max, size.min);
            this.minSize = Math.min(size.max, size.min);
            this.maxOpacity = Math.max(opacity.max, opacity.min);
            this.minOpacity = Math.min(opacity.max, opacity.min);
            this.render = draw;
            this.init();
        }
        /**
         * 初始化雪花信息
         */
        Snowflake.prototype.init = function () {
            this.speedX = randomArbitrary(this.minSpeedX, this.maxSpeedX);
            this.speedY = randomArbitrary(this.minSpeedY, this.maxSpeedY);
            this.opacity = randomArbitrary(this.minOpacity, this.maxOpacity);
            this.locationX = randomArbitrary(0, this.canvasWidth);
            // 这里需要给一个负的位置.不然首次会出现所有雪花从最顶部0开始的撒雪的情况.
            this.locationY = randomArbitrary(0, -this.canvasHeight);
            this.size = randomArbitrary(this.minSize, this.maxSize);
        };
        /**
         * 绘制雪花
         * @param {HTMLCanvasElement} canvas
         * @param {CanvasRenderingContext2D} context
         */
        Snowflake.prototype.draw = function (canvas, context) {
            var _a = this, render = _a.render, locationX = _a.locationX, locationY = _a.locationY, size = _a.size, opacity = _a.opacity;
            if (typeof render === 'function') {
                render(canvas, context, this);
            }
            else {
                context.fillStyle = '#FFF';
                context.beginPath();
                context.arc(locationX, locationY, size / 2, 0, Math.PI * 2);
                context.closePath();
            }
            context.globalAlpha = opacity;
            context.fill();
        };
        /**
         * 雪花动画
         */
        Snowflake.prototype.animation = function () {
            this.locationX += this.speedX;
            this.locationY += this.speedY;
            if (this.locationY + this.size > this.canvasHeight) {
                this.init();
            }
        };
        return Snowflake;
    }());

    /*
     * @fileoverview DensityEnum.ts
     * @author alawnxu <alawnxu@tencent.com>
     * @date 2020-01-06 03:06:23
     * @version 1.0.0
     */
    var DensityEnum;
    (function (DensityEnum) {
        DensityEnum[DensityEnum["BIG"] = 2] = "BIG";
        DensityEnum[DensityEnum["MIDDLE"] = 4] = "MIDDLE";
        DensityEnum[DensityEnum["LIGHT"] = 6] = "LIGHT";
    })(DensityEnum || (DensityEnum = {}));

    /* 水平方向不要限制太大范围,否则会容易飞出去 */
    var X_MAX_SPEED = 2;
    var X_MIN_SPEED = -2;
    var Y_MAX_SPEED = 1.5;
    var Y_MIN_SPEED = 0.5;
    var MAX_OPACITY = 1;
    var MIN_OPACITY = 0.2;
    var MAX_SIZE = 25;
    var MIN_SIZE = 3;

    var Snow = /** @class */ (function () {
        function Snow(_a) {
            var container = _a.container, density = _a.density, speedX = _a.speedX, speedY = _a.speedY, opacity = _a.opacity, size = _a.size, draw = _a.draw;
            if (!(container instanceof HTMLElement)) {
                throw new Error('container must be HTMLElement');
            }
            var clientReact = container.getBoundingClientRect();
            this.container = container;
            this.containerWidth = clientReact.width;
            this.containerHeight = clientReact.height;
            this.animationId = null;
            this.initCanvas();
            this.randomOptions = extend(true, Snow.defaultRandomOptions, __assign(__assign(__assign(__assign({}, (speedX || {})), (speedY || {})), (opacity || {})), (size || {})));
            this.density = this.initDensity(density);
            this.draw = draw || null;
            this.initSnowflakes();
            this.bindEvent();
        }
        /**
         * 初始化canvas
         */
        Snow.prototype.initCanvas = function () {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            this.canvas.width = this.containerWidth;
            this.canvas.height = this.containerHeight;
            this.container.appendChild(this.canvas);
        };
        /**
         * 初始化雪花密度
         * @param {DensityEnum|number} density
         */
        Snow.prototype.initDensity = function (density) {
            if (typeof density === 'string' && density.toUpperCase() in DensityEnum) {
                return DensityEnum[density.toUpperCase()];
            }
            return parseInt(String(density), 10) || DensityEnum.MIDDLE;
        };
        /**
         * 初始化雪花
         */
        Snow.prototype.initSnowflakes = function () {
            var _a = this, containerWidth = _a.containerWidth, density = _a.density, containerHeight = _a.containerHeight, randomOptions = _a.randomOptions, draw = _a.draw;
            var baseNum = parseInt(String(containerWidth / density), 10);
            this.snowflakes = [];
            for (var index = 0; index <= baseNum; index++) {
                this.snowflakes.push(new Snowflake(__assign({ canvasWidth: containerWidth, canvasHeight: containerHeight, draw: draw }, randomOptions)));
            }
        };
        /**
         * 绑定事件
         * @description 因为Android切换后台时不会停止计时器.所以当切换后台时关闭动画.提升性能
         */
        Snow.prototype.bindEvent = function () {
            var _this = this;
            document.addEventListener('visibilitychange', function (event) {
                if (document.hidden) {
                    _this.stopAnimation();
                }
                else {
                    _this.startAnimation();
                }
            });
        };
        /**
         * 开始动画
         */
        Snow.prototype.startAnimation = function () {
            var _this = this;
            var _a = this, canvas = _a.canvas, context = _a.context, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight;
            // 因为是帧动画.所以每次绘制都需要擦除
            context.clearRect(0, 0, containerWidth, containerHeight);
            for (var _i = 0, _b = this.snowflakes; _i < _b.length; _i++) {
                var snowflake = _b[_i];
                snowflake.animation();
                context.save();
                snowflake.draw(canvas, context);
                context.restore();
            }
            this.animationId = window.requestAnimationFrame(function () { return _this.startAnimation(); });
        };
        /**
         * 停止动画
         */
        Snow.prototype.stopAnimation = function () {
            var animationId = this.animationId;
            if (animationId) {
                window.cancelAnimationFrame(animationId);
                this.animationId = null;
            }
        };
        /**
         * 销毁
         */
        Snow.prototype.destroy = function () {
            this.canvas.parentNode.removeChild(this.canvas);
            this.canvas = null;
            this.stopAnimation();
        };
        Snow.defaultRandomOptions = {
            speedX: {
                max: X_MAX_SPEED,
                min: X_MIN_SPEED
            },
            speedY: {
                max: Y_MAX_SPEED,
                min: Y_MIN_SPEED
            },
            opacity: {
                max: MAX_OPACITY,
                min: MIN_OPACITY
            },
            size: {
                max: MAX_SIZE,
                min: MIN_SIZE
            }
        };
        return Snow;
    }());

    return Snow;

})));
