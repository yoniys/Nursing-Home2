import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorylistService {
  historylist=[]
  emptyProfil = { name: '', car: false, type: '', internship: false }
  allshiftsarr = [this.emptyProfil]

  constructor(public http: HttpClient) {
    // this.stringDateSort()
   }

  getObjectList(num = 189) {
    this.allshiftsarr = []
    for (let index = 0; index < num; index++) {
      this.allshiftsarr.push(Object.assign({}, this.emptyProfil))
    }
  }

  stringDateSort(str){
    // let str='23.5.2021'
    let fixedDate=['','','']
    let num=2
    for(let i of str){
      if(i=='.'){num--
      continue}
      // console.log(i);
      
      fixedDate[num]+=i
    }
    // console.log(fixedDate[0]+fixedDate[1]+fixedDate[2]);
    return `${fixedDate[0]}.${fixedDate[1]}.${fixedDate[2]}`
  }
  sortByDate(arryObj){
    arryObj.sort((a,b)=>{
      if(this.stringDateSort(a.date)>this.stringDateSort(b.date)){return 1}
      if(this.stringDateSort(a.date)<this.stringDateSort(b.date)){return -1}
      return 0
    }
  )
  return arryObj
  }

  public saveShifts(data){
    // return this.http.post(`http://localhost:3000/create2`,data)}
    return this.http.post(`${environment.baseUrl}create2`,data)}

  public getWorker(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}findOne/${id}`)
  }

  public gethistorylist() {
    this.http.get(`${environment.baseUrl}findAll2`)
      .subscribe((result:[]) => {
        this.historylist = result
      })
  }

  public getHistory(filter?: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}oneHistoryOnWorker/${filter}`);
    // return this.http.get(`http://localhost:3000/oneHistoryOnWorker/${filter}`);
  }
  public getHistoryByDate(date?: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}dateHistoryOnDate/${date}`);
    // return this.http.get(`http://localhost:3000/dateHistoryOnDate/${date}`);
  }
  
}
