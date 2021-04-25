import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilotSelectRoutingModule } from './pilot-select-routing.module';

import { PilotSelectComponent } from './pilot-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PilotSelectRoutingModule
    ],
    declarations: [PilotSelectComponent]
})
export class PilotSelectModule {
}
