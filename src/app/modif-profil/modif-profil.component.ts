import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-modif-profil',
  templateUrl: './modif-profil.component.html',
  styleUrls: ['./modif-profil.component.css']
})
export class ModifProfilComponent implements OnInit {
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
  display: any;

  constructor(private http:HttpClient,private dataService:DataService,private router:Router,private messageService:MessageService,private cookieService:CookieService) { }

    ngOnInit() {
      this.display = true;
      this.user=JSON.parse(this.cookieService.get('data'));
      this.edit=true;
    }

    closeModal() {
      this.display=false;
    }
    Submit(f:any){
      if(this.mdp!=""){
        if(this.mdp==f.value.password)
        {
          this.dataService.update(f.value,this.user._id,"auth/modifResp").subscribe( (Response) => {
            this.messageService.add({severity:'success', summary: ' Message', detail:'modification enregistrée avec succés'});

            console.log("success");
        },
          (error) =>{
            this.messageService.add({severity:'error', summary: ' Erreur', detail:'erreur lors de la modification'});
            console.log("error");
      });
        }
        else
        {
          this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});
          console.log("incorrect mdp");
        }
      }
      else
     {
       console.log(this.user.password,f.value.password);
       if(this.user.password==f.value.password)
        {
          this.dataService.update(f.value,this.user._id,"auth/modifResp").subscribe( (Response) => {
            this.messageService.add({severity:'success', summary: ' Message', detail:'modification enregistrée avec succés'});
            console.log("success");
        },
          (error) =>{
            this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});
            console.log("error");
      });
     }}
    }

    logout(){
      this.http.delete(environment.api+"/logout" +`/${this.user._id}`);
      this.router.navigate(['/login']);

   }

   verifprofil(){
     this.router.navigate(['/profil',this.user._id]);
   }

}
