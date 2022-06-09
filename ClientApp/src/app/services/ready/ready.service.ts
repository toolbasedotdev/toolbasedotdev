import { EventEmitter, Injectable } from "@angular/core";
import { take } from "rxjs/operators";

/**
 * Used as a one-stop shop to determine if all necessary services have
 * initialized and synchronized their requisite data.
 */
@Injectable({
    providedIn: "root",
})
export class ReadyService {
    /**
     * Indicates that all services are ready.
     */
    public isReady = false;

    /**
     * Fires when all services are ready.
     */
    public onReady = new EventEmitter<void>();

    /**
     * Begins waiting on all services.
     * ! Called in AppComponent ONLY!
     */
    public async await(initFn: () => Promise<void>) {
        await initFn();
        this.onReady.emit();
    }

    /**
     * Returns a promise that resolves when all services are ready. If all
     * services are ready, returns a promise that resolves immediately.
     */
    public toPromise(): Promise<void> {
        if (this.isReady) {
            return new Promise((resolve) => {
                resolve();
            });
        }

        return new Promise((resolve) => {
            this.onReady.pipe(take(1)).subscribe(() => {
                resolve();
            });
        });
    }
}
