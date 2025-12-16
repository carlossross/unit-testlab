import { of, throwError } from 'rxjs';
import { createUsersStore } from './users.store';

describe('UsersStore', () => {
  it('inicia con estado vacío sin errores', () => {
    // Arrange
    const api = { getUsers: () => of([]) };
    const store = createUsersStore(api as any);

    // Assert
    expect(store.users()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.vm().total).toBe(0);
  });

  it('setUsers actualiza users y resetea ui state', () => {
    // Arrange
    const api = { getUsers: () => of([]) };
    const store = createUsersStore(api as any);

    const nextUsers = [
      { id: 1, fullName: 'Ada Lovelace', email: 'ada@dev.com' },
      { id: 2, fullName: 'Alan Turing', email: 'alan@dev.com' },
    ];

    // Act
    store.setUsers(nextUsers);

    // Assert
    expect(store.users()).toEqual(nextUsers);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.vm().total).toBe(2);
  });

  it('loadUsers: success setea users y apaga loading', () => {
    // Arrange
    const api = {
      getUsers: () =>
        of([{ id: 1, first_name: 'Ada', last_name: 'Lovelace', email: 'ada@dev.com' }]),
    };

    const store = createUsersStore(api as any);

    // Pre-Assert
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();

    // Act
    store.loadUsers().subscribe();

    // Assert
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.users()).toEqual([{ id: 1, fullName: 'Ada Lovelace', email: 'ada@dev.com' }]);
  });

  it('loadUsers: error setea error y apaga loading', () => {
    // Arrange
    const api = {
      getUsers: () => throwError(() => new Error('boom')),
    };

    const store = createUsersStore(api as any);

    // Act
    store.loadUsers().subscribe();

    // Assert
    expect(store.loading()).toBe(false);
    expect(store.users()).toEqual([]); // sigue vacío
    expect(store.error()).toBe('Failed to load users');
  });
});
