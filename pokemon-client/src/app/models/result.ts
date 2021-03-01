export class Result {
   

    constructor(
        private _name: string,
        private _url: string,  
    ){}
 public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
}

