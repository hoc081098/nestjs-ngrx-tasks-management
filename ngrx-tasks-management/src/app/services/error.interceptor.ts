import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone()).pipe(
      catchError((error) => fromPromise(this.handleError(error))),
    );
  }

  private async handleError(error: any): Promise<HttpEvent<any>> {
    console.log('[ErrorInterceptor] error: ', error);

    if (error instanceof HttpErrorResponse) {
      console.log('[ErrorInterceptor] status=', error.status, ', message=', error.message);

      if (error.status === 401) {
        this.injector.get(AuthService).removeToken();
        await this.router.navigate(['/login']);
      }
    }
    throw error;
  }
}
