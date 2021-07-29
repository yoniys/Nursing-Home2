import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorylistService } from 'src/app/s/historylist/historylist.service';
import { MainService } from 'src/app/s/main.service';
import { ProfileService } from 'src/app/s/profile/profile.service';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.css']
})
export class WorkersListComponent implements OnInit {
  

  hedtable = ["", "", "הערות", "מתמחה", "הסעות", "?כח אדם", "תאריך הצטרפות", "סוג עובד", "משמרות", "מין", ".ת.ז", "שם", "סטטוס"]
  constructor(public s: MainService, public router: Router, public historylistService: HistorylistService,
    public profileService: ProfileService) { }

  ngOnInit(): void {
  }
  delete(id) {
    this.profileService.deleteworker(id)
  }
  edit(id) {

    this.historylistService.getWorker(id)
      .subscribe((worker) => {

        this.s.updateWorker = worker
        this.router.navigateByUrl('/main screen/add-worker')

      })
  }
}
