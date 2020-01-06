export declare type SnowflakeRandomOptions = {
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
declare type SnowflakeOptions = SnowflakeRandomOptions & {
    canvasWidth: number;
    canvasHeight: number;
    draw?(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, snowflake: Snowflake): void;
};
export declare class Snowflake {
    private canvasWidth;
    private canvasHeight;
    private maxSpeedX;
    private minSpeedX;
    private maxSpeedY;
    private minSpeedY;
    private maxOpacity;
    private minOpacity;
    private maxSize;
    private minSize;
    private speedX;
    private speedY;
    private opacity;
    private locationX;
    private locationY;
    private size;
    private render;
    constructor({ canvasWidth, canvasHeight, speedX, speedY, size, opacity, draw }: SnowflakeOptions);
    /**
     * 初始化雪花信息
     */
    private init;
    /**
     * 绘制雪花
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     */
    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void;
    /**
     * 雪花动画
     */
    animation(): void;
}
export {};
