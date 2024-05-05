import {
  NestInterceptor,
  CallHandler,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}
  async intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    console.log('interceptor');
    console.log(request.currentUser);
    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
      console.log('interceptor');
      console.log(request.currentUser);
    }
    return handler.handle();
  }
}
