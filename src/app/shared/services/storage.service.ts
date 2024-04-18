// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
// import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
// import { Drivers } from '@ionic/storage';

// @Injectable({
//   providedIn: 'root',
// })
// export class StorageService {
//   constructor(private storage: Storage) {
//     this.init()

//   }

//   private async init(): Promise<void> {
//     try {
//       this.storage = await this.storage.create();
//       // You can perform additional initialization here if needed
//       // this.storage = new Storage({
//       //   driverOrder: [cordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
//       // });
//       // await this.storage.defineDriver(cordovaSQLiteDriver);
//     } catch (error) {
//       console.error('Error initializing storage:', error);
//     }
//   }

//   async setItem(key: string, value: any): Promise<void> {
//     try {
//       await this.storage.set(key, value);
//     } catch (error) {
//       console.error(`Error setting item "${key}" in storage:`, error);
//     }
//   }

//   async getItem<T>(key: string): Promise<T | null> {
//     try {
//       const item = await this.storage.get(key);
//       return item !== null ? (item as T) : null;
//     } catch (error) {
//       console.error(`Error getting item "${key}" from storage:`, error);
//       return null;
//     }
//   }

//   async removeItem(key: string): Promise<void> {
//     try {
//       await this.storage.remove(key);
//     } catch (error) {
//       console.error(`Error removing item "${key}" from storage:`, error);
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // private storage!: Storage
  constructor(private storage: Storage) {
    this.init()

  }

  private async init(): Promise<void> {
    try {
      // You can perform additional initialization here if needed
      // const store = new Storage({
      //   driverOrder: [cordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
      // });
      if (Capacitor.isNativePlatform()) {
        await this.storage.create();
        await this.storage.defineDriver(cordovaSQLiteDriver);
        console.log("Inside if from storage");
      }
      this.storage = await this.storage.create();
      console.log(this.storage.driver);
      console.log(this.storage);
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
