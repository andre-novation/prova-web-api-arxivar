import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './app/auth/service/auth.service';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token = inject(AuthService).getAccessToken();
  if (!token) return next(req);

  const cloneReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(cloneReq);
}
