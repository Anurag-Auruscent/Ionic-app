// // keycloak.service.ts
// import { Injectable } from '@angular/core';
// import { KeycloakService as KeycloakAngularService } from 'keycloak-angular';

// @Injectable({
//   providedIn: 'root',
// })
// export class KeycloakService {
//   private keycloakInstance: Keycloak.KeycloakInstance;

//   constructor(private keycloakAngularService: KeycloakAngularService) {
//     // Create a new Keycloak instance
//     this.keycloakInstance = new Keycloak();
//   }

//   init(): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         // Initialize Keycloak with options
//         await this.keycloakInstance.init({
//           onLoad: 'check-sso',
//           silentCheckSsoRedirectUri:
//             window.location.origin + '/assets/silent-check-sso.html', // Adjust the path to match your setup
//           flow: 'standard',
//           responseMode: 'query',
//         });
//         resolve();
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }

//   login(): Promise<any> {
//     return this.keycloakInstance.login({
//       idpHint: 'google',
//     });
//   }

//   logout(): Promise<any> {
//     return this.keycloakInstance.logout();
//   }

//   isLoggedIn(): boolean {
//     return this.keycloakInstance.authenticated;
//   }

//   getUserInfo(): any {
//     return this.keycloakInstance?.tokenParsed;
//   }
// }
