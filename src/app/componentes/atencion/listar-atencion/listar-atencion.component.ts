import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Atencion} from '../../../modelos/atencion';
import {AtencionService} from '../../../servicios/atencion.service';

@Component({
  selector: 'app-listar-atencion',
  templateUrl: './listar-atencion.component.html',
  styleUrls: ['./listar-atencion.component.css']
})
export class ListarAtencionComponent implements OnInit, OnDestroy {

  elementos: Atencion[] = [];
  selected = '1';
// total, plato, ubicacion
  displayedColumns: string[] = ['id_atencion', 'sede', 'cliente', 'menu', 'cantidad_ped'];
  dataSource: MatTableDataSource<Atencion>;
  // creacion de paginacion de la tabla
  @ViewChild(MatPaginator, {static: true}) paginacion: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private router: Router,
    private atencionService: AtencionService
  ) {
  }

  ngOnInit() {

    this.atencionService.getAtenciones();

    this.atencionService.mostrarAtenciones.subscribe(data => {
      // setTimeout(() => {
      this.dataSource = new MatTableDataSource(data);
      // paginacion de la tabla
      this.dataSource.paginator = this.paginacion;
      // }, 500);
    });

    // this.cargarAtenciones();

  }

  // cargarAtenciones() {
  //   setTimeout(() => {
  //     this.elementos = this.atencionService.mostrarAtenciones();
  //     // console.log('elementos ' + this.elementos);
  //     this.dataSource = new MatTableDataSource(this.elementos);
  //     // paginacion de la tabla
  //     this.dataSource.paginator = this.paginacion;
  //   }, 500);
  // }

  agregar() {
    this.router.navigateByUrl('/agregar_atencion');
  }

  ngOnDestroy(): void {
    this.atencionService.limpiarServicio();
  }
}
