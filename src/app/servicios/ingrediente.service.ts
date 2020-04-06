import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ingrediente} from '../modelos/ingrediente';
import {SedeService} from "./sede.service";

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private ingrediente: Ingrediente = new Ingrediente();
  private ingredientes: Ingrediente[] = [];

  resultado: boolean;

  constructor(
    private http: HttpClient,
    private sedeService: SedeService
  ) {
    this.resultado = false;
  }


  /*
http://localhost:3000/ingrediente/ingredientes
http://localhost:3000/ingrediente/porId
   */

  getIngredientes() {
    this.ingredientes = [];

    this.http.post(environment.apiUrl + '/ingrediente/ingredientes', {}).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(ing => {
            this.ingrediente = new Ingrediente();
            this.ingrediente.id_ingrediente = Number(ing.Id);
            this.ingrediente.nombre = ing.Nombre;
            this.ingrediente.cantidad = Number(ing.Cantidad);
            // carga la sede a a que pertenece un ingrediente
            this.sedeService.getSede(Number(ing.Id_sede));
            this.ingrediente.sede.id_sede = this.sedeService.mostrarSede().id_sede;
            this.ingrediente.sede.barrio = this.sedeService.mostrarSede().barrio;
            this.ingrediente.sede.direccion = this.sedeService.mostrarSede().direccion;

            this.ingredientes.push(this.ingrediente);

          });

          return this.ingredientes;

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

  mostrarIngredientes(): Ingrediente[] {
    return this.ingredientes;
  }

}
