import { Routes } from '@angular/router';
import { NewUser } from './components/new-user/new-user';
import { UserList } from './components/user-list/user-list';

export const routes: Routes = [
  { path: 'demo', component: UserList },
  { path: 'newuser', component: NewUser },
  { path: '', pathMatch: 'full', redirectTo: 'demo' },
  { path: '**', redirectTo: 'demo' },
];
