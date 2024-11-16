import { atom } from 'recoil';
import { IPokemon, IPokemonFetch } from '../../interface';

// Define um estado global para armazenar o termo de busca do Pokémon.
export const atomPokemonSearch = atom<string | undefined>({
   key: 'atomPokemonSearch',
   default: undefined,
});

// Define um estado global para armazenar o resultado da busca de Pokémons.
export const atomPokemonFetch = atom<IPokemonFetch[]>({
   key: 'atomPokemonFetch',
   default: [],
});

// Este estado armazena um offset numérico, utilizado para paginação.
export const atomPokemonOffset = atom<number>({
   key: 'atomPokemonOffset',
   default: 0,
});
// Armazena a lista completa de Pokémons do tipo IPokemon.
export const atomPokemonList = atom<IPokemon[]>({
   key: 'atomPokemonList',
   default: [],
});

// Armazena um único objeto de Pokémon do tipo IPokemon.
export const atomPokemon = atom<IPokemon>({
   key: 'atomPokemon',
   default: undefined,
});

export const atomSelectedPokemon = atom<IPokemon>({
   key: 'atomSelectedPokemon',
   default: undefined,
});
