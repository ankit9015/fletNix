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
    standalone: true,
    imports: [CommonModule, FormsModule, ShowCardComponent], // Add CommonModule, FormsModule, RouterLink
    templateUrl: './show-list.component.html',
    styleUrls: ['./show-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowListComponent implements OnInit {
    ShowTypeEnum: typeof ShowTypeEnum = ShowTypeEnum;
    shows: Show[] = [];
    currentPage = 1;
    totalPages = 1;
    searchTerm: string = '';
    filterType: ShowTypeEnum | undefined = undefined;
    user: User | undefined = undefined;
    loading: boolean = true;
    error: string = '';

    constructor(
        private cdr: ChangeDetectorRef,
        private showService: ShowService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.loadShows();
        this.user = this.authService.user;
    }

    loadShows(): void {
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

    searchShows(): void {
        this.currentPage = 1;
        this.loadShows();
    }

    onPageChange(pageNumber: number): void {
        this.currentPage = pageNumber;
        this.loadShows();
    }

    onFilterTypeChange(type: ShowTypeEnum): void {
        this.filterType = type;
        this.currentPage = 1;
        this.loadShows();
    }
}
