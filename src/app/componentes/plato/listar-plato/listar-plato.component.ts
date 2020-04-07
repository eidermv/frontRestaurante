import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Plato} from '../../../modelos/plato';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {PlatoService} from '../../../servicios/plato.service';
import {Sede} from '../../../modelos/sede';
import {SedeService} from '../../../servicios/sede.service';

@Component({
  selector: 'app-listar-plato',
  templateUrl: './listar-plato.component.html',
  styleUrls: ['./listar-plato.component.css']
})
export class ListarPlatoComponent implements OnInit, OnDestroy {

  private sedes: Sede[];
  elementos: Plato[] = [];
  selected = '1';
// total, plato, ubicacion
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
    private platoService: PlatoService,
    private sedeService: SedeService
  ) {
  }

  ngOnInit() {
    // this.sedeService.limpiarServicio();
    // this.platoService.limpiarServicio();

    this.sedeService.getSedes();

    this.cargarSedes();

    this.cargarPlatos(this.selected);
    // console.log("carga sedes");



    this.platoService.mostrarPlatos.subscribe(data => {
      // setTimeout(() => {
      this.dataSource = new MatTableDataSource(data);
      // paginacion de la tabla
      this.dataSource.paginator = this.paginacion;
      // }, 500);
    });


  }

  cargarPlatos(idS: string) {
    this.platoService.getPlatos(Number(idS));
  }

  // cargarPlatos(idS: string) {
  //
  //   setTimeout(() => {
  //     this.elementos = this.platoService.mostrarPlatos();
  //     // console.log('elementos ' + this.elementos);
  //     this.dataSource = new MatTableDataSource(this.elementos);
  //     // paginacion de la tabla
  //     this.dataSource.paginator = this.paginacion;
  //   }, 500);
  // }

  cargarSedes() {
      this.sedeService.mostrarSedes.subscribe(data => {
        // setTimeout(() => {
        this.sedes = data;
        // }, 500);
      });

  }

  ngOnDestroy(): void {
    this.platoService.limpiarServicio();
    this.sedeService.limpiarServicio();
  }


}
