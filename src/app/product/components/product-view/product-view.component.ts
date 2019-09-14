import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'app/product/services/product.service';
import { ProductPagingList } from 'app/product/models/product';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'app/storage/services/storage.service';
import Swal from 'sweetalert2';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { comparableValidator } from '../product-create/product-create.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @ViewChild('issueDialogContent', {static: false}) issueDialogContent: any;
  @ViewChild('receiveDialogContent', {static: false}) receiveDialogContent: any;
  searchState = {
    index: 0,
    size: 20,
    buttonCount: 5,
    info: true,
    type: 'numeric',
    pageSizes: true,
    previousNext: true,
    skip: 0,
  };

  state = {
    data: [],
    total: 0,
    loading: false,
  };

  quantityNoDecMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: ',',
    allowDecimal: false,
  });

  dialogRef: MatDialogRef<any>;
  dialogIssueRef: MatDialogRef<any>;
  dialogReceiveRef: MatDialogRef<any>;

  formIssue: FormGroup;
  formReceive: FormGroup;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.searchState.index = skip / take;
    this.searchState.skip = skip;
    this.searchState.size = take;
    this.fetchData();
  }

  fetchData() {
    this.state.loading = true;
    this.productService.getProducts(this.searchState.index, this.searchState.size)
      .then(
        (response: ProductPagingList) => {
          this.state.loading = false;
          this.state.data = response.results;
          this.state.total = response.total;
        },
        error => console.error(error)
      );
  }

  refreshData() {
    this.searchState.index = 0;
    this.fetchData();
  }

  openUpdateDialog(id: number) {
    this.dialogRef = this.dialog.open(ProductEditComponent, {
      width: '70vw',
      data: {id: id},
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  openIssueDialog(productId: number) {
    this.formIssue = this.formBuilder.group({
      productId: new FormControl(productId),
      quantity: new FormControl(1, [Validators.required, comparableValidator((e) => {
        const value = +`${e}`.split(',').join('');
        return value > 0;
      })]),
      description: new FormControl(''),
    });
    this.dialogIssueRef = this.dialog.open(this.issueDialogContent, {
      width: '500px',
    });
  }

  closeIssueDialog(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogIssueRef.close();
  }

  openReceiveDialog(productId: number) {
    this.formReceive = this.formBuilder.group({
      productId: new FormControl(productId),
      quantity: new FormControl(1, [Validators.required, comparableValidator((e) => {
        const value = +`${e}`.split(',').join('');
        return value > 0;
      })]),
      description: new FormControl(''),
    });
    this.dialogReceiveRef = this.dialog.open(this.receiveDialogContent, {
      width: '500px',
    });
  }

  closeReceiveDialog(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogReceiveRef.close();
  }

  delete(id: number) {
    console.log(id);
    this.productService.deleteProduct(id)
      .then(
        (response) => {
          console.log(response);
          this.refreshData();
        },
        error => console.error(error)
      );
  }

  issue() {
    if (this.formIssue.valid) {
      const data = this.formIssue.value;
      ['quantity'].forEach((e) => {
        data[e] = +`${data[e]}`.split(',').join('');
      });
      this.storageService.issue(data)
        .then(
          (response) => {
            console.log(response);
            this.dialogIssueRef.close();
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
              text: 'Số lượng không đủ để Xuất kho',
              type: 'error',
              timer: 1000,
              showConfirmButton: false,
            });
          }
        );
    }
  }

  receive() {
    if (this.formReceive.valid) {
      const data = this.formReceive.value;
      ['quantity'].forEach((e) => {
        data[e] = +`${data[e]}`.split(',').join('');
      });
      this.storageService.receive(data)
        .then(
          (response) => {
            console.log(response);
            this.dialogReceiveRef.close();
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
