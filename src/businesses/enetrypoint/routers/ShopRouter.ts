import express from "express";
import TokenValidator from "../../../auth/helpers/TokenValidator";
import IShopRepository from "../../domain/IShopRepository";
import CreateShopUseCase from "../../usecases/CreateShopUseCase";
import DeleteShopUseCase from "../../usecases/DeleteShopUseCase";
import FindShopsByCategoryUseCase from "../../usecases/FindShopsByCategoryUseCase";
import FindShopsByPlaceUseCase from "../../usecases/FindShopsByPlaceUseCase";
import GetShopUseCase from "../../usecases/GetShopUseCase";
import UpdateShopUseCase from "../../usecases/UpdateShopUseCase";
import ShopController from "../controllers/ShopController";

export default class ShopRouter {
  public static configure(
    repository: IShopRepository,
    tokenValidator: TokenValidator
  ): express.Router {
    const router = express.Router();
    let controller = ShopRouter.composeController(repository);

    router.post(
      "/create",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.createShop(req, res);
      }
    );
    router.get(
      "/find/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.findShop(req, res);
      }
    );
    router.patch(
      "/update/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.updateShop(req, res);
      }
    );
    router.delete(
      "/delete/:id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.deleteShop(req, res);
      }
    );

    router.get(
      "/findByPlace/:place_id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.findByPlace(req, res);
      }
    );
    router.get(
      "/findByCategory/:place_id",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) => {
        controller.findByCategory(req, res);
      }
    );

    return router;
  }

  private static composeController(
    repository: IShopRepository
  ): ShopController {
    const createShopUseCase = new CreateShopUseCase(repository);
    const findShopUseCase = new GetShopUseCase(repository);
    const updateShopUseCase = new UpdateShopUseCase(repository);
    const deleteShopUseCase = new DeleteShopUseCase(repository);
    const findByPlaceShopUseCase = new FindShopsByPlaceUseCase(repository);
    const findByCategoryShopUseCase = new FindShopsByCategoryUseCase(
      repository
    );

    const controller = new ShopController(
      createShopUseCase,
      findShopUseCase,
      updateShopUseCase,
      deleteShopUseCase,
      findByPlaceShopUseCase,
      findByCategoryShopUseCase
    );

    return controller;
  }
}
