import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import mongodb from "mongodb";
import {
  Transaction,
  TransactionDocument,
} from "src/schemas/transaction.schema";
import { TransactionResponseDto } from "./dto/transaction.dto";
import { Account, AccountDocument } from "src/schemas/account.schema";

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private TransactionModel: Model<TransactionDocument>,
    @InjectModel(Account.name) private AccountModel: Model<AccountDocument>
  ) {}

  async getAllTransByAccountId(
    accountId: string,
    userId: string
  ): Promise<Transaction[]> {
    await this.ensureIsUserAccount(accountId, userId);
    const TransOfAccId = await this.TransactionModel.find({
      accountId: accountId,
    }).exec();

    return TransOfAccId;
  }

  private async ensureIsUserAccount(accountId: string, userId: string) {
    const account = await this.AccountModel.findOne({
      _id: accountId,
    });
    if (account.userID.toString() !== userId) {
      throw new UnauthorizedException();
    }
  }
}
