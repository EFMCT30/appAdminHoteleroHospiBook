import { TestBed } from '@angular/core/testing';

import { Profileservice } from "./profile.service";

describe('ProfileService', () => {
  let service: Profileservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Profileservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
