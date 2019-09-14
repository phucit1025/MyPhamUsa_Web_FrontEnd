import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from 'app/user/services/user.service';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  data: any[];

  dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.userService.getUsers()
      .then(
        (response: any) => {
          this.data = response;
        },
        error => console.error(error)
      );
  }

  openCreateDialog() {
    this.dialogRef = this.dialog.open(UserCreateComponent, {
      width: '500px',
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  delete(guid: string) {
    console.log(guid);
    this.userService.deleteUser(guid)
      .then(
        (response) => {
          this.fetchData();
        },
        error => console.error(error)
      );
  }

}
