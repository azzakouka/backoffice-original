import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  id:any;
user:any;
  constructor(private http: HttpClient,private router:Router) { }
  getAllHopitals(): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"rdv");
}
  getAllMedecins(): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"users/medecins");
  }
  getAllPharmaciens(): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"users/pharmaciens");
  }
  delete(id:any){
    return this.http.delete(environment.api+"auth/deleteMed"+`/${id}`);
   }
   update(f:any,id:any,path:any){
    return this.http.patch(environment.api+path+`/${id}`,f );
   }
getCurrentUser(f:any){
  let addedData = JSON.stringify(f.value);
         console.log ("addedData", addedData);
    return this.http.post(environment.api+"auth/loginUser", addedData,this.httpOptions).subscribe((res:any) => {
          localStorage.setItem("token",res.token)
          this.user=res.user;
          console.log(this.user);
         // this.verify(this.id);
          this.router.navigate(['/dash']);

         },
           error => {
             //this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
           })
       ;}

       verify(id: any){
        this.http.get(environment.api+"users" +`/${id}`) .subscribe((res)=>{
          this.user=res;
          console.log(this.user);
        })
       }

    getAllRdv(): Observable<any[]>{
        return this.http.get<any[]>(environment.api+"rdv/rdvs");
      }

      getAllSoins(): Observable<any[]>{
        return this.http.get<any[]>(environment.api+"users/soin");
       }

     getBenef(cod_benef: any,code_hop: any){
        return this.http.get<any[]>(environment.api+"auth/benef"+`/${cod_benef}`+`/${code_hop}`);
      }
}
