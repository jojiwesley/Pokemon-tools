import { atom } from "recoil";
import type { IPokemon, IPokemonFetch } from "../../interface";

export const atomPokemonSearch = atom< string | undefined>({
  key:'atomPokemonSearch',
  default: undefined,
});

export const atomPokemonFatch = atom<IPokemonFetch[]>({
  key:'atomPokemonFatch',
  default: [],
});

export const atomPokemonOffset = atom<number>({
  key:'atomPokemonOffset',
  default: 0,
});

export const atomPokemonList = atom<IPokemon[]>({
  key:'atomPokemonList',
  default: [],
});