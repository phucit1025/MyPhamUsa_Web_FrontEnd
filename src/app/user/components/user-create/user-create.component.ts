import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'app/user/services/user.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  closeDialog(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.close();
  }

  createUser(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      const userCM = this.form.value;
      this.userService.createUser(userCM)
        .then(
          (response) => {
            this.dialogRef.close();
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
