import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchFormComponent } from './branch-form.component';

describe('BranchFormComponent', () => {
  let component: BranchFormComponent;
  let fixture: ComponentFixture<BranchFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchFormComponent]
    });
    fixture = TestBed.createComponent(BranchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
