import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  authCheck() {
    return 'You are authenticated!';
  }

}
