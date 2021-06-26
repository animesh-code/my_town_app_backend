import { PlaceModel } from "../data/models/PlaceModel";
import Place from "./Place";

export default interface IPlaceRepository {
  // Create a location
  create(
    city: string,
    district: string,
    state: string,
    country: string
  ): Promise<string>;

  // Find a location
  get(id: string): Promise<Place>;

  // Update a location
  update(id: string, data: PlaceModel): Promise<Place>;

  // Delete a location
  delete(id: string): Promise<Place>;

  // Get all location
  getAll(): Promise<Array<Place>>;
}
