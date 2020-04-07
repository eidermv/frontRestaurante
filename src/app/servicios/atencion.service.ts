import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ingrediente} from '../modelos/ingrediente';
import {Atencion} from '../modelos/atencion';
import {SedeService} from "./sede.service";
import {ClienteService} from "./cliente.service";
import {MenuService} from "./menu.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AtencionService {



  private atencion: Atencion = new Atencion();
  private atenciones: Atencion[] = [];

  elementos: BehaviorSubject<Atencion[]> = new BehaviorSubject([]);
  mostrarAtenciones = this.elementos.asObservable();

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

            // sede
            this.atencion.sede.id_sede = Number(aten.Sede.Id);
            this.atencion.sede.direccion = aten.Sede.Direccion;
            this.atencion.sede.barrio = aten.Sede.Barrio;

            // cliente
            this.atencion.cliente.id_cliente = Number(aten.Cliente.Id);
            this.atencion.cliente.nombre = aten.Cliente.Nombre;
            this.atencion.cliente.apellido = aten.Cliente.Apellido;

            // menu
            this.atencion.menu.id_menu = Number(aten.Menu.Id);
            this.atencion.menu.descripcion = aten.Menu.Descripcion;
            this.atencion.menu.id_sede = aten.Menu.Id_sede;

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
      },
      () => {
        this.elementos.next(this.atenciones);
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

  // mostrarAtenciones(): Atencion[] {
  //   return this.atenciones;
  // }

  mostrarAtencion(): Atencion {
    return this.atencion;
  }

  limpiarServicio() {
    this.atencion = new Atencion();
    this.atenciones = [];
  }
}
