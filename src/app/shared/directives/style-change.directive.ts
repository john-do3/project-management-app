import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
enum color {
  default = '',
  onScroll= 'red',
}

@Directive({
  selector: '[appStyleChange]'
})
export class StyleChangeDirective {
  @Input('appStyleChange') isValid?: boolean

  private elementBackgroundColor: color = color.default;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  private changeBackgroundColor(isValid?: boolean) {
    this.elementBackgroundColor = isValid ? color.onScroll : color.default;
    this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', this.elementBackgroundColor);
  }
}
