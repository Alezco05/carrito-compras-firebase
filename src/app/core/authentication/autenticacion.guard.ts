import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionGuard implements CanLoad {
  constructor(private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const urlRespuesta = segments.reduce(
      (path, currentSegment) => `${path}/${currentSegment.path}`,
      ''
    );
    return localStorage.getItem('user')
      ? true
      : urlRespuesta === ''
      ? this.router.navigate(['/auth/login'])
      : this.router.navigate(['/auth/login'], { queryParams: { urlRespuesta } });
  }
}
