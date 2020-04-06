import {Sede} from './sede';

export class Ingrediente {
  id_ingrediente: number;
  nombre: string;
  cantidad: number;
  sede: Sede;

  constructor() {
    this.id_ingrediente = 0;
    this.nombre = '';
    this.cantidad = 0;
    this.sede = new Sede();
  }
}
