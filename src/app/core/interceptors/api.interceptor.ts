import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private userService: UserService){}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(this.addApiKey(request));
    }

    addApiKey(request: HttpRequest<any>) {
        const token = this.userService.token ? this.userService.token : '';
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
