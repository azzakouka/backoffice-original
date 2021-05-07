import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListepharmacienComponent } from './listepharmacien.component';

describe('ListepharmacienComponent', () => {
  let component: ListepharmacienComponent;
  let fixture: ComponentFixture<ListepharmacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListepharmacienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListepharmacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
