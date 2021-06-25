import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:any;
  role:any="";

  constructor(private http:HttpClient,private dataService:DataService,private cookieService:CookieService) {

   }
   logout(){
    this.dataService.logout();
    this.user="";
    this.role="";
   }

  ngOnInit(): void {
    this.user=JSON.parse(this.cookieService.get('data'));
console.log(this.user);

  }
}
