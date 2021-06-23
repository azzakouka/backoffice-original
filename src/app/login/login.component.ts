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
  constructor(private dataService: DataService,private router:Router,private http:HttpClient,private messageService: MessageService) { }

  public ngOnInit(): void {
    this.dataService.getAllHopitals().subscribe((data:any)=>{
      console.log(data['data']);
      this.hopitals=data['data'];
      console.log(this.hopitals);
    })
  }

  async Submit(form:any) {

    console.log(form.value);
if( form.value.email=="" && form.value.password==""){
  this.messageService.add({severity:'error', summary: ' Message', detail:'Veuillez saisir des données valides'});
       }
         else
{ setTimeout(() => {
  this.dataService.getCurrentUser(form,this.codhop);
  console.log(this.dataService.user);
  if(  this.dataService.user==undefined)
        this.messageService.add({severity:'error', summary: ' Message', detail:'Données incorrectes'});
else
this.router.navigate(['/dash']);

}, 1000);
}
  }

}
