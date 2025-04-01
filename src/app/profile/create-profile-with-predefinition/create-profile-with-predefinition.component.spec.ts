import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileWithPredefinitionComponent } from './create-profile-with-predefinition.component';

describe('CreateProfileWithPredefinitionComponent', () => {
  let component: CreateProfileWithPredefinitionComponent;
  let fixture: ComponentFixture<CreateProfileWithPredefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProfileWithPredefinitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfileWithPredefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
