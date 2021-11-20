import { Controller, Get, Param } from '@nestjs/common';
import { Message } from '@angular-nest/api-interfaces';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  private data = 1;

  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Observable<Message> {
    console.log('data', this.data);
    this.data++;
    return this.appService.getData();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
