import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { TelegramController } from './telegram/telegram.controller';
import { TelegramModule } from './telegram/telegram.module';
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
        uri: process.env.MONGO_URL, // Use the environment variable
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    SubscriptionModule,
    TelegramModule,

    PassportModule.register({ session: true }),
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
