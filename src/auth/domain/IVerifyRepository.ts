import { Response } from "express";

export default interface IVerifyRepository {
  request(number: string, brand: string, res: Response): Promise<void>;
  check(
    requestId: string,
    code: string,
    number: string,
    res: Response
  ): Promise<void>;
  cancel(requestId: string, res: Response): Promise<void>;
}
