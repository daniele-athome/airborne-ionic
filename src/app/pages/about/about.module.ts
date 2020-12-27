import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutRoutingModule } from './about-routing.module';

import { AboutComponent } from './about.component';
import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AboutRoutingModule
    ],
    providers: [
        AppVersion
    ],
    declarations: [AboutComponent]
})
export class AboutModule {
}
