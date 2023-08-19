import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAvailablityComponent } from './update-availablity.component';

describe('UpdateAvailablityComponent', () => {
  let component: UpdateAvailablityComponent;
  let fixture: ComponentFixture<UpdateAvailablityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAvailablityComponent]
    });
    fixture = TestBed.createComponent(UpdateAvailablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
