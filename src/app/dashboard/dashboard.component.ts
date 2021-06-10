import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BarController, BarElement, Chart,CategoryScale, Filler, Legend, Title, Tooltip, LinearScale, PieController, ArcElement, LineElement, LineController, PointElement} from 'chart.js';
import { min } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any;
rdv:any[]=[];
soins:any[]=[];
categ:any[]=[];
patients:any[]=[];
benef:any="";
codhop:any="";
nonRdv:any[]=[];
cnss:any[]=[];
tComplet:any[]=[];
cnam:any[]=[];
enfants:number=0;
adulte:number=0;
age:number=0;
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
isup=false;

    constructor(private dataService: DataService,private http:HttpClient,private router:Router) {
      Chart.register(BarElement,LineElement,LineController,PointElement, BarController,PieController, CategoryScale,LinearScale,ArcElement, Filler, Legend, Title, Tooltip);

      }

  ngOnInit(): void {
    this.user=this.dataService.user;
    this.codhop=this.dataService.codhop;

    this.dataService.getAllBenef(this.codhop).subscribe((data:any)=>{
      this.patients=data['data'];
      console.log(this.patients);
      this.CategorieAge();
    });

    this.dataService.getAllSoins(this.codhop).subscribe((data:any)=>{
      this.soins=data["data"];
      this.getTypeBen();

      this.myChart = new Chart('myPie', {
        type: 'pie',
        data: {
            labels: ['Cnam', 'Cnss/Cnrps', 'Tarif Complet'],
            datasets: [
              {
                  data: this.categ,
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
    });

    this.dataService.getAllRdv(this.codhop).subscribe((data:any)=>{
      this.rdv=data["data"];
      this.Montantpaiement();
      this.nbrRdv();

      this.myChart = new Chart('myChart', {
        type: 'bar',
        data: {
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
            datasets: [ {
              label: 'Nombre des rendez-vous confirmé',
              backgroundColor: '#42A5F5',
              data: this.nbr
          },
          {
              label: 'Nombre des rendez-vous non confirmé',
              backgroundColor: '#FFA726',
              data: this.nonRdv
          }]
        },

    });

    /*this.chart = new Chart('chart', {
      type: 'bar',
      data: {
          labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
          datasets: [ {
            label: 'Nombre CNSS',
            backgroundColor: '#10b08d',
            data: [50,2,5,5,65,65,65,62,5,9,98,65]
        },
        {
          label: 'Nombre des tarifs complets',
          backgroundColor: '#102db0',
          data: [50,2,5,5,65,65,65,62,5,9,98,65]
        },
      {
        label: 'Nombre CNAM',
        backgroundColor: '#6d10b0',
        data: [50,2,5,5,65,65,65,62,5,9,98,65]
      },
       ]
      },

  });*/

    this.myLine = new Chart('myLine', {
      type: 'line',
      data: {
          labels: ['2019', '2020', '2021'],
          datasets: [ {
            label: 'Montant des paiements',
            backgroundColor: '#102db0',
            data: this.montants
        }]
      },

  });

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

  getTypeBen(){
    let cn=0;
    let tc=0;
    let cnr=0;
    for(let j=0;j<this.soins.length;j++)
    {
      if(this.soins[j].regime=="c11")
        cn++;
      else
      {
        if(this.soins[j].regime=="c12")
          cnr++;
        else
        if(this.soins[j].regime=="p10")
        tc++;
      }
    }
    this.categ.push(cn);
    this.categ.push(cnr);
    this.categ.push(tc);
    console.log(this.categ);
  }

  nbrRdv(){
    this.nbr=[];
    this.montants=[];
    let months=['01','02','03','04','05','06','07','08','09','10','11','12']
    for(let i=0;i<months.length;i++)
    {
      let count=0;
      let conf=0;
      //let montant=0;
      for(let j=0;j<this.rdv.length;j++)
        {if(this.rdv[j].date_rdv.substr(5,2)==months[i] && this.rdv[j].date_rdv.substr(0,4)==this.annee && this.rdv[j].etat==true)
           {
             count++;
          }
          else
          if(this.rdv[j].date_rdv.substr(5,2)==months[i] && this.rdv[j].date_rdv.substr(0,4)==this.annee && this.rdv[j].etat==false)
           {
             conf++;
          }
        }
      this.nbr.push(count);
      this.nonRdv.push(conf);
      }
    console.log(this.nbr);
    this.myChart.destroy();
    /*this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
          datasets: [ {
            label: 'Nombre des rendez-vous confirmé',
            backgroundColor: '#42A5F5',
            data: this.nbr
        },
        {
            label: 'Nombre des rendez-vous non confirmé',
            backgroundColor: '#FFA726',
            data: this.nonRdv
        }]
      },

  });*/
  }

  Montantpaiement(){
    let annee=['2019','2020','2021'];
    for(let i=0;i<annee.length;i++)
    {
      let total=0;
      for(let j=0;j<this.rdv.length;j++)
        if( this.rdv[j].date_rdv.substr(0,4)==annee[i] && this.rdv[j].etat==true)
          {
          total+=this.rdv[j].montant_rdv;
          }
      this.montants.push(total);
    }
    console.log(this.montants);
  }

  CategorieAge(){
    let date=new Date();
    console.log(new Date(this.patients[0].date_nai_benef).getFullYear());
   for(let j=0;j<this.patients.length;j++){
         let diff=date.getFullYear()-new Date(this.patients[j].date_nai_benef).getFullYear();
      console.log(diff);
      if(diff>=1 && diff <=18)
       {
         this.enfants++;
      }
      else
      {
          if(diff>18 && diff <=60)
            {
              this.adulte++;
            }
            else
              if(diff>60)
                this.age++;
      }
      }

  }
  logout(){
    this.http.delete(environment.api+"/logout" +`/${this.user._id}`);
    this.router.navigate(['/login']);

 }

 verifprofil(){
   this.isup=true;
 }
}
