import {Sede} from "./sede";
import {Cliente} from "./cliente";
import {Menu} from "./menu";

export class Atencion {
  id_atencion: number;
  sede: Sede;
  cliente: Cliente;
  menu: Menu;
  cantidad_ped: number;

  constructor() {
    this.id_atencion = 0;
    this.sede = new Sede();
    this.cliente = new Cliente();
    this.menu = new Menu();
    this.cantidad_ped = 0;
  }
}
