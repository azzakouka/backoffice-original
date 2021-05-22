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
soins:any[]=[];
categ:any[]=[];
benef:any="";
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

    constructor(private dataService: DataService) {
      Chart.register(BarElement,LineElement,LineController,PointElement, BarController,PieController, CategoryScale,LinearScale,ArcElement, Filler, Legend, Title, Tooltip);

      }

  ngOnInit(): void {
    this.user=this.dataService.user;
    console.log(this.categ);

    this.dataService.getAllSoins().subscribe((data:any)=>{
      this.soins=data["data"];
      console.log(this.soins);
      this.getTypeBen();
     // this.CategorieAge();
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

    this.chart = new Chart('chart', {
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
          // montant+=this.rdv[j].montant_rdv;
          }
          else
          if(this.rdv[j].date_rdv.substr(5,2)==months[i] && this.rdv[j].date_rdv.substr(0,4)==this.annee && this.rdv[j].etat==false)
           {
             conf++;
          }
        }
      this.nbr.push(count);
      this.nonRdv.push(conf);
     // this.montants.push(montant);
      }
    console.log(this.nbr);
  }

  Montantpaiement(){

    let total=0;
    for(let j=0;j<this.rdv.length;j++)
    if( this.rdv[j].date_rdv.substr(0,4)==this.annee && this.rdv[j].etat==true)
       {
       total+=this.rdv[j].montant_rdv;
      }
      this.montantPaie=total;
  }
getBenef(f:any,a:any,ag:any){
  this.categ=[0,0,0];
  console.log(this.categ);
  let count=0;
  let ad=0;
  let enf=0;

  this.categ.push(f);
    this.categ.push(a);
    this.categ.push(ag);
console.log(this.categ);
}
  CategorieAge(){
    this.categ=[0,0,0];
    console.log(this.categ);
    let count=0;
    let ad=0;
    let enf=0;
    let date=new Date();
   for(let j=0;j<this.soins.length;j++){
    this.dataService.getBenef(this.soins[j].cod_benef,this.user.cod_hop).subscribe((data:any)=>{
      let diff=date.getFullYear()-new Date(data['data'][0].date_nai_benef).getFullYear();
      console.log(diff);
      if(diff>=1 && diff <=18)
       { enf++;
        //this.categ[0]=enf;
        //this.enfants=enf;
      }
      else
      {
          if(diff>18 && diff <=60)
            {
              ad++;
              //this.categ[1]=ad;
             // this.adulte=ad;
            }
            else
              if(diff>60)
               {count++;
                //this.categ[2]=count;
              //  this.age=count;
              }
      }
      this.getBenef(enf,ad,count);
    });

    }

    console.log(this.categ);
  }
}
