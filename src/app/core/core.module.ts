import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { SharedModule } from '../shared/shared.module';
// import { BoardModule } from '../board/board.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  providers: [LoggedInGuard],
})
export class CoreModule {}
