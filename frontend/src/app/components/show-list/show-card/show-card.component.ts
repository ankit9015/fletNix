import { Component, Input } from '@angular/core';
import { Show } from '../../../models/Show';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-show-card',
    templateUrl: './show-card.component.html',
    styleUrl: './show-card.component.scss',
    imports: [CommonModule, RouterModule],
})
export class ShowCardComponent {
    @Input() show: Show;
}
