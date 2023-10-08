import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  Subscriber } from './schema/subscription.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel:Model<Subscriber>,
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

  async unsubscribe(chatId: number): Promise<string> {
    try {
      await this.subscriberModel.deleteOne({ _id: chatId });
      return `${chatId} has been unsubscribed.`;
    } catch (error) {
      console.log(error);
    }
  }
}
