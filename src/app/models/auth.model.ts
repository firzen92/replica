export class User {

    constructor(private email: string, private id: string, private _token: string, private tokenExpiration: Date) {
        
    }

    get token() {
        if(this._token && new Date() > this.tokenExpiration) return this._token;
        return null;
    }

}