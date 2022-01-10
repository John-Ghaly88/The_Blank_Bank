import { IsNotEmpty } from "class-validator";
import { TransferDto } from "../../transaction/dto/transfer.dto";

export class ExternalTransferDto extends TransferDto {
  @IsNotEmpty()
  thirdPartyEndPoint: string;
}
