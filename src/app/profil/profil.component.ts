import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user:any;
  role:any;
  rdv:any[]=[];
  test=false;
  pat=false;
  mdp:any="";
  pass:any="";
  hist=false;
  isup=false;
  rendezvous:any;
  edit=false;

    constructor(private http:HttpClient,private dataService:DataService,private router:Router) {

    }
    ngOnInit(): void {
      this.user=this.dataService.user;
      this.edit=true;
    }


    Submit(f:any){
      if(this.mdp!=""){
        if(this.mdp==f.value.password)
        {
          this.dataService.update(f.value,this.user._id,"auth/modifResp").subscribe( (Response) => {
            console.log("success");
        },
          (error) =>{
            console.log("error");
      });
        }
        else
        console.log("incorrect mdp");
      }
      else
     {
       console.log(this.user.password,f.value.password);
       if(this.user.password==f.value.password)
        {
          this.dataService.update(f.value,this.user._id,"auth/modifResp").subscribe( (Response) => {
            console.log("success");
        },
          (error) =>{
            console.log("error");
      });
     }}
    }
}
