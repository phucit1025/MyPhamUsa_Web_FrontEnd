import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Trang Chủ',  icon: 'dashboard', class: '' },
  { path: '/account', title: 'Quản Lý Tài Khoản',  icon: 'supervisor_account', class: '' },
  { path: '/password', title: 'Quản Lý Mật Khẩu',  icon: 'lock', class: '' },
  { path: '/product', title: 'Quản Lý Sản Phẩm',  icon: 'business_center', class: '' },
  { path: '/category', title: 'Quản Lý Loại Sản Phẩm',  icon: 'view_module', class: '' },
  { path: '/storage', title: 'Quản Lý Kho Hàng',  icon: 'home_work', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
