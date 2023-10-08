import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscriber } from './schema/subscription.schema';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async getAllSubscribers(): Promise<Subscriber[]> {
    return this.subscriptionService.getAllSubscribers();
  }

  @Get(':id')
  async getSubscriberById(@Param('id') id: number): Promise<Subscriber | null> {
    return this.subscriptionService.getOneSubscriber(id);
  }

  @Post('subscribe')
  async subscribe(@Body() body): Promise<string> {
    const { chatId, location } = body;
    if (chatId > 0) {
      return this.subscriptionService.subscribe(chatId, location);
    } else {
      return 'Invalid Id, user not inserted';
    }
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() body): Promise<string> {
    const { chatId } = body;
    return this.subscriptionService.unsubscribe(chatId);
  }

  @Put(':id')
  async updateCity(@Param('id') id: number, @Body() body): Promise<string> {
    const { chatId, location } = body;
    return this.subscriptionService.updateCity(chatId, location);
  }
}
