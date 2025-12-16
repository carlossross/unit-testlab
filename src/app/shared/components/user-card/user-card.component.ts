import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type User = {
  id: number;
  fullName: string;
  email: string;
};

@Component({
  standalone: true,
  selector: 'app-user-card',
  imports: [CommonModule],
  template: `
    <div class="card">
      <h3>{{ user().fullName }}</h3>
      <p>{{ user().email }}</p>

      <button (click)="select.emit(user())">Select</button>
    </div>
  `,
})
export class UserCardComponent {
  // @Input({ required: true }) user!: User;
  // @Output() select = new EventEmitter<User>();

  user = input.required<User>();
  @Output() select = new EventEmitter<User>();
}
