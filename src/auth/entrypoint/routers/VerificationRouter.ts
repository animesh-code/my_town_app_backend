import * as express from "express";
import IVerifyRepository from "../../domain/IVerifyRepository";
import CancelOtpUseCase from "../../usecases/CancelOtpUseCase";
import CheckOtpUseCase from "../../usecases/CheckOtpUseCase";
import RequestOtpUseCase from "../../usecases/RequestOtpUseCase";
import VerificationController from "../controllers/VerificationController";

export default class VerificationRouter {
  public static configure(verifyRepository: IVerifyRepository): express.Router {
    const router = express.Router();
    let controller = VerificationRouter.composeController(verifyRepository);

    router.post("/otp/request", (req, res) => controller.request(req, res));
    router.post("/otp/check", (req, res) => controller.check(req, res));
    router.post("/otp/cancel", (req, res) => controller.cancel(req, res));

    return router;
  }

  private static composeController(
    verifyRepository: IVerifyRepository
  ): VerificationController {
    const requestOtpUseCase = new RequestOtpUseCase(verifyRepository);
    const checkOtpUseCase = new CheckOtpUseCase(verifyRepository);
    const cancelOtpUseCase = new CancelOtpUseCase(verifyRepository);
    const controller = new VerificationController(
      requestOtpUseCase,
      checkOtpUseCase,
      cancelOtpUseCase
    );
    return controller;
  }
}
