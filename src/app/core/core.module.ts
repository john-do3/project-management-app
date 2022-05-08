import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
// import { BoardModule } from '../board/board.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    EditProfileComponent,
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
