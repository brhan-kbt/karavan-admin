import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashedUserListComponent } from './trashed-user-list.component';

describe('TrashedUserListComponent', () => {
  let component: TrashedUserListComponent;
  let fixture: ComponentFixture<TrashedUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrashedUserListComponent]
    });
    fixture = TestBed.createComponent(TrashedUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
