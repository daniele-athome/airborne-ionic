import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CalendarOptions, EventClickArg, EventMountArg, FullCalendarComponent } from '@fullcalendar/angular';
import itLocale from '@fullcalendar/core/locales/it';

import { environment } from '../../../environments/environment';
import { BookModalComponent } from './book-modal/book-modal.component';
import { EventApi } from '@fullcalendar/common';
import { CalendarService } from '../../services/calendar.service';
import { DateClickArg } from '@fullcalendar/interaction';

declare var $: any;

@Component({
    selector: 'app-book-flight',
    templateUrl: 'book-flight.component.html',
    styleUrls: ['book-flight.component.scss'],
})
export class BookFlightComponent implements OnInit {

    calendarOptions: CalendarOptions = {
        initialView: 'listWeek',
        locales: [itLocale],
        locale: 'it',
        height: 'auto',
        displayEventTime: true,
        nowIndicator: true,
        allDaySlot: false,
        slotMinTime: '05:00:00',
        slotMaxTime: '22:00:00',
        noEventsText: 'Caricamento...',
        headerToolbar: false,
        selectable: true,
        selectOverlap: false,

        loading: isLoading => this.setLoading(isLoading),
        eventDidMount: arg => this.renderEvent(arg),
        eventClick: arg => this.onEventClick(arg),
        dateClick: arg => this.onDateClick(arg),

        googleCalendarApiKey: environment.googleApiKey,
        events: environment.events,
    };

    @ViewChild('calendar')
    calendarComponent: FullCalendarComponent;

    constructor(
        private modalController: ModalController,
        private toastController: ToastController,
        private calendarService: CalendarService
    ) {
        const defaultDate = new Date();
        if (defaultDate.getDay() === 0 && defaultDate.getHours() >= 22) {
            // week is ending, move to next one
            defaultDate.setDate(defaultDate.getDate() + 1);
        }
        this.calendarOptions.initialDate = defaultDate;
    }

    ngOnInit() {
        this.calendarService.init().subscribe(() => {
            // TODO do something here?
            console.log('calendar service init ok');
        });
    }

    isToday() {
        return this.isInDate(new Date());
    }

    private isInDate(date: Date) {
        const calendar = this.calendarComponent?.getApi();
        if (calendar) {
            return date >= calendar.view.currentStart && date < calendar.view.currentEnd;
        }
        return false;
    }

    setCalendarMode($event: any) {
        this.calendarComponent.getApi().changeView($event.detail.value);
    }

    private setLoading(isLoading: boolean) {
        this.calendarOptions.noEventsText = isLoading ?
            'Caricamento...' : 'Non ci sono eventi da visualizzare';
    }

    next() {
        this.calendarComponent.getApi().next();
    }

    previous() {
        this.calendarComponent.getApi().prev();
    }

    today() {
        this.calendarComponent.getApi().today();
    }

    async book(startDate?: Date, skipTime: boolean = false) {
        const eventModel = {};
        if (startDate) {
            eventModel['startDate'] = startDate;
            if (!skipTime) {
                eventModel['startTime'] = startDate.toLocaleTimeString('it-it', {
                    // TODO timeZone?
                    hour: '2-digit', minute: '2-digit', hour12: false,
                });
            }
            eventModel['endDate'] = startDate;
        }
        else {
            const ctxStartDate = this.getContextualDate();
            if (ctxStartDate) {
                eventModel['startDate'] = ctxStartDate;
                eventModel['endDate'] = ctxStartDate;
            }
        }
        const modal = await this.modalController.create({
            component: BookModalComponent,
            componentProps: {
                eventModel: eventModel
            }
        });
        modal.onDidDismiss().then((data) => this.onEditorDismiss(data));
        return await modal.present();
    }

    private getContextualDate(): Date {
        const calendar = this.calendarComponent?.getApi();
        if (calendar) {
            const today = new Date();
            // - future week, use first day of that week
            // - future day, use that day
            // - future month, use first day of that month
            if (calendar.view.currentStart > today) {
                return calendar.view.currentStart;
            }
        }
        return null;
    }

    async edit(event: EventApi) {
        const modal = await this.modalController.create({
            component: BookModalComponent,
            componentProps: {
                event: event
            }
        });
        modal.onDidDismiss().then((data) => this.onEditorDismiss(data));
        return await modal.present();
    }

    private async onEditorDismiss(data) {
        console.log(data);
        if (data.role && data.role !== 'backdrop') {
            let toastMessage;
            switch (data.role) {
                case 'deleted':
                    toastMessage = 'Prenotazione cancellata';
                    break;
                case 'updated':
                    toastMessage = 'Prenotazione modificata';
                    break;
                case 'created':
                    toastMessage = 'Prenotazione effettuata';
                    break;
            }
            if (toastMessage) {
                const toast = await this.toastController.create({
                    message: toastMessage,
                    duration: 2000,
                    cssClass: 'tabs-bottom',
                });
                toast.present();
            }
            if (!this.isInDate(data.data.date)) {
                this.calendarComponent.getApi().gotoDate(data.data.date);
            }
            else {
                this.calendarComponent.getApi().refetchEvents();
            }
        }
    }

    private renderEvent(arg: EventMountArg) {
        if (arg.event.extendedProps.description) {
            if (arg.view.type === 'listWeek') {
                $(arg.el).find('.fc-list-event-title').append('&nbsp;')
                    .append($('<small class="text-muted fc-list-event-description"></small>').text(arg.event.extendedProps.description));
            }
            else {
                $(arg.el).find('.fc-event-title')
                    .after($('<div class="fc-event-description"></div>').text(arg.event.extendedProps.description));
            }
        }
    }

    async onEventClick(arg: EventClickArg) {
        arg.jsEvent.preventDefault();
        return await this.edit(arg.event);
    }

    async onDateClick(arg: DateClickArg) {
        arg.jsEvent.preventDefault();
        return await this.book(arg.date, arg.view.type === 'dayGridMonth');
    }

}
