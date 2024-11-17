import { Product } from './product';

export interface ProductWithCategory {
  id: string;
  name: string;
  item: Product[];
}
