import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUserListComponent } from './customer-user-list.component';

describe('CustomerUserListComponent', () => {
  let component: CustomerUserListComponent;
  let fixture: ComponentFixture<CustomerUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerUserListComponent]
    });
    fixture = TestBed.createComponent(CustomerUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
