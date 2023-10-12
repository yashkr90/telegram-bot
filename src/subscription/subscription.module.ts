import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscriber, SubscriberSchema } from './schema/subscription.schema';
import { UserSchema } from './schema/user.schema';

@Module({
    imports:[MongooseModule.forFeature([{name:'Subscriber', schema:SubscriberSchema},{name:'User', schema:UserSchema}])],
    controllers:[SubscriptionController],
    providers:[SubscriptionService],
    exports:[SubscriptionService]
})
export class SubscriptionModule {}
