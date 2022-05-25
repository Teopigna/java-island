export class User {
    constructor(
        public id: number, 
        private _token: string,
        public name: string,
        public surname: string,
        public email: string,
        public birthDate: string,
        public role: string
    ) {}
    
    get token(){  //user.token == similar to property
        return this._token;
    }
}