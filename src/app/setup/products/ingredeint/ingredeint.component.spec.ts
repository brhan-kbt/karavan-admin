import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredeintComponent } from './ingredeint.component';

describe('IngredeintComponent', () => {
  let component: IngredeintComponent;
  let fixture: ComponentFixture<IngredeintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredeintComponent]
    });
    fixture = TestBed.createComponent(IngredeintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
