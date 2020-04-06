import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlatoComponent } from './listar-plato.component';

describe('ListarPlatoComponent', () => {
  let component: ListarPlatoComponent;
  let fixture: ComponentFixture<ListarPlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
