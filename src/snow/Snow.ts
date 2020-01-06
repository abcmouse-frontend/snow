import { Snowflake } from './Snowflake';
import { DenistyEnum } from 'src/enum/DensityEnum';

/*
 * @fileoverview Snow
 * @author alawnxu <alawnxu@tencent.com>
 * @date 2020-01-06 11:33:25
 * @version 1.0.0
 */
export type SnowOptions = {
    container: HTMLElement;
    density: DenistyEnum | number;
};

export class Snow {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private snowflakes: Array<Snowflake>;
    private container: HTMLElement;

    public constructor({ container }: SnowOptions) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('container must be HTMLElement');
        }

        this.container = container;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.id = 'snow';
        this.snowflakes = [];
    }

    public render() {}
}
