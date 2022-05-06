import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { loginRoute, mainRoute } from './project.constants';
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

const routes: Routes = [
  { path: loginRoute, loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: mainRoute, canActivate: [LoggedInGuard], loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  { path: '', redirectTo: loginRoute, pathMatch: 'full' },
  { path: 'task', component: BoardComponent }, // to delete
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      boards: boardReducer,
      columns: columnReducer,
      tasks: taskReducer,
      users: userReducer,
    }, {}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([BoardEffects, UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
