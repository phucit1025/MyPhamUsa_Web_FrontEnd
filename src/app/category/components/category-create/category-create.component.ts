import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CategoryService } from 'app/category/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
  }

  closeDialog(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.close();
  }

  createCategory(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      const categoryCM = this.form.value;
      this.categoryService.createCategory(categoryCM)
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
