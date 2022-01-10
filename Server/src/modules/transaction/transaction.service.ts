import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  Transaction,
  TransactionDocument,
} from "src/schemas/transaction.schema";
import { Account, AccountDocument } from "src/schemas/account.schema";
import { TransferDto } from "./dto/transfer.dto";

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
      accountId,
    }).exec();

    return TransOfAccId.sort((a, b) => {
      return (b.date as any) - (a.date as any);
    });
  }

  async findUserIdByAccountNo(accountNo: string) {
    const userId = (
      await this.AccountModel.findOne({
        accountNo: accountNo,
      })
    ).userID;
    return userId;
  }

  async createTransByAccountId(
    accountId: string,
    dto: TransferDto,
    userId: string
  ) {
    await this.ensureIsUserAccount(accountId, userId);

    const senderAccount = await this.AccountModel.findOne({
      _id: accountId,
    });
    const receiverAccount = await this.AccountModel.findOne({
      accountNo: dto.receiverAccountNumber,
    });
    if (!receiverAccount) {
      throw new HttpException(
        `Account: ${dto.receiverAccountNumber} not found`,
        HttpStatus.BAD_REQUEST
      );
    }

    await this.updateBalance(senderAccount, receiverAccount, dto.amount);

    await this.addTransToDB({
      accountId: new Types.ObjectId(accountId),
      balance: senderAccount.balance - dto.amount,
      credit: 0,
      debit: dto.amount,
      date: new Date(),
      description: dto.description,
    });

    await this.addTransToDB({
      accountId: new Types.ObjectId(
        await this.getAccountIdByAccountNumber(dto.receiverAccountNumber)
      ),
      balance: receiverAccount.balance + dto.amount,
      credit: dto.amount,
      debit: 0,
      date: new Date(),
      description: dto.description,
    });
  }

  // Check that account is linked to a userID
  private async ensureIsUserAccount(accountId: string, userId: string) {
    const account = await this.AccountModel.findOne({
      _id: accountId,
    }).exec();
    if (!account) {
      throw new HttpException("Account not found", HttpStatus.BAD_REQUEST);
    }
    if (account.userID.toString() !== userId) {
      throw new UnauthorizedException();
    }
  }

  private async updateBalance(
    senderAccount: Account,
    receiverAccount: Account,
    amount: number
  ) {
    // check if user's account has sufficient funds to complete transaction
    if (senderAccount.balance < amount) {
      throw new HttpException("Insufficient Funds", HttpStatus.BAD_REQUEST);
    } else {
      // update sender & receiver account balances
      await this.AccountModel.updateOne(
        { accountNo: senderAccount.accountNo },
        { $set: { balance: senderAccount.balance - amount } }
      );
      await this.AccountModel.updateOne(
        { accountNo: receiverAccount.accountNo },
        { $set: { balance: receiverAccount.balance + amount } }
      );
    }
  }

  private async getAccountIdByAccountNumber(
    accountNumber: string
  ): Promise<string> {
    const result = await this.AccountModel.find({
      accountNo: accountNumber,
    }).exec();

    if (!result[0]) {
      console.log("Failed to get account by number", accountNumber);
      throw new HttpException(
        "Invalid account number: " + accountNumber,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return result[0]._id;
  }

  private async addTransToDB(trans: Transaction) {
    const result = await this.TransactionModel.insertMany([trans]);

    if (!result[0]) {
      console.log("Failed to add transaction", trans);
      throw new HttpException(
        "Failed to add transaction",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return result[0];
  }
}
