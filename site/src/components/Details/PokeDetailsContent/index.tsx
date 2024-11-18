import { FC } from 'react';
import { FlexBox } from '../../Atoms/Flexbox';
import * as Atom from './atoms';

interface IPokeDetailsContent {
   height?: number;
   weight?: number;
   base_experience?: number;
   types?: [];
}

const PokeDetailsContent: FC<IPokeDetailsContent> = ({
   height,
   weight,
   base_experience,
}) => {
   return (
      <Atom.ContentDetails align="center" justify="center" direction="column">
         <FlexBox align="center" justify="center" direction="column">
            <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry.
            </p>
         </FlexBox>
         <FlexBox align="center" justify="center" direction="row" gap="xs">
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
         </FlexBox>
         <FlexBox align="center" justify="center" direction="row" gap="xs">
            <p>Base Exp: {base_experience}</p>
         </FlexBox>
         {/* <p>
            Types:{''}
            {pokemon?.types.map((t) => t.type.name).join(', ')}
         </p> */}
      </Atom.ContentDetails>
   );
};

export default PokeDetailsContent;
