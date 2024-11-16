import { IPokemon, TPokemonType } from '../../../interface';

export interface ICardProps {
   id: number;
   image: string;
   name: string;
   preview?: string;
   typeColor: TPokemonType;
   //  types: IPokemon;
}
