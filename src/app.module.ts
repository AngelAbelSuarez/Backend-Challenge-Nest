import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ClientsDragonBallZModule} from './ClientsDragonBallZ/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    ClientsDragonBallZModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }