import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantShellComponent } from './restaurant-shell.component';

describe('RestaurantShellComponent', () => {
  let component: RestaurantShellComponent;
  let fixture: ComponentFixture<RestaurantShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
