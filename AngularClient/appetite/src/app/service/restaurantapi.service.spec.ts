import { TestBed } from '@angular/core/testing';

import { RestaurantapiService } from './restaurantapi.service';

describe('RestaurantapiService', () => {
  let service: RestaurantapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
