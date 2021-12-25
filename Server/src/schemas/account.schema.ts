import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, ObjectId, Types } from "mongoose";

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' , required: true })
    userID: Types.ObjectId;

    @Prop({ required: true })
    accountNo: Number;

    @Prop({ required: true })
    balance: 100;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
