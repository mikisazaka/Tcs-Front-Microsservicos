import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendarLivrosComponent } from './recomendar-livros.component';

describe('RecomendarLivrosComponent', () => {
  let component: RecomendarLivrosComponent;
  let fixture: ComponentFixture<RecomendarLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendarLivrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendarLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
