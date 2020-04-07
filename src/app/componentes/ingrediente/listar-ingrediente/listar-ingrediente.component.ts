import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';

import {Ingrediente} from '../../../modelos/ingrediente';
import {IngredienteService} from '../../../servicios/ingrediente.service';

@Component({
  selector: 'app-listar-ingrediente',
  templateUrl: './listar-ingrediente.component.html',
  styleUrls: ['./listar-ingrediente.component.css']
})
export class ListarIngredienteComponent implements OnInit, OnDestroy {

  // elementos: Ingrediente[] = [];
  // elementos: BehaviorSubject<Ingrediente[]> = new BehaviorSubject([]);

  selected = '1';
// total, plato, ubicacion
  displayedColumns: string[] = ['id_ingrediente', 'nombre', 'cantidad', 'sede'];
  dataSource: MatTableDataSource<Ingrediente>;
  // creacion de paginacion de la tabla
  @ViewChild(MatPaginator, {static: true}) paginacion: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private router: Router,
    private ingredienteService: IngredienteService
  ) {

  }

  ngOnInit() {

    this.ingredienteService.getIngredientes();

    // this.changeData(this.ingredienteService.mostrarIngredientes());

    this.ingredienteService.mostrarIngredientes.subscribe(data => {
      // setTimeout(() => {
        this.dataSource = new MatTableDataSource(data);
        // paginacion de la tabla
        this.dataSource.paginator = this.paginacion;
      // }, 500);
    });

    // this.cargarIngredientes();

  }

  // changeData(data: any) {
  //   this.elementos.next(data);
  // }

  // cargarIngredientes() {
    // setTimeout(() => {


      // console.log('elementos ' + this.elementos);

    // }, 500);
 // }

  ngOnDestroy(): void {
    this.ingredienteService.limpiarServicio();
  }



}
