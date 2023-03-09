import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  baseUrl: string = 'https://localhost:7115/api/account';
  token: string | null;
  headers: HttpHeaders;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private router: Router) {
    this.token = localStorage.getItem('token_value');
    this.headers = new HttpHeaders().set('Authorization', '{Bearer ' + this.token + '}');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  register(user: any){
    return this.http.post(this.baseUrl + '/register', user);
  }

  login(user: any){
    return this.http.post(this.baseUrl + '/login', user);
  }

  public getUserName(): string{
    return localStorage.getItem('userName')!;
  }

  public isAuthenticated(): boolean{
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  public getRole(): string {
    const decodedToken = this.jwtHelper.decodeToken(this.token!);
    return decodedToken.role;
  }

  logout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('token_value');
    this.router.navigate(['/']).then(() => { window.location.reload() });
  }
}
