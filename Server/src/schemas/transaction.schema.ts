import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes, Types } from "mongoose";
import { Account } from "../schemas/account.schema"

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Account', required: true })
    accountId: Types.ObjectId

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    debit: number;

    @Prop({ required: true })
    credit: number;

    @Prop({ required: true })
    balance: number;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);