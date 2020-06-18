import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/repeat';
export declare class LongPressDirective {
    longPress: number;
    onRelease: EventEmitter<MouseEvent>;
    mouseups$: Subject<{}>;
    mousedowns$: Subject<{}>;
    destroys$: Subject<{}>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    interval$(): Observable<number>;
    onScroll(event: any): void;
    onMouseUp(event: MouseEvent): void;
    onMouseDown(event: MouseEvent): void;
    onTouchEnd(event: TouchEvent): void;
    onTouchStart(event: TouchEvent): void;
}
