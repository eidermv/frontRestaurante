import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtencionComponent } from './listar-atencion.component';

describe('ListarAtencionComponent', () => {
  let component: ListarAtencionComponent;
  let fixture: ComponentFixture<ListarAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
