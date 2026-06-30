import { Injectable } from '@angular/core';

import { BrowserStorageService } from '../../../core/storage/browser-storage.service';
import { UserStorageStore } from './user-storage.store';

@Injectable({ providedIn: 'root' })
export class LocalUsersStore extends UserStorageStore {
  constructor(browserStorage: BrowserStorageService) {
    super(browserStorage, 'local', 'angular_training_local_users');
  }
}
