import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDetails } from './house-details';

describe('HouseDetails', () => {
  let component: HouseDetails;
  let fixture: ComponentFixture<HouseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
