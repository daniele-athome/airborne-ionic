export interface JwsTokenRequest {
    scopes: string[];
    aud: string;
    iss: string;
    pkey: string;
}
