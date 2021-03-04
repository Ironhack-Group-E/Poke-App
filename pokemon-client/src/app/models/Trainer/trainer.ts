export class Trainer {
    
    constructor(
        private _id: number,
        private _name: string,
        private _age: number,
        private _hobby: string,
        private _photo: string
    ) {  
    }

    public get id(): number {
        return this._id;
    }
    
    public get name(): string {
        return this._name;
    }

    public get age(): number {
        return this._age;
    }

    public get hobby(): string {
        return this._hobby;
    }

    public get photo(): string {
        return this._photo;
    }

    public set id(id: number) {
        this._id = id;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set age(age: number) {
        this._age = age;
    }

    public set hobby(hobby: string) {
        this._hobby = hobby;
    }

    public set photo(photo: string) {
        this._photo = photo;
    }
    
}
