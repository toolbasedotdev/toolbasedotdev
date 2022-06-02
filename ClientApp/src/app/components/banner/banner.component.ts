import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    ViewChild,
} from "@angular/core";

/**
 * First focal point on the home page. Renders a decorative slow-moving grid.
 * Contains the app's main search bar.
 */
@Component({
    selector: "app-banner",
    templateUrl: "./banner.component.html",
    styleUrls: ["./banner.component.scss"],
})
export class BannerComponent implements AfterViewInit, OnDestroy {
    /**
     * Reference to canvas element in template.
     */
    @ViewChild("canvas", {
        static: true,
    })
    private canvasRef!: ElementRef<HTMLCanvasElement>;

    /**
     * Canvas to render the grid to.
     */
    private get canvas(): HTMLCanvasElement | undefined {
        return this?.canvasRef?.nativeElement;
    }

    /**
     * Canvas's 2D rendering context.
     */
    private context2D: CanvasRenderingContext2D | null = null;

    /**
     * Keeps track of canvas width so we don't need to calculate it each frame.
     */
    private canvasWidth = 0;

    /**
     * Keeps track of canvas height so we don't need to calculate it each frame.
     */
    private canvasHeight = 0;

    /**
     * Use to cancel the requestAnimationFrame loop when the component is
     * destroyed.
     */
    private animationCancelToken: number | undefined;

    /**
     * After view init, sets up the canvas for high DPI rendering, then begins
     * the requestAnimationFrame loop.
     */
    public ngAfterViewInit(): void {
        if (!this.canvas) return;

        this.setupCanvas();
        requestAnimationFrame((time) => this.renderCanvas(time));
    }

    /**
     * On destroy, cancels the requestAnimationFrame loop.
     */
    public ngOnDestroy(): void {
        if (!this.animationCancelToken) return;

        cancelAnimationFrame(this.animationCancelToken);
    }

    /**
     * Sets up the canvas for high DPI rendering. This is also called on
     * window resize, because the canvas scale will be incorrect if we don't.
     */
    @HostListener("window:resize")
    private setupCanvas(): void {
        if (!this.canvas) throw Error("No canvas");

        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        const ctx = this.canvas.getContext("2d", {
            desynchronized: true,
            preserveDrawingBuffer: true,
            antialias: false,
            failIfMajorPerformanceCaveat: true,
            powerPreference: "low-power",
        }) as CanvasRenderingContext2D;

        if (!ctx) throw Error("Could not create canvas context");

        ctx.scale(dpr, dpr);
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.context2D = ctx;
    }

    /**
     * Renders the grid, then requests the next animation frame.
     */
    private renderCanvas(time: number): number {
        if (!this.context2D) return 0;

        const size = 64;
        const speed = 0.01;
        const majorEvery = 4;
        const colorMinor = "rgb(40, 50, 40)";
        const colorMajor = "rgb(40, 75, 40)";
        const ctx = this.context2D;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        const camX = (time * speed) % size;
        const camY = (time * speed) % size;
        const jumps = Math.floor((time * speed) / size);

        ctx.clearRect(0, 0, w, h);

        // Vertical lines
        for (let x = -2; x < w / size + 20; x++) {
            ctx.beginPath();
            ctx.moveTo(x * size + camX, 0);
            ctx.lineTo(x * size + camX, h);
            ctx.strokeStyle =
                (x - jumps) % majorEvery ? colorMinor : colorMajor;
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = -2; y < h / size + 2; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * size + camY);
            ctx.lineTo(w, y * size + camY);
            ctx.strokeStyle =
                (y - jumps) % majorEvery ? colorMinor : colorMajor;
            ctx.stroke();
        }

        return requestAnimationFrame((time) => {
            this.renderCanvas(time);
        });
    }
}
