import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Credentials } from '../models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  @Input()
  set pending(isPending: boolean) {
    isPending ? this.form.disable : this.form.enable;
  }

  @Input() errorMessage: string | null;
  @Output() submitted = new EventEmitter<Credentials>();

  form: FormGroup = new FormGroup({
    username: new FormControl('test'),
    password: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}