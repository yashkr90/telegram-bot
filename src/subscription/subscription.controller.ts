import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscriber } from './schema/subscription.schema';
import { Response } from 'express';

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
  async unsubscribe(@Body() body, @Res() res: Response): Promise<any> {
    const { chatId } = body;
    const result = this.subscriptionService.unsubscribe(chatId);

    if (result) {
      // Unsubscribe was successful
      res.status(200).json({ message: `${chatId} has been unsubscribed.` });
    } else {
      // Unsubscribe failed, you can set an appropriate status code and message
      res.status(400).json({ message: `Failed to unsubscribe ${chatId}.` });
    }
  }

  @Post('setUser')
  async setUser(@Body() body): Promise<any> {

    // const {userdata}= body;
    console.log(body);
    
    const userdata={email:body.email,displayName:body.given_name}

    console.log("user", userdata);
    
    return this.subscriptionService.setuser(userdata);
  }

  @Post('setApi')
  async setApi(@Body() body):Promise<string>{

   
   console.log(body);
   
    const {api,email}=body;
    console.log(api);
    
    this.subscriptionService.setApi(api,email);
    return "successfully updated api"
  }


  @Put(':id')
  async updateCity(@Param('id') id: number, @Body() body): Promise<string> {
    const { chatId, location } = body;
    return this.subscriptionService.updateCity(chatId, location);
  }
}
