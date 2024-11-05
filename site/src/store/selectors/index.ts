import { selector } from 'recoil';
import {
   atomPokemonFatch,
   atomPokemonOffset,
   atomPokemonSearch,
} from '../atoms/atoms';
import { requester } from '../../api/requester';
import type { IPokemonFetch } from '../../interface';
import { atomHashPokemonFetch, atomHashPokemonsList } from '../hashs';

export const selectorFetchPokemon = selector({
   key: 'selectorFetchPokemon',
   get: async ({ get }) => {
      get(atomHashPokemonFetch);
      const offSet = get(atomPokemonOffset);
      const { data } = await requester({
         baseURL: 'https://pokeapi.co/api/v2',
      }).get(`/pokemon?limit=10&offset=${offSet}`);

      return data;
   },
});

export const selectorGetPokemons = selector({
   key: 'selectorGetPokemons',
   get: async ({ get }) => {
      get(atomHashPokemonsList);
      const PokemonFatch = get(atomPokemonFatch);
      if (PokemonFatch.length > 0) {
         const list = PokemonFatch.map(
            (pokemon: IPokemonFetch) => pokemon.name
         );
         const result = list.map(async (pokemon) => {
            const { data } = await requester({
               baseURL: 'https://pokeapi.co/api/v2',
            }).get(`/pokemon/${pokemon.toLowerCase().trim()}`);

            return data;
         });

         const PokemonList = Promise.all(result);

         return PokemonList;
      }
   },
});

export const selectorGetPokemon = selector({
   key: 'selectorGetPokemon',
   get: async ({ get }) => {
      const pokemon = get(atomPokemonSearch);
      if (pokemon) {
         const { data } = await requester({
            baseURL: 'https://pokeapi.co/api/v2',
         }).get(`/pokemon/${pokemon.toLowerCase().trim()}`);

         return data;
      }
   },
});
