/** Enum-like object representing product stock status. */
export const ProductStock = {
  inStock: "In Stock",
  outOfStock: "Out of Stock",
  lowStock: "Low Stock",
} as const;
/** Type representing the values of ProductStock */
export type ProductStock = (typeof ProductStock)[keyof typeof ProductStock];

/** Interface for product dimensions. */
export interface ProductDimensions {
  /** The width of the product. */
  width: number;
  /** The height of the product. */
  height: number;
  /** The depth of the product. */
  depth: number;
}

/** Interface for product metadata. */
export interface ProductMeta {
  /** The creation date of the product.*/
  createdAt: string;
  /** The last update date of the product.*/
  updatedAt: string;
  /** The barcode of the product.*/
  barcode: string;
  /** The QR code of the product.*/
  qrCode: string;
}

/** Interface for a product review. */
export interface ProductReview {
  /** The rating given by the reviewer.*/
  rating: number;
  /** The comment by the reviewer.*/
  comment: string;
  /** The date of the review. */
  date: string;
  /** The name of the reviewer.*/
  reviewerName: string;
  /** The email of the reviewer.*/
  reviewerEmail: string;
}

/** Interface representing a product */
export interface Product {
  /** The unique identifier for the product.*/
  id: number;
  /** The title of the product.*/
  title: string;
  /** The description of the product.*/
  description: string;
  /** The category of the product.*/
  category: string;
  /** The price of the product.*/
  price: number;
  /** The discount percentage on the product.*/
  discountPercentage: number;
  /** The average rating of the product.*/
  rating: number;
  /** The stock level of the product.*/
  stock: number;
  /** Tags associated with the product.*/
  tags: string[];
  /** The brand of the product.*/
  brand: string;
  /** The SKU of the product.*/
  sku: string;
  /** The weight of the product.*/
  weight: number;
  /** The dimensions of the product.*/
  dimensions: ProductDimensions;
  /** The warranty information of the product.*/
  warrantyInformation: string;
  /** The shipping information of the product.*/
  shippingInformation: string;
  /** The availability status of the product.*/
  availabilityStatus: ProductStock;
  /** Reviews of the product.*/
  reviews: ProductReview[];
  /** The return policy of the product.*/
  returnPolicy: string;
  /** The minimum order quantity for the product.*/
  minimumOrderQuantity: number;
  /** Metadata associated with the product.*/
  meta: ProductMeta;
  /** Images of the product.*/
  images: string[];
  /** The thumbnail image of the product.*/
  thumbnail: string;
}
