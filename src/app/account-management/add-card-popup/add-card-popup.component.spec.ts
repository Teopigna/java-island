import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardPopupComponent } from './add-card-popup.component';

describe('AddCardPopupComponent', () => {
  let component: AddCardPopupComponent;
  let fixture: ComponentFixture<AddCardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCardPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
