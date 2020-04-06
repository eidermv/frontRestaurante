import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIngredienteComponent } from './listar-ingrediente.component';

describe('ListarIngredienteComponent', () => {
  let component: ListarIngredienteComponent;
  let fixture: ComponentFixture<ListarIngredienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarIngredienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
