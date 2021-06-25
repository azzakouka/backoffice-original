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
  hide:any=true;
  password?:any="";
  email?:any="";
  codhop?:any="";
  service:any[]=[{value:"Pneumologie"},
                {value:"cardiologie"},
                {value:"Pédiatrie"},
                {value:"Chirurgie Orthopédique"},
                {value:"Gynécologie "},
                {value:"Allergologie"},
                {value:"cytologie "}
              ]
 specialite:any[]=[{value:"Spécialiste"},
              {value:"Généraliste"},
              {value:"Professeur"}
            ]
  status?:any="pending";
 
  pass:any="";
  jour:any="";
  capacite:any="";
  psdo:any="";
  pas:any="";
  psseudo:any="";
  confemail:any=""

  nom_pharm:any="";
  prenom_pharm:any="";
role:any="F";
isup=false;
test:boolean=true;

  enabled?:boolean=false;
  medecins:any[]=[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  spece: any="";
  serve: any="";
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

  

///Signup médecin

  Submit(form:any) {

    console.log ("form.value", form.value)
         let addedData = JSON.stringify(form.value);
         console.log ("addedData", addedData);
       this.http.post(environment.api+"auth/signupMedecin", addedData,this.httpOptions).subscribe((res) => {
        //this.router.navigate(['/login']);
          this.messageService.add({severity:'success', summary: 'Message', detail:'Medecin ajouté avec succés '});

         },
           error => {
             this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
           });
   }
///Sign up pharmacien
   SubmitUser(form:any){
    console.log ("form.value", form.value)
    let addedData = JSON.stringify(form.value);
    console.log ("addedData", addedData);
  this.http.post(environment.api+"auth/signupPharmacien", addedData,this.httpOptions).subscribe((res) => {
    this.messageService.add({severity:'success', summary: 'Message', detail:'Pharmacien ajouté avec succés'});
   //this.router.navigate(['/login']);
    },
      error => {
      this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
      });
   }
   
   logout(){
    this.http.delete(environment.api+"/logout" +`/${this.user._id}`);
    this.router.navigate(['/login']);

 }

 verifprofil(){
   this.isup=true;
 }
}
