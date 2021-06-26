import IPlaceRepository from "../domain/IPlaceRepository";

export default class CreatePlaceUseCase {
  constructor(private repository: IPlaceRepository) {}

  public execute(
    city: string,
    district: string,
    state: string,
    country: string
  ): Promise<string> {
    return this.repository.create(city, district, state, country);
  }
}
