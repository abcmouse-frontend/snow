import { Snowflake, SnowflakeRandomOptions } from './Snowflake';
export declare type SnowOptions = SnowflakeRandomOptions & {
    container: HTMLElement;
    density: 'middle' | 'big' | 'light' | number;
    draw?(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, snowflake: Snowflake): void;
};
export declare class Snow {
    private canvas;
    private context;
    private snowflakes;
    private container;
    private density;
    private containerWidth;
    private containerHeight;
    private animationId;
    private randomOptions;
    private draw;
    static defaultRandomOptions: SnowflakeRandomOptions;
    constructor({ container, density, speedX, speedY, opacity, size, draw }: SnowOptions);
    /**
     * 初始化canvas
     */
    private initCanvas;
    /**
     * 初始化雪花密度
     * @param {DensityEnum|number} density
     */
    private initDensity;
    /**
     * 初始化雪花
     */
    private initSnowflakes;
    /**
     * 绑定事件
     * @description 因为Android切换后台时不会停止计时器.所以当切换后台时关闭动画.提升性能
     */
    private bindEvent;
    /**
     * 开始动画
     */
    startAnimation(): void;
    /**
     * 停止动画
     */
    stopAnimation(): void;
    /**
     * 销毁
     */
    destroy(): void;
}
