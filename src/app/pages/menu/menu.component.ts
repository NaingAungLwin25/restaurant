import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../../components/menu/header/header.component';
import { BannerComponent } from '../../components/menu/banner/banner.component';
import { CategorySliderComponent } from '../../components/menu/category-slider/category-slider.component';
import { ProductListComponent } from '../../components/menu/product-list/product-list.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    HeaderComponent,
    BannerComponent,
    CategorySliderComponent,
    ProductListComponent,
  ],
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('fixContent') headerRef!: ElementRef;
  @ViewChild('scrollContent') scrollRef!: ElementRef;
  public categoryMenus = [
    {
      image: 'yoguart.png',
      displayName: 'Yoguart',
      select: true,
    },
    {
      image: 'coffee.png',
      displayName: 'Coffee',
      select: false,
    },
    {
      image: 'bubble-tea.png',
      displayName: 'Bubble Tea',
      select: false,
    },
    {
      image: 'smoothie.png',
      displayName: 'Smoothie',
      select: false,
    },
    {
      image: 'soda.png',
      displayName: 'Soda',
      select: false,
    },
    {
      image: 'fruit-tea.png',
      displayName: 'Fruit Tea',
      select: false,
    },
  ];

  products = [
    {
      name: 'Passion Yogurt',
      price: 5000,
      description:
        'Natural fermented yogurt from pure fresh milk and passion fruit...',
      category: 'Yoguart',
      image: 'product-image.png',
    },
    {
      name: 'Orange Yogurt',
      price: 5000,
      description:
        'Natural fermented yogurt from pure fresh milk and passion fruit...',
      category: 'Yoguart',
      image: 'product-image.png',
    },
    {
      name: 'Orange Yogurt',
      price: 5000,
      description:
        'Natural fermented yogurt from pure fresh milk and passion fruit...',
      category: 'Yoguart',
      image: 'product-image.png',
    },
    {
      name: 'Coffee',
      price: 5000,
      description:
        'Natural fermented yogurt from pure fresh milk and passion fruit...',
      category: 'Coffee',
      image: 'product-image.png',
    },
    {
      name: 'Coffee',
      price: 5000,
      description:
        'Natural fermented yogurt from pure fresh milk and passion fruit...',
      category: 'Coffee',
      image: 'product-image.png',
    },
    {
      name: 'Coffee',
      price: 5000,
      description:
        'Natural fermented yogurt from pure fresh milk and passion fruit...',
      category: 'Coffee',
      image: 'product-image.png',
    },
  ];

  public productWithCategory: any = [];
  public headerHeight = 0;

  getEntirePageHeight() {
    const body = document.body;
    return body.offsetHeight;
  }

  ngAfterViewInit() {
    this.headerRef.nativeElement.style.height =
      this.headerRef.nativeElement.offsetHeight + 'px';
    this.headerHeight = this.headerRef.nativeElement.offsetHeight;
    const pageHeight = this.getEntirePageHeight();
    this.scrollRef.nativeElement.style.height =
      pageHeight - this.headerHeight + 'px';
  }

  ngOnInit() {
    this.categoryMenus.forEach((m) => {
      const item = this.products.filter((p) => p.category === m.displayName);
      if (item && item.length > 0) {
        this.productWithCategory.push({
          name: m.displayName,
          id: m.displayName,
          item,
        });
      }
    });
  }

  onScroll() {
    const firstElementHeight = document.getElementById(
      this.categoryMenus[0].displayName
    )?.offsetHeight;
    const containerTop =
      this.scrollRef.nativeElement.scrollTop + firstElementHeight;
    this.categoryMenus.forEach((cat) => {
      const element = document.getElementById(cat.displayName);
      if (element) {
        const category = document.getElementById(`cat${cat.displayName}`);
        const elementHeight = element?.offsetHeight + element?.offsetTop;
        if (containerTop > element.offsetTop && containerTop < elementHeight) {
          category?.classList.add('menu-selected');
        } else {
          category?.classList.remove('menu-selected');
        }
      }
    });
  }
}
