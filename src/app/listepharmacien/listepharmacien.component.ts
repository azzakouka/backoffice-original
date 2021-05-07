import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-listepharmacien',
  templateUrl: './listepharmacien.component.html',
  styleUrls: ['./listepharmacien.component.css']
})
export class ListepharmacienComponent implements OnInit {
  pharmaciens: any[]=[];
  pharmacien: any[]=[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  } 
  constructor(private dataService: DataService,private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.dataService.getAllPharmaciens().subscribe(data=>{
      console.log(data);
      this.pharmacien.push(data);
      console.log(this.pharmacien[0]['data']);
      this.pharmaciens=this.pharmacien[0]['data'];
    console.log(this.pharmaciens);
    })

    
   
 

  

  }

}


