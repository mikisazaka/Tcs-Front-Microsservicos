import { TestBed } from '@angular/core/testing';

import { BookDetail } from './book-detail.service';

describe('BookDetail', () => {
  let service: BookDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
