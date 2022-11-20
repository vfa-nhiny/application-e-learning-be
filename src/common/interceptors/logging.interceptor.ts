import { Injectable, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { CallHandler } from "@nestjs/common";

@Injectable()

/* "The LoggingInterceptor class implements the NestInterceptor interface and intercepts the request
and response of the application."

The intercept() method is the only method that is required to be implemented by the NestInterceptor
interface. The intercept() method takes two parameters:

context: ExecutionContext - An object that contains information about the current execution context.
next: CallHandler - An object that contains the next handler in the chain.
The intercept() method returns an Observable<any> object */
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(); //console.log(`After... ${Date.now() - now}ms`)
  }
}
