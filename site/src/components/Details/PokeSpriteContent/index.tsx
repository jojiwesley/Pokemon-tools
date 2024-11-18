import { FC } from 'react';

import * as Atom from './atoms';

//:Types
import { IPokemonDetailContent } from './types';
import PokeballSvg from '../../PokemballSvg';

const PokeSpriteContent: FC<IPokemonDetailContent> = ({ image, alt }) => {
   return (
      <Atom.Content>
         <Atom.ContentSprite align="center" justify="center" direction="column">
            <Atom.PokemonDetailsSprite src={image} alt={alt} />
         </Atom.ContentSprite>

         <PokeballSvg />
      </Atom.Content>
   );
};

export default PokeSpriteContent;
