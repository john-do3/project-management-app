import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { SharedModule } from '../shared/shared.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    EditProfileComponent,
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  providers: [LoggedInGuard, FormBuilder],
})
export class CoreModule {}
