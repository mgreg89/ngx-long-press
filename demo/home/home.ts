import {Component} from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: ['./home.scss'],
    templateUrl: './home.html'
})
export class Home {
    public onLongPress() {
        alert("You long-pressed!");
    }

    public onVeryLongPress() {
        alert("You long-pressed for 2 seconds!");
    }

    public onLongPressDiv(){
        alert("You long-pressed a div!");
    }
}
