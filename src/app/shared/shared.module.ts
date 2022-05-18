import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { GravatarModule } from 'ngx-gravatar';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalComponent } from './pages/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    GravatarModule,
    TranslateModule,
  ],
  exports: [
    DragDropModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    ConfirmModalComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    TranslateModule,
  ],
})
export class SharedModule {}
