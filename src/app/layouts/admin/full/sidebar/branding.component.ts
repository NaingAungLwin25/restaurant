import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/admin']">
        <img
          src="./assets/images/logos/logo.png"
          class="align-middle m-2"
          alt="logo"
          width="200px"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
