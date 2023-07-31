import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubcategoryDetailComponent } from './category-subcategory-detail.component';

describe('CategorySubcategoryDetailComponent', () => {
  let component: CategorySubcategoryDetailComponent;
  let fixture: ComponentFixture<CategorySubcategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySubcategoryDetailComponent]
    });
    fixture = TestBed.createComponent(CategorySubcategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
