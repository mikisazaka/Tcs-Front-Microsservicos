import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');

  const isApiUrl = environment.backendApiUrl.some(url => req.url.startsWith(url));

  if (token && isApiUrl) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};