import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PilotSelectComponent } from './pilot-select.component';

const routes: Routes = [
    {
        path: '',
        component: PilotSelectComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PilotSelectRoutingModule {
}
