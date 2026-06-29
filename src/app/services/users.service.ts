import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

const STORAGE_KEY = 'local_users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly usersSignal = signal<User[]>(this.readUsers());

  readonly users = this.usersSignal.asReadonly();

  addUser(name: string, age: number): void {
    const user: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      age,
      createdAt: new Date().toISOString(),
    };

    this.updateUsers([...this.usersSignal(), user]);
  }

  removeUser(id: string): void {
    this.updateUsers(this.usersSignal().filter((user) => user.id !== id));
  }

  clearUsers(): void {
    this.updateUsers([]);
  }

  private updateUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    this.usersSignal.set(users);
  }

  private readUsers(): User[] {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    try {
      const parsedValue = JSON.parse(storedValue) as unknown;
      return Array.isArray(parsedValue) ? this.normalizeUsers(parsedValue) : [];
    } catch {
      return [];
    }
  }

  private normalizeUsers(value: unknown[]): User[] {
    return value
      .map((item) => item as Partial<User> & { name?: unknown; age?: unknown })
      .filter((item) => typeof item.name === 'string' && typeof item.age === 'number')
      .map((item) => ({
        id: typeof item.id === 'string' ? item.id : crypto.randomUUID(),
        name: item.name as string,
        age: item.age as number,
        createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
      }));
  }
}
