import { Component, inject, output } from '@angular/core';
import { ProfileService } from '../../../app/profile/service/profile.service';
import { take } from 'rxjs';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-insert',
  imports: [FileUploadModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss',
})
export class InsertComponent {
  private readonly service = inject(ProfileService);

  bufferArray = output<string[]>();

  inserfBuffer(event: FileSelectEvent) {
    this.service
      .postBufferInsert(event.currentFiles[0])
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          const buffer: string[] = res;
          if (buffer.length === 0) return;
          this.bufferArray.emit(buffer);
        },
        error: (error) => console.log('Subscription error:', error),
      });
  }
}
