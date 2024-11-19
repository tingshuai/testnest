import { Module, Logger } from '@nestjs/common';
// import { OkxApiService } from './okx-api.service';
import { OkxApiController } from './okx-api.controller';
import { OkxSocketService } from './okx-socket.service';
// import { myLoggerService } from 'src/logger/logger.service';
// import { MailService } from 'src/mail/mail.service';

@Module({
  // controllers: [OkxApiController],
  providers: [OkxSocketService],
  exports: []
})
export class OkxApiModule { }
