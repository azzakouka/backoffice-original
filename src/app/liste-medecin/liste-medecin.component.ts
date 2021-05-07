import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private dataService: DataService,private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.dataService.getAllMedecins().subscribe(data=>{
      console.log(data);
      this.medecin.push(data);
      console.log(this.medecin[0]['data']);
      this.medecins=this.medecin[0]['data'];
    console.log(this.medecins);
   
    })
    

}

}
