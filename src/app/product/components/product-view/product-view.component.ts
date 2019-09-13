import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/product/services/product.service';
import { ProductPagingList } from 'app/product/models/product';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { MatDialog } from '@angular/material';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
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
  };

  dialogRef: any;

  constructor(
    private dialog: MatDialog,
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
    this.productService.getProducts(this.searchState.index, this.searchState.size)
      .then(
        (response: ProductPagingList) => {
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

}
