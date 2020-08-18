var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
        this.validDelta = 10;
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
            event.preventDefault();
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
        if (this.touchstartCoordX && this.touchstartCoordY && event && event.changedTouches && event.changedTouches[0]) {
            if (Math.abs(this.touchstartCoordX - event.changedTouches[0].clientX) <= this.validDelta
                && Math.abs(this.touchstartCoordY - event.changedTouches[0].clientY) <= this.validDelta) {
                this.mouseups$.next(event);
            }
            else {
                this.destroys$.next();
            }
        }
    };
    LongPressDirective.prototype.onTouchStart = function (event) {
        if (event && event.touches && event.touches[0]) {
            this.touchstartCoordX = event.touches[0].clientX;
            this.touchstartCoordY = event.touches[0].clientY;
            this.mousedowns$.next(event);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LongPressDirective.prototype, "longPress", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LongPressDirective.prototype, "onRelease", void 0);
    __decorate([
        HostListener('mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onMouseUp", null);
    __decorate([
        HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onMouseDown", null);
    __decorate([
        HostListener('touchend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [TouchEvent]),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onTouchEnd", null);
    __decorate([
        HostListener('touchstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [TouchEvent]),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onTouchStart", null);
    LongPressDirective = __decorate([
        Directive({
            selector: '[longPress]'
        })
    ], LongPressDirective);
    return LongPressDirective;
}());
export { LongPressDirective };
//# sourceMappingURL=long-press.directive.js.map