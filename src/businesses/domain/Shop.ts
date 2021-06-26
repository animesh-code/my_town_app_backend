import { Category } from "./Category";

export class ShopCategory {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly display_image?: string
  ) {}
}

export class Shop {
  constructor(
    public readonly id: string,
    public readonly place_id: string,
    public readonly shop_category_id: string,
    public readonly name: string,
    public readonly number: string,
    public readonly contact: string,
    public readonly ratings: number,
    public readonly address?: Address,
    public readonly categories?: Array<Category>
  ) {}
}

export class Address {
  constructor(
    public readonly street: string,
    public readonly locality: string,
    public readonly city: string,
    public readonly pin: number
  ) {}
}
