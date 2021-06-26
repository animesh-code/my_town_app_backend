import IPlaceRepository from "../domain/IPlaceRepository";
import Place from "../domain/Place";

export default class FindAllPlaceUseCase {
  constructor(private repository: IPlaceRepository) {}

  public execute(): Promise<Place[]> {
    return this.repository.getAll();
  }
}
