import IPlaceRepository from "../domain/IPlaceRepository";
import Place from "../domain/Place";

export default class DeletePlaceUseCase {
  constructor(private repository: IPlaceRepository) {}

  public execute(id: string): Promise<Place> {
    return this.repository.delete(id);
  }
}
