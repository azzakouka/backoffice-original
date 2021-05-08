import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeMedecinComponent } from './liste-medecin/liste-medecin.component';
import { ListepharmacienComponent } from './listepharmacien/listepharmacien.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'listeMedecin', component:ListeMedecinComponent},
  {path:'login', component:LoginComponent},
  {path:"listePharmacien", component:ListepharmacienComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
