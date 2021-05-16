import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user:any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.user=this.dataService.user;
  }
}
