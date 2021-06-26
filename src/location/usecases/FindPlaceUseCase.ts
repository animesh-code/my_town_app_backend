import IPlaceRepository from "../domain/IPlaceRepository";
import Place from "../domain/Place";

export default class FindPlaceUseCase {
  constructor(private repository: IPlaceRepository) {}

  public execute(id: string): Promise<Place> {
    return this.repository.get(id);
  }
}
