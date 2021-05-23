import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CustomPreloading implements PreloadingStrategy {
    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        if (route.data && route.data.preload) {
            return fn();
        }
        return of(null);
    }
}
