import IAuthRepository from "../domain/IAuthRepository";

export default class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  public async execute(
    place_id: string,
    number: string,
    name: string
  ): Promise<string> {
    const userId = await this.authRepository.add(place_id, number, name);
    return userId;
  }
}
