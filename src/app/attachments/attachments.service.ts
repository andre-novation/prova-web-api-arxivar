import { inject, Injectable } from '@angular/core';
import { API } from '../API/api';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private http = inject(HttpClient);

  api = API;

  create(form: { bufferid: number; docnumber: number; comment: string }) {
    // post /api/Attachments/InsertExternal/{bufferid}/{docnumber}

    const url = `${API}/Attachments/InsertExternal/${form.bufferid}/${form.docnumber}`;

    return this.http.post(url, { comment: form.comment }).pipe(take(1));
  }
}
