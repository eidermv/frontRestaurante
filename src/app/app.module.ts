import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './componentes/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './componentes/menu/menu.component';
import { AgregarComponent } from './componentes/atencion/agregar/agregar.component';
import { ListarAtencionComponent } from './componentes/atencion/listar-atencion/listar-atencion.component';
import { ListarIngredienteComponent } from './componentes/ingrediente/listar-ingrediente/listar-ingrediente.component';
import { ListarPlatoComponent } from './componentes/plato/listar-plato/listar-plato.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AgregarComponent,
    ListarAtencionComponent,
    ListarIngredienteComponent,
    ListarPlatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
