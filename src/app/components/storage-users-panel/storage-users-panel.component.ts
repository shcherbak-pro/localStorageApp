import { DatePipe } from '@angular/common';
import { Component, Input, computed, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  DEFAULT_USER_SEARCH_CRITERIA,
  User,
  UserDraft,
  UserRole,
  USER_ROLES,
  UserSearchCriteria,
} from '../../models/user';
import { UserStorageStore } from '../../services/user-storage.store';
import { UserEditorDialogComponent } from '../user-editor-dialog/user-editor-dialog.component';

@Component({
  selector: 'app-storage-users-panel',
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './storage-users-panel.component.html',
  styleUrl: './storage-users-panel.component.css',
})
export class StorageUsersPanelComponent {
  private readonly dialog = inject(MatDialog);
  @Input({ required: true }) store!: UserStorageStore;
  @Input({ required: true }) storageName = '';
  @Input() description = '';

  readonly roles = USER_ROLES;
  readonly criteria = signal<UserSearchCriteria>(DEFAULT_USER_SEARCH_CRITERIA);

  readonly filteredUsers = computed(() => this.store.search(this.criteria()));
  readonly activeFiltersCount = computed(() => {
    const criteria = this.criteria();
    return [
      criteria.query.trim(),
      criteria.role !== 'All',
      criteria.minAge !== null,
      criteria.maxAge !== null,
    ].filter(Boolean).length;
  });

  readonly searchForm = new FormGroup({
    query: new FormControl('', { nonNullable: true }),
    role: new FormControl<UserRole | 'All'>('All', { nonNullable: true }),
    minAge: new FormControl<number | null>(null),
    maxAge: new FormControl<number | null>(null),
    sortBy: new FormControl<UserSearchCriteria['sortBy']>('createdDesc', { nonNullable: true }),
  });

  applySearch(): void {
    const rawValue = this.searchForm.getRawValue();

    this.criteria.set({
      query: rawValue.query,
      role: rawValue.role,
      minAge: this.normalizeNumber(rawValue.minAge),
      maxAge: this.normalizeNumber(rawValue.maxAge),
      sortBy: rawValue.sortBy,
    });
  }

  resetSearch(): void {
    this.searchForm.reset(DEFAULT_USER_SEARCH_CRITERIA);
    this.criteria.set(DEFAULT_USER_SEARCH_CRITERIA);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open<UserEditorDialogComponent, { mode: 'create' }, UserDraft>(
      UserEditorDialogComponent,
      {
        width: '560px',
        data: { mode: 'create' },
      },
    );

    dialogRef.afterClosed().subscribe((draft) => {
      if (draft) {
        this.store.addUser(draft);
      }
    });
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open<UserEditorDialogComponent, { mode: 'edit'; user: User }, UserDraft>(
      UserEditorDialogComponent,
      {
        width: '560px',
        data: { mode: 'edit', user },
      },
    );

    dialogRef.afterClosed().subscribe((draft) => {
      if (draft) {
        this.store.updateUser(user.id, draft);
      }
    });
  }

  removeUser(user: User): void {
    this.store.removeUser(user.id);
  }

  clearUsers(): void {
    this.store.clearUsers();
  }

  trackUser(_index: number, user: User): string {
    return user.id;
  }

  private normalizeNumber(value: number | null): number | null {
    return value === null || Number.isNaN(Number(value)) ? null : Number(value);
  }
}
