import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()user:any;
  role:any="";

  constructor(private http:HttpClient,private dataService:DataService,private router:Router) {

   }

logout(){
   this.http.delete(environment.api+"/logout" +`/${this.user._id}`);
   this.router.navigate(['/login']);

}

verifprofil(){
  this.router.navigate(['/profil',this.user._id]);
}

  ngOnInit(): void {
console.log(this.user);
  
  }
}
