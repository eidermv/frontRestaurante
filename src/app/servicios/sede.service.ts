import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Sede} from '../modelos/sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private sede: Sede = new Sede();
  private sedes: Sede[] = [];

  constructor(
    private http: HttpClient
  ) { }

  /*
  http://localhost:3000/sede/sedes
http://localhost:3000/sede/porId
   */

  getSedes(): Sede[] {
    this.sedes = [];

    this.http.post(environment.apiUrl + '/sede/sedes', {}).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(c => {
            this.sede = new Sede();
            this.sede.id_sede = Number(c.Id);
            this.sede.direccion = c.Direccion;
            this.sede.barrio = c.Barrio;
            this.sedes.push(this.sede);

          });

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
    return this.sedes;
  }

  getSede(idS: number) {
    // console.log('categria usuario ---' + idU);
    this.sedes = [];

    this.http.post(environment.apiUrl + '/sede/porId', {
      id: idS
    }).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(c => {
            this.sede = new Sede();
            this.sede.id_sede = Number(c.Id);
            this.sede.direccion = c.Direccion;
            this.sede.barrio = c.Barrio;
            this.sedes.push(this.sede);

          });
          // console.log('nombre sede ---- ' + this.sedes.length);
          return this.sedes;

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
    return this.sedes;
  }

  mostrarSedes(): Sede[] {
    return this.sedes;
  }

  mostrarSede(): Sede {
    return this.sede;
  }
}
