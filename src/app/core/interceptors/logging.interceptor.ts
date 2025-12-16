import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // log de request
  console.log('[HTTP] Request', req.method, req.urlWithParams);

  return next(req).pipe(
    tap({
      next: () => console.log('[HTTP] Response', req.method, req.urlWithParams),
      error: () => console.log('[HTTP] Error', req.method, req.urlWithParams),
    })
  );
};
