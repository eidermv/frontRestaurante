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
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {SedeService} from './servicios/sede.service';
import {PlatoService} from './servicios/plato.service';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MyMatPaginatorInt} from './componentes/plato/listar-plato/my-mat-paginator-int';
import {AtencionService} from './servicios/atencion.service';
import {ClienteService} from './servicios/cliente.service';
import {MenuService} from './servicios/menu.service';
import {IngredienteService} from './servicios/ingrediente.service';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AgregarComponent,
    ListarAtencionComponent,
    ListarIngredienteComponent,
    ListarPlatoComponent,
    MatIcon
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    SedeService,
    PlatoService,
    AtencionService,
    ClienteService,
    MenuService,
    IngredienteService,
    { provide: MatPaginatorIntl, useClass: MyMatPaginatorInt}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
