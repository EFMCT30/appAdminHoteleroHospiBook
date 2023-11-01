import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontlayaoutComponent } from './frontlayaout.component';

describe('FrontlayaoutComponent', () => {
  let component: FrontlayaoutComponent;
  let fixture: ComponentFixture<FrontlayaoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontlayaoutComponent]
    });
    fixture = TestBed.createComponent(FrontlayaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
