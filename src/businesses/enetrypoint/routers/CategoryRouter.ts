import express from "express";
import TokenValidator from "../../../auth/helpers/TokenValidator";
import IShopRepository from "../../domain/IShopRepository";
import CreateCategoryUseCase from "../../usecases/CreateCategoryUseCase";
import DeleteCategoryUseCase from "../../usecases/DeleteCategoryUseCase";
import GetCategoriesUseCase from "../../usecases/GetCategoriesUseCase";
import UpdateCategoryUseCase from "../../usecases/UpdateCategoryUseCase";
import CategoryController from "../controllers/CategoryController";

export default class CategoryRouter {
  public static configure(
    repository: IShopRepository,
    tokenValidator: TokenValidator
  ): express.Router {
    const router = express.Router();
    let controller = CategoryRouter.composeController(repository);

    router.post(
      "/create",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.createCategory(req, res);
      }
    );
    router.get(
      "/get",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.getCategories(req, res);
      }
    );
    router.patch(
      "/update/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.updateCategory(req, res);
      }
    );
    router.delete(
      "/delete/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.deleteCategory(req, res);
      }
    );

    return router;
  }
  private static composeController(
    repository: IShopRepository
  ): CategoryController {
    const createCategoryUseCase = new CreateCategoryUseCase(repository);
    const getCategoriesUseCase = new GetCategoriesUseCase(repository);
    const updateCategoryUseCase = new UpdateCategoryUseCase(repository);
    const deleteCategoryUseCase = new DeleteCategoryUseCase(repository);

    const controller = new CategoryController(
      createCategoryUseCase,
      getCategoriesUseCase,
      updateCategoryUseCase,
      deleteCategoryUseCase
    );

    return controller;
  }
}
