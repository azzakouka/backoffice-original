import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
codhop:any;
test:any;
  constructor(private http: HttpClient,private router:Router,private cookieService:CookieService) { }
  getAllHopitals(): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"rdv");
}
  getAllMedecins(cod_hop:any): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"users/medecins"+`/${cod_hop}`);
  }
  getAllPharmaciens(cod_hop:any): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"users/pharmaciens"+`/${cod_hop}`);
  }
  getAllBenef(cod_hop:any): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"users/benefs"+`/${cod_hop}`);
  }
  delete(id:any){
    return this.http.delete(environment.api+"auth/deleteMed"+`/${id}`);
   }
   update(f:any,id:any,path:any){
    return this.http.patch(environment.api+path+`/${id}`,f );
   }
async getCurrentUser(f:any,codhop:any){
  let addedData = JSON.stringify(f.value);
         console.log ("addedData", addedData);
          return this.http.post(environment.api+"auth/loginUser", addedData,this.httpOptions).subscribe((res:any) => {
          // localStorage.setItem("token",res.token)
           if(res.user!=null){
             this.cookieService.set('data', JSON.stringify(res.user));
         //this.cookieService.set('password', res.user.password);
             console.log(this.cookieService.get('data'));
             this.user= JSON.parse(this.cookieService.get('data'));
           this.codhop=codhop;
           console.log(this.user);
           }
           else
           this.test=false;
         });
       ;}

       verify(id: any){
        this.http.get(environment.api+"users" +`/${id}`) .subscribe((res)=>{
          this.user=res;
          console.log(this.user);
        })
       }

    getAllRdv(cod_hop:any): Observable<any[]>{
        return this.http.get<any[]>(environment.api+"rdv/rdvs"+`/${cod_hop}`);
      }

      getAllSoins(cod_hop:any): Observable<any[]>{
        return this.http.get<any[]>(environment.api+"rdv/soinHop"+`/${cod_hop}`);
       }

     getBenef(cod_benef: any,code_hop: any){
        return this.http.get<any[]>(environment.api+"auth/benef"+`/${cod_benef}`+`/${code_hop}`);
      }

      getRegime(reg:any): Observable<any>{
        return this.http.get<any>(environment.api+"users/regimes"+`/${reg}`);

      }
}
