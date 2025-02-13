import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Show } from '../../models/Show';
import { ShowService } from '../../services/shows.service';

@Component({
    selector: 'app-show-detail',
    templateUrl: './show-detail.component.html',
    styleUrls: ['./show-detail.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class ShowDetailComponent implements OnInit {
    show: Show;
    loading = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private showService: ShowService,
    ) {}

    ngOnInit() {
        const showId = this.route.snapshot.paramMap.get('showId');
        if (showId) {
            this.getShow(showId);
        } else {
            this.router.navigateByUrl('/');
        }
    }

    getShow(id: string) {
        this.loading = true;
        this.showService.getShow(id).subscribe({
            next: (show) => {
                this.show = show;
            },
            error: (error) => {
                this.router.navigateByUrl('/');
            },
            complete: () => {
                this.loading = false;
            },
        });
    }
}
