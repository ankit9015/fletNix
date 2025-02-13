import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../models/Show';
import { environment } from '../../environments/environment';
import { ShowTypeEnum } from '../models/enums/ShowTypeEnum';

interface GetShowsResponse {
    shows: Show[];
    total: number;
    currentPage: number;
    totalPages: number;
}

@Injectable({
    providedIn: 'root',
})
export class ShowService {
    constructor(private http: HttpClient) {}

    filterShows(search: string, type: ShowTypeEnum | undefined, page = 1, listSize = 15): Observable<GetShowsResponse> {
        let url = environment.apiUrl + `/shows?page=${page}&listSize=${listSize}`;
        if (type) {
            url += `&type=${type}`;
        }
        if (search) {
            url += `&search=${search}`;
        }

        return this.http.get<GetShowsResponse>(url);
    }

    getShow(id: string): Observable<Show> {
        let url = environment.apiUrl + `/shows/${id}`;
        return this.http.get<Show>(`${url}/`);
    }
}
