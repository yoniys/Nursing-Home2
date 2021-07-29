import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(public http: HttpClient) { }
  public addNote(note, week) {
    return this.http.post(`${environment.baseUrl}noteCreate`, { note: note, date: week })
  }
  public getNotes(week: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}findAllNotes/${encodeURIComponent(week)}`);
  }
  public deleteNote(id) {
    return this.http.delete(`${environment.baseUrl}deleteNote/${id}`);
  }
}
