import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';


@Module({
  imports:[SubscriptionModule],
  providers: [TelegramService],
  
  // controllers:[]
})
export class TelegramModule {}
