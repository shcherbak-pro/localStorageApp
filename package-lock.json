<section class="card">
  <h2>Add new user</h2>

  <form [formGroup]="form" (ngSubmit)="addUser()" class="form">
    <label>
      Name
      <input type="text" formControlName="name" placeholder="Enter name" />
    </label>

    @if (form.controls.name.invalid && (form.controls.name.touched || wasSubmitted())) {
      <p class="error">Name is required and should contain at least 2 characters.</p>
    }

    <label>
      Age
      <input type="number" formControlName="age" placeholder="Enter age" />
    </label>

    @if (form.controls.age.invalid && (form.controls.age.touched || wasSubmitted())) {
      <p class="error">Age should be between 1 and 120.</p>
    }

    <button type="submit">Save user</button>
  </form>
</section>
