import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-liste-medecin',
  templateUrl: './liste-medecin.component.html',
  styleUrls: ['./liste-medecin.component.css']
})
export class ListeMedecinComponent implements OnInit {

  medecin:any[]=[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  medecins:any[]=[];
  user:any;
codhop:any;
isup=false;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,private dataService: DataService,private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.user=this.dataService.user;
    this.codhop=this.dataService.codhop;

    this.dataService.getAllMedecins(this.codhop).subscribe(data=>{
      console.log(data);
      this.medecin.push(data);
      console.log(this.medecin[0]['data']);
      this.medecins=this.medecin[0]['data'];
    console.log(this.medecins);

    });
}

confirm2(id:any) {
 this.confirmationService.confirm({
     message: 'Voulez vous supprimer ce medecin?',
     header: 'Confirmation',
     icon: 'pi pi-info-circle',
     accept: () => {
       //this.dataService.deleterest(id);
       //this.msgs = [{severity:'info', summary:'confirmé', detail:'Restaurant supprimé'}];
       this.dataService.delete(id).subscribe(
         (Response:any) => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Medecin supprimé avec succées'});
           console.log("success");
           window.location.reload();

         },
         (error:any) => {
          this.messageService.add({severity:'danger', summary: 'danger', detail: 'Erreur de suppression '});
           console.log("error");
        });
       //  this.msgs = [{severity:'info', summary:'confirmé', detail:'Restaurant supprimé'}];
     },
     reject: () => {
        // this.msgs = [{severity:'info', summary:'Annulation', detail:''}];
     }
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
