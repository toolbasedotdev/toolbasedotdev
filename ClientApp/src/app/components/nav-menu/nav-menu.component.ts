import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";

// How far the cursor can move away
// from the menu before it's closed
const curDistBeforeAutoClose = 512;

// Vertical offset
const offsetY = -8;

@Component({
    selector: "app-nav-menu",
    templateUrl: "./nav-menu.component.html",
    styleUrls: ["./nav-menu.component.scss"],
})
export class NavMenuComponent {
    private _visible = false;
    private _ready = false;
    private _centerUnder: HTMLElement | undefined;
    private _centerX = -1;
    private _centerY = -1;
    private _maxLength = -1;

    public top = -1;
    public left = -1;
    public offsetX = 0;

    public get visible(): boolean {
        return this._visible;
    }

    public get ready(): boolean {
        return this._ready;
    }

    @ViewChild("menu")
    public menuRef!: ElementRef<HTMLMenuElement>;
    public get menu(): HTMLMenuElement {
        return this.menuRef.nativeElement;
    }

    /**
     * Displays the menu
     * @param centerUnder - Element to center menu under
     */
    show(centerUnder: HTMLElement) {
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

    hide(): void {
        this._visible = false;
        this._ready = false;
    }

    @HostListener("window:resize")
    onResize(): void {
        if (this.visible && this._centerUnder) {
            this.show(this._centerUnder);
        }
    }

    /**
     * Determines if menu should be closed
     * when cursor is moved
     * @param curY - Cursor Y
     * @param curX - Cursor X
     */
    @HostListener("window:mousemove", ["$event.pageX", "$event.pageY"])
    onMouseMove(curX: number, curY: number): void {
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

    private getMaxDimension(): number {
        const rect = this.menu.getBoundingClientRect();
        return Math.max(rect.width, rect.height);
    }

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

    private calcCenter(): [number, number] {
        const rect = this.menu.getBoundingClientRect();
        return [rect.x + rect.width / 2, rect.y + rect.height / 2];
    }
}
