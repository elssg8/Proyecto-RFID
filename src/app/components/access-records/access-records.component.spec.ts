import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRecordsComponent } from './access-records.component';

describe('AccessRecordsComponent', () => {
  let component: AccessRecordsComponent;
  let fixture: ComponentFixture<AccessRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
