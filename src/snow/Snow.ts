import { Snowflake, SnowflakeRandomOptions } from './Snowflake';
import { DensityEnum } from '../enum/DensityEnum';
import { X_MAX_SPEED, X_MIN_SPEED, Y_MAX_SPEED, Y_MIN_SPEED, MAX_OPACITY, MIN_OPACITY, MAX_SIZE, MIN_SIZE } from 'src/utils/Constant';
import { extend } from 'src/utils/Util';

/*
 * @fileoverview Snow
 * @author alawnxu <alawnxu@tencent.com>
 * @date 2020-01-06 11:33:25
 * @version 1.0.0
 */
export type SnowOptions = SnowflakeRandomOptions & {
    container: HTMLElement;
    density: 'middle' | 'big' | 'light' | number;
    draw?(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, snowflake: Snowflake): void;
};

export class Snow {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private snowflakes: Array<Snowflake>;
    private container: HTMLElement;
    private density: number;
    private containerWidth: number;
    private containerHeight: number;
    private animationId: number;
    private randomOptions: SnowflakeRandomOptions;
    private draw?(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, snowflake: Snowflake): void;
    public static defaultRandomOptions: SnowflakeRandomOptions = {
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

    public constructor({ container, density, speedX, speedY, opacity, size, draw }: SnowOptions) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('container must be HTMLElement');
        }

        const clientReact = container.getBoundingClientRect();
        this.container = container;
        this.containerWidth = clientReact.width;
        this.containerHeight = clientReact.height;

        this.animationId = null;
        this.initCanvas();
        this.randomOptions = extend(true, Snow.defaultRandomOptions, {
            ...(speedX || {}),
            ...(speedY || {}),
            ...(opacity || {}),
            ...(size || {})
        });

        this.density = this.initDensity(density);
        this.draw = draw || null;
        this.initSnowflakes();
        this.bindEvent();
    }

    /**
     * 初始化canvas
     */
    private initCanvas() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.containerWidth;
        this.canvas.height = this.containerHeight;
        this.container.appendChild(this.canvas);
    }

    /**
     * 初始化雪花密度
     * @param {DensityEnum|number} density
     */
    private initDensity(density) {
        if (typeof density === 'string' && density.toUpperCase() in DensityEnum) {
            return DensityEnum[density.toUpperCase()];
        }
        return parseInt(String(density), 10) || DensityEnum.MIDDLE;
    }

    /**
     * 初始化雪花
     */
    private initSnowflakes() {
        const { containerWidth, density, containerHeight, randomOptions, draw } = this;
        let baseNum = parseInt(String(containerWidth / density), 10);

        this.snowflakes = [];
        for (let index = 0; index <= baseNum; index++) {
            this.snowflakes.push(
                new Snowflake({
                    canvasWidth: containerWidth,
                    canvasHeight: containerHeight,
                    draw,
                    ...randomOptions
                })
            );
        }
    }

    /**
     * 绑定事件
     * @description 因为Android切换后台时不会停止计时器.所以当切换后台时关闭动画.提升性能
     */
    private bindEvent() {
        document.addEventListener('visibilitychange', event => {
            if (document.hidden) {
                this.stopAnimation();
            } else {
                this.startAnimation();
            }
        });
    }

    /**
     * 开始动画
     */
    public startAnimation() {
        const { canvas, context, containerWidth, containerHeight } = this;

        // 因为是帧动画.所以每次绘制都需要擦除
        context.clearRect(0, 0, containerWidth, containerHeight);
        for (let snowflake of this.snowflakes) {
            snowflake.animation();
            context.save();
            snowflake.draw(canvas, context);
            context.restore();
        }

        this.animationId = window.requestAnimationFrame(() => this.startAnimation());
    }

    /**
     * 停止动画
     */
    public stopAnimation() {
        const { animationId } = this;
        if (animationId) {
            window.cancelAnimationFrame(animationId);
            this.animationId = null;
        }
    }

    /**
     * 销毁
     */
    public destroy() {
        this.canvas.parentNode.removeChild(this.canvas);
        this.canvas = null;
        this.stopAnimation();
    }
}
