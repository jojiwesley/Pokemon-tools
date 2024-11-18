import { FC } from 'react';
import { FlexBox } from '../../Atoms/Flexbox';
import * as Atom from './atoms';
import { IPokemonAbilities } from '../../../interface';

interface IPokeDetailsContent {
   height?: number;
   weight?: number;
   base_experience?: number;
   category?: string;
   abilities: IPokemonAbilities[];
   types?: [];
}

const PokeDetailsContent: FC<IPokeDetailsContent> = ({
   height,
   weight,
   category,
   abilities,
}) => {
   return (
      <Atom.ContentDetails
         align="center"
         justify="flex-start"
         direction="column"
         gap="xs"
      >
         <FlexBox align="flex-start" justify="center" direction="column">
            <Atom.P>
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry.
            </Atom.P>
         </FlexBox>
         <FlexBox align="flex-start" justify="center" direction="row" gap="xs">
            <FlexBox
               align="flex-start"
               justify="flex-start"
               direction="column"
               gap="xxs"
            >
               <Atom.SpanTitle>Height</Atom.SpanTitle>
               <Atom.Span>{height} m</Atom.Span>
            </FlexBox>
            <FlexBox
               align="flex-start"
               justify="flex-start"
               direction="column"
               gap="xxs"
            >
               <Atom.SpanTitle>Weight</Atom.SpanTitle>
               <Atom.Span>{weight} kg</Atom.Span>
            </FlexBox>
         </FlexBox>
         <FlexBox align="center" justify="center" direction="row" gap="xs">
            <FlexBox
               align="flex-start"
               justify="flex-start"
               direction="column"
               gap="xxs"
            >
               <Atom.SpanTitle>Categoria</Atom.SpanTitle>
               <Atom.Span>{category}</Atom.Span>
            </FlexBox>
            {/* <FlexBox
               align="flex-start"
               justify="flex-start"
               direction="column"
               gap="xxs"
            >
               <Atom.SpanTitle>Base Exp</Atom.SpanTitle>
               <Atom.Span>{base_experience}</Atom.Span>
            </FlexBox> */}
            <FlexBox
               align="flex-start"
               justify="flex-start"
               direction="column"
               gap="xxs"
            >
               <Atom.SpanTitle>Abilidades</Atom.SpanTitle>
               {/* <Atom.Span>{abilities[0].ability.name}</Atom.Span> */}

               {abilities.map((t: IPokemonAbilities, index: number) => (
                  <Atom.Span key={index}>{t.ability.name}</Atom.Span>
               ))}
            </FlexBox>
         </FlexBox>
         {/* <p>
            Types:{''}
            {pokemon?.types.map((t) => t.type.name).join(', ')}
         </p> */}
      </Atom.ContentDetails>
   );
};

export default PokeDetailsContent;
