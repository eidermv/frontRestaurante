import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Cliente} from '../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private cliente: Cliente = new Cliente();
  private clientes: Cliente[] = [];

  constructor(
    private http: HttpClient
  ) { }

  /*
http://localhost:3000/cliente/clientes
http://localhost:3000/cliente/porId
 */

  getClientes() {
    // console.log('categria usuario ---' + idU);
    this.clientes = [];

    this.http.post(environment.apiUrl + '/cliente/clientes', {}).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(c => {
            this.cliente = new Cliente();
            this.cliente.id_cliente = Number(c.Id);
            this.cliente.nombre = c.Nombre;
            this.cliente.apellido = c.Apellido;
            this.clientes.push(this.cliente);

          });
          // console.log('nombre cliente ---- ' + this.clientes.length);
          return this.clientes;

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
    return this.clientes;
  }

  getCliente(idC: number) {
    // console.log('categria usuario ---' + idU);
    this.clientes = [];

    this.http.post(environment.apiUrl + '/cliente/porId', {
      id: idC
    }).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(c => {
            this.cliente = new Cliente();
            this.cliente.id_cliente = Number(c.Id);
            this.cliente.nombre = c.Nombre;
            this.cliente.apellido = c.Apellido;
            this.clientes.push(this.cliente);

          });
          // console.log('nombre cliente ---- ' + this.clientes.length);
          return this.clientes;

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
    return this.clientes;
  }

  mostrarClientes(): Cliente[] {
    return this.clientes;
  }

  mostrarCliente(): Cliente {
    return this.cliente;
  }
}
