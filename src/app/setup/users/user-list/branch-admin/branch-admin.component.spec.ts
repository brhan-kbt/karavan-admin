import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAdminComponent } from './branch-admin.component';

describe('BranchAdminComponent', () => {
  let component: BranchAdminComponent;
  let fixture: ComponentFixture<BranchAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchAdminComponent]
    });
    fixture = TestBed.createComponent(BranchAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
