import IAuthRepository from "../domain/IAuthRepository";

export default class CheckUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  public async execute(number: string): Promise<boolean> {
    const user = await this.authRepository.find(number).catch((_) => null);
    if (user != null) return true;
    return false;
  }
}
