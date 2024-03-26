import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init()

  }

  private async init(): Promise<void> {
    try {
      // You can perform additional initialization here if needed
      const store = new Storage({
        driverOrder: [cordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
      });
      await store.defineDriver(cordovaSQLiteDriver);
      this.storage = await store.create();
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      await this.storage.set(key, value);
    } catch (error) {
      console.error(`Error setting item "${key}" in storage:`, error);
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const item = await this.storage.get(key);
      return item !== null ? (item as T) : null;
    } catch (error) {
      console.error(`Error getting item "${key}" from storage:`, error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.remove(key);
    } catch (error) {
      console.error(`Error removing item "${key}" from storage:`, error);
    }
  }
}
