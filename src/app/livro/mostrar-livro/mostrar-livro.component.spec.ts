import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarLivroComponent } from './mostrar-livro.component';

describe('MostrarLivroComponent', () => {
  let component: MostrarLivroComponent;
  let fixture: ComponentFixture<MostrarLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
