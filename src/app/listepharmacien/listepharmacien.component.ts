import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-listepharmacien',
  templateUrl: './listepharmacien.component.html',
  styleUrls: ['./listepharmacien.component.css'],
  providers: [MessageService]

})
export class ListepharmacienComponent implements OnInit {

  
  medecin:any[]=[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  } 
  medecins:any[]=[];
  user:any="";

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,private dataService: DataService,private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.user=this.dataService.user;
    this.dataService.getAllPharmaciens().subscribe(data=>{
      console.log(data);
      this.medecin.push(data);
      console.log(this.medecin[0]['data']);
      this.medecins=this.medecin[0]['data'];
    console.log(this.medecins);
   
    });
}

confirm2(id:any) {
  this.confirmationService.confirm({
      message: 'Voulez vous supprimer ce pharmacien?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        //this.dataService.deleterest(id);
        //this.msgs = [{severity:'info', summary:'confirmé', detail:'Restaurant supprimé'}];
        this.dataService.delete(id).subscribe(
          (Response:any) => {
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Pharmacien supprimé avec succées'});
            console.log("success");
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

}


