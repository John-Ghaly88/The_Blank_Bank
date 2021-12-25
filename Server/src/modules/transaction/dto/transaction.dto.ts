import { ObjectId } from "mongoose";
import { Transaction } from "src/schemas/transaction.schema";

export class TransactionResponseDto {

    constructor(trans: Transaction){
        Object.assign(this, trans)
    }

    accountId: ObjectId;
    date: Date;
    description: string;
    debit: number;
    credit: number;
    balance: number;
}