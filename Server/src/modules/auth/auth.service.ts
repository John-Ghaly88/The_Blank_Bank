import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "@sp/schemas";
import { Model, Types } from "mongoose";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import * as bcrypt from "bcrypt";
import { Account, AccountSchema } from "src/schemas/account.schema";
import { Transaction } from "src/schemas/transaction.schema";

@Injectable()
export class AuthService {
  readonly HASH_SALT_ROUNDS = 10;

  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>
  ) {}

  async register(dto: RegisterDto) {
    await this.ensureUserDoesNotExist(dto.email);
    this.ensureIsUniversityEmail(dto.email);
    const hashedPassword = await this.hashPassword(dto.password);
    const userId = await this.addUserToDB({ ...dto, password: hashedPassword });
    return { token: this.jwtService.sign({ id: userId }) };
  }

  private async ensureUserDoesNotExist(email: string) {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new HttpException(
        "User with same email already exists",
        HttpStatus.CONFLICT
      );
    }
  }

  private ensureIsUniversityEmail(email: string) {
    if (!email.endsWith("giu-uni.de")) {
      throw new HttpException(
        "Invalid university email, must include @giu-uni.de",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async addUserToDB(user: User): Promise<string> {
    const result = await this.userModel.insertMany([user]);
    if (!result[0]) {
      console.log("Failed to add user", user);
      throw new HttpException(
        "Failed to add user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    await this.addDefaultAccount(result[0]._id);
    return result[0]._id;
  }

  private async addDefaultAccount(id: string) {
    //Ensure account number is unique and never used before
    let accountNum = Math.floor(
      100000000000 + Math.random() * 900000000000
    ).toString();

    while (true) {
      const res = await this.accountModel.find({ accountNo: accountNum });
      if (res[0]) {
        accountNum = Math.floor(
          100000000000 + Math.random() * 900000000000
        ).toString();
      } else {
        break;
      }
    }
    const account: Account = {
      accountNo: accountNum,
      balance: 100,
      userID: new Types.ObjectId(id),
    };
    const accountRes = await this.accountModel.insertMany([account]);
    // const accId = accountRes[0]._id;
    // const transactions: Transaction[] = [
    //   {
    //     accountId: new Types.ObjectId(accId),
    //     credit: 100,
    //     debit: 0,
    //     balance: 100,
    //     date: new Date("November 25, 2021 03:24:00"),
    //     description: "Initial deposit",
    //   },
    //   {
    //     accountId: new Types.ObjectId(accId),
    //     credit: 0,
    //     debit: 50,
    //     balance: 50,
    //     date: new Date("November 26, 2021 07:05:00"),
    //     description: "ATM withdrawl",
    //   },
    //   {
    //     accountId: new Types.ObjectId(accId),
    //     credit: 0,
    //     debit: 50,
    //     balance: 0,
    //     date: new Date("November 27, 2021 09:47:00"),
    //     description: "Purchase at: Grocery store",
    //   },
    //   {
    //     accountId: new Types.ObjectId(accId),
    //     credit: 100,
    //     debit: 0,
    //     balance: 100,
    //     date: new Date("November 27, 2021 18:33:00"),
    //     description: "Deposit at ATM",
    //   },
    // ];

    // await this.transactionModel.insertMany(transactions.reverse());
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.HASH_SALT_ROUNDS);
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user)
      throw new HttpException("user does not exist", HttpStatus.BAD_REQUEST);

    const passwordIsCorrect: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordIsCorrect)
      throw new HttpException("invalid password", HttpStatus.UNAUTHORIZED);

    return this.jwtService.sign({ id: user._id });
  }
}
