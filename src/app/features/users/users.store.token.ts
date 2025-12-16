import { InjectionToken } from '@angular/core';
import type { UsersStoreLike } from './users-page.component';

export const USERS_STORE = new InjectionToken<UsersStoreLike>('USERS_STORE');
