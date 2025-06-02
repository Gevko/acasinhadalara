import { TestBed } from '@angular/core/testing';
import { ReviewSubmission } from './review-submission.service';


describe('ReviewSubmission', () => {
  let service: ReviewSubmission;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewSubmission);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
