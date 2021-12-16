/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NetworkRequestsService } from './networkRequests.service';

describe('Service: NetworkRequests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkRequestsService]
    });
  });

  it('should ...', inject([NetworkRequestsService], (service: NetworkRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
