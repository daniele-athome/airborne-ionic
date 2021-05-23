import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckPilotSelect } from './services/check-pilot-select.service';
import { CustomPreloading } from './utils/preloading';
import { HomeModule } from './pages/home/home.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'pilot-select',
        pathMatch: 'full'
    },
    {
        path: 'app',
        loadChildren: () => HomeModule,
        // TODO maybe a canLoad here redirecting to pilot-select?
        data: {
            preload: true
        }
    },
    {
        path: 'pilot-select',
        loadChildren: () => import('./pages/pilot-select/pilot-select.module').then( m => m.PilotSelectModule),
        canLoad: [CheckPilotSelect]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloading})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
