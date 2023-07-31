import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDeleteOrRestoreComponent } from './verify-delete-or-restore.component';

describe('VerifyDeleteOrRestoreComponent', () => {
  let component: VerifyDeleteOrRestoreComponent;
  let fixture: ComponentFixture<VerifyDeleteOrRestoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyDeleteOrRestoreComponent]
    });
    fixture = TestBed.createComponent(VerifyDeleteOrRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
