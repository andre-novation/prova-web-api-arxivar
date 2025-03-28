import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../../app/API/api';
import { NoteDTO } from './models';
import { take } from 'rxjs';
import { ProfileService } from '../../app/profile/service/profile.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);

  createNote(note: NoteDTO) {
    return this.http.post(`${API}/Notes`, note).pipe(take(1));
  }
}
