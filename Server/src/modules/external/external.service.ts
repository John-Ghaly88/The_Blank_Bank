import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { AxiosResponse } from "axios";

const THIRD_PARTY_ENDPOINTS = [
  "https://ironbank.loca.lt/external/transfer",
  "https://solace.loca.lt/external/transfer",
  "https://myfsd.loca.It/external/transfer",
  "https://amryinternationalbank.loca.lt/external/transfer",
  "https://luckbank.loca.lt/external/transfer",
];

@Injectable()
export class ExternalService {
  constructor(private httpService: HttpService) {}

  async makeExternalTransfer(transferDto: TransferDto) {
    for (const b of THIRD_PARTY_ENDPOINTS) {
      try {
        const res = await this.httpService.post(b, transferDto).toPromise();
        return res;
      } catch (e) {
        if (e.response.data.error !== "account number not found") {
          throw new HttpException(e.response.data.error, e.response.status);
        }
      }
    }

    throw new HttpException("account number not found", 400);
  }
}
