import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.html',
  styleUrl: './new-user.css',
})
export class NewUser {
  private readonly usersService = inject(UsersService);

  readonly wasSubmitted = signal(false);

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(120),
    ]),
  });

  addUser(): void {
    this.wasSubmitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, age } = this.form.getRawValue();
    this.usersService.addUser(name, age ?? 0);
    this.form.reset({ name: '', age: null });
    this.wasSubmitted.set(false);
  }
}
