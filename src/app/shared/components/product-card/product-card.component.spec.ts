import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCardComponent } from './product-card.component';

describe('MoviesCardComponent', () => {
  let component: MoviesCardComponent;
  let fixture: ComponentFixture<MoviesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
