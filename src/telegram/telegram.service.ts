const TelegramBot = require('node-telegram-bot-api');
import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { getWeather } from './weather/weather';
import { Cron } from '@nestjs/schedule';



@Injectable()
export class TelegramService {
  @Inject(SubscriptionService)
  private subscriptionService: SubscriptionService;

  private readonly bot: any;
  constructor() {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
    this.registerCommandHandlers();
  }
  private registerCommandHandlers() {
    this.bot.onText(/\/start/, (msg: any) => {
      const chatId = msg.chat.id;
      console.log(msg);

      const message =
        'Welcome to the weather update bot! Type /subscribe to receive daily weather updates.';
      this.bot.sendMessage(chatId, message);
    });

    // Handle /subscribe command
    this.bot.onText(/\/subscribe/, (msg: any) => {
      const chatId = msg.chat.id;
      this.subscriptionService.subscribe(chatId, 'India');
      this.bot.sendMessage(
        chatId,
        'You have subscribed to daily weather updates. Please Enter your city as "city=Your city name"',
      );
      this.bot.sendMessage(
        chatId,
        'To get update of any city just say city name.',
      );
    });

    this.bot.on('message', async (msg) => {
      console.log('inside ');

      const chatId = msg.chat.id;
      console.log('chatid is', chatId);

      const message = msg.text.toLowerCase();

      let isCityAvilable = false;
      console.log(message);

      // setting location
      if (message.startsWith('city=')) {
        isCityAvilable = true;
        var city = 'Patna';

        city = message.substring(5, message.length);

        const res = await getWeather(city);

        if (res.status === 200) {
          this.subscriptionService.updateCity(chatId, city);
          this.bot.sendMessage(
            chatId,
            `Your city has been updated to ${city}.`,
          );
          this.bot.sendMessage(chatId, res.data);
        } else {
          this.bot.sendMessage(chatId, `City not found.`);
        }

        // fetching weather of other locations
      } else if (
        message != '/subscribe' &&
        message != '/start' &&
        message != '/unsubscribe'
      ) {
        console.log('inside else');
        this.bot.sendMessage(
          chatId,
          `Please enter city name as city=Your city name`,
        );

      }


      if (message === '/unsubscribe') {
        this.subscriptionService.unsubscribe(chatId);
        this.bot.sendMessage(
          chatId,
          'You have unsubscribed from daily weather updates.',
        );
      }
    });


  }

  @Cron('0 8 * * *') // Schedule the function to run at 8 AM every day
  async sendDailyWeatherUpdates() {
    const subscribers = await this.subscriptionService.getAllSubscribers();
    for (const subscriber of subscribers) {
      const subscriberId = subscriber._id;
      const subscriberCity = subscriber.city;
      const report = await getWeather(subscriberCity);
      // const report = await this.weatherService.getWeather(subscriberCity);
      this.bot.sendMessage(subscriberId, report);
    }
  }
}
