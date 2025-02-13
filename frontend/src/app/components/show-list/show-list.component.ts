import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShowService } from '../../services/shows.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Show } from '../../models/Show';
import { ShowTypeEnum } from '../../models/enums/ShowTypeEnum';
import { ShowCardComponent } from './show-card/show-card.component';

@Component({
    selector: 'app-show-list',
    templateUrl: './show-list.component.html',
    styleUrls: ['./show-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, FormsModule, ShowCardComponent],
})
export class ShowListComponent implements OnInit {
    ShowTypeEnum: typeof ShowTypeEnum = ShowTypeEnum;
    shows: Show[] = [];
    currentPage = 1;
    totalPages = 1;
    searchTerm = '';
    filterType: ShowTypeEnum | undefined = undefined;
    user: User | undefined = undefined;
    loading = true;
    error = '';

    constructor(
        private cdr: ChangeDetectorRef,
        private showService: ShowService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.loadShows();
        this.user = this.authService.user;
    }

    loadShows() {
        this.loading = true;
        if (this.currentPage == 1) {
            this.shows = [];
            this.totalPages = 1;
        }
        this.showService.filterShows(this.searchTerm, this.filterType, this.currentPage, 15).subscribe({
            next: (data) => {
                this.shows = data.shows;
                this.totalPages = data.totalPages;
                this.error = '';
            },
            error: (error) => {
                this.error = 'Failed to load shows.';
                console.error(error);
            },
            complete: () => {
                this.loading = false;
                this.cdr.detectChanges();
            },
        });
    }

    searchShows() {
        this.currentPage = 1;
        this.loadShows();
    }

    onPageChange(pageNumber: number) {
        this.currentPage = pageNumber;
        this.loadShows();
    }

    onFilterTypeChange(type: ShowTypeEnum) {
        this.filterType = type;
        this.currentPage = 1;
        this.loadShows();
    }
}
