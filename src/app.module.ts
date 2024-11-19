import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OkxApiModule } from './okx-api/okx-api.module';

@Module({
  imports: [OkxApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
