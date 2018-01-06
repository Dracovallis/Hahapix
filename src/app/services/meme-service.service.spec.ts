import { TestBed, inject } from '@angular/core/testing';

import { MemeServiceService } from './meme-service.service';

describe('MemeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemeServiceService]
    });
  });

  it('should be created', inject([MemeServiceService], (service: MemeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
