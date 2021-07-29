import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  workerslist
  constructor(public http: HttpClient,public mainService:MainService) {
    this.http.get(`${environment.baseUrl}findAll`)
    .subscribe((result) => {
      console.log("aaaa");
      this.workerslist = this.mainService.sortByKey(result,'name')
      // this.workerslist =
      
      
    })
   }
  public adds(profile) {
    return this.http.post(`${environment.baseUrl}create`, profile)
  }
  public updateProfile(profile) {
    return this.http.patch(`${environment.baseUrl}update-profile`, profile)
  }

  public async deleteworker(id) {
    await this.http.delete(`${environment.baseUrl}delete/${id}`)
      .subscribe((d) => {
        this.refres()
      })
  }

  refres() {
    this.http.get(`${environment.baseUrl}findAll`)
      .subscribe((result) => {
        this.workerslist = result
      })
  }
  public getWorkerslistByType(type = "אח/ות") {
    return this.http.get(`${environment.baseUrl}findType/${encodeURIComponent(type)}`)
  }
}
