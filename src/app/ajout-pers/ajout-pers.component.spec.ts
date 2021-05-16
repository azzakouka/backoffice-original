import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPersComponent } from './ajout-pers.component';

describe('AjoutPersComponent', () => {
  let component: AjoutPersComponent;
  let fixture: ComponentFixture<AjoutPersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
