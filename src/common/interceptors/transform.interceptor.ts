import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  /**
   * The intercept function takes in a context and a next parameter. The context parameter is an object
   * that contains information about the current request. The next parameter is a function that calls
   * the next middleware in the chain
   * @param {ExecutionContext} context - ExecutionContext - The context of the request.
   * @param {CallHandler} next - CallHandler - The next interceptor in the chain.
   * @returns The data is being returned.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => ({ data })));
  }
}
