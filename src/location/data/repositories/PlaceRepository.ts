import { Mongoose } from "mongoose";
import IPlaceRepository from "../../domain/IPlaceRepository";
import Place from "../../domain/Place";
import { PlaceDocument, PlaceModel, PlaceSchema } from "../models/PlaceModel";

export default class LocationRepository implements IPlaceRepository {
  constructor(private readonly client: Mongoose) {}

  public async create(
    city: string,
    district: string,
    state: string,
    country?: string
  ): Promise<string> {
    const model = this.client.model<PlaceDocument>(
      "Place",
      PlaceSchema
    ) as PlaceModel;

    const savedPlace = new model({
      city: city,
      district: district,
      state: state,
    });

    if (country) savedPlace.country = country;

    await savedPlace.save();

    return savedPlace.id;
  }

  public async get(id: string): Promise<Place> {
    const places = this.client.model<PlaceDocument>(
      "Place",
      PlaceSchema
    ) as PlaceModel;

    const result = await places.findById(id);

    if (result === null)
      return Promise.reject("Check the id, location not found");

    return new Place(
      result.id,
      result.city,
      result.district,
      result.state,
      result.country
    );
  }

  public async update(id: string, data: PlaceModel): Promise<Place> {
    const places = this.client.model<PlaceDocument>(
      "Place",
      PlaceSchema
    ) as PlaceModel;

    const response = await places.findByIdAndUpdate(id, data, (err, docs) => {
      if (err) return err;
      return docs;
    });

    if (response === null)
      return Promise.reject("Check the id, something went wrong");

    return new Place(
      response.id,
      response.city,
      response.district,
      response.state,
      response.country
    );
  }

  public async delete(id: string): Promise<Place> {
    const places = this.client.model<PlaceDocument>(
      "Place",
      PlaceSchema
    ) as PlaceModel;

    const response = await places.findByIdAndDelete(id);

    if (response === null)
      return Promise.reject("Check the id, something went wrong");

    return new Place(
      response.id,
      response.city,
      response.district,
      response.state,
      response.country
    );
  }
  public async getAll(): Promise<Place[]> {
    const places = this.client.model<PlaceDocument>(
      "Place",
      PlaceSchema
    ) as PlaceModel;

    const response = await places.find();

    const result = response.map<Place>(
      (place) =>
        new Place(
          place.id,
          place.city,
          place.district,
          place.state,
          place.country
        )
    );

    return result;
  }
}
