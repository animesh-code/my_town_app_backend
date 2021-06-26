import express from "express";
import TokenValidator from "../../../auth/helpers/TokenValidator";
import IShopRepository from "../../domain/IShopRepository";
import CreateItemUseCase from "../../usecases/CreateItemUseCase";
import DeleteItemUseCase from "../../usecases/DeleteItemUseCase";
import GetAllItemUseCase from "../../usecases/GetAllItemUseCase";
import GetItemsByCategoryUseCase from "../../usecases/GetItemsByCategoryUseCase";
import GetItemUseCase from "../../usecases/GetItemUseCase";
import UpdateItemUseCase from "../../usecases/UpdateItemUseCase";
import ItemController from "../controllers/ItemController";

export default class ItemRouter {
  public static configure(
    repository: IShopRepository,
    tokenValidator: TokenValidator
  ): express.Router {
    const router = express.Router();
    let controller = ItemRouter.composeController(repository);

    router.post(
      "/create",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.createItem(req, res);
      }
    );
    router.get(
      "/get/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.getItem(req, res);
      }
    );
    router.patch(
      "/update/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.updateItem(req, res);
      }
    );
    router.delete(
      "/delete/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.deleteItem(req, res);
      }
    );
    router.get(
      "/getAll/:shop_id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.getAllItem(req, res);
      }
    );
    router.get(
      "/getByCategory/:category_id",
      (req: express.Request, res: express.Response) => {
        controller.getByCategory(req, res);
      }
    );

    return router;
  }

  private static composeController(
    repository: IShopRepository
  ): ItemController {
    const createUseCase = new CreateItemUseCase(repository);
    const getUseCase = new GetItemUseCase(repository);
    const updateUseCase = new UpdateItemUseCase(repository);
    const deleteUseCase = new DeleteItemUseCase(repository);
    const getAllUseCase = new GetAllItemUseCase(repository);
    const getByCategoryUseCase = new GetItemsByCategoryUseCase(repository);

    const controller = new ItemController(
      createUseCase,
      getUseCase,
      updateUseCase,
      deleteUseCase,
      getAllUseCase,
      getByCategoryUseCase
    );

    return controller;
  }
}
