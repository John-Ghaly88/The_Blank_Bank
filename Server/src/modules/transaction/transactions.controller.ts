import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { isMongoId, IsMongoId } from "class-validator";
import { ObjectId, Types } from "mongoose";
import { Transaction } from "src/schemas/transaction.schema";
import { TransactionResponseDto } from "./dto/transaction.dto";
import { TransactionService } from "./transaction.service";
import { ParseObjectIdPipe } from "../../pipes/parseObjectId.pipe";
import { AuthGuard } from "@nestjs/passport";

@Controller("transactions")
export class TransactionController {
  constructor(private readonly TransactionService: TransactionService) {}

  @UseGuards(AuthGuard("jwt"))
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
}
