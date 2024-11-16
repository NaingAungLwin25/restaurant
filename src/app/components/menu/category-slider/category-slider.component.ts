import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-category-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss',
})
export class CategorySliderComponent {
  @Input() categoryMenus: any[] = [];

  public handleOnChangeMenu(name: string) {
    this.categoryMenus = this.categoryMenus.map((menu) =>
      menu.displayName === name
        ? { ...menu, select: true }
        : { ...menu, select: false }
    );
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
