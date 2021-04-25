import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckPilotSelect } from './services/check-pilot-select.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'pilot-select',
        pathMatch: 'full'
    },
    {
        path: 'app',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
        // TODO maybe a canLoad here redirecting to pilot-select?
    },
    {
        path: 'pilot-select',
        loadChildren: () => import('./pages/pilot-select/pilot-select.module').then( m => m.PilotSelectModule),
        canLoad: [CheckPilotSelect]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
