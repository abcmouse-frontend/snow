import { randomArbitrary } from 'src/utils/Util';

/*
 * @fileoverview 雪花
 * @author alawnxu <alawnxu@tencent.com>
 * @date 2020-01-06 11:34:28
 * @version 1.0.0
 */

export type SnowflakeRandomOptions = {
    speedX: {
        max: number;
        min: number;
    };
    speedY: {
        max: number;
        min: number;
    };
    opacity: {
        max: number;
        min: number;
    };
    size: {
        max: number;
        min: number;
    };
};

type SnowflakeOptions = SnowflakeRandomOptions & {
    canvasWidth: number;
    canvasHeight: number;
    draw?(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, snowflake: Snowflake): void;
};

export class Snowflake {
    private canvasWidth: number;
    private canvasHeight: number;
    private maxSpeedX: number;
    private minSpeedX: number;
    private maxSpeedY: number;
    private minSpeedY: number;
    private maxOpacity: number;
    private minOpacity: number;
    private maxSize: number;
    private minSize: number;

    private speedX: number;
    private speedY: number;
    private opacity: number;
    private locationX: number;
    private locationY: number;
    private size: number;
    private render: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, snowflake: Snowflake) => void;

    public constructor({ canvasWidth, canvasHeight, speedX, speedY, size, opacity, draw }: SnowflakeOptions) {
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
    private init() {
        this.speedX = randomArbitrary(this.minSpeedX, this.maxSpeedX);
        this.speedY = randomArbitrary(this.minSpeedY, this.maxSpeedY);
        this.opacity = randomArbitrary(this.minOpacity, this.maxOpacity);
        this.locationX = randomArbitrary(0, this.canvasWidth);
        // 这里需要给一个负的位置.不然首次会出现所有雪花从最顶部0开始的撒雪的情况.
        this.locationY = randomArbitrary(0, -this.canvasHeight);
        this.size = randomArbitrary(this.minSize, this.maxSize);
    }

    /**
     * 绘制雪花
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     */
    public draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        const { render, locationX, locationY, size, opacity } = this;
        if (typeof render === 'function') {
            render(canvas, context, this);
        } else {
            context.fillStyle = '#FFF';
            context.beginPath();
            context.arc(locationX, locationY, size / 2, 0, Math.PI * 2);
            context.closePath();
        }

        context.globalAlpha = opacity;
        context.fill();
    }

    /**
     * 雪花动画
     */
    public animation() {
        this.locationX += this.speedX;
        this.locationY += this.speedY;
        if (this.locationY + this.size > this.canvasHeight) {
            this.init();
        }
    }
}
