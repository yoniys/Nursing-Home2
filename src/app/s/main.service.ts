import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  // ${environment.baseUrl}
  rout = "main"
  user: string
  pagh: number
  

  updateWorker = { car: "", gender: "", id: 0, manId: "", manPower: "", name: "", note: null, shifts: "", startDate: "", workingType: "", workingstatus: "", internship: "לא" }
  ///////!!!!!!!!!!!!!!!!!!any
  // historylist
  ///////!!!!!!!!!!!!!!!!!!!any
  workersforshift = [0, 1, 2]
  // profil = { name: '', manId: 0, workingType: '', startDate: '', manPower: false }
  // arr
  // correntfulldate = `${this.date.getUTCDate()}/${this.date.getUTCMonth()}/${this.date.getFullYear()}`
  // correntfulldat1e2 = `${this.date.getFullYear()}-${this.date.getUTCMonth()}-${this.date.getUTCDate()}`
  // correntweekdate=this.getweekdate()
  tagsTabalMonth = ['מחלקה ג', "מחלקה ב", "מחלקה א", "משמרות", "תאריך"]
  week = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  numofshifts = [1, 2, 3]
  shiftsday = ['בוקר', ' ערב ', 'לילה']
  departments = ['מחלקה ג', 'מחלקה ב', 'מחלקה א']




  constructor(public http: HttpClient) {
    ////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!/////////////////
    // this.gethistorylist()
/////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!/////////////////////
   
  }

  sortByKey(arryObj,key:string){
    arryObj.sort((a,b)=>{
      if(a[key]>b[key]){return 1}
      if(a[key]<b[key]){return -1}
      return 0
    }
  )
  return arryObj
  }
}



