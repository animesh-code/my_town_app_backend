import { Request, Response } from "express";
import { Item } from "../../domain/Category";
import CreateItemUseCase from "../../usecases/CreateItemUseCase";
import DeleteItemUseCase from "../../usecases/DeleteItemUseCase";
import GetAllItemUseCase from "../../usecases/GetAllItemUseCase";
import GetItemsByCategoryUseCase from "../../usecases/GetItemsByCategoryUseCase";
import GetItemUseCase from "../../usecases/GetItemUseCase";
import UpdateItemUseCase from "../../usecases/UpdateItemUseCase";

export default class ItemController {
  private readonly createUseCase;
  private readonly getUseCase;
  private readonly updateUseCase;
  private readonly deleteUseCase;
  private readonly getAllUseCase;
  private readonly getByCategoryUseCase;

  constructor(
    createUseCase: CreateItemUseCase,
    getUseCase: GetItemUseCase,
    updateUseCase: UpdateItemUseCase,
    deleteUseCase: DeleteItemUseCase,
    getAllUseCase: GetAllItemUseCase,
    getByCategoryUseCase: GetItemsByCategoryUseCase
  ) {
    (this.createUseCase = createUseCase),
      (this.getUseCase = getUseCase),
      (this.updateUseCase = updateUseCase),
      (this.deleteUseCase = deleteUseCase),
      (this.getAllUseCase = getAllUseCase),
      (this.getByCategoryUseCase = getByCategoryUseCase);
  }

  public async createItem(req: Request, res: Response) {
    const {
      shop_id,
      title,
      description,
      price,
      quantity,
      category_id,
      offer_price,
      offer_validity,
    } = req.body;

    try {
      return this.createUseCase
        .execute(
          shop_id,
          title,
          description,
          price,
          quantity,
          category_id,
          offer_price,
          offer_validity
        )
        .then((value: string) => res.status(200).json({ category_id: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async getItem(req: Request, res: Response) {
    const { id } = req.params;

    try {
      return this.getUseCase
        .execute(id)
        .then((value: Item) => res.status(200).json({ item: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async updateItem(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      return this.updateUseCase
        .execute(id, data)
        .then((value: Item) => res.status(200).json({ updated_item: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async deleteItem(req: Request, res: Response) {
    const { id } = req.params;

    try {
      return this.deleteUseCase
        .execute(id)
        .then((value: Item) => res.status(200).json({ deleted_item: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async getAllItem(req: Request, res: Response) {
    const { shop_id } = req.params;
    const { page, limit } = req.query as {
      page: string;
      limit: string;
    };

    try {
      return this.getAllUseCase
        .execute(shop_id, parseInt(page), parseInt(limit))
        .then((pageable) =>
          res.status(200).json({
            metadata: {
              page: pageable.page,
              page_size: pageable.page_size,
              total_pages: pageable.total_pages,
            },
            items: pageable.data,
          })
        )
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async getByCategory(req: Request, res: Response) {
    const { category_id } = req.params;
    const { shop_id, page, limit } = req.query as {
      shop_id: string;
      page: string;
      limit: string;
    };

    try {
      return this.getByCategoryUseCase
        .execute(category_id, shop_id, parseInt(page), parseInt(limit))
        .then((pageable) =>
          res.status(200).json({
            metadata: {
              page: pageable.page,
              page_size: pageable.page_size,
              total_pages: pageable.total_pages,
            },
            items: pageable.data,
          })
        )
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
