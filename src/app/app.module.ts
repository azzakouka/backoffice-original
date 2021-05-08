import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
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

@NgModule({
  declarations: [
    AppComponent,
    ListeMedecinComponent,
    ListepharmacienComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [MatTabsModule,
    DropdownModule,MatSelectModule,SidebarModule,
    BrowserModule,ToastModule,
    AppRoutingModule,MatFormFieldModule,
    TableModule,FormsModule,
    HttpClientModule,
    InputSwitchModule,BrowserAnimationsModule
  ],

    exports:[MatTabsModule,MatFormFieldModule,DropdownModule,MatSelectModule,SidebarModule,BrowserAnimationsModule],
    providers: [ DataService,{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }   ],
    bootstrap: [AppComponent]
})
export class AppModule {  constructor(private primengConfig: PrimeNGConfig) {} }

