import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { loginRoute, mainRoute } from './project.constants';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: loginRoute, loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: mainRoute, /*canActivate: [LoggedInGuard]*/ loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  { path: '', redirectTo: loginRoute, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
