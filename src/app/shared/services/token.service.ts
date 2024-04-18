import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private storageService: StorageService) { }

  async setToken(token: string): Promise<void> {
    await this.storageService.setItem(this.TOKEN_KEY, token);
  }

  async getToken(): Promise<string | null> {
    return await this.storageService.getItem<string>(this.TOKEN_KEY);
  }

  async clearToken(): Promise<void> {
    await this.storageService.removeItem(this.TOKEN_KEY);
  }
}
