import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  date = new Date()

  constructor() { }
  getweekdate(num = 0) {
    let day = this.date.getDay()
    let startweekdate = `${new Date(Date.now() - (day - (num * 7)) * 24 * 60 * 60 * 1000).getDate()}.${new Date(Date.now() - (day - (num * 7)) * 24 * 60 * 60 * 1000).getMonth() + 1}.${new Date(Date.now() - (day - (num * 7)) * 24 * 60 * 60 * 1000).getFullYear()}`
    let endweek = `${new Date(Date.now() + (7 * 24 * 60 * 60 * 1000) - ((day - (num * 7)) * 24 * 60 * 60 * 1000)).getDate()}.${new Date(Date.now() + (7 * 24 * 60 * 60 * 1000) - ((day - (num * 7)) * 24 * 60 * 60 * 1000)).getMonth() + 1}.${new Date(Date.now() + (7 * 24 * 60 * 60 * 1000) - ((day - (num * 7)) * 24 * 60 * 60 * 1000)).getFullYear()}`
    let stringfullweekdate = `${startweekdate}-------${endweek}`

    return [startweekdate, endweek]
  }
  allweek(num = 0) {
    let weekarr = []
    let daynum = 0
    let day = this.date.getDay()
    while (daynum < 7) {
      weekarr.push(`${new Date(Date.now() - (day - (num * 7) - daynum) * 24 * 60 * 60 * 1000).getDate()}.${new Date(Date.now() - (day - (num * 7) - daynum) * 24 * 60 * 60 * 1000).getMonth() + 1}.${new Date(Date.now() - (day - (num * 7) - daynum) * 24 * 60 * 60 * 1000).getFullYear()}`)
      daynum++
    }
    return weekarr
  }
}
