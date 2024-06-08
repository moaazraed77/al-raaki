import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../Modal/interfaces/order.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteOrdersService {

  url=environment.firebase.databaseURL;

  constructor(private http:HttpClient) { }

  getSiteOrder():Observable<order[]>{
    return this.http.get<order[]>(`${this.url}/orders.json`)
  }

  postSiteOrder(data:order){
    this.http.post(`${this.url}/orders.json`,data).subscribe()
  }

  deleteSiteOrder(order:order){
    this.getSiteOrder().subscribe(data=>{
      for (const key in data) {
        if(data[key].id == order.id)
        this.http.delete(`${this.url}/orders/${key}.json`).subscribe(()=> location.reload())
      }
    })
  }
}
