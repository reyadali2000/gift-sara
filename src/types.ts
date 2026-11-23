export type Lang = 'ar' | 'en';

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  regularPrice: number;
  salePrice: number | null;
  isOnSale: boolean;
  currency: string;
  categoryAr: string;
  categoryEn: string;
  image: string;
  url: string;
  type: string;
  isAvailable: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftMessage?: string;
  ribbonColor?: string;
}
