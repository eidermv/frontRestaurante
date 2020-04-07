import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ingrediente} from '../modelos/ingrediente';
import {SedeService} from "./sede.service";
import set = Reflect.set;
import {Atencion} from "../modelos/atencion";
import {BehaviorSubject, of, Subject} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private ingrediente: Ingrediente;
  private ingredientes: Ingrediente[];

  elementos: BehaviorSubject<Ingrediente[]> = new BehaviorSubject([]);
  mostrarIngredientes = this.elementos.asObservable();

  resultado: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.resultado = false;
  }


  /*
http://localhost:3000/ingrediente/ingredientes
http://localhost:3000/ingrediente/porId
   */

  getIngredientes() {
    this.ingredientes = [];

    let suscrip = this.http.post(environment.apiUrl + '/ingrediente/ingredientes', {}).pipe(
      tap((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(ing => {
            this.ingrediente = new Ingrediente();
            this.ingrediente.id_ingrediente = Number(ing.Id);
            this.ingrediente.nombre = ing.Nombre;
            this.ingrediente.cantidad = Number(ing.Cantidad);
            this.ingrediente.sede.id_sede = Number(ing.Sede.Id);
            this.ingrediente.sede.direccion = ing.Sede.Direccion;
            this.ingrediente.sede.barrio = ing.Sede.Barrio;
            // Object.assign({}, this.sedeService.mostrarSede());
            this.ingredientes.push(this.ingrediente);
          });
          // suscrip.unsubscribe();
        }
        // for (const d of (data as any)) {
        // console.log(this.smartphone);
        // }
      })
    ).subscribe(
      () => { },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client error', err);
        } else {
          console.log('Server error', err);
        }
      },
      () => {
        this.elementos.next(this.ingredientes);
      }
    );

  }

  // mostrarIngredientes(): Ingrediente[] {
  //   return this.ingredientes;
  // }

  limpiarServicio() {
    this.ingrediente = new Ingrediente();
    this.ingredientes = [];
  }
}
