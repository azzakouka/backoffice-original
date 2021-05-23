import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   private socket: any;
  public data: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  mail:any="";
  mdp:any="";
  hopitals:any[]=[];
  codhop:any;
  constructor(private dataService: DataService,private router:Router,private http:HttpClient) { }

  public ngOnInit(): void {
    this.dataService.getAllHopitals().subscribe((data:any)=>{
      console.log(data['data']);
      this.hopitals=data['data'];
      console.log(this.hopitals);
    })
  }

  Submit(form:any){
    console.log ("form.value", form.value)
    this.dataService.getCurrentUser(form,this.codhop);
   }
}
