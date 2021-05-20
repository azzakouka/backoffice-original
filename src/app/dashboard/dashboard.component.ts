import { Component, OnInit } from '@angular/core';
import {BarController, BarElement, Chart,CategoryScale, Filler, Legend, Title, Tooltip, LinearScale} from 'chart.js';
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
nbr:any[]=[];
annee:any="2021";
tab:any[]=[{anee:'2021'},
            {anee:'2020'},
            {anee:'2019'}
            ];

    constructor(private dataService: DataService) {
      Chart.register(BarElement, BarController, CategoryScale,LinearScale, Filler, Legend, Title, Tooltip);

      }

  ngOnInit(): void {
    this.user=this.dataService.user;

    this.dataService.getAllRdv().subscribe((data:any)=>{
      this.rdv=data["data"];
      console.log(this.rdv[0].date_rdv.substr(5,2));
      this.nbrRdv();
      this.myChart = new Chart ('myChart', {
        type: 'bar',
        data: {
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
            datasets: [{
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
            }]
        },

    });

    });




  }

  nbrRdv(){
    this.nbr=[];
    let months=['01','02','03','04','05','06','07','08','09','10','11','12']
    for(let i=0;i<months.length;i++)
    {
      let count=0;
      for(let j=0;j<this.rdv.length;j++)
        if(this.rdv[j].date_rdv.substr(5,2)==months[i] && this.rdv[j].date_rdv.substr(0,4)==this.annee)
           count++;
      this.nbr.push(count);
      }
    console.log(this.nbr);
  }
}
