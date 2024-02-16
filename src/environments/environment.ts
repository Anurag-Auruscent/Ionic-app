// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  keycloakUrl: 'http://localhost:8080/realms/angular-auth/protocol/openid-connect/token',
  clientId: 'ionic-angular-gateway',
  clientSecret: 'jLR1ZZF3XOsOxKTDt7IrA4DqA9nsoq95',
  saveLibraryToDatabaseApiUrl: 'http://localhost:9000/library/create',
  getAllLibrariesApiUrl: 'http://localhost:9000/library/get-libraries-with-weblinks',
  OneSignalAppId: '9294ab72-bf35-47cb-87dc-761e8528203a'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
