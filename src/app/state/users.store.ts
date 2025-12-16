import { computed, signal } from '@angular/core';
import { mapUserDtoToUser, User } from '../mappers/user.mapper';
import { UsersApi } from '../data/users.api';
import { catchError, finalize, map, of } from 'rxjs';

export function createUsersStore(api: UsersApi) {
  // Domain state
  const users = signal<User[]>([]);

  // UI state
  const loading = signal(false);
  const error = signal<string | null>(null);

  // View-mode para el template (muy útil en apps reales)
  const vm = computed(() => ({
    users: users(),
    loading: loading(),
    error: error(),
    total: users().length,
  }));

  function setUsers(next: User[]) {
    users.set(next);
    error.set(null);
    loading.set(false);
  }

  function loadUsers() {
    loading.set(true);
    error.set(null);

    return api.getUsers().pipe(
      map((dtos) => dtos.map(mapUserDtoToUser)),
      map((mapped) => {
        users.set(mapped);
        return mapped;
      }),
      catchError(() => {
        error.set('Failed to load users');
        return of([] as User[]);
      }),
      finalize(() => {
        loading.set(false);
      })
    );
  }

  return {
    // state
    users,
    loading,
    error,
    vm,

    // actions
    setUsers,
    loadUsers,
  };
}
