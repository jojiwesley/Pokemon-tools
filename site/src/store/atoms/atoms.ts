import { atom } from "recoil";

export const atomPokemon = atom<string>({
  key:'atomPokemon',
  default: undefined,
});