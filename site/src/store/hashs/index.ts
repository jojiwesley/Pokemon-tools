import { atom } from 'recoil';

export const atomHashPokemonFetch = atom<number>({
   key: 'atomHashPokemonFetch',
   default: 0,
});

export const atomHashPokemonsList = atom<number>({
   key: 'atomHashPokemonsList',
   default: 0,
});
