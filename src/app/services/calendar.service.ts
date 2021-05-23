import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GoogleCalendarApiService } from './gcalendar.api.service';
import { CalEvent } from '../models/calevent.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as datetime from '../utils/datetime';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { GoogleServiceAccountService } from './google-service-account.service';

dayjs.extend(utc);

// https://github.com/Maxim-Mazurok/angular-google-calendar-typescript-example

@Injectable({
    providedIn: 'root',
})
export class CalendarService {

    constructor(private http: HttpClient,
                private serviceAccountService: GoogleServiceAccountService,
                private calendarApiService: GoogleCalendarApiService) {
    }

    init(): Observable<void> {
        this.calendarApiService.setApiKey(environment.googleApiKey);
        // return this.serviceAccountService.init();
        // request token only when needed, possibly saving a HTTP request
        return of(void 0);
    }

    public eventConflicts(eventId: string, event: CalEvent): Observable<boolean> {
        return this.serviceAccountService.ensureAuthToken()
            .pipe(
                mergeMap((authToken) => {
                    this.calendarApiService.setAuthToken(authToken);
                    return this.calendarApiService.listEvents(environment.events as unknown as string,
                        datetime.formatDateTimeISO(event.startDate, event.startTime),
                        datetime.formatDateTimeISO(event.endDate, event.endTime))
                        .pipe(
                            map((events: gapi.client.calendar.Events) => {
                                return events.items.filter((value) => {
                                    return value.id !== eventId;
                                }).length > 0;
                            })
                        );
                })
            );
    }

    public createEvent(event: CalEvent): Observable<any> {
        return this.serviceAccountService.ensureAuthToken()
            .pipe(
                mergeMap((authToken) => {
                    this.calendarApiService.setAuthToken(authToken);
                    const gevent: gapi.client.calendar.Event = {
                        summary: event.title,
                        description: event.description,
                        start: {
                            dateTime: datetime.formatDateTimeISO(event.startDate, event.startTime)
                        } as gapi.client.calendar.EventDateTime,
                        end: {
                            dateTime: datetime.formatDateTimeISO(event.endDate, event.endTime)
                        } as gapi.client.calendar.EventDateTime,
                    };
                    return this.calendarApiService.insertEvent(environment.events as unknown as string, gevent);
                })
            );
    }

    public updateEvent(eventId: string, event: CalEvent): Observable<any> {
        return this.serviceAccountService.ensureAuthToken()
            .pipe(
                mergeMap((authToken) => {
                    this.calendarApiService.setAuthToken(authToken);
                    const gevent: gapi.client.calendar.Event = {
                        summary: event.title,
                        description: event.description,
                        start: {
                            dateTime: datetime.formatDateTimeISO(event.startDate, event.startTime)
                        } as gapi.client.calendar.EventDateTime,
                        end: {
                            dateTime: datetime.formatDateTimeISO(event.endDate, event.endTime)
                        } as gapi.client.calendar.EventDateTime,
                    };
                    return this.calendarApiService.updateEvent(environment.events as unknown as string, eventId, gevent);
                })
            );
    }

    public deleteEvent(eventId: string): Observable<any> {
        return this.serviceAccountService.ensureAuthToken()
            .pipe(
                mergeMap((authToken) => {
                    this.calendarApiService.setAuthToken(authToken);
                    return this.calendarApiService.deleteEvent(environment.events as unknown as string, eventId);
                })
            );
    }

}
