import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersApi } from './users.api';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('UsersApi', () => {
  let api: UsersApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersApi, provideHttpClient(), provideHttpClientTesting()],
    });

    api = TestBed.inject(UsersApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // asegura que no queden requests “colgadas”
  });

  xit('GET /api/users', () => {
    api.getUsers().subscribe();

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');

    req.flush([]); // responde el request sin red
  });

  it('GET /api/users devuelve la lista de dtos', () => {
    let result: any;

    api.getUsers().subscribe((r) => (result = r));

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');

    req.flush([{ id: 1, first_name: 'Ada', last_name: 'Lovelace', email: 'ada@dev.com' }]);

    expect(result).toEqual([
      { id: 1, first_name: 'Ada', last_name: 'Lovelace', email: 'ada@dev.com' },
    ]);
  });

  it('GET /api/users propaga error HTTP', () => {
    let error: any;

    api.getUsers().subscribe({
      next: () => {},
      error: (e) => (error = e),
    });

    const req = httpMock.expectOne('/api/users');
    req.flush({ message: 'server exploded' }, { status: 500, statusText: 'Server Error' });

    expect(error.status).toBe(500);
  });
});
