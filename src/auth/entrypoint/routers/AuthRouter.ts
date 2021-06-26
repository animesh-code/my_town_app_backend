import * as express from "express";
import IAuthRepository from "../../domain/IAuthRepository";
import TokenValidator from "../../helpers/TokenValidator";
import Token from "../../helpers/TokenValidator";
import {
  checkValidationRules,
  loginValidationRules,
  registerValidationRules,
  validate,
} from "../../helpers/validators";
import ITokenService from "../../services/ITokenService";
import ITokenStore from "../../services/ITokenStore";
import CheckUserUseCase from "../../usecases/CheckUserUseCase";
import LogInUseCase from "../../usecases/LogInUseCase";
import LogOutUseCase from "../../usecases/LogOutUseCase";
import RegisterUseCase from "../../usecases/RegisterUseCase";
import AuthController from "../controllers/AuthController";

export default class AuthRouter {
  public static configure(
    authRepository: IAuthRepository,
    tokenService: ITokenService,
    tokenStore: ITokenStore,
    tokenValidator: TokenValidator
  ): express.Router {
    const router = express.Router();
    let controller = AuthRouter.composeController(
      authRepository,
      tokenService,
      tokenStore
    );

    router.post(
      "/check",
      checkValidationRules(),
      validate,
      (req: express.Request, res: express.Response) =>
        controller.check(req, res)
    );
    router.post(
      "/login",
      loginValidationRules(),
      validate,
      (req: express.Request, res: express.Response) =>
        controller.login(req, res)
    );
    router.post(
      "/register",
      registerValidationRules(),
      validate,
      (req: express.Request, res: express.Response) =>
        controller.register(req, res)
    );
    router.post(
      "/logout",
      (req, res, next) => tokenValidator.validate(req, res, next),
      (req: express.Request, res: express.Response) =>
        controller.logout(req, res)
    );

    return router;
  }

  private static composeController(
    authRepository: IAuthRepository,
    tokenService: ITokenService,
    tokenStore: ITokenStore
  ): AuthController {
    const logInUseCase = new LogInUseCase(authRepository);
    const registerUseCase = new RegisterUseCase(authRepository);
    const logOutUseCase = new LogOutUseCase(tokenStore);
    const checkUserUseCase = new CheckUserUseCase(authRepository);
    const controller = new AuthController(
      logInUseCase,
      registerUseCase,
      logOutUseCase,
      checkUserUseCase,
      tokenService
    );
    return controller;
  }
}
