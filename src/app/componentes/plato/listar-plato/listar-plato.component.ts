import {Component, OnInit, ViewChild} from '@angular/core';
import {Plato} from '../../../modelos/plato';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {PlatoService} from '../../../servicios/plato.service';

@Component({
  selector: 'app-listar-plato',
  templateUrl: './listar-plato.component.html',
  styleUrls: ['./listar-plato.component.css']
})
export class ListarPlatoComponent implements OnInit {

  elementos: Plato[] = [];
// id_producto, nombre, porcentaje_ganancia, precio, cantidad, id_categoria
  displayedColumns: string[] = ['total', 'plato', 'ubicacion'];
  dataSource: MatTableDataSource<Plato>;
  // creacion de paginacion de la tabla
  @ViewChild(MatPaginator, {static: true}) paginacion: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private router: Router,
    private platoService: PlatoService
  ) {
  }

  ngOnInit() {

    this.platoService.getPlatos(1);

    this.cargarPlatos();
  }

  cargarPlatos() {
    setTimeout(() => {
      this.elementos = this.platoService.mostrarPlatos();
      // console.log('elementos ' + this.elementos);
      this.dataSource = new MatTableDataSource(this.elementos);
      // paginacion de la tabla
      this.dataSource.paginator = this.paginacion;
    }, 500);

  }


}
