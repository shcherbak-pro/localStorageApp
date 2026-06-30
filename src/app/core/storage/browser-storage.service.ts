import { Injectable } from '@angular/core';

export type BrowserStorageArea = 'local' | 'session';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  read<T>(area: BrowserStorageArea, key: string, fallbackValue: T): T {
    const storage = this.getStorage(area);

    if (!storage) {
      return fallbackValue;
    }

    const rawValue = storage.getItem(key);

    if (!rawValue) {
      return fallbackValue;
    }

    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return fallbackValue;
    }
  }

  write<T>(area: BrowserStorageArea, key: string, value: T): void {
    const storage = this.getStorage(area);

    if (!storage) {
      return;
    }

    storage.setItem(key, JSON.stringify(value));
  }

  remove(area: BrowserStorageArea, key: string): void {
    this.getStorage(area)?.removeItem(key);
  }

  private getStorage(area: BrowserStorageArea): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return area === 'local' ? window.localStorage : window.sessionStorage;
  }
}
