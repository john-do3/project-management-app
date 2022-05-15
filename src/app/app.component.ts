import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  title = 'pm-app';
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}
