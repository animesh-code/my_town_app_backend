export class Category {
  constructor(
    public readonly id: string,
    public readonly shop_id: string,
    public readonly title: string,
    public readonly items?: Array<Item>
  ) {}
}

export class Item {
  constructor(
    public readonly id: string,
    public readonly shop_id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly category_id?: string,
    public readonly offer_price?: number,
    public readonly offer_validity?: Date
  ) {}
}
