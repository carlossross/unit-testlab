import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthState } from '../auth/auth-state.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  function setup(isLoggedIn: boolean) {
    const authStateFake = {
      isLoggedIn: () => isLoggedIn,
    };

    const routerFake = {
      parseUrl: (url: string) => ({ url } as any),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthState, useValue: authStateFake },
        { provide: Router, useValue: routerFake },
      ],
    });
  }

  it('retorna true cuando está loggeado', () => {
    setup(true);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBe(true);
  });

  it('retorna UrlTree cuando NO está loggeado', () => {
    setup(false);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect((result as any).url).toBe('/login');
  });
});
