import { Request, Response } from "express";
import { Category } from "../../domain/Category";
import CreateCategoryUseCase from "../../usecases/CreateCategoryUseCase";
import DeleteCategoryUseCase from "../../usecases/DeleteCategoryUseCase";
import GetCategoriesUseCase from "../../usecases/GetCategoriesUseCase";
import UpdateCategoryUseCase from "../../usecases/UpdateCategoryUseCase";

export default class CategoryController {
  private readonly createUseCase;
  private readonly getAllUseCase;
  private readonly updateUseCase;
  private readonly deleteUseCase;

  constructor(
    createUseCase: CreateCategoryUseCase,
    getAllUseCase: GetCategoriesUseCase,
    updateUseCase: UpdateCategoryUseCase,
    deleteUseCase: DeleteCategoryUseCase
  ) {
    (this.createUseCase = createUseCase),
      (this.getAllUseCase = getAllUseCase),
      (this.updateUseCase = updateUseCase),
      (this.deleteUseCase = deleteUseCase);
  }

  public async createCategory(req: Request, res: Response) {
    const { shop_id, title } = req.body;

    try {
      return this.createUseCase
        .execute(shop_id, title)
        .then((value: string) => res.status(200).json({ category_id: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async getCategories(req: Request, res: Response) {
    const { shop_id } = req.query as {
      shop_id: string;
    };

    try {
      return this.getAllUseCase
        .execute(shop_id)
        .then((value: Category[]) =>
          res.status(200).json({ categories: value })
        )
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      return this.updateUseCase
        .execute(id, data)
        .then((value: Category) =>
          res.status(200).json({ updated_category: value })
        )
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      this.deleteUseCase
        .execute(id)
        .then((value: Category) =>
          res.status(200).json({ deleted_category: value })
        )
        .catch((err: Error) => res.status(400).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
