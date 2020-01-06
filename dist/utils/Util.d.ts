/**
 * 获取随机数
 * @param {Number} min
 * @param {Number} max
 */
export declare function randomArbitrary(min: number, max: number): number;
/**
 * 判断是否为一个window对象
 * @param obj
 */
export declare const isWindow: (obj: any) => boolean;
/**
 * 判断是否为一个纯碎的对象
 * @param obj
 */
export declare const isPlainObject: (obj: any) => boolean;
/**
 * 深拷贝和浅拷贝
 * @author alawnxu
 * @date 2019-08-18 23:45:29
 * @see {$.extend}
 */
export declare const extend: (...params: any[]) => any;
