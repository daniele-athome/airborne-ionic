import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
    let routerSpy;
    let statusBarSpy;
    let platformReadySpy;
    let platformSpy;
    let titleSpy;
    let app;
    let fixture;

    beforeEach(async () => {
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
        titleSpy = jasmine.createSpyObj('Title', {
            getTitle: 'Airborne',
            setTitle: undefined,
        });

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: Platform, useValue: platformSpy },
                { provide: Title, useValue: titleSpy},
                SplashScreen,
            ],
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
    });

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
        expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    });

    it('should contain the aircraft ID in the title', async () => {
        await platformReadySpy;
        expect(titleSpy.setTitle).toHaveBeenCalledWith(`Airborne (${environment.aircraft.id})`);
    });
});
