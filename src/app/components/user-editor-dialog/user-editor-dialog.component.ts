import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { User, UserDraft, USER_ROLES } from '../../models/user';

export interface UserEditorDialogData {
  mode: 'create' | 'edit';
  user?: User;
}

@Component({
  selector: 'app-user-editor-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-editor-dialog.component.html',
  styleUrl: './user-editor-dialog.component.css',
})
export class UserEditorDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<UserEditorDialogComponent, UserDraft>);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly data = inject<UserEditorDialogData>(MAT_DIALOG_DATA);
  readonly roles = USER_ROLES;
  readonly title = this.data.mode === 'create' ? 'Add user' : 'Edit user';

  readonly form = this.formBuilder.group({
    name: [this.data.user?.name ?? '', [Validators.required, Validators.minLength(2)]],
    email: [this.data.user?.email ?? '', [Validators.required, Validators.email]],
    role: [this.data.user?.role ?? 'Student', [Validators.required]],
    age: [this.data.user?.age ?? 18, [Validators.required, Validators.min(1), Validators.max(120)]],
    city: [this.data.user?.city ?? '', [Validators.required, Validators.minLength(2)]],
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue() as UserDraft);
  }
}
