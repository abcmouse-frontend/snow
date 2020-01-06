/*
 * @fileoverview Util.ts
 * @author alawnxu <alawnxu@tencent.com>
 * @date 2020-01-06 11:44:08
 * @version 1.0.0
 */

/**
 * 获取随机数
 * @param {Number} min
 * @param {Number} max
 */
export function randomArbitrary(min: number, max: number) {
    const maxNum = Math.max(min, max);
    const minNum = Math.min(min, max);
    return Math.random() * (maxNum - minNum) + minNum;
}

/**
 * 判断是否为一个window对象
 * @param obj
 */
export const isWindow = (obj: any): boolean => obj !== null && obj === obj.window;

/**
 * 判断是否为一个纯碎的对象
 * @param obj
 */
export const isPlainObject = (obj: any): boolean => {
    return typeof obj === 'object' && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
};

/**
 * 深拷贝和浅拷贝
 * @author alawnxu
 * @date 2019-08-18 23:45:29
 * @see {$.extend}
 */
/* tslint:disable */
export const extend = (...params: Array<any>): any => {
    let options;
    let name;
    let src;
    let copy;
    let copyIsArray;
    let clone;
    let target = params[0] || {};
    let i = 1;
    let length = params.length;
    let deep = false;

    if (typeof target === 'boolean') {
        deep = target;
        target = params[i] || {};
        i++;
    }

    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }

    if (i === length) {
        target = this;
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
                    } else if (!copyIsArray && !isPlainObject(src)) {
                        clone = {};
                    } else {
                        clone = src;
                    }
                    copyIsArray = false;
                    target[name] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};
