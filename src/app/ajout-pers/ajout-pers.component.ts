import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ajout-pers',
  templateUrl: './ajout-pers.component.html',
  styleUrls: ['./ajout-pers.component.css']
})
export class AjoutPersComponent implements OnInit {
  name?:any="";
  prenom?:any="";
  password?:any="";
  email?:any="";
  specialite?:any="";
  service?:any="";
  codhop?:any="";
  status?:any="pending";
  nom_pren_benef:any="";
  pren_benef:any="";
  pren_pere_benef:any="";
  pren_mere_benef:any="";
  pass:any="";
  jour:any="";
  capacite:any="";
  psdo:any="";
  pas:any="";
  psseudo:any="";
  confemail:any=""
  date_nai_benef:any="";
  sexe_benef:any="";
  tel_benef:any="";
role:any="F";
test:boolean=true;
code=Math.floor(Math.random() * 999999) + 100000;
  enabled?:boolean=false;
  medecins:any[]=[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  jours: any[] = [
    {value: 'S', viewValue: 'Specialiste'},
    {value: 'P', viewValue: 'Professeur'},
    {value: 'G', viewValue: 'Generaliste'},
  ];

  hopital:any[]=[];
  hopitals:any[]=[];
  user:any="";

    constructor(private dataService: DataService,private router:Router,private http:HttpClient, private messageService: MessageService) { }

    ngOnInit() {
      this.user=this.dataService.user;
      this.dataService.getAllHopitals().subscribe((data)=>{
        console.log(data);
        this.hopital.push(data);
        console.log(this.hopital[0]['data']);
        this.hopitals=this.hopital[0]['data'];
      });
    }

    notify(subject:any,code:any){
      this.test=false;
      let ch=this.psseudo;

      let object={"to":ch,"sub":"Confirmation","text":code+subject};
      return this.http.post(environment.api+"users/mailing", object).subscribe((res:any) => {
        console.log("success");
        console.log(code);

        this.messageService.add({severity:'success', summary: 'Success', detail: 'email envoyée avec succées'});
       },
         error => {
          this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
          console.log("error");
      });

    }



  Submit(form:any) {

    console.log ("form.value", form.value)
         let addedData = JSON.stringify(form.value);
         console.log ("addedData", addedData);
       this.http.post(environment.api+"auth/signupMedecin", addedData,this.httpOptions).subscribe((res) => {
        this.router.navigate(['/login']);
          this.messageService.add({severity:'success', summary: 'Message', detail:'Succes'});

         },
           error => {
             this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
           });
   }

   SubmitUser(form:any){
    console.log ("form.value", form.value)
    let addedData = JSON.stringify(form.value);
    console.log ("addedData", addedData);
  this.http.post(environment.api+"auth/signupPharmacien", addedData,this.httpOptions).subscribe((res) => {
    this.messageService.add({severity:'success', summary: 'Message', detail:'Succes'});
   this.router.navigate(['/login']);
    },
      error => {
      this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
      });
   }

}
