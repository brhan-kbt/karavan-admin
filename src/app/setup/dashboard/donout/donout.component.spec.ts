import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonoutComponent } from './donout.component';

describe('DonoutComponent', () => {
  let component: DonoutComponent;
  let fixture: ComponentFixture<DonoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonoutComponent]
    });
    fixture = TestBed.createComponent(DonoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
