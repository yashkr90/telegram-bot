import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subscriber extends Document {
  @Prop()
  _id: Number;
  
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  lastUpdated: Date;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
