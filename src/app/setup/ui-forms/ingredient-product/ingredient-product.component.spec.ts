import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientProductComponent } from './ingredient-product.component';

describe('IngredientProductComponent', () => {
  let component: IngredientProductComponent;
  let fixture: ComponentFixture<IngredientProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientProductComponent]
    });
    fixture = TestBed.createComponent(IngredientProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
