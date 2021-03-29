import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-medecin',
  templateUrl: './liste-medecin.component.html',
  styleUrls: ['./liste-medecin.component.css']
})
export class ListeMedecinComponent implements OnInit {
  listeMedecin: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
