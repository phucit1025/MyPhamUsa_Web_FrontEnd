import { Component, OnInit } from '@angular/core';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CategoryService } from 'app/category/services/category.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {
  data: any[];

  dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.categoryService.getCategories()
      .then(
        (response: any) => {
          this.data = response;
        },
        error => console.error(error)
      );
  }

  openCreateDialog() {
    this.dialogRef = this.dialog.open(CategoryCreateComponent, {
      width: '500px',
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  openEditDialog(data: {id: number, name: string}) {
    this.dialogRef = this.dialog.open(CategoryEditComponent, {
      width: '500px',
      data: {...data},
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  delete(id: number) {
    console.log(id);
    this.categoryService.deleteCategory(id)
      .then(
        (response) => {
          this.fetchData();
        },
        error => console.error(error)
      );
  }

}
