import ITokenStore from "../services/ITokenStore";

export default class LogOutUseCase {
  constructor(private readonly tokenStore: ITokenStore) {}

  public async execute(token: string): Promise<string> {
    this.tokenStore.save(token);
    return Promise.resolve("Successfully logged out");
  }
}
