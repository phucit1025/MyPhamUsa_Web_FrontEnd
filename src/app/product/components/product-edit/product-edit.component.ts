import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ProductService } from 'app/product/services/product.service';
import { RequiredArrayValidation } from '../product-create/product-create.component';

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
    public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private formBuilder: FormBuilder,
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
      imagePaths: new FormControl([]),
      categoryIds: new FormControl([]),
    }, {
      // tslint:disable-next-line: no-use-before-declare
      validators: [RequiredArrayValidation.requiredArray.bind(this, ['categoryIds'])]
    });
    this.form.controls['imagePaths'].disable();
    this.productService.getCategories()
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

  checkTimeOut() {
    clearTimeout(this.timeOutCount);
    this.timeOutCount = setTimeout(() => this.checkAvailableCode(), this.timeOutDelay);
  }

  checkAvailableCode() {
    if (this.form && !this.form.controls['code'].errors) {
      this.productService.isAvailableCode(this.form.controls['code'].value)
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

}
