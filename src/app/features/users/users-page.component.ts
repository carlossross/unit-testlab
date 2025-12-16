import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UserCardComponent,
  type User,
} from '../../shared/components/user-card/user-card.component';
import { USERS_STORE } from './users.store.token';

export type UsersStoreLike = {
  vm: () => { users: User[]; loading: boolean; error: string | null; total: number };
  loadUsers: () => void;
};

@Component({
  standalone: true,
  selector: 'app-users-page',
  imports: [CommonModule, UserCardComponent],
  template: `
    <h2>Users ({{ vm().total }})</h2>

    <p *ngIf="vm().loading">Loading...</p>
    <p *ngIf="vm().error">{{ vm().error }}</p>

    <app-user-card *ngFor="let u of vm().users" [user]="u" (select)="onSelect($event)" />

    <button (click)="reload()">Reload</button>
  `,
})
export class UsersPageComponent {
  private store = inject(USERS_STORE);

  vm = computed(() => this.store.vm());

  ngOnInit() {
    this.store.loadUsers();
  }

  reload() {
    this.store.loadUsers();
  }

  onSelect(user: User) {
    console.log('Selected', user.id);
  }
}
