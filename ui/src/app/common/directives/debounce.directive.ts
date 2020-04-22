import {EventEmitter, ElementRef, OnInit, Directive, Input, Output} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {NgModel} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';

@Directive({
  selector: '[debounce]'
})
export class DebounceDirective implements OnInit {
  @Input() delay = 500;
  @Output() func: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, private model: NgModel) {
  }

  ngOnInit(): void {
    const eventStream = fromEvent(this.elementRef.nativeElement, 'keyup')
        .pipe(
            map(() => this.model.value),
            debounceTime(this.delay));

    eventStream.subscribe(input => this.func.emit(input));
  }

}
