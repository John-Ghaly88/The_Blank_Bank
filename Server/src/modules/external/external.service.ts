import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { AxiosResponse } from "axios";
//const THIRD_PARTY_ENDPOINTS = [
//  //test APIS
//  "http://fht-rpi4.ddns.net/success",
//  "http://fht-rpi4.ddns.net/invalidtoken",
//  "http://fht-rpi4.ddns.net/missingfields",
//  "http://fht-rpi4.ddns.net/usernotfound",
//  "http://fht-rpi4.ddns.net/amountexceeded",
//];
//

const THIRD_PARTY_ENDPOINTS = [
  //test APIS
  //
  "http://fht-rpi4.ddns.net/usernotfound",
  "http://fht-rpi4.ddns.net/usernotfound",
  "http://fht-rpi4.ddns.net/usernotfound",
  "http://fht-rpi4.ddns.net/usernotfound",
  "http://fht-rpi4.ddns.net/success",
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
        console.log(e);
        if (e.response.data.error !== "account number not found") {
          throw new HttpException(e.response.data.error, e.response.status);
        }
      }
    }
  }
}
