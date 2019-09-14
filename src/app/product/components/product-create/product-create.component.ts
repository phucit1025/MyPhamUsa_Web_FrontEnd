import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ProductService } from 'app/product/services/product.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import Swal from 'sweetalert2';
import { CategoryService } from 'app/category/services/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  categoryList: any[];

  currencyNoDecMask = createNumberMask({
    prefix: '',
    suffix: ' (VNĐ)',
    thousandsSeparatorSymbol: ',',
    allowDecimal: false,
  });

  quantityNoDecMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: ',',
    allowDecimal: false,
  });

  timeOutCount: any;
  timeOutDelay = 500;

  constructor(
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
      price: new FormControl(0, [Validators.required]),
      sellPrice: new FormControl(0, [Validators.required]),
      receiveQuantity: new FormControl(1, [Validators.required, comparableValidator((e) => {
        const value = +`${e}`.split(',').join('');
        return value > 0;
      })]),
      base64Images: new FormControl([]),
      categoryIds: new FormControl([]),
    }, {
      // tslint:disable-next-line: no-use-before-declare
      validators: [RequiredArrayValidation.requiredArray.bind(this, ['base64Images', 'categoryIds'])]
    });
    this.categoryService.getCategories()
      .then(
        (response) => {
          this.categoryList = response;
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

  createProduct(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      const productCM = this.form.value;
      ['price', 'sellPrice', 'receiveQuantity'].forEach((e) => {
        productCM[e] = +`${productCM[e]}`.split(',').join('');
      });
      this.productService.createProduct(productCM)
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

export class RequiredArrayValidation {
  static requiredArray(fieldList: string[], AC: AbstractControl) {
    if (fieldList) {
      fieldList.forEach(field => {
        const value = AC.get(field).value;
        if (!value || !Array.isArray(value) || value.length === 0) {
          AC.get(field).setErrors({requiredArray: true});
        } else {
          AC.get(field).setErrors(null);
        }
      });
    }
  }
}

export function comparableValidator(comparator: (controlValue: any) => boolean): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return !control.errors ? (!comparator(control.value) ? {'compareFailed': true} : null) : null;
  };
}
