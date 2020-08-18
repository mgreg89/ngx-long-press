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
    private touchstartCoordX;
    private touchstartCoordY;
    private validDelta;
    ngOnInit(): void;
    ngOnDestroy(): void;
    interval$(): Observable<number>;
    onMouseUp(event: MouseEvent): void;
    onMouseDown(event: MouseEvent): void;
    onTouchEnd(event: any): void;
    onTouchStart(event: any): void;
}
