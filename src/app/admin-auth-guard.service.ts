import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth:AuthService,private userService:UserService) { }

  canActivate():Observable<boolean>{
    return this.auth.appUser$.map(appuser=>appuser.isAdmin)
  }
}
