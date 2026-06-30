import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StorageUsersPanelComponent } from './features/users-storage/components/storage-users-panel/storage-users-panel.component';
import { LocalUsersStore } from './features/users-storage/services/local-users.store';
import { SessionUsersStore } from './features/users-storage/services/session-users.store';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    StorageUsersPanelComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly localUsersStore = inject(LocalUsersStore);
  readonly sessionUsersStore = inject(SessionUsersStore);
}
