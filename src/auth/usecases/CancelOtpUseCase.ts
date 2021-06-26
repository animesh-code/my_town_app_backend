import { Response } from "express";
import IVerifyRepository from "../domain/IVerifyRepository";

export default class CancelOtpUseCase {
  constructor(private verifyRepository: IVerifyRepository) {}

  public async execute(requestId: string, res: Response): Promise<void> {
    const response = await this.verifyRepository.cancel(requestId, res);
  }
}
