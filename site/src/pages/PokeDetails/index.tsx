import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IPokemon } from '../../interface';

import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { selectorPokemonById } from '../../store/selectors';
import { atomSelectedPokemon } from '../../store/atoms';
import { atomHashSelectedPokemon } from '../../store/hashs';

import { Container, FlexBox, Loading } from '../../components';
import PokeSpriteContent from '../../components/Details/PokeSpriteContent';
import PokeDetailsContent from '../../components/Details/PokeDetailsContent';

const PokeDetails = () => {
   const { id } = useParams<{ id: string }>(); // Captura o parâmetro 'id' da URL
   const safeId = id ?? '';

   //recoil: State
   const [Pokemon, setPokemon] = useRecoilState(atomSelectedPokemon);
   const [PokemonId, setPokemonId] = useRecoilState(atomHashSelectedPokemon);

   //recoil: Loadable
   const selectedPokemonLoadable = useRecoilValueLoadable(selectorPokemonById);

   //::effects
   useEffect(() => {
      // Define o ID do Pokémon a partir da URL
      if (safeId !== PokemonId) {
         setPokemonId(safeId); // Só atualiza o ID se for diferente do estado atual
      }
   }, [safeId, PokemonId, setPokemonId]);

   useEffect(() => {
      if (selectedPokemonLoadable.state === 'hasValue') {
         const pokemonLoadable = selectedPokemonLoadable.contents as IPokemon;
         if (pokemonLoadable && pokemonLoadable.id !== Pokemon?.id) {
            setPokemon(pokemonLoadable);
         }
      }
   }, [
      selectedPokemonLoadable.state,
      selectedPokemonLoadable.contents,
      setPokemon,
      Pokemon,
   ]);

   // Renderização baseada no estado do Loadable
   if (selectedPokemonLoadable.state === 'loading') {
      return (
         <Container>
            <Loading
               loadingText="Carregando pokemon..."
               isLoading={selectedPokemonLoadable.state === 'loading'}
            />
         </Container>
      );
   }

   if (selectedPokemonLoadable.state === 'hasError') {
      return <Container>Error loading Pokémon details</Container>;
   }

   const pokemon =
      selectedPokemonLoadable.state === 'hasValue'
         ? selectedPokemonLoadable.contents
         : null;

   if (!pokemon) {
      return <Container>No Pokémon found</Container>;
   }
   return (
      <Container>
         <FlexBox align="center" direction="column" justify="center">
            <div>PokeDetails = {id}</div>
            <h1>{pokemon?.name}</h1>
            <div>
               <FlexBox
                  align="flex-start"
                  direction="row"
                  justify="center"
                  flex-wrap="wrap"
                  gap="lg"
               >
                  <PokeSpriteContent
                     image={
                        pokemon.sprites.other?.['official-artwork']
                           ?.front_default ||
                        pokemon.sprites?.other?.dream_world?.front_default ||
                        ''
                     }
                     alt={pokemon.name}
                  />
                  <PokeDetailsContent
                     height={pokemon?.height}
                     weight={pokemon?.weight}
                     base_experience={pokemon.base_experience}
                  />
                  {/* <div>
                     <p>Height: {pokemon?.height}</p>
                     <p>Weight: {pokemon?.weight}</p>
                     <p>
                        Types:{''}
                        {pokemon?.types.map((t) => t.type.name).join(', ')}
                     </p>
                     <p>Base Exp: {pokemon.base_experience}</p>
                     <p>Base Exp: {pokemon.location_area_encounters}</p>
                  </div> */}
               </FlexBox>
            </div>
         </FlexBox>
      </Container>
   );
};

export default PokeDetails;
