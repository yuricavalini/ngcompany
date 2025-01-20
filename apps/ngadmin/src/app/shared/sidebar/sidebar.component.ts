import { Component } from '@angular/core';
import { AuthService } from '@ngcompany/users';

@Component({
  selector: 'ngadmin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logoutUser() {
    this.authService.logout();
  }
}
