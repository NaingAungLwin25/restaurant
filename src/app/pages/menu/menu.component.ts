import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../../components/menu/header/header.component';
import { BannerComponent } from '../../components/menu/banner/banner.component';
import { CategorySliderComponent } from '../../components/menu/category-slider/category-slider.component';
import { ProductListComponent } from '../../components/menu/product-list/product-list.component';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/dashboard/error-dialog/error-dialog.component';

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
  readonly dialog = inject(MatDialog);
  public categoryMenus: any = [];

  products: any = [];

  public productWithCategory: any = [];
  public headerHeight = 0;

  constructor(private apiService: ApiService) {}

  getEntirePageHeight() {
    const body = document.body;
    return body.offsetHeight;
  }

  addHeightToProductList() {
    const pageHeight = this.getEntirePageHeight();
    const observer = new ResizeObserver(() => {
      const headerHeight = this.headerRef.nativeElement.offsetHeight;
      this.scrollRef.nativeElement.style.height =
        pageHeight - headerHeight - 10 + 'px';
    });
    observer.observe(this.headerRef.nativeElement);
  }

  ngAfterViewInit() {
    this.addHeightToProductList();
  }

  ngOnInit() {
    this.fetchCategory();
  }

  fetchCategory() {
    this.apiService.getItems('category').subscribe({
      next: (data) => {
        this.categoryMenus = data.map((d: any) => ({ ...d, select: false }));
        if (this.categoryMenus.length > 0) {
          this.categoryMenus[0].select = true;
          this.fetchProducts();
        }
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  fetchProducts() {
    this.apiService.getItems('products').subscribe({
      next: (data) => {
        console.log(data);
        this.categoryMenus.forEach((m: any) => {
          const item = data.filter((p: any) => p.category === m.name);
          if (item && item.length > 0) {
            this.productWithCategory.push({
              name: m.name,
              id: m.id,
              item,
            });
          }
        });
        console.log(this.productWithCategory);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  onScroll() {
    const firstElementHeight = document.getElementById(
      this.categoryMenus[0].id
    )?.offsetHeight;
    const containerTop =
      this.scrollRef.nativeElement.scrollTop + firstElementHeight;
    this.categoryMenus.forEach((cat: { id: string }) => {
      const element = document.getElementById(cat.id);
      if (element) {
        const category = document.getElementById(`cat${cat.id}`);
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
