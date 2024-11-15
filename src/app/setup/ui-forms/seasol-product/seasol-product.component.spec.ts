import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasolProductComponent } from './seasol-product.component';

describe('SeasolProductComponent', () => {
  let component: SeasolProductComponent;
  let fixture: ComponentFixture<SeasolProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeasolProductComponent]
    });
    fixture = TestBed.createComponent(SeasolProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
