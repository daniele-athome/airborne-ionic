import { DoWork, runWorker } from 'observable-webworker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwsTokenRequest } from './jws-token.types';
import { KJUR } from 'jsrsasign';

export class JwsTokenWorker implements DoWork<JwsTokenRequest, string> {

    public work(input$: Observable<JwsTokenRequest>): Observable<string> {
        return input$.pipe(
            map(data => {
                const scopes = data.scopes;
                const aud = data.aud;
                const iss = data.iss;
                const pkey = data.pkey;
                const header = JSON.stringify({alg: 'RS256', typ: 'JWT'});
                const claim = JSON.stringify({
                    aud: aud,
                    scope: scopes.join(' '),
                    iss: iss,
                    exp: KJUR.jws.IntDate.get('now + 1hour'),
                    iat: KJUR.jws.IntDate.get('now'),
                });
                return KJUR.jws.JWS.sign(null, header, claim, pkey);
            }),
        );
    }

}

runWorker(JwsTokenWorker);
