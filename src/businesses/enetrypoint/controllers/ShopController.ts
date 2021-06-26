import { Request, Response } from "express";
import { Shop } from "../../domain/Shop";
import CreateShopUseCase from "../../usecases/CreateShopUseCase";
import DeleteShopUseCase from "../../usecases/DeleteShopUseCase";
import FindShopsByCategoryUseCase from "../../usecases/FindShopsByCategoryUseCase";
import FindShopsByPlaceUseCase from "../../usecases/FindShopsByPlaceUseCase";
import GetShopUseCase from "../../usecases/GetShopUseCase";
import UpdateShopUseCase from "../../usecases/UpdateShopUseCase";

export default class ShopController {
  private readonly createShopUseCase;
  private readonly findShopUseCase;
  private readonly updateShopUseCase;
  private readonly deleteShopUseCase;
  private readonly findByPlaceShopUseCase;
  private readonly findByCategoryShopUseCase;
  constructor(
    createShopUseCase: CreateShopUseCase,
    findShopUseCase: GetShopUseCase,
    updateShopUseCase: UpdateShopUseCase,
    deleteShopUseCase: DeleteShopUseCase,
    findByPlaceShopUseCase: FindShopsByPlaceUseCase,
    findByCategoryShopUseCase: FindShopsByCategoryUseCase
  ) {
    (this.createShopUseCase = createShopUseCase),
      (this.findShopUseCase = findShopUseCase),
      (this.updateShopUseCase = updateShopUseCase),
      (this.deleteShopUseCase = deleteShopUseCase),
      (this.findByPlaceShopUseCase = findByPlaceShopUseCase),
      (this.findByCategoryShopUseCase = findByCategoryShopUseCase);
  }

  public async createShop(req: Request, res: Response) {
    const {
      place_id,
      shop_category_id,
      name,
      number,
      contact,
      ratings,
      address,
    } = req.body;

    try {
      this.createShopUseCase
        .execute(
          place_id,
          shop_category_id,
          name,
          number,
          contact,
          ratings,
          address
        )
        .then((value: string) => {
          res.status(200).json({ shop_id: value });
        })
        .catch((err: Error) => res.status(400).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async findShop(req: Request, res: Response) {
    const { id } = req.params;

    try {
      this.findShopUseCase
        .execute(id)
        .then((value: Shop) => res.status(200).json({ shop: value }))
        .catch((err: Error) => res.status(404).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async updateShop(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      this.updateShopUseCase
        .execute(id, data)
        .then((value: Shop) => res.status(200).json({ updated_shop: value }))
        .catch((err: Error) => res.status(400).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async deleteShop(req: Request, res: Response) {
    const { id } = req.params;

    try {
      this.deleteShopUseCase
        .execute(id)
        .then((value: Shop) => res.status(200).json({ deleted_shop: value }))
        .catch((err: Error) => res.status(400).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async findByPlace(req: Request, res: Response) {
    const { place_id } = req.params;
    const { page, limit } = req.query as {
      page: string;
      limit: string;
    };

    try {
      this.findByPlaceShopUseCase
        .execute(place_id, parseInt(page), parseInt(limit))
        .then((pageable) =>
          res.status(200).json({
            metadata: {
              page: pageable.page,
              page_size: pageable.page_size,
              total_pages: pageable.total_pages,
            },
            shops: pageable.data,
          })
        )
        .catch((err: Error) => res.status(400).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  public async findByCategory(req: Request, res: Response) {
    const { place_id } = req.params;
    const { page, limit, shop_category_id } = req.query as {
      page: string;
      limit: string;
      shop_category_id: string;
    };

    try {
      this.findByCategoryShopUseCase
        .execute(shop_category_id, place_id, parseInt(page), parseInt(limit))
        .then((pageable) =>
          res.status(200).json({
            metadata: {
              page: pageable.page,
              page_size: pageable.page_size,
              total_pages: pageable.total_pages,
            },
            shops: pageable.data,
          })
        )
        .catch((err: Error) => res.status(400).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
