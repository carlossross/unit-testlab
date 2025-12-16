// import { TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';

// import { UsersPageComponent, type UsersStoreLike } from './users-page.component';

// describe('UsersPageComponent (smart)', () => {
//   function createStoreFake(overrides?: Partial<UsersStoreLike>): UsersStoreLike {
//     return {
//       vm: () => ({ users: [], loading: false, error: null, total: 0 }),
//       loadUsers: () => {},
//       ...overrides,
//     };
//   }

//   it('llama loadUsers en ngOnInit', () => {
//     const loadUsers = jasmine.createSpy('loadUsers');
//     const store = createStoreFake({ loadUsers });

//     TestBed.configureTestingModule({ imports: [UsersPageComponent] });
//     const fixture = TestBed.createComponent(UsersPageComponent);

//     fixture.componentInstance.store = store;

//     fixture.detectChanges(); // dispara ngOnInit

//     expect(loadUsers).toHaveBeenCalledTimes(1);
//   });

//   it('muestra Loading... cuando vm.loading = true', () => {
//     const store = createStoreFake({
//       vm: () => ({ users: [], loading: true, error: null, total: 0 }),
//     });

//     TestBed.configureTestingModule({ imports: [UsersPageComponent] });
//     const fixture = TestBed.createComponent(UsersPageComponent);
//     fixture.componentInstance.store = store;

//     fixture.detectChanges();

//     const el: HTMLElement = fixture.nativeElement;
//     expect(el.textContent).toContain('Loading...');
//   });

//   it('muestra el total en el header', () => {
//     const store = createStoreFake({
//       vm: () => ({ users: [], loading: false, error: null, total: 5 }),
//     });

//     TestBed.configureTestingModule({ imports: [UsersPageComponent] });
//     const fixture = TestBed.createComponent(UsersPageComponent);
//     fixture.componentInstance.store = store;

//     fixture.detectChanges();

//     const el: HTMLElement = fixture.nativeElement;
//     expect(el.textContent).toContain('Users (5)');
//   });

//   it('al click en Reload llama loadUsers', () => {
//     const loadUsers = jasmine.createSpy('loadUsers');
//     const store = createStoreFake({ loadUsers });

//     TestBed.configureTestingModule({ imports: [UsersPageComponent] });
//     const fixture = TestBed.createComponent(UsersPageComponent);
//     fixture.componentInstance.store = store;

//     fixture.detectChanges(); // ngOnInit llama 1 vez

//     const btn = fixture.debugElement.query(By.css('button'));
//     btn.triggerEventHandler('click');

//     expect(loadUsers).toHaveBeenCalledTimes(2); // init + click
//   });
// });

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsersPageComponent, type UsersStoreLike } from './users-page.component';
import { USERS_STORE } from './users.store.token';

describe('UsersPageComponent (smart)', () => {
  function createStoreFake(overrides?: Partial<UsersStoreLike>): UsersStoreLike {
    return {
      vm: () => ({ users: [], loading: false, error: null, total: 0 }),
      loadUsers: () => {},
      ...overrides,
    };
  }

  it('llama loadUsers en ngOnInit', () => {
    const loadUsers = jasmine.createSpy('loadUsers');
    const store = createStoreFake({ loadUsers });

    TestBed.configureTestingModule({
      imports: [UsersPageComponent],
      providers: [{ provide: USERS_STORE, useValue: store }],
    });

    const fixture = TestBed.createComponent(UsersPageComponent);
    fixture.detectChanges(); // dispara ngOnInit

    expect(loadUsers).toHaveBeenCalledTimes(1);
  });

  it('muestra Loading... cuando vm.loading = true', () => {
    const store = createStoreFake({
      vm: () => ({ users: [], loading: true, error: null, total: 0 }),
    });

    TestBed.configureTestingModule({
      imports: [UsersPageComponent],
      providers: [{ provide: USERS_STORE, useValue: store }],
    });

    const fixture = TestBed.createComponent(UsersPageComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Loading...');
  });

  it('muestra el total en el header', () => {
    const store = createStoreFake({
      vm: () => ({ users: [], loading: false, error: null, total: 5 }),
    });

    TestBed.configureTestingModule({
      imports: [UsersPageComponent],
      providers: [{ provide: USERS_STORE, useValue: store }],
    });

    const fixture = TestBed.createComponent(UsersPageComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Users (5)');
  });

  it('al click en Reload llama loadUsers', () => {
    const loadUsers = jasmine.createSpy('loadUsers');
    const store = createStoreFake({ loadUsers });

    TestBed.configureTestingModule({
      imports: [UsersPageComponent],
      providers: [{ provide: USERS_STORE, useValue: store }],
    });

    const fixture = TestBed.createComponent(UsersPageComponent);
    fixture.detectChanges(); // init llama 1 vez

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');

    expect(loadUsers).toHaveBeenCalledTimes(2); // init + click
  });
});
