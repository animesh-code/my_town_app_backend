import User from "./User";

export default interface IAuthRepository {
  find(number: string): Promise<User>;
  add(place_id: string, number: string, name: string): Promise<string>;
}
