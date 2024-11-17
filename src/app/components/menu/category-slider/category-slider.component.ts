import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../../models';

@Component({
  selector: 'menu-category-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss',
})
export class CategorySliderComponent {
  @Input() categoryMenus: Array<Category & { select: boolean }> = [];

  public handleOnChangeMenu(id: string) {
    this.categoryMenus = this.categoryMenus.map((menu) =>
      menu.id === id ? { ...menu, select: true } : { ...menu, select: false }
    );
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
