/*
 * @fileoverview 雪花
 * @author alawnxu <alawnxu@tencent.com>
 * @date 2020-01-06 11:34:28
 * @version 1.0.0
 */
export class Snowflake {
    private speedX: number;
    private speedY: number;
    private opacity: number;
    private locationX: number;
    private locationY: number;
    private size: number;

    public constructor() {
        this.speedX = 0;
        this.speedY = 0;
        this.opacity = 0;
        this.locationX = 0;
        this.locationY = 0;
        this.size = 0;
    }

    /**
     * 绘制雪花
     */
    public draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {}

    /**
     * 雪花动画
     */
    public animation() {}
}
