import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../../material.module';
import { User } from '../../../../models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, MaterialModule, MatButtonModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private router: Router) {}

  getLoginUserName() {
    const storeObj = localStorage.getItem('loginUser');
    if (!storeObj) return;
    const loginUser = JSON.parse(storeObj) as User;
    return loginUser.name;
  }

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/admin/auth/login']);
  }
}
