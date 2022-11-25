import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.SERVER_URL;

	constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    createNewUser(user: User): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'auth/signin', user);
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'auth/sign-in', { username, password }).pipe(
            tap(r => this.setSession(r.result))
        );
    }

    getUserToken(): any {
        const token = this.getCurrentSession();
        if (!token) return null;
        const payload: any = jwt_decode(token.id_token);
        const username: string = payload['username'];
        const publicKeyBase64: string = payload['publicKeyBase64'];
        const privateKeyBase64: string = payload['privateKeyBase64'];
        // const email: string = payload['email'];
        if (!username || !publicKeyBase64 || !privateKeyBase64) {
          return null;
        }
        const userToken: any = {
          username: username,
          publicKeyBase64: publicKeyBase64,
          privateKeyBase64: privateKeyBase64,
        }
        return userToken;
      }

      setSession(cognito: any): void {
        console.log(cognito);
        try {
          localStorage.setItem(environment.SESSION_NAME, JSON.stringify(cognito));
        } catch (e) {
        //   this.dialog.error(e);
        }
    
      }
    
      getCurrentSession(): any {
        const session = localStorage.getItem(environment.SESSION_NAME);
        if (session === '[object Object]') {
          this.deleteCurrentSession();
          return;
        }
        if (session) {
          try {
            return JSON.parse(session);
          } catch (e) {
            return null;
          }
        }
      }
    
      deleteCurrentSession(): void {
        if (localStorage.getItem(environment.SESSION_NAME)) {
          localStorage.removeItem(environment.SESSION_NAME);
        }
      }
    
      logout(): void {
        this.deleteCurrentSession(); // call this function after all of api called
        this.router.navigate(['/login']);
      }
    
    

}
