import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Query,
  Logger,
} from '@nestjs/common';
import { OkxApiService } from './okx-api.service';
// @Public()
@Controller('okx-api')
// @UseFilters(OkExceptionFilter)
export class OkxApiController {
  constructor(private readonly okxApiService: OkxApiService) { }
}
