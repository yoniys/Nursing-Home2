import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/s/main.service';
import { ProfileService } from 'src/app/s/profile/profile.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

  updatBoolean = false
 
  profile = new FormGroup({
    name: new FormControl(),
    manId: new FormControl(),
    gender: new FormControl("?"),
    workingType: new FormControl("מטפל/ת"),
    manPower: new FormControl("?"),
    car: new FormControl( "לא"),
    workingstatus: new FormControl("עובד"),
    shifts: new FormControl(null),
    startDate: new FormControl(""),
    note:new FormControl(""),
    internship:new FormControl("לא"),
  })
  constructor(public s: MainService,public router:Router,public profileService:ProfileService) {


    
    if (s.updateWorker.id > 0) {
      console.log(this.profile);
      
      this.updatBoolean=true
      this.profile.setValue(
        {
          name: s.updateWorker.name,
          manId: s.updateWorker.manId,
          gender: s.updateWorker.gender,
          workingType:  s.updateWorker.workingType,
          manPower: s.updateWorker.manPower,
          car: s.updateWorker.car,
          workingstatus: s.updateWorker.workingstatus,
          shifts: s.updateWorker.shifts,
          startDate: s.updateWorker.startDate,
          note:s.updateWorker.note,
          internship:s.updateWorker.internship
        })
    }


  }
 


  ngOnInit(): void {
  }
  
 



  



  log() {
    this.profile.value.id=this.s.updateWorker.id
    if(this.updatBoolean){this.profileService.updateProfile(this.profile.value).subscribe((r) => {
      this.profileService.refres()
    })}
    else if(this.profile.value.name && this.profile.value.manId){
      console.log(this.profile.value);
      
       this.profileService.adds(this.profile.value).subscribe((r) => {
         console.log(r);
         this.profileService.workerslist=r
      // this.profileService.refres()
    })}
    else{alert("בבקשה מלא שם וסיסמה")
  return}
    this.router.navigate(['/main screen/workers'])
  }
}
 