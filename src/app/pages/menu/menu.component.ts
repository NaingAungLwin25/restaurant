import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BannerComponent } from '../../components/menu/banner/banner.component';
import { CategorySliderComponent } from '../../components/menu/category-slider/category-slider.component';
import { ProductListComponent } from '../../components/menu/product-list/product-list.component';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/dashboard/error-dialog/error-dialog.component';
import { Category, Product, ProductWithCategory } from '../../models';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [BannerComponent, CategorySliderComponent, ProductListComponent],
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fixContent') headerRef!: ElementRef;
  @ViewChild('scrollContent') scrollRef!: ElementRef;
  readonly dialog = inject(MatDialog);
  public categoryMenus: Array<Category & { select: boolean }> = [];

  public products: Product[] = [];

  public productWithCategory: ProductWithCategory[] = [];
  public headerHeight = 0;

  private observer!: ResizeObserver;

  constructor(private apiService: ApiService) {}

  /**
   * Page Initialization
   */
  ngOnInit() {
    this.fetchCategory();
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  /**
   * Page event after all components init
   */
  ngAfterViewInit() {
    this.addHeightToProductList();
  }

  /**
   * Get window height
   * @returns window height
   */
  private getEntirePageHeight() {
    const body = document.body;
    return body.offsetHeight;
  }

  /**
   * Apply heigh to product list area
   */
  private addHeightToProductList() {
    this.observer = new ResizeObserver(() => {
      const pageHeight = this.getEntirePageHeight();
      const menuHeight = document.getElementById('menu')?.offsetHeight;
      const headerHeight = this.headerRef.nativeElement.offsetHeight;
      this.scrollRef.nativeElement.style.height =
        pageHeight - (headerHeight + menuHeight) - 10 + 'px';
    });
    this.observer.observe(this.headerRef.nativeElement);
  }

  /**
   * Fetch categories
   */
  private fetchCategory() {
    this.apiService.getItems<Category>('category').subscribe({
      next: (data) => {
        this.categoryMenus = data.map((d) => ({ ...d, select: false }));
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

  /**
   * Fetch products
   */
  private fetchProducts() {
    this.apiService.getItems<Product>('products').subscribe({
      next: (data) => {
        this.categoryMenus.forEach((m) => {
          const item = data.filter((p) => p.category === m.name);
          if (item && item.length > 0) {
            this.productWithCategory.push({
              name: m.name,
              id: m.id,
              item,
            });
          }
        });
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  /**
   * handle scroll event for product list to select category
   */
  public onScroll() {
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
