import { useParams } from 'react-router-dom';

import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { atomPokemonSearch } from '../store/atoms/atoms';
import { useEffect, useState } from 'react';
import { selectorGetPokemon } from '../store/selectors';

//::
const DetailsPokemonPage = () => {
   const { id } = useParams<{ id: string }>(); // Captura o parâmetro 'id' da URL

   // local: states
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // recoil: states
   const setPokemon = useSetRecoilState(atomPokemonSearch); // Atualiza o estado global

   // recoil: loadable
   const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon);

   useEffect(() => {
      if (id) {
         setPokemon(id); // Atualiza o estado Recoil para buscar o Pokémon
      }
   }, [id, setPokemon]);

   useEffect(() => {
      if (getLoadablePokemon.state === 'loading') {
         setLoading(true);
      } else if (getLoadablePokemon.state === 'hasError') {
         setError('Failed to fetch Pokémon details');
         setLoading(false);
      } else if (getLoadablePokemon.state === 'hasValue') {
         setLoading(false);
         setError(null);
      }
   }, [getLoadablePokemon.state]);

   if (loading) {
      return <p>Loading Pokémon details...</p>;
   }

   if (error) {
      return <p>Error: {error}</p>;
   }

   const pokemon = getLoadablePokemon.contents;

   return (
      <div>
         {pokemon && (
            <div className="">
               <p>{pokemon.id}</p>
               <p>{pokemon.name}</p>
               <p>{pokemon.types[0]?.type?.name}</p>
               <p></p>
            </div>
         )}
      </div>
   );
};

export default DetailsPokemonPage;
