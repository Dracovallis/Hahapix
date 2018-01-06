import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedMemesComponent } from './liked-memes.component';

describe('LikedMemesComponent', () => {
  let component: LikedMemesComponent;
  let fixture: ComponentFixture<LikedMemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedMemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedMemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
