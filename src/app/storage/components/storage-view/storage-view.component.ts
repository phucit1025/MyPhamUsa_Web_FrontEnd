import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/storage/services/storage.service';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { StoragePagingList } from 'app/storage/models/storage';

@Component({
  selector: 'app-storage-view',
  templateUrl: './storage-view.component.html',
  styleUrls: ['./storage-view.component.scss']
})
export class StorageViewComponent implements OnInit {
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

  constructor(
    private storageService: StorageService
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
    this.storageService.getProducts(this.searchState.index, this.searchState.size)
      .then(
        (response: StoragePagingList) => {
          this.state.data = response.results;
          this.state.total = response.total;
          this.state.loading = false;
        },
        error => console.error(error)
      );
  }

}
