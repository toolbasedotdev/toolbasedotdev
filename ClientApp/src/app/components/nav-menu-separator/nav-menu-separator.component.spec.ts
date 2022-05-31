import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuSeparatorComponent } from './nav-menu-separator.component';

describe('NavMenuSeparatorComponent', () => {
  let component: NavMenuSeparatorComponent;
  let fixture: ComponentFixture<NavMenuSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMenuSeparatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
