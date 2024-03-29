import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { loginRoute, mainRoute, welcomeRoute } from './project.constants';
import { SharedModule } from './shared/shared.module';
import { UserService } from './core/services/user.service';
import { boardReducer } from './redux/reducers/board.reducer';
import { columnReducer } from './redux/reducers/column.reducer';
import { taskReducer } from './redux/reducers/task.reducer';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { BoardComponent } from './board/pages/board/board.component';
import { environment } from '../environments/environment';
import { BoardEffects } from './redux/effects/board.effects';
import { UserEffects } from './redux/effects/user.effects';
import { userReducer } from './redux/reducers/user.reducer';
import { ColumnEffects } from './redux/effects/column.effects';
import { TaskEffects } from './redux/effects/task.effects';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';
import { currentUserReducer } from './redux/reducers/currentUser.reducer';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routes: Routes = [
  {
    path: loginRoute,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: mainRoute,
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: welcomeRoute, pathMatch: 'full' },
  { path: 'task', component: BoardComponent }, // to delete
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: localStorage.getItem('lang') as string | 'en',
    }),
    StoreModule.forRoot(
      {
        boards: boardReducer,
        columns: columnReducer,
        tasks: taskReducer,
        users: userReducer,
        currentUser: currentUserReducer,
      },
      {},
    ),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
      BoardEffects,
      UserEffects,
      ColumnEffects,
      TaskEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
