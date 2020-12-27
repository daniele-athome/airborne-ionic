import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { registerLocaleData } from '@angular/common';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
declare var System;

// register FullCalendar plugins
FullCalendarModule.registerPlugins([
    dayGridPlugin,
    listPlugin,
    interactionPlugin,
    timeGridPlugin,
    googleCalendarPlugin,
]);

// FIXME refactor this mess
let localeId;

// FIXME refactor this mess
function loadLocaleData() {
    let languageCode;
    if (localeId.indexOf('-') !== -1) {
        languageCode = localeId.split('-')[0];
    }
    else if (localeId.indexOf('_') !== -1) {
        languageCode = localeId.split('_')[0];
    }
    else {
        languageCode = localeId;
    }

    console.log('loading locale data for ' + languageCode);
    return new Promise((resolve, reject) => {
        System.import(`@angular/common/locales/${languageCode}.js`)
            .then(module => {
                registerLocaleData(module.default);
                resolve();
            }, reject);
    });
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        FullCalendarModule,
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ConfigService,
        Globalization,
        // FIXME refactor this mess
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [Globalization, Platform],
            useFactory: (globalization: Globalization, platform: Platform) => {
                return (): Promise<void> => {
                    return new Promise<void>((resolve) => {
                        platform.ready().then(async (source) => {
                            if (source === 'cordova') {
                                const localeData = await globalization.getLocaleName();
                                localeId = localeData.value;
                            }
                            else {
                                localeId = 'it-IT';
                            }
                            loadLocaleData().then(() => resolve()).catch(() => {
                                localeId = 'en-US';
                                loadLocaleData().finally(() => {
                                    resolve();
                                });
                            });
                        });
                    });
                };
            },
        },
        // FIXME refactor this mess
        {
            provide: LOCALE_ID,
            deps: [APP_INITIALIZER],
            useFactory: () => {
                console.log('localeId=' + localeId);
                return localeId;
            }
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
