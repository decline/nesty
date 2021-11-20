import { AuthApiModule } from '@angular-nest/auth/api';
import { UserApiModule } from '@angular-nest/user/api';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    AuthApiModule,
    UserApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
