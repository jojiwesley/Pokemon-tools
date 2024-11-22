import getPokemonList from './get_list_pokemons/index.js';
import scrapePokemonInfo from './get_details_pokemon/index.js';
import fs from 'fs';
async function main() {
  console.log('Buscando lista de Pokémons...');
  const pokemonList = await getPokemonList();

  // Limita a 50 primeiros Pokémons
  const limitedPokemonList = pokemonList.slice(0, 20);

  console.log(
    `Encontrados ${pokemonList.length} Pokémons, começando a buscar os detalhes...`
  );

  const allPokemonData = [];

  // Para cada Pokémon, faz o web scraping dos detalhes
  for (const pokemon of limitedPokemonList) {
    console.log(`Buscando detalhes de ${pokemon.name}...`);

    const pokemonDetails = await scrapePokemonInfo(pokemon.url);

    allPokemonData.push({
      name: pokemon.name,
      url: pokemon.url,
      details: pokemonDetails,
    });
  }
  // Cria um objeto para o JSON
  const List = { pokemons: allPokemonData };
  const jsonData = JSON.stringify(List, null, 2); // Converte o objeto em uma string JSON
  fs.writeFileSync('pokemons.json', jsonData); // Escreve os dados JSON em um arquivo
}
async function test() {
  const url = 'https://wiki.pokexgames.com/index.php/Ivysaur';
  // const url = 'https://wiki.pokexgames.com/index.php/Misdreavus';

  const results = await scrapePokemonInfo(url);
  console.log(results);
  // Cria um objeto para o JSON
  const PokemonDetail = { detail: results };
  const jsonData = JSON.stringify(PokemonDetail, null, 2); // Converte o objeto em uma string JSON
  fs.writeFileSync('pokemonDetail.json', jsonData); // Escreve os dados JSON em um arquivo
}
main();
