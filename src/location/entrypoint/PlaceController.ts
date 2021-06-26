import { Request, Response } from "express";
import Place from "../domain/Place";

import CreatePlaceUseCase from "../usecases/CreatePlaceUseCase";
import DeletePlaceUseCase from "../usecases/DeletePlaceUseCase";
import FindAllPlaceUseCase from "../usecases/FindAllPlaceUseCase";
import FindPlaceUseCase from "../usecases/FindPlaceUseCase";
import UpdatePlaceUseCase from "../usecases/UpdatePlaceUseCase";

export default class PlaceController {
  private readonly createUseCase: CreatePlaceUseCase;
  private readonly findUseCase: FindPlaceUseCase;
  private readonly updateUseCase: UpdatePlaceUseCase;
  private readonly deleteUseCase: DeletePlaceUseCase;
  private readonly findAllUseCase: FindAllPlaceUseCase;

  constructor(
    createUseCase: CreatePlaceUseCase,
    findUseCase: FindPlaceUseCase,
    updateUseCase: UpdatePlaceUseCase,
    deleteUseCase: DeletePlaceUseCase,
    findAllUseCase: FindAllPlaceUseCase
  ) {
    (this.createUseCase = createUseCase),
      (this.findUseCase = findUseCase),
      (this.updateUseCase = updateUseCase),
      (this.deleteUseCase = deleteUseCase),
      (this.findAllUseCase = findAllUseCase);
  }

  public async create(req: Request, res: Response) {
    const { city, district, state, country } = req.body;

    try {
      return this.createUseCase
        .execute(city, district, state, country)
        .then((value: string) => res.status(200).json({ place_id: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  public async find(req: Request, res: Response) {
    const { id } = req.params;

    try {
      return this.findUseCase
        .execute(id)
        .then((value: Place) => res.status(200).json({ place: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      return this.updateUseCase
        .execute(id, data)
        .then((value: Place) => res.status(200).json({ updated_place: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      return this.deleteUseCase
        .execute(id)
        .then((value: Place) => res.status(200).json({ deleted_place: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  public async findAll(req: Request, res: Response) {
    try {
      return this.findAllUseCase
        .execute()
        .then((value: Place[]) => res.status(200).json({ places: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
