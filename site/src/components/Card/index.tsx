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
}

const Card: FC<ICardProps> = ({ id, name, image, preview, type }) => {
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
            <Atom.PokemonText type={type}>{name}</Atom.PokemonText>
            {preview && <img src={preview} alt="" />}
         </Atom.PokemonPreviewSection>
      </Atom.Container>
   );
};

export default Card;
