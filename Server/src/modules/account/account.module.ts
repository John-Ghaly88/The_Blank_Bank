import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "src/schemas/account.schema";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
