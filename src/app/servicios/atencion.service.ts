import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ingrediente} from '../modelos/ingrediente';
import {Atencion} from '../modelos/atencion';
import {SedeService} from "./sede.service";
import {ClienteService} from "./cliente.service";
import {MenuService} from "./menu.service";

@Injectable({
  providedIn: 'root'
})
export class AtencionService {



  private atencion: Atencion = new Atencion();
  private atenciones: Atencion[] = [];
  resultado: boolean;

  constructor(
    private http: HttpClient,
    private sedeService: SedeService,
    private clienteService: ClienteService,
    private menuService: MenuService
  ) {
    this.resultado = false;
  }

  /*
http://localhost:3000/atencion/atenciones
http://localhost:3000/atencion/porId
http://localhost:3000/atencion/agregar
 */

  getAtenciones() {
    this.atenciones = [];

    this.http.post(environment.apiUrl + '/atencion/atenciones', {}).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(aten => {
            this.atencion = new Atencion();
            this.atencion.id_atencion = Number(aten.Id);

            // carga la sede a a que pertenece una atencion
            this.sedeService.getSede(Number(aten.Id_sede));
            this.atencion.sede = Object.assign({}, this.sedeService.mostrarSede());

            // carga el cliente a a que pertenece una atencion
            this.clienteService.getCliente(Number(aten.Id_cliente));
            this.atencion.cliente = Object.assign({}, this.clienteService.mostrarCliente());

            // carga el menu a a que pertenece una atencion
            this.menuService.getMenu(Number(aten.Id_menu));
            this.atencion.menu = Object.assign({}, this.menuService.mostrarMenu());

            this.atencion.cantidad_ped = Number(aten.Cantidad);

            this.atenciones.push(this.atencion);

          });

          return this.atencion;

        }
        // for (const d of (data as any)) {
        // console.log(this.smartphone);
        // }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client error', err);
        } else {
          console.log('Server error', err);
        }
      }
    );
  }

  agregar(atencion: Atencion): boolean {


    this.http.post(environment.apiUrl + '/atencion/agregar', {
      id_sede: atencion.sede.id_sede,
      id_cliente: atencion.cliente.id_cliente,
      id_menu: atencion.menu.id_menu,
      cantidad_ped: atencion.cantidad_ped
    }).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
          this.resultado = false;
        } else {
          this.resultado = true;
          return true;
          // console.log('nombre cliente ---- ' + this.clientes.length);

        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client error', err);
        } else {
          console.log('Server error', err);
        }
      }
    );
    return this.resultado;
  }

  mostrarAtenciones(): Atencion[] {
    return this.atenciones;
  }

  mostrarAtencion(): Atencion {
    return this.atencion;
  }
}
