import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ProductService } from 'app/product/services/product.service';
import { RequiredArrayValidation } from '../product-create/product-create.component';
import Swal from 'sweetalert2';
import { CategoryService } from 'app/category/services/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  categoryList: any[];

  quantityNoDecMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: ',',
    allowDecimal: false,
  });

  timeOutCount: any;
  timeOutDelay = 500;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: new FormControl(0, [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      originalPrice: new FormControl(0, [Validators.required]),
      sellPrice: new FormControl(0, [Validators.required]),
      imagePaths: new FormControl({value: [], disabled: true}),
      categoryIds: new FormControl([]),
    }, {
      // tslint:disable-next-line: no-use-before-declare
      validators: [RequiredArrayValidation.requiredArray.bind(this, ['categoryIds'])]
    });
    this.categoryService.getCategories()
      .then(
        (response) => {
          this.categoryList = response;
        },
        error => console.error(error)
      );
    this.productService.getProduct(this.data.id)
      .then(
        (response) => {
          const product = response;
          product.originalPrice = product.price;
          product.categoryIds = product.categories ? product.categories.map((e: any) => e.categoryId) : [];
          this.form.patchValue(product);
        },
        error => console.error(error)
      );
  }

  closeDialog(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.close();
  }

  checkTimeOut() {
    clearTimeout(this.timeOutCount);
    this.timeOutCount = setTimeout(() => this.checkAvailableCode(), this.timeOutDelay);
  }

  checkAvailableCode() {
    if (this.form && !this.form.controls['code'].errors) {
      this.productService.isAvailableCode(this.form.controls['code'].value, this.form.controls['id'].value)
        .then(
          () => {
            this.form.controls['code'].setErrors(null);
          },
          (error) => {
            if (error.status === 400) {
              this.form.controls['code'].setErrors({duplicatedCode: true});
            }
          }
        );
    }
  }

  updateProduct(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      const productUM = this.form.value;
      ['originalPrice', 'sellPrice'].forEach((e) => {
        productUM[e] = +`${productUM[e]}`.split(',').join('');
      });
      this.productService.updateProduct(productUM)
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
