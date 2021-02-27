import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(
  private http: HttpClient,
  ){ }

  getAllPokemons():Observable<InterfaceList> {
    return this.http.get<InterfaceList>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=7');
  }

  getAPokemon(url:string):Observable<InterfacePokemon> {
    return this.http.get<InterfacePokemon>(url);
  }

  getPokemonById(id: number):Observable<InterfacePokemon> {
    return this.http.get<InterfacePokemon>('https://pokeapi.co/api/v2/pokemon/' + id);
  }
}


interface InterfaceList{
  next:string,
  previous: string,
  results: [
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },  
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },  
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    },
    {
      name:string,
      url: string, 
    }
  ]
}


interface InterfacePokemon{
  id:number,
  name:string,
  
  sprites: {  
    front_default: string,
  },
  stats: [
    {
      base_stat:number,
        // "name": "hp",
    },
    {
      base_stat:number,
      // "name": "attack",
    },
    {
      base_stat:number,
        // "name": "defense",
    },
    {
      base_stat:number,
        // "name": "special-attack",
    },
    {
      base_stat:number,
       // "name": "special-defense",
    },
    {
      base_stat:number,
        // "name": "speed", 
    }
  ],
  types: [
    {
      type: {
        name: string,
       }
    },
    {
      type: {
        name: string,
       }
    }
  ],
}
