import { Injectable } from '@nestjs/common';
import { Message } from '@angular-nest/api-interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  getData(): Observable<Message> {
    return of({ message: 'Welcome to api!' }).pipe(
      map((data) => ({ ...data, message: data.message.toLowerCase() }))
    );
  }
}
