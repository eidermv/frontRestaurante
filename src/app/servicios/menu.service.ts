import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Menu} from '../modelos/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menu: Menu = new Menu();
  private menus: Menu[] = [];

  constructor(
    private http: HttpClient
  ) { }

  /*
http://localhost:3000/menu/menus
http://localhost:3000/menu/porId
 */

  getMenu(idM: number) {
    // console.log('categria usuario ---' + idU);
    this.menus = [];

    this.http.post(environment.apiUrl + '/menu/porId', {
      id: idM
    }).subscribe((data: any) => {
        if (data.estado === 'Fallo') {
          console.log(data.mensaje);
        } else {
          data.datos.forEach(c => {
            this.menu = new Menu();
            this.menu.id_menu = Number(c.Id);
            this.menu.descripcion = c.Descripcion;
            this.menu.id_sede = Number(c.Id_sede);
            this.menus.push(this.menu);

          });
          // console.log('nombre menu ---- ' + this.menus.length);
          return this.menus;

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
    return this.menus;
  }

  mostrarMenus(): Menu[] {
    return this.menus;
  }

  mostrarMenu(): Menu {
    return this.menu;
  }
}
