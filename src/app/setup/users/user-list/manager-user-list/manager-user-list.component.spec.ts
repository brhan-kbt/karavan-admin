import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUserListComponent } from './manager-user-list.component';

describe('ManagerUserListComponent', () => {
  let component: ManagerUserListComponent;
  let fixture: ComponentFixture<ManagerUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerUserListComponent]
    });
    fixture = TestBed.createComponent(ManagerUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
