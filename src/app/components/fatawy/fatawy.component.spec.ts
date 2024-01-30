import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatawyComponent } from './fatawy.component';

describe('FatawyComponent', () => {
  let component: FatawyComponent;
  let fixture: ComponentFixture<FatawyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FatawyComponent]
    });
    fixture = TestBed.createComponent(FatawyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
