import express from "express";

import IPlaceRepository from "../domain/IPlaceRepository";
import CreatePlaceUseCase from "../usecases/CreatePlaceUseCase";
import DeletePlaceUseCase from "../usecases/DeletePlaceUseCase";
import FindAllPlaceUseCase from "../usecases/FindAllPlaceUseCase";
import FindPlaceUseCase from "../usecases/FindPlaceUseCase";
import UpdatePlaceUseCase from "../usecases/UpdatePlaceUseCase";
import PlaceController from "./PlaceController";

export default class PlaceRouter {
  public static configure(repository: IPlaceRepository): express.Router {
    const router = express.Router();
    let controller = PlaceRouter.composeController(repository);

    router.post("/create", (req: express.Request, res: express.Response) => {
      return controller.create(req, res);
    });
    router.get("/find/:id", (req: express.Request, res: express.Response) => {
      return controller.find(req, res);
    });
    router.patch(
      "/update/:id",
      (req: express.Request, res: express.Response) => {
        return controller.update(req, res);
      }
    );
    router.delete(
      "/delete/:id",
      (req: express.Request, res: express.Response) => {
        return controller.delete(req, res);
      }
    );
    router.get("/findAll", (req: express.Request, res: express.Response) => {
      return controller.findAll(req, res);
    });

    return router;
  }

  private static composeController(
    repository: IPlaceRepository
  ): PlaceController {
    const createUseCase = new CreatePlaceUseCase(repository);
    const findUseCase = new FindPlaceUseCase(repository);
    const updateUseCase = new UpdatePlaceUseCase(repository);
    const deleteUseCase = new DeletePlaceUseCase(repository);
    const findAllUseCase = new FindAllPlaceUseCase(repository);

    const controller = new PlaceController(
      createUseCase,
      findUseCase,
      updateUseCase,
      deleteUseCase,
      findAllUseCase
    );

    return controller;
  }
}
