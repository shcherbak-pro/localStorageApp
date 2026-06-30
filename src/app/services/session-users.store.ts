import { Injectable } from '@angular/core';

import { BrowserStorageService } from '../../../core/storage/browser-storage.service';
import { UserStorageStore } from './user-storage.store';

@Injectable({ providedIn: 'root' })
export class SessionUsersStore extends UserStorageStore {
  constructor(browserStorage: BrowserStorageService) {
    super(browserStorage, 'session', 'angular_training_session_users');
  }
}
