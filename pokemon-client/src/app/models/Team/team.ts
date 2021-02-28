import { Pokemon } from "../Pokemon/pokemon";
import { Trainer } from "../Trainer/trainer";

export class Team {
    constructor(
        private _id: number = 0,
        private _trainer: Trainer = new Trainer(0, '', 0, '', ''),
        private _pokemonList: Pokemon[] = [],
    ) { }



    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get trainer(): Trainer {
        return this._trainer;
    }

    public get pokemonList(): Pokemon[] {
        return this._pokemonList;
    }

    public set trainer(trainer: Trainer) {
        this._trainer = trainer;
    }

    public set pokemonList(pokemonList: Pokemon[]) {
        this._pokemonList = pokemonList;
    }

    public addPokemon(pokemon: Pokemon) {
        this.pokemonList.push(pokemon);
    }

    public clear(): void {
        this._pokemonList.splice(0);
    }
}
