import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Observable, Subject, interval } from 'rxjs';
import { map, takeUntil, filter, switchAll, combineLatest, repeat } from 'rxjs/operators';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/repeat';

@Directive({
    selector: '[longPress]'
})
export class LongPressDirective {
    @Input() public longPress: number = 500;
    @Output() public onRelease: EventEmitter<MouseEvent> = new EventEmitter();

    public mouseups$ = new Subject();
    public mousedowns$ = new Subject();
    public destroys$ = new Subject();
	private touchstartCoordX;
	private touchstartCoordY;
	private validDelta = 10;

    public ngOnInit(): void {
        const interval$ = this.interval$().pipe(takeUntil(this.mouseups$)).pipe(combineLatest(this.mouseups$));

        this.mousedowns$
            .asObservable().pipe(map(() => interval$))
            .pipe(switchAll())
            .pipe(repeat())
            .pipe(map(items => items[1]))
            .pipe(takeUntil(this.destroys$))
            .subscribe((event: MouseEvent) => {
                this.onRelease.emit(event);
            });
    }

    public ngOnDestroy(): void {
        this.destroys$.next();
        this.destroys$.unsubscribe();
    }

    public interval$(): Observable<number> {
        return interval()
            .pipe(map(i => i * 10))
            .pipe(filter(i => i > this.longPress));
    }

    @HostListener('mouseup', ['$event'])
    public onMouseUp(event: MouseEvent): void {
        this.mouseups$.next(event);
    }

    @HostListener('mousedown', ['$event']) 
    public onMouseDown(event: MouseEvent): void {
        this.mousedowns$.next(event);
    }

    @HostListener('touchend', ['$event'])
    public onTouchEnd(event: TouchEvent): void {
		if(this.touchstartCoordX && this.touchstartCoordY && event && event.changedTouches && event.changedTouches[0]){
			if((this.touchstartCoordX - event.changedTouches[0].clientX) * 2 <= this.validDelta * 2
			&& (this.touchstartCoordY - event.changedTouches[0].clientY) * 2 <= this.validDelta * 2){
				this.mouseups$.next(event);
			} else {
				this.destroys$.next();
			}
		}
    }
  
    @HostListener('touchstart', ['$event'])
    public onTouchStart(event: TouchEvent): void {
		if (event && event.touches && event.touches[0]){
			this.touchstartCoordX = event.touches[0].clientX;
			this.touchstartCoordY = event.touches[0].clientY;
			this.mousedowns$.next(event);
		}
    }
}