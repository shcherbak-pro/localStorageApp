import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  imports: [DatePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  readonly usersService = inject(UsersService);
}
