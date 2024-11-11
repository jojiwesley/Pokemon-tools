import { type FC } from 'react';
import * as Atom from './atoms';
import { FlexBox } from '../Flexbox';
import type { TPokemonType } from '../../interface';

interface ICardProps {
   id: number;
   name: string;
   image: string;
   preview?: string;
   type: TPokemonType;
   experience: number;
}

const Card: FC<ICardProps> = ({
   id,
   name,
   image,
   preview,
   type,
   experience,
}) => {
   return (
      <Atom.Container
         gap="xs"
         align="center"
         justify="center"
         direction="column"
      >
         <FlexBox align="center" justify="flex-end" direction="row">
            <Atom.PokemonText type={type}>#{id}</Atom.PokemonText>
         </FlexBox>
         <Atom.PokemonSpot
            type={type}
            align="center"
            justify="center"
            direction="column"
         >
            <Atom.PokemonSprite src={image} alt="Pokemon" />
         </Atom.PokemonSpot>
         <Atom.PokemonPreviewSection
            align="center"
            justify="space-between"
            direction="row"
         >
            <FlexBox
               align="flex-start"
               justify="center"
               direction="column"
               gap="xxs"
            >
               <Atom.PokemonText type={type}>{name}</Atom.PokemonText>

               <Atom.PokemonContainerType
                  align="center"
                  justify="flex-start"
                  direction="row"
                  gap="xxs"
               >
                  <Atom.PokemonTextType type={type}>
                     {type}
                  </Atom.PokemonTextType>
                  <div>{experience}</div>
               </Atom.PokemonContainerType>
            </FlexBox>

            {preview && <img src={preview} alt="" />}
         </Atom.PokemonPreviewSection>
      </Atom.Container>
   );
};

export default Card;
