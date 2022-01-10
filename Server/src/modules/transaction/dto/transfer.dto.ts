import { Types } from "mongoose";
import { IsNotEmpty } from "class-validator";

export class TransferDto {
  @IsNotEmpty()
  receiverAccountNumber: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;
}
