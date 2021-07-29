import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/s/date/date.service';
import { MainService } from 'src/app/s/main.service';
import { NoteService } from 'src/app/s/note/note.service';

@Component({
  selector: 'app-add-recwest',
  templateUrl: './add-recwest.component.html',
  styleUrls: ['./add-recwest.component.css']
})
export class AddRecwestComponent implements OnInit {
  requestsArr = []
  changeweeknum =0
  week=""
  title:string=""
  constructor(public noteServer: NoteService,public dateService:DateService) {this.requestsArr }

  ngOnInit(): void {
    this.changeweek(1)
    this.getNotes(this.week)
  }
  changeweek(num) {
    this.changeweeknum += num
    this.week = `${this.dateService.getweekdate(this.changeweeknum)[0]} - ${this.dateService.getweekdate(this.changeweeknum)[1]}`
    this.getNotes(this.week)
  }
  save(req) {
    this.title=''
    this.noteServer.addNote(req,this.week).subscribe(()=>{this.getNotes(this.week)})
    
  }
  
  setbg(color) {
    document.getElementById("notes_input").style.background = color
  }
  getNotes(week) {
    this.noteServer.getNotes(week)
      .subscribe(res => {
        this.requestsArr=res
      })

  }
  deleteNote(id){
    this.noteServer.deleteNote(id).subscribe(()=>{this.getNotes(this.week)})
  }

}
