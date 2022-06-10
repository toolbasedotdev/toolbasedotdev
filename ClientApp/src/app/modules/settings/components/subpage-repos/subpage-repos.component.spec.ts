import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageReposComponent } from './subpage-repos.component';

describe('SubpageReposComponent', () => {
  let component: SubpageReposComponent;
  let fixture: ComponentFixture<SubpageReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageReposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpageReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
