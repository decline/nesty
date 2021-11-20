import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UserApiModule } from '@angular-nest/user/api';

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
    UserApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
