import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'libraries',
    loadChildren: () => import('./libraries/libraries.module').then(m => m.LibrariesPageModule)
  },
  {
    path: 'library-details/:id',
    loadChildren: () => import('./library-details/library-details.module').then(m => m.LibraryDetailsPageModule)
  },
  {
    path: 'viewallnotifications',
    loadChildren: () => import('./viewallnotifications/viewallnotifications.module').then(m => m.ViewallnotificationsPageModule)
  },  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('./register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },

  // {
  //   path: 'figma-login',
  //   loadChildren: () => import('./figma-login/figma-login.module').then(m => m.FigmaLoginPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
