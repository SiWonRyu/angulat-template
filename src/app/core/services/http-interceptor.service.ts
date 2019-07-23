import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class HttpInterCeptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any> = req.clone();

    /**
     * ! 실제 서비스 에서는 Session Storage 가 아닌 cookie 서비스를 구성하여 토큰을 가져오자.
     */

    /**
     * 예제 템플릿의 실행을 위해 주석 처리 해둔다.
     */
    // if (!!window.sessionStorage.getItem('template-authed')) {
    //   request = req.clone({
    //     setHeaders: {
    //       'Authorization' : `Bearer ${window.sessionStorage.getItem('template-authed')}`
    //     }
    //   });
    // }
    return next.handle(request).pipe(
              catchError(error => {
                 alert(error.error.error.message);
                return throwError(error);
              })
           )
  }
}