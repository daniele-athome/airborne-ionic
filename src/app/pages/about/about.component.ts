import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { version as packageVersion, homepage as packageHomepage, bugs as packageBugs } from '../../../../package.json';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

    aircraft = environment.aircraft;
    location = environment.location;
    locationUrl = `https://www.google.com/maps/search/?api=1&query=${this.location.latitude},${this.location.longitude}`;
    pilotsHTML = environment.pilots.join('<br/>');
    appVersion: string;
    packVersion: string = packageVersion;
    packHomepage: string = packageHomepage;
    packReportIssueUrl: string = packageBugs.url;

    bgLoaded = false;

    constructor(private appVersionService: AppVersion) {
        this.appVersionService.getVersionNumber()
            .then((value => this.appVersion = value))
            .catch(reason => console.log(reason));
    }

    ngOnInit() {
    }

}
