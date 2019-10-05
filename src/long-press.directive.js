import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { map, takeUntil, filter, switchAll, combineLatest, repeat } from 'rxjs/operators';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/repeat';
var LongPressDirective = (function () {
    function LongPressDirective() {
        this.longPress = 500;
        this.onRelease = new EventEmitter();
        this.mouseups$ = new Subject();
        this.mousedowns$ = new Subject();
        this.destroys$ = new Subject();
    }
    LongPressDirective.prototype.ngOnInit = function () {
        var _this = this;
        var interval$ = this.interval$().pipe(takeUntil(this.mouseups$)).pipe(combineLatest(this.mouseups$));
        this.mousedowns$
            .asObservable().pipe(map(function () { return interval$; }))
            .pipe(switchAll())
            .pipe(repeat())
            .pipe(map(function (items) { return items[1]; }))
            .pipe(takeUntil(this.destroys$))
            .subscribe(function (event) {
            _this.onRelease.emit(event);
        });
    };
    LongPressDirective.prototype.ngOnDestroy = function () {
        this.destroys$.next();
        this.destroys$.unsubscribe();
    };
    LongPressDirective.prototype.interval$ = function () {
        var _this = this;
        return interval()
            .pipe(map(function (i) { return i * 10; }))
            .pipe(filter(function (i) { return i > _this.longPress; }));
    };
    LongPressDirective.prototype.onMouseUp = function (event) {
        this.mouseups$.next(event);
    };
    LongPressDirective.prototype.onMouseDown = function (event) {
        this.mousedowns$.next(event);
    };
    LongPressDirective.prototype.onTouchEnd = function (event) {
        this.mouseups$.next(event);
    };
    LongPressDirective.prototype.onTouchStart = function (event) {
        this.mousedowns$.next(event);
    };
    LongPressDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[longPress]'
                },] },
    ];
    LongPressDirective.propDecorators = {
        longPress: [{ type: Input }],
        onRelease: [{ type: Output }],
        onMouseUp: [{ type: HostListener, args: ['mouseup', ['$event'],] }],
        onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
        onTouchEnd: [{ type: HostListener, args: ['touchend', ['$event'],] }],
        onTouchStart: [{ type: HostListener, args: ['touchstart', ['$event'],] }]
    };
    return LongPressDirective;
}());
export { LongPressDirective };
//# sourceMappingURL=long-press.directive.js.map