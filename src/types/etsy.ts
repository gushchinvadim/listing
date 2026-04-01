// src/types/etsy.ts

export interface MainImage {
  url_570xN?: string;
}

export interface EtsyItem {
  listing_id: number | string;
  url?: string;
  MainImage?: MainImage;
  title?: string;
  currency_code?: string;
  price?: string | number;
  quantity?: string | number;
}

export interface ProductCardProps {
  item: EtsyItem;
}

export interface ListingProps {
  items: EtsyItem[];
}