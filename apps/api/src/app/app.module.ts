import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { NestUsersModule } from '@angular-nest/nest/users';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...(await getConnectionOptions()),
        entities: [],
        migrations: [],
        autoLoadEntities: true,
      }),
    }),
    NestUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
