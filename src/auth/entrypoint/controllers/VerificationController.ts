import * as express from "express";
import RequestOtpUseCase from "../../usecases/RequestOtpUseCase";
import CheckOtpUseCase from "../../usecases/CheckOtpUseCase";
import CancelOtpUseCase from "../../usecases/CancelOtpUseCase";

export default class VerifyController {
  private readonly requestOtpUseCase: RequestOtpUseCase;
  private readonly checkOtpUseCase: CheckOtpUseCase;
  private readonly cancelOtpUseCase: CancelOtpUseCase;

  constructor(
    requestOtpUseCase: RequestOtpUseCase,
    checkOtpUseCase: CheckOtpUseCase,
    cancelOtpUseCase: CancelOtpUseCase
  ) {
    this.requestOtpUseCase = requestOtpUseCase;
    this.checkOtpUseCase = checkOtpUseCase;
    this.cancelOtpUseCase = cancelOtpUseCase;
  }
  public async request(req: express.Request, res: express.Response) {
    try {
      const { number } = req.body;
      return this.requestOtpUseCase.execute(number, "My Town Code", res);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async check(req: express.Request, res: express.Response) {
    try {
      const { code, requestId, number } = req.body;
      return this.checkOtpUseCase.execute(requestId, code, number, res);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async cancel(req: express.Request, res: express.Response) {
    try {
      const { requestId } = req.body;
      return this.cancelOtpUseCase.execute(requestId, res);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
