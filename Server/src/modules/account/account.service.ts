import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "@sp/schemas";
import { Model } from "mongoose";
import { Account, AccountDocument } from "src/schemas/account.schema";
import { AccountDto } from "./dto/account.dto";

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private AccountModel: Model<AccountDocument>
  ) {}

  async getAccountByUserID(UID: string): Promise<Account[]> {
    const AccOfUserID = await this.AccountModel.find({ userID: UID }).exec();

    return AccOfUserID;
  }
}
