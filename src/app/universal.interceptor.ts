import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject('serverUrl') protected serverUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const url = req.url.startsWith('.') ? req.url.slice(1) : req.url;
    const serverReq = !this.serverUrl ? req : req.clone({
      url: `${this.serverUrl}${url}`
    });

    return next.handle(serverReq);

  }

}
