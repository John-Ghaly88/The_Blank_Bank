import { Prop } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";
import { Account } from "src/schemas/account.schema";

export class AccountDto {
  constructor(acc: Account) {
    Object.assign(this, acc);
  }

  userID: Types.ObjectId;
  @Prop({
    unique: true,
  })
  accountNo: string;
  balance: number;
}
