import { Component } from '@angular/core';
import { IonRouterOutlet, Platform, ViewWillEnter } from '@ionic/angular';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements ViewWillEnter {

    constructor(
        private platform: Platform,
        private routerOutlet: IonRouterOutlet,
    ) {
        this.platform.backButton.subscribeWithPriority(-1, () => {
            if (!this.routerOutlet.canGoBack()) {
                App.exitApp();
            }
        });
    }

    ionViewWillEnter() {
        SplashScreen.hide();
    }

}
