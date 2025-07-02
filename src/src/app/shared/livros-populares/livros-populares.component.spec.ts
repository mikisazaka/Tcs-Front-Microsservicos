import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosPopularesComponent } from './livros-populares.component';

describe('LivrosPopularesComponent', () => {
  let component: LivrosPopularesComponent;
  let fixture: ComponentFixture<LivrosPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrosPopularesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrosPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
