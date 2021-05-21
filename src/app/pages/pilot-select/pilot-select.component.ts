import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../services/config.service';
import { AlertController, IonRouterOutlet, Platform, ViewDidEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { App } = Plugins;
const { SplashScreen } = Plugins;

@Component({
    selector: 'app-pilot-select',
    templateUrl: './pilot-select.component.html',
    styleUrls: ['./pilot-select.component.scss'],
})
export class PilotSelectComponent implements ViewDidEnter {

    pilotList = environment.pilots;

    constructor(private platform: Platform,
                private routerOutlet: IonRouterOutlet,
                private alertController: AlertController,
                private configService: ConfigService,
                private router: Router) {
        this.platform.backButton.subscribeWithPriority(-1, () => {
            if (!this.routerOutlet.canGoBack()) {
                App.exitApp();
            }
        });
    }

    ionViewDidEnter() {
        SplashScreen.hide();
    }

    async select(pilotName) {
        const alert = await this.alertController.create({
            header: 'Confermi?',
            message: 'Dici di essere <b>' + pilotName + '</b>.',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'OK',
                    role: 'destructive',
                    cssClass: 'danger',
                    handler: async () => {
                        await this.configService.setLastPilotName(pilotName);
                        this.router.navigate(['/app'], { replaceUrl: true });
                    }
                }
            ]
        });
        await alert.present();
    }

}
