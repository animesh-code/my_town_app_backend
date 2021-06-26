import * as express from "express";

import LogInUseCase from "../../usecases/LogInUseCase";
import RegisterUseCase from "../../usecases/RegisterUseCase";
import CheckUserUseCase from "../../usecases/CheckUserUseCase";
import ITokenService from "../../services/ITokenService";
import LogOutUseCase from "../../usecases/LogOutUseCase";

export default class AuthController {
  private readonly logInUseCase: LogInUseCase;
  private readonly registerUseCase: RegisterUseCase;
  private readonly logOutUseCase: LogOutUseCase;
  private readonly checkUserUseCase: CheckUserUseCase;
  private readonly tokenService: ITokenService;
  constructor(
    logInUseCase: LogInUseCase,
    registerUseCase: RegisterUseCase,
    logOutUseCase: LogOutUseCase,
    checkUserUseCase: CheckUserUseCase,
    tokenService: ITokenService
  ) {
    this.logInUseCase = logInUseCase;
    this.registerUseCase = registerUseCase;
    this.logOutUseCase = logOutUseCase;
    this.checkUserUseCase = checkUserUseCase;
    this.tokenService = tokenService;
  }

  public async check(req: express.Request, res: express.Response) {
    const { number } = req.body;
    try {
      return this.checkUserUseCase
        .execute(number)
        .then((value: boolean) => res.status(200).json({ value }))
        .catch((err: Error) => res.status(404).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async login(req: express.Request, res: express.Response) {
    const { number } = req.body;
    try {
      return this.logInUseCase
        .execute(number)
        .then((id: string) =>
          res.status(200).json({ auth_token: this.tokenService.encode(id) })
        )
        .catch((err: Error) => res.status(404).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async register(req: express.Request, res: express.Response) {
    try {
      const { place_id, number, name } = req.body;
      return this.registerUseCase
        .execute(place_id, number, name)
        .then((id: string) =>
          res.status(200).json({ auth_token: this.tokenService.encode(id) })
        )
        .catch((err: Error) => res.status(404).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async logout(req: express.Request, res: express.Response) {
    const token = req.headers.authorization!;
    try {
      return this.logOutUseCase
        .execute(token)
        .then((result: string) => res.status(200).json({ message: result }))
        .catch((err: Error) => res.status(404).json({ error: err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
