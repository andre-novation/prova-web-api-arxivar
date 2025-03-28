import { inject, Injectable } from '@angular/core';
import { API } from '../../API/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaskProfileSchemaDTO } from './MaskProfileSchemaDTO';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  getProfileByDocType(type: string): Observable<MaskProfileSchemaDTO> {
    const url = `${API}/Profiles/bydocumenttype`;
    return this.http.post(url, { documentTypeCode: type });
  }

  // insterBuffer
  postBufferInsert(file: any) {
    const url = `${API}/Buffer/insert`;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(url, formData);
  }
}
