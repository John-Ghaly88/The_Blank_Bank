import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { ConfigModule } from "@nestjs/config";
import { AccountModule } from "./modules/account/account.module";
import { ExternalModule } from "./modules/external/external.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    TransactionModule,
    AccountModule,
    ExternalModule,
  ],
})

export class AppModule {}
