import { FC } from 'react';

import * as Atom from './atoms';

//:Types
import { IPokemonDetailContent } from './types';

const PokeSpriteContent: FC<IPokemonDetailContent> = ({ image, alt }) => {
   return (
      <Atom.ContentSprite align="center" justify="center" direction="row">
         <Atom.PokemonDetailsSprite src={image} alt={alt} />
      </Atom.ContentSprite>
   );
};

export default PokeSpriteContent;
