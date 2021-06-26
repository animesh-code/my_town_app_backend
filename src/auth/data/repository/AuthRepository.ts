import { Mongoose } from "mongoose";
import IAuthRepository from "../../domain/IAuthRepository";
import User from "../../domain/User";
import { UserModel, UserSchema } from "../model/UserModel";

export default class AuthRepository implements IAuthRepository {
  constructor(private readonly client: Mongoose) {}
  public async find(number: string): Promise<User> {
    const users = this.client.model<UserModel>("User", UserSchema);

    const user = await users.findOne({ number: number });

    if (!user) return Promise.reject("User not found");

    return new User(
      user.id,
      user.place_id,
      user.number,
      user.name,
      user.gender,
      user.age,
      user.donor,
      user.bloodGroup
    );
  }
  public async add(
    place_id: string,
    number: string,
    name: string
  ): Promise<string> {
    const userModel = this.client.model<UserModel>("User", UserSchema);
    const savedUser = new userModel({
      place_id: place_id,
      number: number,
      name: name,
    });

    await savedUser.save();

    return savedUser.id;
  }
}
