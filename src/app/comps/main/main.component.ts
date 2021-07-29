import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { DateService } from 'src/app/s/date/date.service';
import { HistorylistService } from 'src/app/s/historylist/historylist.service';
import { MainService } from 'src/app/s/main.service';
import { ProfileService } from 'src/app/s/profile/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  chece = 0
  changeweeknum = 0
  week
  alldaysintheweek

  passengers=0

  constructor(public s: MainService, private elementRef: ElementRef, private cd: ChangeDetectorRef,
    public historylistService:HistorylistService,public dateService:DateService
    ,public profileService:ProfileService) {
    this.alldaysintheweek = this.dateService.allweek()
    this.week = dateService.getweekdate()
    
    
  
    
    this.updethistorylist()

  }

  ngOnInit(): void { }

  ngAfterViewChecked(): void {
    if (this.chece > 0 && this.s.rout == "main") {
     
      this.getallshifts2()
    }
  
    let num = -1
    const selects = this.elementRef.nativeElement.querySelectorAll('p');
    selects.forEach(select => {
      num += 1
      select.id = num

      this.cd.detectChanges();
    });
    this.chece++

  }

  changeweek(num) {
    this.changeweeknum += num
    this.week = this.dateService.getweekdate(this.changeweeknum)
    this.alldaysintheweek = this.dateService.allweek(this.changeweeknum)



  }

  //////////////????????????????????????????
  public async updethistorylist() {
    await this.historylistService.gethistorylist()
  }
  ///////////////////////?????????????

  refresh() {
    this.passengers=0
    let num = 0
    const selects = this.elementRef.nativeElement.querySelectorAll('p');
    // console.log( this.s.allshiftsarr);
    selects.forEach((select:HTMLElement) => {
      select.innerHTML =''
      if(this.historylistService.allshiftsarr[num].car){
        select.innerHTML += `<img style="max-width: 20%;" src="https://raw.githubusercontent.com/yoniys/Nursing-Home/master/src/assets/images/van%20(1).png">`;
        this.passengers++
      }
      if(this.historylistService.allshiftsarr[num].internship){
      select.className="internshipColor"}
      // else{select.innerHTML += `<p style="max-width: 20%;"> </p>`}
      select.innerHTML += `  ${this.historylistService.allshiftsarr[num].name}`
    
      num++
      this.cd.detectChanges();
    });
    console.log(this.passengers);
    
  }

  getallshifts2() {
    this.historylistService.getObjectList()
// console.log(this.historylistService.historylist);
// console.log(this.s.workerslist);
if(this.profileService.workerslist){
    for (let i of this.historylistService.historylist) {
      if (this.alldaysintheweek.includes(i.date)) {
        this.historylistService.allshiftsarr[i.shiftid].name = i.name
       console.log( this.profileService.workerslist.find(x => x.name === i.name));
       
       
       if(i.name && this.profileService.workerslist.find(x => x.name === i.name) ){
       if(this.profileService.workerslist.find(x => x.name === i.name).car=="כן"){
         console.log("yes");
         this.historylistService.allshiftsarr[i.shiftid].car=true
       }
       if(this.profileService.workerslist.find(x => x.name === i.name).internship=="כן"){
        console.log("yes");
        this.historylistService.allshiftsarr[i.shiftid].internship=true
      }
    }
      }
    }
    console.log( this.historylistService.allshiftsarr);
    
    this.refresh()
  }
}
}


 