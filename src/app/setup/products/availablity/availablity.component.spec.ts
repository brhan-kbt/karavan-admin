import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablityComponent } from './availablity.component';

describe('AvailablityComponent', () => {
  let component: AvailablityComponent;
  let fixture: ComponentFixture<AvailablityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailablityComponent]
    });
    fixture = TestBed.createComponent(AvailablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
