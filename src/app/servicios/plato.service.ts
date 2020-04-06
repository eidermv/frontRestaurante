import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Plato} from "../modelos/plato";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlatoService {


  private httpOpciones: any;
  private plato: Plato = new Plato();
  private platos: Plato[] = [];

  resultado: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.resultado = false;
  }


  /*
  http://localhost:3000/plato/mas_vendidos
   */

  getPlatos(idS: number) {
    this.platos = [];

    this.http.post(environment.apiUrl + '/plato/mas_vendidos', {id : idS}).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(prod => {
              this.plato = new Plato();
              this.plato.total = Number(prod.Total);
              this.plato.plato = prod.Plato;
              this.plato.ubicacion = prod.Ubicacion;
              this.platos.push(this.plato);

          });

          return this.platos;

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

  mostrarPlatos(): Plato[] {
    return this.platos;
  }

}
