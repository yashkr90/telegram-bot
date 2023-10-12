import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber } from './schema/subscription.schema';
import mongoose, { Model } from 'mongoose';
import { Response } from 'express';
import { User } from './schema/user.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: Model<Subscriber>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async subscribe(chatId: number, city: string): Promise<string> {
    const newSubscriber = new this.subscriberModel({
      _id: chatId,
      city,
      lastUpdated: new Date(),
    });

    try {
      await newSubscriber.save();
      return `${chatId} has been subscribed.`;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCity(chatId: number, city: string): Promise<string> {
    try {
      await this.subscriberModel.updateOne(
        { _id: chatId },
        { city, lastUpdated: new Date() },
      );
      return `City updated successfully to ${city}.`;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    try {
      return this.subscriberModel.find({}).exec();
    } catch (error) {
      console.log(error);
    }
  }

  async getOneSubscriber(chatId: number): Promise<Subscriber | null> {
    try {
      return this.subscriberModel.findOne({ _id: chatId }).exec();
    } catch (error) {
      console.log(error);
    }
  }

  async unsubscribe(chatId: number): Promise<any> {
    try {
      return await this.subscriberModel.deleteOne({ _id: chatId });
    } catch (error) {
      console.log(error);
    }
  }

  async setuser(userdata: any): Promise<any> {
    console.log(userdata);
    
    const newuser = new this.userModel({
      email: userdata.email,
      displayName: userdata.given_name,
    });

    try {
      await newuser.save();
      return newuser;
    } catch (error) {
      console.log(error);
      return 'user not created'
    }
  }
  async setApi(api: string, email: any) {
    try {
      await this.userModel.updateOne({ email:email }, { apikey: api });
      return '200';
    } catch (error) {
      console.log(error);
    }
  }
  
}
