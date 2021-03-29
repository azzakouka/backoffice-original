import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeMedecinComponent } from './liste-medecin/liste-medecin.component';

const routes: Routes = [
  {path:'listeMedecin', component:ListeMedecinComponent},
  {path:'', redirectTo:'listeMedecin', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
