import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileService } from './service/profile.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-profile',
  imports: [
    DividerModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly service = inject(ProfileService);

  resultJson = '';

  profileDocType = new FormControl('GENERIC.CLASSTEST');
  getProfile() {
    this.service.getProfileByDocType(this.profileDocType.value!).subscribe({
      next: (res) => {
        console.log(res);
        this.resultJson = JSON.stringify(res);
      },
      error: (error) => console.log('Subscription error:', error),
    });
  }

  url = 'http://192.168.210.52/ARXivarNextWebApi/api/Buffer/insert';

  inserfBuffer(event: FileSelectEvent) {
    console.log('🚀 ~ ProfileComponent ~ inserfBuffer ~ event:', event);

    this.service.postBufferInsert(event.currentFiles[0]).subscribe({
      next: (res) => {
        console.log(res);
        this.resultJson = JSON.stringify(res);
      },
      error: (error) => console.log('Subscription error:', error),
    });
  }
}
