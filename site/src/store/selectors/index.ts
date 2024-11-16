import { selector } from 'recoil';

// api
import { requester } from '../../api/requester';
import { IPokemon, IPokemonFetch } from '../../interface';

// recoil: atoms
import {
   atomPokemonFetch,
   atomPokemonOffset,
   atomPokemonSearch,
   atomSelectedPokemon,
} from '../atoms';
import {
   atomHashPokemon,
   atomHashPokemonsFetch,
   atomHashPokemonsList,
   atomHashSelectedPokemon,
} from '../hashs';

// Selector que faz uma requisição para obter um array com os 10 primeiros Pokemons
export const selectorFetchPokemons = selector({
   key: 'selectorFetchPokemons', // Chave única para identificar o selector
   get: async ({ get }) => {
      get(atomHashPokemonsFetch);
      const offSet = get(atomPokemonOffset); // Obtém o valor de offset do atom para gerenciar a paginação
      // Faz uma requisição para a API com o offset e limitando a 10 resultados
      const { data } = await requester({
         baseURL: 'https://pokeapi.co/api/v2',
      }).get(`pokemon?limit=10&offset=${offSet}`);
      // Retorna os dados obtidos, que contém informações básicas sobre os Pokemons
      // console.log(data);
      return data;
   },
});

// Selector que resolve uma lista de promessas para obter os detalhes de cada Pokemon
export const selectorGetPokemons = selector({
   key: 'selectorGetPokemons', // Chave única para identificar o selector
   get: async ({ get }) => {
      get(atomHashPokemonsList);
      const pokemonFetch = get(atomPokemonFetch); // Obtém a lista básica de Pokemons

      // Verifica se há Pokemons para obter detalhes
      if (pokemonFetch.length > 0) {
         // Mapeia para extrair apenas os nomes dos Pokemons
         const list = pokemonFetch.map(
            (pokemon: IPokemonFetch) => pokemon.name
         );
         // Mapeia a lista de nomes para realizar uma requisição detalhada para cada Pokemon
         const result = list.map(async (pokemon) => {
            const { data } = await requester({
               baseURL: 'https://pokeapi.co/api/v2',
            }).get(`/pokemon/${pokemon.toLowerCase().trim()}`); // Normaliza o nome para a URL e faz a requisição
            return data; // Retorna os dados detalhados de cada Pokemon
         });
         const pokemonsList = Promise.all(result); // Espera que todas as requisições sejam resolvidas
         //  console.log(pokemonsList);
         return pokemonsList; // Retorna a lista completa de dados detalhados dos Pokemons
      }
   },
});
// Selector que busca informações detalhadas de um único Pokemon
export const selectorGetPokemon = selector<IPokemon>({
   key: 'selectorGetPokemon', // Chave única para identificar o selector
   get: async ({ get }) => {
      get(atomHashPokemon); // Dependência no atom para invalidar o cache quando necessário
      const pokemon = get(atomPokemonSearch); // Obtém o nome do Pokemon que está sendo pesquisado
      // Verifica se há um Pokemon a ser pesquisado
      if (pokemon) {
         // Faz uma requisição para obter as informações detalhadas do Pokemon
         const { data } = await requester({
            baseURL: 'https://pokeapi.co/api/v2',
         }).get(`/pokemon/${pokemon.toLowerCase().trim()}`); // Normaliza o nome para a URL e faz a requisição

         return data; // Retorna as informações detalhadas do Pokemon específico
      }
   },
});

export const selectorPokemonById = selector<IPokemon | null>({
   key: 'selectorPokemonById', // Identificador único para o selector
   get: async ({ get }) => {
      const idOrName = get(atomHashSelectedPokemon); // Obtém o ID do Pokémon a partir do atom (estado global)

      if (!idOrName) {
         console.warn('No Pokémon ID provided');
         return null; // Retorna null se o ID não for fornecido
      }

      //Verifica se o Pokémon já está carregado
      const pokemonFromState = get(atomSelectedPokemon);
      if (pokemonFromState && pokemonFromState.name === idOrName) {
         return pokemonFromState; // Retorna o Pokémon se ele já foi carregado
      }
      // const pokemonFromState = get(atomSelectedPokemon);
      // if (
      //    (pokemonFromState && pokemonFromState.name === idOrName) ||
      //    pokemonFromState.id.toString() === idOrName
      // ) {
      //    return pokemonFromState; // Retorna o Pokémon se ele já foi carregado
      // }
      try {
         // Se não estiver carregado, faz o fetch para obter o Pokémon
         const { data } = await requester({
            baseURL: 'https://pokeapi.co/api/v2',
         }).get(`/pokemon/${idOrName}`); // Passando o ID do Pokémon

         return data; // Retorna o Pokémon obtido pela API
      } catch (error) {
         console.error('Failed to fetch Pokémon:', error);
         throw error;
      }
   },
});
