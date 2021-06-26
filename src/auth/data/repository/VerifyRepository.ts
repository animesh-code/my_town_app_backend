import Vonage from "@vonage/server-sdk";
import { Response } from "express";
import IVerifyRepository from "../../domain/IVerifyRepository";

const vonage = new Vonage({
  // apiKey: process.env.API_KEY as string,
  apiKey: "65fe43f5",
  apiSecret: "aItKewXDsR19ZWf1",
});

export default class VerifyRepository implements IVerifyRepository {
  public async request(
    number: string,
    brand: string,
    res: Response
  ): Promise<void> {
    vonage.verify.request({ number: number, brand: brand }, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result && result.status == "0") return res.status(200).send(result);
      return res.status(400).send(result);
    });
  }
  public async check(
    requestId: string,
    code: string,
    number: string,
    res: Response
  ): Promise<void> {
    vonage.verify.check(
      { request_id: requestId, code: code },
      (err, result) => {
        if (err) return res.status(500).send({ error: err });
        if (result && result.status == "0")
          return res.status(200).send({ result, number });
        return res.status(400).send(result);
      }
    );
  }
  public async cancel(requestId: string, res: Response): Promise<void> {
    vonage.verify.control(
      { request_id: requestId, cmd: "cancel" },
      (err, result) => {
        if (err) return res.status(500).send({ error: err });
        if (result && result.status == "0") return res.status(200).send(result);
        return res.status(400).send(result);
      }
    );
  }
}
