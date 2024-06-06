import { TestBed } from '@angular/core/testing';

import { GatewayInterceptor } from './gateway.interceptor';

describe('GatewayInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GatewayInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GatewayInterceptor = TestBed.inject(GatewayInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
