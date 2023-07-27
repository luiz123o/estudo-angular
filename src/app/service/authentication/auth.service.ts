import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from 'src/app/model/signInData';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  private tokenService = inject(TokenService);

  constructor(private router: Router) {}

  async authenticate(signInData: SignInData): Promise<boolean> {
    const isAuthenticated = await this.checkCredentials(signInData);

    if (isAuthenticated) {
      this.isAuthenticated = true;
      this.router.navigate(['home']);
    } else {
      console.log('Authentication failed');
      this.isAuthenticated = false;
    }

    return this.isAuthenticated;
  }

  private async checkCredentials(signInData: SignInData): Promise<boolean> {
    try {
      const data = {
        username: signInData.getEmail(),
        password: signInData.getPassword(),
      };

      const payload = JSON.stringify(data);

      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        this.tokenService.saveToken(json.token);
        return true;
      } else {
        console.log('Authentication failed');
        return false;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return false;
    }
  }
  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
    this.tokenService.clearToken();
  }

  isLoggedIn() {
    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
