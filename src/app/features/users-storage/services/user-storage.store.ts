import { computed, signal } from '@angular/core';

import { BrowserStorageArea, BrowserStorageService } from '../../../core/storage/browser-storage.service';
import { DEFAULT_USER_SEARCH_CRITERIA, User, UserDraft, UserSearchCriteria } from '../models/user';

export abstract class UserStorageStore {
  private readonly usersSignal = signal<User[]>([]);

  readonly users = this.usersSignal.asReadonly();
  readonly totalUsers = computed(() => this.usersSignal().length);

  protected constructor(
    private readonly browserStorage: BrowserStorageService,
    private readonly area: BrowserStorageArea,
    private readonly storageKey: string,
  ) {
    this.usersSignal.set(this.readUsers());
  }

  addUser(draft: UserDraft): void {
    const timestamp = new Date().toISOString();
    const user: User = {
      ...this.normalizeDraft(draft),
      id: crypto.randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.save([...this.usersSignal(), user]);
  }

  updateUser(id: string, draft: UserDraft): void {
    const nextUsers = this.usersSignal().map((user) =>
      user.id === id
        ? {
            ...user,
            ...this.normalizeDraft(draft),
            updatedAt: new Date().toISOString(),
          }
        : user,
    );

    this.save(nextUsers);
  }

  removeUser(id: string): void {
    this.save(this.usersSignal().filter((user) => user.id !== id));
  }

  clearUsers(): void {
    this.save([]);
  }

  search(criteria: UserSearchCriteria = DEFAULT_USER_SEARCH_CRITERIA): User[] {
    const normalizedQuery = criteria.query.trim().toLowerCase();

    return this.usersSignal()
      .filter((user) => {
        const matchesQuery =
          !normalizedQuery ||
          [user.name, user.email, user.city, user.role, user.id]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery);

        const matchesRole = criteria.role === 'All' || user.role === criteria.role;
        const matchesMinAge = criteria.minAge === null || user.age >= criteria.minAge;
        const matchesMaxAge = criteria.maxAge === null || user.age <= criteria.maxAge;

        return matchesQuery && matchesRole && matchesMinAge && matchesMaxAge;
      })
      .sort((left, right) => this.compareUsers(left, right, criteria.sortBy));
  }

  private save(users: User[]): void {
    this.browserStorage.write(this.area, this.storageKey, users);
    this.usersSignal.set(users);
  }

  private readUsers(): User[] {
    const users = this.browserStorage.read<unknown[]>(this.area, this.storageKey, []);

    return Array.isArray(users) ? this.normalizeUsers(users) : [];
  }

  private normalizeUsers(value: unknown[]): User[] {
    return value
      .map((item) => item as Partial<User>)
      .filter((item) => typeof item.name === 'string' && typeof item.age === 'number')
      .map((item) => {
        const timestamp = new Date().toISOString();

        return {
          id: typeof item.id === 'string' ? item.id : crypto.randomUUID(),
          name: item.name?.trim() || 'Unknown user',
          email: typeof item.email === 'string' ? item.email : '',
          role: this.isKnownRole(item.role) ? item.role : 'Student',
          age: item.age ?? 0,
          city: typeof item.city === 'string' ? item.city : '',
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : timestamp,
          updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : timestamp,
        };
      });
  }

  private normalizeDraft(draft: UserDraft): UserDraft {
    return {
      name: draft.name.trim(),
      email: draft.email.trim().toLowerCase(),
      role: draft.role,
      age: Number(draft.age),
      city: draft.city.trim(),
    };
  }

  private isKnownRole(role: unknown): role is User['role'] {
    return ['Admin', 'Developer', 'QA', 'Designer', 'Student'].includes(String(role));
  }

  private compareUsers(left: User, right: User, sortBy: UserSearchCriteria['sortBy']): number {
    switch (sortBy) {
      case 'createdAsc':
        return left.createdAt.localeCompare(right.createdAt);
      case 'nameAsc':
        return left.name.localeCompare(right.name);
      case 'ageAsc':
        return left.age - right.age;
      case 'ageDesc':
        return right.age - left.age;
      case 'createdDesc':
      default:
        return right.createdAt.localeCompare(left.createdAt);
    }
  }
}
