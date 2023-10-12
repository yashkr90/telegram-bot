import { Module,OnModuleInit  } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';


@Module({
  imports:[SubscriptionModule],
  providers: [TelegramService],
  
  // controllers:[]
})
export class TelegramModule implements OnModuleInit {

  constructor(private readonly telegramService: TelegramService) {}

  onModuleInit() {
    this.telegramService.sendDailyWeatherUpdates();
  }
}
