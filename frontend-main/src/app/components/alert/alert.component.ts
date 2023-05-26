/**
 * @author Lars Brinker
 */
import { Component, Input } from '@angular/core';

export enum classType {
    success,
    error,
    info,
    warning,
}

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    public isVisible: boolean = true;

    @Input()
    public alertType?: classType;
    @Input()
    public message?: string;

    public cssClass() {
        const alertClass = {
            [classType.success]: 'alert-success',
            [classType.error]: 'alert-error',
            [classType.info]: 'alert-info',
            [classType.warning]: 'alert-warning',
        };
        if (!(this.alertType == null) && !(this.message == '')) {
            return alertClass[this.alertType];
        } else {
            this.message = 'Alert type and message must not be empty!';
            console.error(this.message);
            return alertClass[1];
        }
    }
}
