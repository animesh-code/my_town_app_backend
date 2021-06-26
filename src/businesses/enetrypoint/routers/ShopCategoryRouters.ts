import express from "express";
import TokenValidator from "../../../auth/helpers/TokenValidator";
import IShopRepository from "../../domain/IShopRepository";
import CreateShopCategoryUseCase from "../../usecases/CreateShopCategoryUseCase";
import DeleteShopCategoriesUseCase from "../../usecases/DeleteShopCategoryUseCase";
import GetShopCategoriesUseCase from "../../usecases/GetShopCategoriesUseCase";
import GetShopCategoryUseCase from "../../usecases/GetShopCategoryUseCase";
import UpdateShopCategoryUseCase from "../../usecases/UpdateShopCategoryUseCase";
import ShopCategoryController from "../controllers/ShopCategoryController";

export default class ShopCategoryRouter {
  public static configure(
    repository: IShopRepository,
    tokenValidator: TokenValidator
  ): express.Router {
    const router = express.Router();
    let controller = ShopCategoryRouter.composeController(repository);

    router.post(
      "/create",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.createShopCategory(req, res);
      }
    );

    router.get(
      "/get/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.getShopCategory(req, res);
      }
    );

    router.get(
      "/getAll",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.getShopCategories(req, res);
      }
    );

    router.patch(
      "/update/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.updateShopCategory(req, res);
      }
    );

    router.delete(
      "/delete/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.deleteShopCategory(req, res);
      }
    );

    return router;
  }

  private static composeController(
    repository: IShopRepository
  ): ShopCategoryController {
    const createShopCategoryUseCase = new CreateShopCategoryUseCase(repository);
    const getShopCategoryUseCase = new GetShopCategoryUseCase(repository);
    const getShopCategoriesUseCase = new GetShopCategoriesUseCase(repository);
    const updateShopCategoryUseCase = new UpdateShopCategoryUseCase(repository);
    const DeleteShopCategoryUseCase = new DeleteShopCategoriesUseCase(
      repository
    );

    const controller = new ShopCategoryController(
      createShopCategoryUseCase,
      getShopCategoryUseCase,
      getShopCategoriesUseCase,
      updateShopCategoryUseCase,
      DeleteShopCategoryUseCase
    );

    return controller;
  }
}
