import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnInit{


  @Input('highlight') hWord: string;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    const text = this.elRef.nativeElement.innerText;
    this.elRef.nativeElement.innerHTML = text.replaceAll(this.hWord, '<span style="color: red">' + this.hWord +'</span>') 
    console.log('textt ', this.elRef.nativeElement.innerText);
  }


}
