import { Controller, UseGuards, Get, Request } from "@nestjs/common";
import { Account } from "src/schemas/account.schema";
import { AccountService } from "./account.service";
import { AuthGuard } from "@nestjs/passport";
import { AccountDto } from "./dto/account.dto";

@Controller("accounts")
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async getAccountByUserID(@Request() req: any): Promise<Account[]> {
    const userID = req.user.id;
    return await this.AccountService.getAccountByUserID(userID);
  }
}
