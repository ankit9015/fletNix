import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-error',
    templateUrl: './form-error.component.html',
    styleUrl: './form-error.component.scss',
    standalone: true,
    imports: [],
})
export class FormErrorComponent {
    @Input() ctrl: any;
    @Input() error_message: string = '';
}
