import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionController } from "./transactions.controller";
import { TransactionService } from "./transaction.service";
import { Mongoose } from "mongoose";
import {
  Transaction,
  TransactionSchema,
} from "../../schemas/transaction.schema";
import { Account, AccountSchema } from "src/schemas/account.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
