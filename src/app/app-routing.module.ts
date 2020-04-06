import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgregarComponent} from './componentes/atencion/agregar/agregar.component';
import {ListarAtencionComponent} from './componentes/atencion/listar-atencion/listar-atencion.component';
import {ListarIngredienteComponent} from './componentes/ingrediente/listar-ingrediente/listar-ingrediente.component';
import {ListarPlatoComponent} from './componentes/plato/listar-plato/listar-plato.component';


const routes: Routes = [
  {path: 'agregar_atencion', component: AgregarComponent},
  {path: 'listar_atencion', component: ListarAtencionComponent},
  {path: 'listar_ingrediente', component: ListarIngredienteComponent},
  {path: 'listar_plato', component: ListarPlatoComponent},
  {path: '', redirectTo: '/listar_ingrediente', pathMatch: 'full'},
  {path: '**', redirectTo: '/listar_ingrediente', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
