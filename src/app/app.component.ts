import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private titleService: Title
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // won't use statusbar for now - this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      // will be hidden later -- this.splashScreen.hide();
      this.titleService.setTitle(this.titleService.getTitle() + ' (' + environment.aircraft.id + ')');
    });
  }
}
