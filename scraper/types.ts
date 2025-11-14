export interface ProductStatus {
  url: string;
  title: string;
  status: 'in_stock' | 'out_of_stock' | 'error';
  message: string;
  timestamp: Date;
}

export interface ScraperResult {
  sourceUrl: string;
  totalProducts: number;
  inStock: ProductStatus[];
  outOfStock: ProductStatus[];
  errors: ProductStatus[];
  scannedAt: Date;
}

export interface ScraperOptions {
  timeout?: number;
  userAgent?: string;
  delay?: number; // delay between requests in milliseconds
}
