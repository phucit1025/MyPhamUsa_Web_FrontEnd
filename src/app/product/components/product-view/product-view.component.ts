import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/product/services/product.service';
import { ProductPagingList } from 'app/product/models/product';
import { PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  searchState = {
    index: 0,
    size: 10,
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

  constructor(
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
    this.productService.getProductsPaging(this.searchState.index, this.searchState.size)
      .then(
        (response: ProductPagingList) => {
          this.state.data = response.results;
          this.state.total = response.totalPages;
        },
        error => console.error(error)
      );
  }

  refreshData() {
    this.searchState.index = 0;
    this.fetchData();
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
