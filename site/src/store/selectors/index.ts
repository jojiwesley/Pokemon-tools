import { selector } from "recoil";
import { atomPokemon } from "../atoms/atoms";

export const selectorPokemonLength = selector({
  key:'selectorPokemonLength',
  get: ({ get }) =>{
    const pokemon = get(atomPokemon)
    return pokemon?.length;
  },
});