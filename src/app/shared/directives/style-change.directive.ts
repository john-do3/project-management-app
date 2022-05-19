import {
 Directive, ElementRef, Input, OnChanges, Renderer2,
} from '@angular/core';

enum ElementColor {
  default = '',
  onScroll = 'red',
}

@Directive({
  selector: '[appStyleChange]',
})
export class StyleChangeDirective implements OnChanges {
  @Input('appStyleChange') isValid?: boolean;

  private elementBackgroundColor: ElementColor = ElementColor.default;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
  }

  ngOnChanges(): void {
    this.changeBackgroundColor(this.isValid);
  }

  private changeBackgroundColor(isValid?: boolean) {
    this.elementBackgroundColor = isValid ? ElementColor.onScroll : ElementColor.default;
    this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', this.elementBackgroundColor);
  }
}
