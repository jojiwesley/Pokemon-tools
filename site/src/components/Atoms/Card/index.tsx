import { FC } from 'react';

// components
import { FlexBox } from '../Flexbox';
import * as Atom from './atoms';

// types
import type { ICardProps } from './types';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { atomHashSelectedPokemon } from '../../../store/hashs';

// ::
const Card: FC<ICardProps> = ({ id, image, name, preview, typeColor }) => {
   const setSelectedPokemon = useSetRecoilState(atomHashSelectedPokemon);
   const handleViewDetails = (id: number) => {
      setSelectedPokemon(id); // Define o ID no atom
   };

   return (
      <Atom.Container
         gap="xs"
         align="center"
         justify="space-between"
         direction="column"
      >
         <Link to={`/detalhes/${id}`} onClick={() => handleViewDetails(id)}>
            <FlexBox align="center" justify="flex-end" direction="row">
               <Atom.PokemonText type={typeColor}>#{id}</Atom.PokemonText>
            </FlexBox>
            <Atom.PokemonSpot
               type={typeColor}
               align="center"
               justify="center"
               direction="column"
            >
               <Atom.PokemonSprite src={image} alt={name} />
            </Atom.PokemonSpot>
            <Atom.PokemonPreviewSection
               align="center"
               justify="space-between"
               direction="row"
            >
               <Atom.PokemonText type={typeColor}>{name}</Atom.PokemonText>
               {preview && <img src={preview} alt="" />}
            </Atom.PokemonPreviewSection>

            {/* <FlexBox align="center" justify="flex-end" direction="row">
               <Atom.PokemonText type={typeColor}>
                  {types.types.map((t) => t.type.name).join(', ')}
               </Atom.PokemonText>
            </FlexBox> */}
         </Link>
      </Atom.Container>
   );
};

export default Card;
