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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
