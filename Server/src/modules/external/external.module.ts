import { Module } from "@nestjs/common";
import { ExternalService } from "./external.service";
import { ExternalController } from "./external.controller";
import { HttpModule } from "@nestjs/axios";
import { TransactionModule } from "../transaction/transaction.module";

@Module({
  providers: [ExternalService],
  controllers: [ExternalController],
  imports: [
    TransactionModule,
    HttpModule.register({
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTb25nIjoiV2hlcmVJc015SnV1bD8iLCJOYW1lIjoiTGlsX01hcmlrbyIsIkxpbmsiOiJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PXEtWEg5MldpZTBVJmFiX2NoYW5uZWw9TG9maUNvd2JveSJ9.1i5RDEb4KW0wkDMXmcaqj5keueKoM8jxERLPhbav8F",
      },
    }),
  ],
  exports: [ExternalService],
})
export class ExternalModule {}
