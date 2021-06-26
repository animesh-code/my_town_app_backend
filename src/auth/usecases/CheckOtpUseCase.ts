import { Response } from "express";
import IVerifyRepository from "../domain/IVerifyRepository";

export default class CheckOtpUseCase {
  constructor(private verifyRepository: IVerifyRepository) {}

  public async execute(
    requestId: string,
    code: string,
    number: string,
    res: Response
  ): Promise<void> {
    const response = await this.verifyRepository.check(
      requestId,
      code,
      number,
      res
    );
  }
}
