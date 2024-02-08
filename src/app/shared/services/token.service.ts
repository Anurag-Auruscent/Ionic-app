// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {

//   private token: string = '';
//   constructor() { }

//   setToken(token: string): void {
//     this.token = token;
//   }

//   getToken(): string {
//     return this.token;
//   }
// }

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private storage: Storage) {
    this.init()
  }

  private async init(): Promise<void> {
    const storage = await this.storage.create();
    // You can perform additional initialization here if needed
  }

  async setToken(token: string): Promise<void> {
    try {
      await this.storage.set(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token in storage', error);
    }
  }

  async getToken(): Promise<string> {
    try {
      const tokenKey = await this.storage.get(this.TOKEN_KEY) || '';
      return tokenKey;
    } catch (error) {
      console.error('Error getting token from storage', error);
      return '';
    }
  }

  async clearToken(): Promise<void> {
    try {
      await this.storage.remove(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing token from storage', error);
    }
  }
}
