import { HttpService } from "@nestjs/axios";
import {
  Controller,
  Injectable,
  Get,
  Request,
  Res,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  Param,
  HttpException,
} from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { ExternalService } from "./external.service";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { AxiosResponse } from "axios";
import { AuthGuard } from "@nestjs/passport";
import { ParseObjectIdPipe } from "src/pipes/parseObjectId.pipe";

const BANK_SERVICES_ACCOUNT = "411363528409";

@Controller("external")
@Injectable()
//@UseGuards(AuthGuard("jwt-external"))
export class ExternalController {
  constructor(
    private transactionService: TransactionService,
    private externalService: ExternalService
  ) {}

  @Post("/transferout/:accountId")
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  async externalTransferOut(
    @Request() req: any,
    @Body() dto: TransferDto,
    @Param("accountId", new ParseObjectIdPipe()) accountId: string
  ) {
    console.log("transfer out Initiated");
    const userID = req.user.id;
    const res = await this.externalService.makeExternalTransfer(dto);

    if (dto.amount > 50) throw new HttpException("amount exceeds 50", 400);

    if (res.status == 201) {
      await this.transactionService.createTransByAccountId(
        accountId,
        dto,
        userID
      );

      const extraFees: TransferDto = {
        receiverAccountNumber: BANK_SERVICES_ACCOUNT,
        amount: 5,
        description: "external bank fees",
      };

      await this.transactionService.createTransByAccountId(
        accountId,
        extraFees,
        userID
      );
    }

    console.log(res.status);
    return res.status;
  }

  @Post("/transfer")
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt-external"))
  async externalTransferIn(@Body() dto: any, @Res() res) {
    console.log(dto as TransferDto);

    if (!dto.receiverAccountNumber || !dto.amount || !dto.description)
      return res.json({ error: "missing fields" }).status(400);

    const userId = await this.transactionService.findUserIdByAccountNo(
      dto.receiverAccountNumber
    );

    if (!userId)
      return res.json({ error: "account number not found" }).status(400);

    if (dto.amount > 50)
      return res.json({ error: "account exceeds 50" }).status(400);

    this.transactionService.createTransByAccountId(
      BANK_SERVICES_ACCOUNT,
      dto as TransferDto,
      userId.toString()
    );

    //TODO : limit amount to 50 and external fees

    return res.json({ msg: "done" }).status(201);
  }
}
