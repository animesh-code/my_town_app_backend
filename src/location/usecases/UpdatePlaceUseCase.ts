import { PlaceModel } from "../data/models/PlaceModel";
import IPlaceRepository from "../domain/IPlaceRepository";
import Place from "../domain/Place";

export default class UpdatePlaceUseCase {
  constructor(private repository: IPlaceRepository) {}

  public execute(id: string, data: PlaceModel): Promise<Place> {
    return this.repository.update(id, data);
  }
}
