import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from 'app/category/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string},
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
    this.form.patchValue(this.data);
  }

  closeDialog(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.close();
  }

  updateCategory(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      const categoryUM = this.form.value;
      this.categoryService.updateCategory(categoryUM)
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
