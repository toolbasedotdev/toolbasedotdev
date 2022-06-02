import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";

// How far the cursor can move away
// from the menu before it's closed
const curDistBeforeAutoClose = 512;

// Vertical offset
const offsetY = -8;

/**
 * A generic drop-down menu for use with the global navigation bar.
 */
@Component({
    selector: "app-nav-menu",
    templateUrl: "./nav-menu.component.html",
    styleUrls: ["./nav-menu.component.scss"],
})
export class NavMenuComponent {
    /**
     * Drives [hidden] directive on the container element.
     */
    private _visible = false;

    /**
     * Signals that the menu is fully displayed and ready. Prevents capturing
     * mousemove events when false.
     */
    private _ready = false;

    /**
     * Element that the menu should be visually centered underneath.
     */
    private _centerUnder: HTMLElement | undefined;

    /**
     * Page X coordinate of the center of the menu's bounds.
     */
    private _centerX = -1;

    /**
     * Page Y coordinate of the center of the menu's bounds.
     */
    private _centerY = -1;

    /**
     * Width or height, whichever is greater. Used when calculating how far
     * away the cursor can get before closing the menu automatically.
     */
    private _maxLength = -1;

    /**
     * Drives [style.top.px] directive on the container element.
     */
    public top = -1;

    /**
     * Drives [style.left.px] directive on the container element, with the help
     * of offsetX.
     */
    public left = -1;

    /**
     * Drives [style.transform] directive on the container element, with the
     * help of left.
     */
    public offsetX = 0;

    /**
     * Getter for _visible. Drives [hidden] directive on the container element.
     */
    public get visible(): boolean {
        return this._visible;
    }

    /**
     * Getter for _ready. Signals that the menu is fully displayed and ready.
     * Prevents capturing mousemove events when false.
     */
    public get ready(): boolean {
        return this._ready;
    }

    /**
     * Reference to container element in template.
     */
    @ViewChild("menu")
    public menuRef!: ElementRef<HTMLMenuElement>;

    /**
     * Gets the html element from menuRef.
     */
    public get menu(): HTMLMenuElement {
        return this.menuRef.nativeElement;
    }

    /**
     * Displays the menu. Also used on resize to reposition it.
     *
     * @param centerUnder - Element to center menu under
     */
    public show(centerUnder: HTMLElement) {
        // Store centerUnder for responding to mouse events
        this._centerUnder = centerUnder;

        // Reset center calculation
        [this._centerX, this._centerY] = [-1, -1];

        // Show it
        this._visible = true;

        // Wait for UI to update so menu's dimensions
        // and parent's position can be measured
        setTimeout(() => {
            this._maxLength = this.getMaxDimension();
            [this.left, this.top, this.offsetX] =
                this.calcPosition(centerUnder);

            // Wait for UI to update so menu's absolute
            // center can be measured
            setTimeout(() => {
                [this._centerX, this._centerY] = this.calcCenter();

                // Wait for UI to update to signal ready
                setTimeout(() => {
                    this._ready = true;
                });
            });
        });
    }

    /**
     * Hides the menu.
     */
    public hide(): void {
        this._visible = false;
        this._ready = false;
    }

    /**
     * On resize, calls show() to reposition the menu.
     */
    @HostListener("window:resize")
    public onResize(): void {
        if (this.visible && this._centerUnder) {
            this.show(this._centerUnder);
        }
    }

    /**
     * Determines if menu should be closed when cursor is moved
     *
     * @param curX - Cursor X
     * @param curY - Cursor Y
     */
    @HostListener("window:mousemove", ["$event.pageX", "$event.pageY"])
    public onMouseMove(curX: number, curY: number): void {
        if (!this._visible || !this._ready) return;
        if (this._centerX == -1) return;

        const curDistToCenter = Math.hypot(
            curX - this._centerX,
            curY - this._centerY
        );

        if (curDistToCenter > this._maxLength + curDistBeforeAutoClose) {
            this.hide();
        }
    }

    /**
     * Returns either width or height, depending on which is greater.
     */
    private getMaxDimension(): number {
        const rect = this.menu.getBoundingClientRect();
        return Math.max(rect.width, rect.height);
    }

    /**
     * Calculates the left, top, and offsetX values used for positioning.
     *
     * @returns [left, top, offsetX]
     */
    private calcPosition(centerUnder: HTMLElement): [number, number, number] {
        const theirRect = centerUnder.getBoundingClientRect();
        const ourRect = this.menu.getBoundingClientRect();

        const left = theirRect.x + theirRect.width / 2 - ourRect.width / 2;
        const top = theirRect.y + theirRect.height + offsetY;
        let offsetX = 0;

        const right = left + ourRect.width + 8;

        if (right > window.innerWidth) {
            offsetX = window.innerWidth - right;
        }

        return [left, top, offsetX];
    }

    /**
     * Calculates the center of the bounds. Used for determining cursor distance
     * from the menu.
     *
     * @returns [x, y]
     */
    private calcCenter(): [number, number] {
        const rect = this.menu.getBoundingClientRect();
        return [rect.x + rect.width / 2, rect.y + rect.height / 2];
    }
}
