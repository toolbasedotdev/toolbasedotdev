import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLinkToolComponent } from './page-link-tool.component';

describe('PageLinkToolComponent', () => {
  let component: PageLinkToolComponent;
  let fixture: ComponentFixture<PageLinkToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLinkToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLinkToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
