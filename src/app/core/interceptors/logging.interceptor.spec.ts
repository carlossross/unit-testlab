import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { loggingInterceptor } from './logging.interceptor';

describe('loggingInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    spyOn(console, 'log');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loggingInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loggea request y response', () => {
    http.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    req.flush({ ok: true });

    expect(console.log).toHaveBeenCalledWith('[HTTP] Request', 'GET', '/api/test');
    expect(console.log).toHaveBeenCalledWith('[HTTP] Response', 'GET', '/api/test');
  });

  it('loggea error', () => {
    http.get('/api/error').subscribe({
      error: () => {},
    });

    const req = httpMock.expectOne('/api/error');
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });

    expect(console.log).toHaveBeenCalledWith('[HTTP] Error', 'GET', '/api/error');
  });
});
