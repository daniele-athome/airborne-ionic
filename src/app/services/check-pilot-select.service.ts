import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class CheckPilotSelect implements CanLoad {
    constructor(private configService: ConfigService,
                private router: Router) {
    }

    canLoad() {
        return this.configService.getLastPilotName().then(pilotName => {
            if (pilotName) {
                this.router.navigate(['/app'], { replaceUrl: true });
                return false;
            }
            else {
                return true;
            }
        });
    }
}
