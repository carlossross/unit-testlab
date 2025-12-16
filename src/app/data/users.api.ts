import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type UserDto = {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
};

@Injectable({ providedIn: 'root' })
export class UsersApi {
  private http = inject(HttpClient);

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('/api/users');
  }
}
