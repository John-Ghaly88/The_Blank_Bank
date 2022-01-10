import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
} from "@nestjs/common";
import { isMongoId, IsMongoId } from "class-validator";
import { ObjectId, Types } from "mongoose";
import { Transaction } from "src/schemas/transaction.schema";
import { TransactionService } from "./transaction.service";
import { ParseObjectIdPipe } from "../../pipes/parseObjectId.pipe";
import { AuthGuard } from "@nestjs/passport";
import { TransferDto } from "./dto/transfer.dto";

@Controller("transactions")
@UseGuards(AuthGuard("jwt"))
export class TransactionController {
  constructor(private readonly TransactionService: TransactionService) {}

  @Get("/:accountId")
  async getAllTransByAccountId(
    @Param("accountId", new ParseObjectIdPipe()) accountId: string,
    @Request() req: any
  ): Promise<Transaction[]> {
    const userID = req.user.id;
    return await this.TransactionService.getAllTransByAccountId(
      accountId,
      userID
    );
  }

  @Post("/:accountId/transfers")
  async createTransByAccountId(
    @Param("accountId", new ParseObjectIdPipe()) accountId: string,
    @Body() dto: TransferDto,
    @Request() req: any
  ) {
    const userID = req.user.id;
    return await this.TransactionService.createTransByAccountId(
      accountId,
      dto,
      userID
    );
  }
}
