import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  
  
  @Prop({ required: true })
  email: string;

  @Prop()
  displayName: string;

  @Prop({ default: 'your_default_api_key_here' }) // Add your default API key
  apikey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);