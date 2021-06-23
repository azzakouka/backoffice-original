import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import {TableModule} from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeMedecinComponent } from './liste-medecin/liste-medecin.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ListepharmacienComponent } from './listepharmacien/listepharmacien.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ToastModule} from 'primeng/toast';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DropdownModule} from 'primeng/dropdown';
import {MatSelectModule} from '@angular/material/select';
import {SidebarModule} from 'primeng/sidebar';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GlobalHttpInterceptorService } from './GlobalHttpInterceptorService';
import { DataService } from './data.service';
import { LoginComponent } from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AjoutPersComponent } from './ajout-pers/ajout-pers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ProfilComponent } from './profil/profil.component';
import {ChartModule} from 'primeng/chart';
import {ProgressBarModule} from 'primeng/progressbar';
import {NgxPrintModule} from 'ngx-print';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModifProfilComponent } from './modif-profil/modif-profil.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    ListeMedecinComponent,
    ListepharmacienComponent,
    NavbarComponent,
    LoginComponent,
    AjoutPersComponent,
    DashboardComponent,
    ProfilComponent,
    ModifProfilComponent
  ],
  imports: [MatTabsModule,ProgressBarModule,
    MatButtonModule,DialogModule,
    MatCheckboxModule,ConfirmDialogModule,
    MatGridListModule,ChartModule,
    MatInputModule,MDBBootstrapModule.forRoot(),
    MatIconModule,NgxPrintModule,
    BrowserAnimationsModule,
    DropdownModule,MatSelectModule,SidebarModule,
    BrowserModule,ToastModule,
    AppRoutingModule,MatFormFieldModule,
    TableModule,FormsModule,
    HttpClientModule,ToastModule,
    InputSwitchModule,BrowserAnimationsModule
  ],

    exports:[MatTabsModule,MatFormFieldModule,DropdownModule,MatSelectModule,SidebarModule,BrowserAnimationsModule,MatIconModule],
    providers: [ConfirmationService, DataService,MessageService,CookieService,{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }   ],
    bootstrap: [AppComponent]
})
export class AppModule {  constructor(private primengConfig: PrimeNGConfig) {} }

