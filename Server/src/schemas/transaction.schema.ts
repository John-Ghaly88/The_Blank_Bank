import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes, Types } from "mongoose";
import { Account } from "../schemas/account.schema";
import * as mongoose from "mongoose";

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  })
  accountId: Types.ObjectId;

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
