import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLangSlideToggled = false;

  constructor() { }

  ngOnInit(): void {
  }

  GetLangName(): string {
    let result = 'EN';
    if (this.isLangSlideToggled)
      result = 'RU';
    return result;
  }

}
