import { Component, OnInit } from '@angular/core';
import { HistorylistService } from 'src/app/s/historylist/historylist.service';
import { MainService } from 'src/app/s/main.service';
import { ProfileService } from 'src/app/s/profile/profile.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


resultarr = [];
searchOption="name"
  constructor(public s:MainService,public historylistService:HistorylistService
    ,public profileService:ProfileService) { 
    
  }

  ngOnInit(): void {
    this.filter();
  }
  sarchOption(element1: HTMLElement,element2: HTMLElement){
    element1.className="btn btn-outline-primary active"
    element2.className="btn btn-outline-primary "
this.searchOption=element1.id
this.resultarr=[]
  }

  
  
  findDate(date){
    console.log(date);
    let fixedDate=['','','']
    let num=2
    for(let i of date){
      if(i=='-'){num--
      continue}
      // console.log(i);
      
      fixedDate[num]+=i
    }

    this.deleteZero(fixedDate[1])
    // console.log(fixedDate);
    let finealDate=`${ this.deleteZero(fixedDate[0])}.${ this.deleteZero(fixedDate[1])}.${fixedDate[2]}`
    console.log(finealDate);
    this.historylistService.getHistoryByDate(finealDate).subscribe(res => {
      this.resultarr = res;
      // console.log(this.resultarr);
      this.resultarr=this.s.sortByKey(this.resultarr,'name')
      this.resultarr=this.s.sortByKey(this.resultarr,'shift')
      this.resultarr=this.s.sortByKey(this.resultarr,'department')
    //   this.resultarr.sort((a,b)=>{
    //     if(a.department>b.department){return 1}
    //     if(a.department<b.department){return -1}
    //     return 0
    //   }
    // )
    console.log(this.resultarr);
    
  })
  }


  filter(name?: string): void {
    this.historylistService.getHistory(name).subscribe(res => {
      this.resultarr = res;
      console.log(this.resultarr);
      this.resultarr=this.s.sortByKey(this.resultarr,'shift')
      this.resultarr=this.s.sortByKey(this.resultarr,'department')
      this.resultarr=this.historylistService.sortByDate(this.resultarr)
  

    })
  }

  deleteZero(str:string){
    if(str[0]=='0'){
     str= str.substring(1)
     return str
    }
    return str
  }
  
}
