import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramController } from './telegram/telegram.controller';
import { TelegramModule } from './telegram/telegram.module';
import { SubscriptionController } from './subscription/subscription.controller';
import { SubscriptionService } from './subscription/subscription.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionModule } from './subscription/subscription.module';
// import 'dotenv/config';

console.log(process.env.MONGO_URL);


@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env',
      
    }),
    // MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://127.0.0.1:27017/telegrambot', // Use the environment variable
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    SubscriptionModule,
    TelegramModule,
  ],
  controllers: [
    AppController,
    TelegramController,
    // SubscriptionController
  ],
  providers: [
    AppService,
    // SubscriptionService
  ],
})
export class AppModule {}
