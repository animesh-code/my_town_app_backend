import { Response } from "express";
import IVerifyRepository from "../domain/IVerifyRepository";

export default class RequestOtpUseCase {
  constructor(private verifyRepository: IVerifyRepository) {}

  public async execute(
    number: string,
    brand: string,
    res: Response
  ): Promise<void> {
    const response = await this.verifyRepository.request(number, brand, res);
  }
}
