import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-error',
    imports: [],
    templateUrl: './form-error.component.html',
    styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
    @Input() ctrl: any;
    @Input() error_message: string = '';
}
