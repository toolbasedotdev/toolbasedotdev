import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BannerSearchbarComponent } from "./banner-searchbar.component";

describe("SearchbarComponent", () => {
    let component: BannerSearchbarComponent;
    let fixture: ComponentFixture<BannerSearchbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BannerSearchbarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerSearchbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
