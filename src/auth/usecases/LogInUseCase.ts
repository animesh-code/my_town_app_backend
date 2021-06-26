import IAuthRepository from "../domain/IAuthRepository";

export default class LogInUseCase {
  constructor(private authRepository: IAuthRepository) {}
  public async execute(number: string): Promise<string> {
    const user = await this.authRepository.find(number).catch((_) => null);
    if (!user) return Promise.reject("Server error");
    return user.id;
  }
}
