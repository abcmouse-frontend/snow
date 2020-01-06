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
