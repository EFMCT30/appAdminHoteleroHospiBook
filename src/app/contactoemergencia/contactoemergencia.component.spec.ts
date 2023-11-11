import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoemergenciaComponent } from './contactoemergencia.component';

describe('ContactoemergenciaComponent', () => {
  let component: ContactoemergenciaComponent;
  let fixture: ComponentFixture<ContactoemergenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoemergenciaComponent]
    });
    fixture = TestBed.createComponent(ContactoemergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
