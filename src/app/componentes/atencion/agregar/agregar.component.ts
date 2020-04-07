import { Component, OnInit } from '@angular/core';

import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Sede} from "../../../modelos/sede";
import {Cliente} from "../../../modelos/cliente";
import {Menu} from "../../../modelos/menu";
import {Atencion} from "../../../modelos/atencion";
import {SedeService} from "../../../servicios/sede.service";
import {ClienteService} from "../../../servicios/cliente.service";
import {MenuService} from "../../../servicios/menu.service";
import {AtencionService} from "../../../servicios/atencion.service";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  private atencionNuevo: Atencion;
  private sedes: Sede[];
  private clientes: Cliente[];
  private menus: Menu[];
  private esInvalidoForm: boolean = false;

  atencionForm = this.fb.group({
    sede: ['', Validators.required],
    cliente: ['', Validators.required],
    menu: ['', Validators.required],
    cantidad_ped: ['', Validators.required]
  });


  private agregado: boolean = false;

  constructor(
    private sedeService: SedeService,
    private clienteService: ClienteService,
    private menuService: MenuService,
    private atencionService: AtencionService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.atencionNuevo = new Atencion();
  }

  ngOnInit() {
    this.sedeService.getSedes();
    this.sedeService.mostrarSedes.subscribe(data => {
      this.sedes = JSON.parse(JSON.stringify(data));
    });
    this.clientes = this.clienteService.getClientes();
    this.menus = this.menuService.getMenus();

  }

  esValidoSede() {
    return this.sede.invalid && (this.sede.dirty || this.sede.touched);
  }

  esValidoCliente() {
    return this.cliente.invalid && (this.cliente.dirty || this.cliente.touched);
  }

  esValidoMenu() {
    return this.menu.invalid && (this.menu.dirty || this.menu.touched);
  }

  esValidoCantidad() {
    return this.cantidad.invalid && (this.cantidad.dirty || this.cantidad.touched);
  }

  onResetForm() {
    this.atencionForm.reset();
    this.atencionService.limpiarServicio();
    this.sedeService.limpiarServicio();
    this.clienteService.limpiarServicio();
    this.menuService.limpiarServicio();
  }

  get sede() { return this.atencionForm.get('sede'); }
  get cliente() { return this.atencionForm.get('cliente'); }
  get menu() { return this.atencionForm.get('menu'); }
  get cantidad() { return this.atencionForm.get('cantidad_ped'); }

  guardar() {
    if (this.atencionForm.valid) {
      // console.log(this.loginForm.value.usuario);
      this.atencionNuevo.sede.id_sede = Number(this.atencionForm.value.sede);
      this.atencionNuevo.cliente.id_cliente = Number(this.atencionForm.value.cliente);
      this.atencionNuevo.menu.id_menu = Number(this.atencionForm.value.menu);

      this.atencionNuevo.cantidad_ped = this.atencionForm.value.cantidad_ped;
      this.atencionService.agregar(this.atencionNuevo);
      setTimeout(() => {
        // console.log('valor de rta ---- ' + this.productoService.resultado);
        if (this.atencionService.resultado) {
          this.esInvalidoForm = false;
          this.agregado = true;
          this.onResetForm();
        } else {
          this.onResetForm();
          this.esInvalidoForm = true;
        }
      }, 500);

      setTimeout(() => {
        this.agregado = false;
        this.atencionService.resultado = false;
      }, 10000);

    } else {
      this.esInvalidoForm = true;
    }
  }

  volver() {
    this.router.navigateByUrl('/listar_atencion');
  }


}
