import { Component, OnInit } from '@angular/core';
import {BarController, BarElement, Chart,CategoryScale, Filler, Legend, Title, Tooltip, LinearScale, PieController, ArcElement, LineElement, LineController, PointElement} from 'chart.js';
import { min } from 'rxjs/operators';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any;
rdv:any[]=[];
data: any;
myChart:any;
myPie:any;
myLine:any;
chart:any;
nbr:any[]=[];
montants:any[]=[];
annee:any="2021";
tab:any[]=[{anee:'2021'},
            {anee:'2020'},
            {anee:'2019'}
            ];
nombre:number=0;
montantPaie:number=0;

    constructor(private dataService: DataService) {
      Chart.register(BarElement,LineElement,LineController,PointElement, BarController,PieController, CategoryScale,LinearScale,ArcElement, Filler, Legend, Title, Tooltip);

      }

  ngOnInit(): void {
    this.user=this.dataService.user;

    this.dataService.getAllRdv().subscribe((data:any)=>{
      this.rdv=data["data"];
      for (let i=0;i<this.rdv.length;i++)
      {
        if(this.rdv[i].etat==false)
          this.nombre++;
      }
      this.nombre/=100;

      this.Montantpaiement();
      this.nbrRdv();

      this.myChart = new Chart('myChart', {
        type: 'bar',
        data: {
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
            datasets: [ {
              label: 'Nombre des rendez-vous',
              backgroundColor: '#42A5F5',
              data: this.nbr
          },
          {
              label: 'Somme des montants payé',
              backgroundColor: '#FFA726',
              data: [28, 48, 40, 19, 6, 27, 0]
          }]
        },

    });

    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
          labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
          datasets: [ {
            label: 'Nombre des soins',
            backgroundColor: '#42A5F5',
            data: this.nbr
        },
       ]
      },

  });

    this.myLine = new Chart('myLine', {
      type: 'line',
      data: {
          labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
          datasets: [ {
            label: 'Montant des paiements',
            backgroundColor: '#42A5F5',
            data: this.nbr
        }]
      },

  });

    });

    this.myChart = new Chart('myPie', {
      type: 'pie',
      data: {
          labels: ['Janvier', 'Fevrier', 'Mars'],
          datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
      },

  });

/*{
                data: this.nbr,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(230, 230, 88, 1)',
                  'rgba(175, 88, 230, 1)',
                  'rgba(230, 88, 110, 1)',
                  'rgba(88, 119, 230, 1)',
                  'rgba(230, 139, 88, 1)',
                  'rgba(79, 174, 88, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(230, 230, 88, 1)',
                    'rgba(175, 88, 230, 1)',
                    'rgba(230, 88, 110, 1)',
                    'rgba(88, 119, 230, 1)',
                    'rgba(230, 139, 88, 1)',
                    'rgba(79, 174, 88, 1)'
                ],
                borderWidth: 1
              }*/



  }

  nbrRdv(){
    this.nbr=[];
    this.montants=[];
    let months=['01','02','03','04','05','06','07','08','09','10','11','12']
    for(let i=0;i<months.length;i++)
    {
      let count=0;
      let montant=0;
      for(let j=0;j<this.rdv.length;j++)
        if(this.rdv[j].date_rdv.substr(5,2)==months[i] && this.rdv[j].date_rdv.substr(0,4)==this.annee)
           {count++;
           montant+=this.rdv[j].montant_rdv;
          }
      this.nbr.push(count);
      this.montants.push(montant);
      }
    console.log(this.nbr);
  }

  Montantpaiement(){

    let total=0;
    for(let j=0;j<this.rdv.length;j++)
    if( this.rdv[j].date_rdv.substr(0,4)==this.annee && this.rdv[j].etat==true)
       {
         console.log(this.rdv[j].montant_rdv);
       total+=this.rdv[j].montant_rdv;
       console.log(total);
      }
      this.montantPaie=total;
      console.log(this.montantPaie);
  }

}
