import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { DateService } from 'src/app/s/date/date.service';
import { HistorylistService } from 'src/app/s/historylist/historylist.service';
import { MainService } from 'src/app/s/main.service';
import { ProfileService } from 'src/app/s/profile/profile.service';

@Component({
  selector: 'app-month-list',
  templateUrl: './month-list.component.html',
  styleUrls: ['./month-list.component.css']
})
export class MonthListComponent implements OnInit {
  week
  changeweeknum = 0
  dayNumChecke = 0
  numweek
  alldaysintheweek

  history

  afterViewCheckednum = 0

  savedb = []
  doubleclickid

  t = true

  workerslist
  workerstype = "אח/ות"
  switchType = "מטפלים/ות"




  constructor(public s: MainService, private elementRef: ElementRef, private cd: ChangeDetectorRef,public dateService:DateService,
    public historylistService:HistorylistService,public profileService:ProfileService) {
    this.week = dateService.getweekdate()
    this.alldaysintheweek = this.dateService.allweek()
    this.profileService.getWorkerslistByType().subscribe((r) => {
      this.workerslist = r
    })
  }

  ngOnInit(): void {
    this.historylistService.gethistorylist()
  }


  ngAfterViewChecked(): void {
    this.afterViewCheckednum++
    let num = 0
    const selects = this.elementRef.nativeElement.querySelectorAll('select');
    selects.forEach(select => {
      select.id = num
      num++
      this.cd.detectChanges();
    });
    this.historylistService.getObjectList(num)


    if (this.afterViewCheckednum == 5 || this.afterViewCheckednum == 3) { this.getallshifts2() }
  }


  op(name, id) {
    this.afterViewCheckednum = 8
    if (this.doubleclickid != id) {
      this.doubleclickid = id
      return
    }
    this.doubleclickid = ''
    ///////  Time calculator
    let day = Math.floor(id / 27);
    let shiftsdaynum = (Math.floor(id / 9))
    shiftsdaynum = shiftsdaynum - (shiftsdaynum - (shiftsdaynum % 3))
    let expertise
    let workernum = id % 3
    let departmentnum = id % 27
    departmentnum = Math.floor((departmentnum / 3) % 3)
    ///////////////////////////////////
    console.log(this.savedb);

    if (name) {
      let nameShifts = this.savedb.filter(x => x.name === name)
      for (let i of nameShifts) {
        if (i.date == this.alldaysintheweek[day]
          && i.shift == this.s.shiftsday[shiftsdaynum]) {
          return
        }
      }
      console.log("name1");
      for (let i of this.savedb) {
        if (i.shiftid == id) {
          i.name = name
          i.internship = this.profileService.workerslist.find(x => x.name === name).internship
          console.log("dubel");
          return
        }
      }
      console.log("name2");
      this.savedb.push({
        date: this.alldaysintheweek[day], expertise: expertise,
        department: this.s.departments[departmentnum], shift: this.s.shiftsday[shiftsdaynum],
        workernum: this.s.workersforshift[workernum], name: name, shiftid: id,
        internship: this.profileService.workerslist.find(x => x.name === name).internship
      })
    }
    for (let i of this.savedb) {
      if (i.shiftid == id) {
        i.name = name
        i.internship = "לא"
        console.log("dubel");
        return
      }
    }

    console.log("!name2")
    this.savedb.push({
      date: this.alldaysintheweek[day], expertise: expertise,
      department: this.s.departments[departmentnum], shift: this.s.shiftsday[shiftsdaynum],
      workernum: this.s.workersforshift[workernum], name: name, shiftid: id,
      internship: "לא"
    })



  }
  changeweek(num) {
    this.changeweeknum += num
    this.week = this.dateService.getweekdate(this.changeweeknum)
    this.alldaysintheweek = this.dateService.allweek(this.changeweeknum)
    this.afterViewCheckednum = 4
    this.getallshifts2()
  }

  public async save() {
    this.historylistService.saveShifts(this.savedb).subscribe(() => {
        this.historylistService.gethistorylist()
        this.afterViewCheckednum = 3
      })


  }
  claerselect() {
    const selects = this.elementRef.nativeElement.querySelectorAll('select');
    selects.forEach(select => {
      select.value = ''
    });
  }

  getallshifts2() {

    for (let i of this.historylistService.historylist) {
      if (this.alldaysintheweek.includes(i.date)) {
        this.historylistService.allshiftsarr[i.shiftid].name = i.name
      }
    }
    this.refresh()
  }

  refresh() {
    let num = 0
    const selects = this.elementRef.nativeElement.querySelectorAll('select');
    selects.forEach(select => {
      select.value = this.historylistService.allshiftsarr[num].name
      num++
      this.cd.detectChanges();
    });
  }

  switchWorker() {
    if (this.workerstype == "אח/ות") {
      this.workerstype = "מטפל/ת"
      this.switchType = "אחים/ות"
    }
    else {
      this.workerstype = "אח/ות"
      this.switchType = "מטפלים/ות"
    }
    this.profileService.getWorkerslistByType(this.workerstype).subscribe((r) => {
      this.workerslist = r
    })
  }

}
