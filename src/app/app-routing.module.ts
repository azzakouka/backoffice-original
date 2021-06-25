import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutPersComponent } from './ajout-pers/ajout-pers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListeMedecinComponent } from './liste-medecin/liste-medecin.component';
import { ListepharmacienComponent } from './listepharmacien/listepharmacien.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {path:'listeMedecin', component:ListeMedecinComponent},
  {path:'profil/:id', component:ProfilComponent},
  {path:'AjoutPers', component:AjoutPersComponent},
  {path:'dash', component:DashboardComponent},
  {path:'login', component:LoginComponent},
  {path:"listePharmacien", component:ListepharmacienComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
