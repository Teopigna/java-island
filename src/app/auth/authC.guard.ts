import { CardService } from 'src/app/services/card-manage.service';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuardC implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router, private cardService: CardService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1), //Prende solo un utente e poi fa unsubcribe
            map(
                user => {
                    const isAuth = !!user;
                    if(isAuth){
                        if(user.role == "C"){
                            return true;
                        }
                    }
                    return this.router.createUrlTree(['/error']);
                }
            )
        )
    }
}