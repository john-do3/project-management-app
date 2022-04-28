import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { loginRoute } from 'src/app/project.constants';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.userService.checkIsLoggedIn()) {
            return true;
        }

        this.router.navigateByUrl(loginRoute);
        return false;
    }
}
