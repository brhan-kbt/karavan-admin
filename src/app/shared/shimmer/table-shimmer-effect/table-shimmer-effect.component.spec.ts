import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableShimmerEffectComponent } from './table-shimmer-effect.component';

describe('TableShimmerEffectComponent', () => {
  let component: TableShimmerEffectComponent;
  let fixture: ComponentFixture<TableShimmerEffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableShimmerEffectComponent]
    });
    fixture = TestBed.createComponent(TableShimmerEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
