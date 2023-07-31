import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSeletionFormComponent } from './branch-seletion-form.component';

describe('BranchSeletionFormComponent', () => {
  let component: BranchSeletionFormComponent;
  let fixture: ComponentFixture<BranchSeletionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchSeletionFormComponent]
    });
    fixture = TestBed.createComponent(BranchSeletionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
