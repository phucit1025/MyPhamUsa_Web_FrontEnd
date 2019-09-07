import { Component, OnInit } from '@angular/core';
import { PasswordService } from 'app/password/services/password.service';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss'],
})
export class PasswordPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private passwordService: PasswordService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      rePassword: new FormControl(''),
    }, {
      // tslint:disable-next-line: no-use-before-declare
      validators: [NewPasswordValidation.isInvalid.bind(this), RePasswordValidation.isNotMatched.bind(this)],
    });
  }

  changePassword(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      const changePasswordModel = this.form.value;
      delete changePasswordModel.rePassword;
      this.passwordService.changePassword(changePasswordModel)
        .then(
          (response) => {
            console.log(response);
            Swal.fire({
              title: '',
              text: 'Thành công',
              type: 'success',
              timer: 1000,
              showConfirmButton: false,
            });
          },
          error => {
            console.error(error);
            Swal.fire({
              title: '',
              text: 'Đã có lỗi xảy ra',
              type: 'error',
              timer: 1000,
              showConfirmButton: false,
            });
          }
        );
    }
  }

}

export class NewPasswordValidation {
  static isInvalid(AC: AbstractControl) {
    const oldPassword = AC.get('oldPassword').value;
    const newPassword = AC.get('newPassword').value;
    if (!AC.get('newPassword').errors) {
      if (newPassword === oldPassword) {
        AC.get('newPassword').setErrors({newpassInvalid: true});
      } else {
        AC.get('newPassword').setErrors(null);
      }
    }
  }
}

export class RePasswordValidation {
  static isNotMatched(AC: AbstractControl) {
    const newPassword = AC.get('newPassword').value;
    const rePassword = AC.get('rePassword').value;
    if (newPassword) {
      if (!rePassword) {
        AC.get('rePassword').setErrors({required: true});
      } else {
        AC.get('rePassword').setErrors(null);
        if (rePassword !== newPassword) {
          AC.get('rePassword').setErrors({repassNotMatched: true});
        } else {
          AC.get('rePassword').setErrors(null);
        }
      }
    } else {
      AC.get('rePassword').setErrors(null);
    }
  }
}
